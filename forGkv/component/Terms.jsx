import React from 'react';
import '../Styles/Terms.css';
import Extranav from './Extranav';

const Terms = () => {
    return (
        <>
        <Extranav/>
        <div className="terms-container">
            <h1>Terms and Conditions</h1>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    Welcome to <strong>TRISCO</strong>, your go-to platform for managing and registering for college events. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
                </p>
            </section>

            <section>
                <h2>2. Definitions</h2>
                <p>
                    - <strong>"We," "Us," "Our"</strong> refers to TRISCO, the event management platform.<br />
                    - <strong>"User," "You"</strong> refers to anyone accessing and using the website.<br />
                    - <strong>"Event Organizers"</strong> are authorized individuals or groups who manage and create event registrations on the platform.<br />
                    - <strong>"Participants"</strong> are students or individuals registering for events.
                </p>
            </section>

            <section>
                <h2>3. Services Provided</h2>
                <p>
                    TRISCO offers services including but not limited to:
                </p>
                <ul>
                    <li>Event listing and registration for college events.</li>
                    <li>Secure payment options for event-related fees using Razorpay.</li>
                    <li>User profiles to manage and view registered events.</li>
                    <li>Notifications via email to keep users informed about new events.</li>
                </ul>
            </section>

            <section>
                <h2>4. User Accounts and Registration</h2>
                <p>
                    To register for an event, users must provide accurate information, including their name, roll number, and college details.
                </p>
                <p>
                    We use the provided roll number and validate it against uploaded ID cards using OCR technology for verification. Each user is assigned a unique <strong>Student ID</strong> during registration, which is used to track event participation.
                </p>
                <p>
                    Users must maintain the confidentiality of their login credentials and are responsible for all activities that occur under their account.
                </p>
            </section>

            <section>
                <h2>5. Event Registration and Fees</h2>
                <p>
                    Event registrations are managed through forms available on our website. Users can register for multiple events but can only submit one form per event. Fees, if applicable, are processed securely via Razorpay, and users will receive a receipt upon successful payment.
                </p>
            </section>

            <section>
                <h2>6. Email Notifications</h2>
                <p>
                    By signing up, users agree to receive email notifications for new events, updates, and important information about the platform.
                </p>
                <p>
                    Notifications may include event details, dates, and times for multiple events, including relevant forms for each event.
                </p>
            </section>

            <section>
                <h2>7. Data Collection and Privacy</h2>
                <p>
                    We collect personal information, including name, roll number, and contact details, to manage event registration and communication. All data is stored securely, and we do not share or sell personal information to third parties without user consent.
                </p>
                <p>
                    For more details, refer to our <strong>Privacy Policy</strong>.
                </p>
            </section>

            <section>
                <h2>8. User Responsibilities</h2>
                <p>
                    Users are responsible for providing accurate information when registering for events. Any misuse of the platform, including submitting false information or violating event rules, may result in suspension or termination of the user's account.
                </p>
            </section>

            <section>
                <h2>9. Limitation of Liability</h2>
                <p>
                    TRISCO will not be liable for any loss or damage arising from the use of the platform, including but not limited to data loss, delays in event registration, or payment processing errors.
                </p>
            </section>

            <section>
                <h2>10. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Any changes will be communicated via email or through notifications on the platform.
                </p>
            </section>

            <section>
                <h2>11. Contact Us</h2>
                <p>
                    For any queries regarding these Terms and Conditions, please contact us at:
                </p>
                <ul>
                    <li>Email: vdeendayal866@example.com</li>
                    <li>Phone: +91-6378837030</li>
                </ul>
            </section>
        </div>
        </>
    );
};

export default Terms;
