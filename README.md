
# 🕵️‍♂️ incognitomail.co-reversed

Reverse-engineered scripts to **generate unlimited disposable emails** on [IncognitoMail.co](https://incognitomail.co) without using a browser or WebDriver.

> 🔒 **No Puppeteer or Selenium required**  
> 🛡️ Last updated: **June 23rd, 2025**

---

## ⚠️ Disclaimer

- This project is **strictly for educational and research purposes only**.  
- **Do not** use this in commercial applications or services.  
- Use responsibly and respect the platform’s terms of service.

---

## 📁 What’s Inside?

This repo contains two core files:

- `createInbox.js` – Instantly generates a new inbox ID + token.
- `listInbox.js` – Fetches and reads emails from any valid inbox.

All requests are handled via Node.js and `axios`, and authentication is performed via HMAC—just like the website does internally.

---

## 🛠 Requirements

- Node.js (v16+ recommended)
- No browser automation (no Puppeteer/Selenium/WebDriver required)

Install dependencies:

```bash
npm install
```

---

## 🚀 How to Use

### 1. Create a new inbox
```bash
node createInbox.js
```

You'll receive output like:
```json
{
  "inboxId": "abc123456789@incognitomail.co",
  "token": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 2. List inbox messages
Update `listInbox.js` with your inbox ID and token, then run:

```bash
node listInbox.js
```

If valid, you'll see parsed messages (subject, date, text). If expired, it will try to auto-restore.

---

## 🔧 Behind the Scenes

The site uses HMAC-SHA256 authentication with a disguised key logic. This repo includes a function that mimics the obfuscated JS on the frontend to generate valid request keys.


---

## 🛡 IncognitoMail Patch 

The IncognitoMail security team actively monitors and rolls out **frequent API-breaking patches**. This means old versions of this script can break **without notice**.

> 🔁 I’ll do my best to keep this repo up to date when that happens.

---

## 🤝 Support / Contributions

Pull requests to improve detection, fix patches, or simplify usage are welcome.

---

## 📜 License

This project is licensed under the MIT License.  
You may **not** use this for any commercial service or resale tool.

---
