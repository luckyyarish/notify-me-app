const express = require('express');
const cors = require('cors');
const webpush = require('web-push');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your VAPID keys from web-push library
const publicVapidKey = 'BCHECDjtevHDED6IZpkf5aQSqacV7fyg93xBe6iaBFnqT_ctg58S4ly-KWyZR1fHvij83y8tSVo7rRkQKTtKz1Q';
const privateVapidKey = 'nz-JPyv0N68WmoiQ0vS3-E6rWd3ra5pdkuYdW3DiXW4';
webpush.setVapidDetails('mailto:your-email@example.com', publicVapidKey, privateVapidKey);

let subscription; // Store your subscription object here

app.post('/subscribe', (req, res) => {
    subscription = req.body;
    res.status(201).json({ message: 'Subscribed!' });
});

app.post('/notify', (req, res) => {
    if (subscription) {
        webpush.sendNotification(subscription, JSON.stringify({ title: 'Your Friend Wants to Talk!' }))
            .catch(err => console.error(err));
    }
    res.status(200).json({ message: 'Notification sent!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
