const axios = require("axios");
const crypto = require("crypto");


function d(payload) {
    const key = "4O)QqiTV+(U+?Vi]qe|6..Xe"
        .split("")
        .map(c => String.fromCharCode(c.charCodeAt(0) - 2))
        .join("");

    const hmac = crypto.createHmac("sha256", key);
    hmac.update(payload);
    return hmac.digest("hex");
}


async function createInbox(domain = "mailpro.live") {
    const payload = {
        ts: Date.now(),
        domain,
        token: ""
    };

    payload.key = d(JSON.stringify(payload));

    try {
        const response = await axios.post("https://api.incognitomail.co/inbox/v2/create", payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

createInbox()
    .then(data => console.log("Inbox Created:", data))
    .catch(err => console.error("Failed to create inbox:", err));
