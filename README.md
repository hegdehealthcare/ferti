# Ferti - Coming Soon Page

A beautiful, modern Coming Soon landing page built with Node.js and Express.

## 🎯 Features

- ✨ Modern gradient design with smooth animations
- 📧 Email subscription with validation
- 📊 Real-time subscriber counter
- 📱 Fully responsive mobile design
- 🔒 Duplicate email prevention
- 💾 Persistent data storage
- ⚡ Fast and lightweight
- 🎨 Beautiful UI/UX

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/hegdehealthcare/ferti.git
cd ferti
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

4. Open your browser
```
http://localhost:3000
```

## 📁 Project Structure

```
ferti/
├── server.js              # Express server & API
├── package.json           # Dependencies
├── views/
│   ├── index.ejs         # Main landing page
│   └── 404.ejs           # Error page
├── public/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── script.js     # Frontend logic
├── subscribers.json      # Subscriber data (auto-generated)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔌 API Endpoints

### Subscribe to Newsletter
```
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response (201):**
```json
{
  "message": "Successfully subscribed! Check your email."
}
```

### Get Subscriber Count
```
GET /api/subscribers-count
```

**Response (200):**
```json
{
  "count": 42
}
```

## 🎨 Customization

### Change the Title
Edit `views/index.ejs`:
```html
<h1>Your Project Name</h1>
```

### Change Colors
Edit `public/css/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Update Social Links
Edit `views/index.ejs`:
```html
<a href="https://twitter.com/yourhandle" class="social-link">Twitter</a>
```

## 📧 Email Integration (Optional)

To send actual emails, integrate with services like:
- SendGrid
- Mailgun
- AWS SES
- NodeMailer

Example with NodeMailer:
```javascript
npm install nodemailer
```

Then update `/api/subscribe` endpoint in `server.js`.

## 🌐 Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Vercel
```bash
npm i -g vercel
vercel
```

### AWS, DigitalOcean, or any VPS
1. Install Node.js
2. Clone repository
3. Install dependencies: `npm install`
4. Set up environment variables
5. Run: `npm start`

## 📝 Environment Variables

Create a `.env` file for sensitive data:
```
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License - feel free to use this project freely.

## 📧 Support

For issues or questions, please create a GitHub issue or contact us at digitalmanager@hegdehospital.com

---

Made with ❤️ by Hegde Healthcare
