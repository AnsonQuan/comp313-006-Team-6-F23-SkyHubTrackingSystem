import React, { useState } from 'react';
import './Contact.css';

const ConfirmationModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Thank you for contacting us!</h3>
        <p>Your message has been sent successfully.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Contact = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    // Validate name
    if (!formValues.name) tempErrors.name = "Name is required.";
    // Validate email
    if (!formValues.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is not valid.";
    }
    // Validate message
    if (!formValues.message) tempErrors.message = "Message is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear errors for a particular field when it's being edited
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the validateForm function
    if (validateForm()) {
      // If form is valid, show confirmation modal
      setShowConfirmation(true);
      // Here, send the form data to the server...
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Reset the form fields
    setFormValues({
      name: '',
      email: '',
      message: '',
    });
    // Clear any errors
    setErrors({});
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formValues.message}
            onChange={handleInputChange}
            className={errors.message ? 'error' : ''}
          ></textarea>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {showConfirmation && <ConfirmationModal onClose={handleCloseConfirmation} />}
    </div>
  );
};

export default Contact;
