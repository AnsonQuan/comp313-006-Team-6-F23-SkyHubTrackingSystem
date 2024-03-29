import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import './Review.css'; 

const ADD_REVIEW = gql`
mutation AddReview($overallRating: Int!, $userReview: String!, $improvements: String, $recommendation: String!, $suggestions: String) {
  addReview(overallRating: $overallRating, userReview: $userReview, improvements: $improvements, recommendation: $recommendation, suggestions: $suggestions) {
      overallRating
      userReview
      improvements
      recommendation
      suggestions
  }
}
`;

const Review = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [improvements, setImprovements] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [addReview] = useMutation(ADD_REVIEW);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        variables: {
          overallRating: parseInt(overallRating),
          userReview,
          improvements,
          recommendation,
          suggestions,
        },
      });
      navigate('/');
    }
    catch (error) {
      console.error(error);
    }};

    return (
      <div className="review-container">
            <h2>Write a Review</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOverallRating">
                    <Form.Label>Overall Rating:</Form.Label>
                    <Form.Control type="number" value={overallRating} onChange={(e) => setOverallRating(parseInt(e.target.value))} min={1} max={5} />
                </Form.Group>
                <Form.Group controlId="formUserReview">
                    <Form.Label>User Review:</Form.Label>
                    <Form.Control as="textarea" value={userReview} onChange={(e) => setUserReview(e.target.value)} rows={5} />
                </Form.Group>
                <Form.Group controlId="formImprovements">
                    <Form.Label>Improvements:</Form.Label>
                    <Form.Control type="text" value={improvements} onChange={(e) => setImprovements(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formRecommendation">
                    <Form.Label>Recommendation:</Form.Label>
                    <Form.Control type="text" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formSuggestions">
                    <Form.Label>Suggestions:</Form.Label>
                    <Form.Control type="text" value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit Review
                </Button>
            </Form>
        </div>
    );
}



export default Review;
