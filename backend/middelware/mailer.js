require("dotenv").config()
const nodemailer = require('nodemailer');
const User = require("../models/signUpModel");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    },
});

const sendEventNotification = async (eventDetails) => {
    try {
        const users = await User.find();
        const emailList = users.map(user => user.email);

        const mailOptions = {
            from: process.env.EMAIL,
            to: emailList,
            subject: 'New Event Added: ' + eventDetails.name,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd;">
                <h2 style="color: #333; text-align: center;">🎉 A New Event is Here!</h2>
                <p style="font-size: 16px; color: #555;">We are excited to announce a new event has been added to <strong>Trisco</strong>! Here are the details:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Event Name:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #fff;">${eventDetails.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Date:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #fff;">${eventDetails.date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Time:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #fff;">${eventDetails.time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Description:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; background-color: #fff;">${eventDetails.description}</td>
                  </tr>
                </table>
          
                <p style="font-size: 16px; color: #555;">Don't miss out on this exciting event! Visit our website for more details.</p>
                <p style="font-size: 14px; color: #888; text-align: center;">&copy; 2024 Trisco. All rights reserved.</p>
              </div>
            `,
        };


        await transporter.sendMail(mailOptions);
        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEventNotification }