const axios = require("axios");
const crypto = require("crypto");

const BASE_URL = "https://api.incognitomail.co";

function d(payload) {
    const key = "4O)QqiTV+(U+?Vi]qe|6..Xe"
        .split("")
        .map(c => String.fromCharCode(c.charCodeAt(0) - 2))
        .join("");

    const hmac = crypto.createHmac("sha256", key);
    hmac.update(payload);
    return hmac.digest("hex");
}

async function fetchText(messageURL) {
    try {
        const response = await axios.get(messageURL);
        return response.data;
    } catch (err) {
        console.error("Failed to fetch text", err.message);
        return null;
    }
}

async function listInbox(email, token) {
    const ts = Date.now();
    const payload = {
        inboxId: email,
        inboxToken: token,
        ts
    };

    const payloadstr = JSON.stringify(payload);
    payload.key = d(payloadstr);

    let response;
    try {
        response = await axios.post(`${BASE_URL}/inbox/v1/list`, payload);
    } catch (err) {
        if (
            err.response &&
            err.response.status === 400 &&
            err.response.data.error === "Unauthorized"
        ) {
            await axios.post(`${BASE_URL}/inbox/v1/restore`, {
                inboxId: email,
                token
            });

            response = await axios.post(`${BASE_URL}/inbox/v1/list`, payload);
        } else {
            return {
                error: "Failed to list messages",
                details: err.response?.data || err.message
            };
        }
    }

    if (response.status === 200) {
        const data = response.data;
        const emails = data.items || [];

        const messages = await Promise.all(emails.map(async (item) => {
            const text = await fetchText(email.messageURL);
            return {
                date: item.date,
                subject: item.subject,
                text
            };
        }));

        return {
            inboxId: email,
            messages,
            nextToken: data.nextToken || null
        };
    } else {
        return {
            error: "Failed to list emails",
            details: response.data || response.statusText
        };
    }
}
