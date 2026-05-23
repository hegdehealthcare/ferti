const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBSCRIBERS_FILE = path.join(__dirname, 'subscribers.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper function to read subscribers
function getSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading subscribers:', error);
  }
  return [];
}

// Helper function to save subscribers
function saveSubscribers(subscribers) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('Error saving subscribers:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// API endpoint to subscribe
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const subscribers = getSubscribers();

  // Check if email already exists
  if (subscribers.some((sub) => sub.email === email)) {
    return res.status(400).json({ message: 'This email is already subscribed!' });
  }

  // Add new subscriber
  const newSubscriber = {
    email,
    subscribedAt: new Date().toISOString(),
  };

  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);

  res.status(201).json({
    message: 'Successfully subscribed! Check your email.',
    subscriber: newSubscriber,
  });
});

// API endpoint to get subscriber count
app.get('/api/subscribers-count', (req, res) => {
  const subscribers = getSubscribers();
  res.json({ count: subscribers.length });
});

// API endpoint to get all subscribers (for admin purposes - consider adding auth)
app.get('/api/subscribers', (req, res) => {
  const subscribers = getSubscribers();
  res.json({ subscribers, count: subscribers.length });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Ferti Coming Soon page is running on http://localhost:${PORT}`);
  console.log(`📧 API Endpoints:`);
  console.log(`   POST /api/subscribe - Subscribe to newsletter`);
  console.log(`   GET /api/subscribers-count - Get subscriber count`);
  console.log(`   GET /api/subscribers - Get all subscribers\n`);
});
