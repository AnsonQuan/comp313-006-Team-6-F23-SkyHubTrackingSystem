import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const ADD_CONTENT = gql`
  mutation AddSupport($title: String!, $email: String!, $content: String!) {
    addSupport(title: $title, email: $email, content: $content) {
      title,
      email,
      content
    }
  }
`;

const Contact = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [addContent] = useMutation(ADD_CONTENT);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContent({
        variables: {
          title,
          email,
          content,
        },
      });
      alert('Your content has been sent successfully!');
      navigate('/');
    }
    catch (error) {
      console.error(error);
    }
  };

  return(
    <div className="contact-container">
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content:</Form.Label>
          <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Contact;
