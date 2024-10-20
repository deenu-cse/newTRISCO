import React, { useState } from "react";
import '../Styles/Faq.css';

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [
        {
            question: "What is Trisco, and how does it solve event management issues?",
            answer: "Trisco is an event management website designed specifically to help students at Gurukula Kangri Vishwavidyalaya. It allows for seamless management of event information and registrations, addressing the lack of a professional system to share event details and manage registrations efficiently.",
            id: "faq1"
        },
        {
            question: "What is G.P.L?",
            answer: "Gurukul Premier League (G.P.L) is a major part of the Jnanagni Fest at Gurukula Kangri Vishwavidyalaya. It features a wide range of sports events, including football, basketball, cricket, and table tennis, kabbadi etc., along with several e-sports competitions.",
            id: "faq2"
        },
        {
            question: "What are the major benefits of G.P.L?",
            answer: "Participating in the Gurukul Premier League (G.P.L) offers numerous benefits, including the opportunity to win prestigious prizes for the first, second, and third-place winners in each sport. Additionally, every participant receives a certificate of recognition, making it a great way to showcase your involvement in college activities.",
            id: "faq3"
        },
        {
            question: "How are event registrations secured?",
            answer: "Event registrations are secured through a unique student ID generated during the sign-up process. This ID is stored both in the user's profile and in the event form submissions, ensuring each registration is linked to the correct user.",
            id: "faq4"
        },
        {
            question: "How is payment handled for event registrations?",
            answer: "Trisco integrates Razorpay for handling event payments. After filling out the registration form, users can easily pay the required fee, and a receipt is provided upon successful payment.",
            id: "faq5"
        },
        {
            question: "What other features does Trisco provide?",
            answer: "Apart from managing event details and registrations, Trisco allows users to view their registered events in their profile, delete outdated event information via the admin dashboard, and even download a list of registered participants in Excel format.",
            id: "faq6"
        }
    ];

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="wow fadeInUp">
            <div className="container">
                <div className="section-header">
                    <h2>F.A.Q</h2>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <ul id="faq-list">
                            {faqItems.map((item, index) => (
                                <li key={item.id}>
                                    <a
                                        onClick={() => toggleOpen(index)}
                                        className={openIndex === index ? "collapse" : "collapsed"}
                                    >
                                        {item.question}
                                        <i className="fa fa-minus-circle"></i>
                                    </a>
                                    {openIndex === index && (
                                        <div className="answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
