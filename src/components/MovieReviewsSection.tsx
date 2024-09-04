"use client"
import React from 'react';

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface ReviewsComponentProps {
  reviews: Review[];
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            style={{
              color: index < fullStars ? '#ffd700' : index === fullStars && halfStar ? '#ffd700' : '#444',
              fontSize: '1.2em',
              marginRight: '2px'
            }}
          >
            {index < fullStars ? '★' : index === fullStars && halfStar ? '★' : '☆'}
          </span>
        ))}
      </>
    );
  };

  return (
    <div style={{ color: '#fff', padding: '20px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }} className='text-2xl font-semibold mb-6 text-center text-white'>Critics Reviews</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}
      >
        {reviews.map(review => (
          <div
            key={review.id}
            style={{
              position: 'relative',
              border: '1px solid #444',
              padding: '15px',
              borderRadius: '12px',
              backgroundColor: '#222',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              overflow: 'hidden'
            }}
          >
            {/* Display star rating */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {renderStars(review.author_details.rating || 0)}
            </div>

            {/* Display author's avatar if available */}
            {review.author_details.avatar_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                alt={review.author_details.username}
                style={{
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  marginBottom: '15px',
                  objectFit: 'cover',
                  border: '2px solid #1e90ff'
                }}
              />
            ) : (
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#444',
                  marginBottom: '15px',
                  border: '2px solid #1e90ff'
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '1.1em' }}>{review.author}</strong> <br />
              <em style={{ color: '#1e90ff' }}>@{review.author_details.username}</em> <br />
              <p
                style={{
                  marginTop: '10px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
                  textOverflow: 'ellipsis',
                  color: '#fff'
                }}
              >
                {review.content}
              </p>
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1e90ff',
                  textDecoration: 'none',
                  display: 'block',
                  marginTop: '10px',
                  fontWeight: 'bold',
                  transition: 'color 0.3s ease',
                }}
              >
                Read full review
              </a>
              <div style={{ fontSize: 'smaller', color: '#ccc', marginTop: '10px' }}>
                Reviewed on {new Date(review.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
