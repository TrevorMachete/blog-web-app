import React, { useState } from 'react';
import './ContactUs.css'; // Create and style this CSS file accordingly
import emailjs from 'emailjs-com'; // Import EmailJS
const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!name || !email || !message) {
      setError('All fields are required');
      return;
    }
    // Prepare the email data
    const templateParams = {
        name,
        email,
        message,
      };
      // Mock submission process
      // Here you can add code to send the form data to your backend or email service
    try {
      // Send the email using EmailJS
      await emailjs.send('service_x7fnxjr', 'template_5j6tjye', templateParams, '9XH289e84atBG0ksB');
      setSuccess('Your message has been sent successfully!');
      setError('');
    } catch (err) {
      setError('Error sending message');
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-header">Contact Us</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
