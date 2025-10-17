import { useState } from "react";
import "../styles/FAQ.css";

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      "Click the 'Sign up' button in the sidebar, fill out the required information, and submit the form.",
  },
  {
    question: "How do I reset my password?",
    answer: `Go to the Home page, click 'Edit profile' in the sidebar, and follow the instructions to reset your password.`,
  },
  {
    question: `Can I "un-join" an event?`,
    answer:
      "Unfortunately, once you join and (if applicable) pay for an event, you cannot cancel. If you need a refund, please contact cancel@dotcomm.co.uk with the name of the event, and we will try to accommodate your request.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Currently, all events are free. In the future, we will accept credit/debit cards and PayPal for paid events, with more options available later.",
  },
  {
    question: "Who can see my events?",
    answer:
      "Events you join are visible only to you. Staff members can access your participation if needed to provide assistance.",
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(
    faqData.map((faq) => ({ ...faq, active: false }))
  );

  const toggleFaq = (index) => {
    setFaqs((prev) =>
      prev.map((faq, i) =>
        i === index ? { ...faq, active: !faq.active } : faq
      )
    );
  };

  return (
    <div className="faq-container">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
      </div>

      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className={`faq-item ${faq.active ? "active" : ""}`}>
            <button onClick={() => toggleFaq(index)}>
              {faq.question} <span className="arrow">▶</span>
            </button>
            <div className="answer-wrapper">
              <p className="answer">{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
