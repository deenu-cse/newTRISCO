import React from 'react';
import '../Styles/PrivacyPolicy.css';
import Extranav from './Extranav';

const PrivacyPolicy = () => {
    return (
        <>
        <Extranav/>
        <div className="privacy-container">
            <h1>Privacy Policy</h1>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    At <strong>TRISCO</strong>, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our platform.
                </p>
            </section>

            <section>
                <h2>2. Information We Collect</h2>
                <p>We collect the following types of information from users:</p>
                <ul>
                    <li>
                        <strong>Personal Information:</strong> This includes name, roll number, email address, phone number, and other identifiable data provided during registration or event sign-up.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> We collect information about how you interact with our platform, such as pages visited, time spent, and events registered for.
                    </li>
                </ul>
            </section>

            <section>
                <h2>3. How We Use Your Information</h2>
                <p>
                    The data we collect is used to:
                </p>
                <ul>
                    <li>Facilitate event registrations and payment processing.</li>
                    <li>Send email notifications about upcoming events.</li>
                    <li>Verify user identity through roll number and ID card matching using OCR.</li>
                    <li>Provide personalized user profiles displaying registered events and other activity.</li>
                    <li>Improve our platform and user experience.</li>
                </ul>
            </section>

            <section>
                <h2>4. Data Security</h2>
                <p>
                    We take data security seriously and implement appropriate technical and organizational measures to protect your personal data. All sensitive information, including payment details, is encrypted and transmitted securely.
                </p>
            </section>

            <section>
                <h2>5. Data Sharing</h2>
                <p>
                    We do not sell or share your personal information with third parties, except in the following cases:
                </p>
                <ul>
                    <li>When required by law, government authorities, or legal proceedings.</li>
                    <li>When necessary to process payments or manage event registrations (e.g., Razorpay).</li>
                    <li>With trusted partners who assist in the operation of the platform, provided they agree to keep this information confidential.</li>
                </ul>
            </section>

            <section>
                <h2>6. Cookies and Tracking Technologies</h2>
                <p>
                    We use cookies and similar tracking technologies to enhance user experience and analyze website traffic. These technologies help us understand how users interact with our site and allow us to improve functionality.
                </p>
                <p>
                    You can control your cookie preferences through your browser settings. However, disabling cookies may affect certain features on our website.
                </p>
            </section>

            <section>
                <h2>7. Your Rights</h2>
                <p>
                    As a user, you have the right to:
                </p>
                <ul>
                    <li>Access the personal data we hold about you.</li>
                    <li>Request corrections to any inaccuracies in your data.</li>
                    <li>Request the deletion of your personal data.</li>
                    <li>Opt-out of marketing or notification emails at any time.</li>
                </ul>
            </section>

            <section>
                <h2>8. Changes to this Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be communicated to users through email or platform notifications. We encourage you to review this policy periodically to stay informed about how we protect your data.
                </p>
            </section>

            <section>
                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding our Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
