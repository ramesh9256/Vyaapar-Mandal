require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const memberRoutes = require('./routes/memberRoutes')
const eventRoutes = require('./routes/eventRoutes');
const contactRoutes = require('./routes/contactRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const noticeRoutes = require('./routes/noticeRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes');
const membershipRoutes = require('./routes/membershipRoutes');


connectDB();

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["https://vyaapar-mandal.vercel.app","http://localhost:5173"],
    credentials:true
}));
app.get('/api/test', (req, res) => {
  res.send("API is working");
});
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/membership', membershipRoutes);

app.get('/', (req, res) => res.send("Vyapaar Mandal API running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
