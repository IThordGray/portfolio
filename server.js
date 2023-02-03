const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Define a basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const formData = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.MY_EMAIL,
        subject: `Portfolio contact - ${formData.name}`,
        text: `${formData.message}\n\n${formData.email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Email sending failed');
        } else {
            console.log(info);
            res.send('Email sent successfully');
        }
    });
});

// Start the server on a specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
