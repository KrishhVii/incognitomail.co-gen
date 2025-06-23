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


const payload = {
    ts: Date.now(),
    domain: "mailpro.live",
    token: ""
};


const key = d(JSON.stringify(payload));
payload.key = key;
axios.post("https://api.incognitomail.co/inbox/v2/create", payload)
    .then(res => {
        console.log("Response:", res.data);
    })
    .catch(err => {
        console.error("Error:", err.response?.data || err.message);
    });
