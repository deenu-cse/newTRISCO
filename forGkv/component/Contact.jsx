import React, { useState } from "react";
import '../Styles/Contact.css';

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageSent(false);
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });

      const resdata = await response.json();
      if (response.ok) {
        console.log(resdata);
        setMessageSent(true);
        setMessage({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setErrorMessage("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error sending message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-bg wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you. Send us a message below!</p>
        </div>

        <div className="row contact-info">
          <div className="col-md-4">
            <div className="contact-address">
              <i className="ion-ios-location-outline"></i>
              <h3>Address</h3>
              <address>uttarakhand, Haridwar, 249401</address>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-phone">
              <i className="ion-ios-telephone-outline"></i>
              <h3>Phone Number</h3>
              <p>
                +91-6378837030
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-email">
              <i className="ion-ios-email-outline"></i>
              <h3>Email</h3>
              <p>
                vdeendayal866@example.com
              </p>
            </div>
          </div>
        </div>

        <div className=" formy">
          {messageSent && <div id="sendmessage">Your message has been sent. Thank you!</div>}
          {errorMessage && <div id="errormessage">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="contactForm">
            <div className="formy-row">
              <div className="formy col-md-6 set">
                <input
                  type="text"
                  name="name"
                  value={message.name}
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="formy col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={message.email}
                  id="email"
                  placeholder="Your Email"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="formy">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={message.subject}
                  id="subject"
                  placeholder="Subject"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="formy">
                <textarea
                  className="form-control"
                  name="message"
                  value={message.message}
                  rows="5"
                  placeholder="Message"
                  required
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="submit-btn">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
