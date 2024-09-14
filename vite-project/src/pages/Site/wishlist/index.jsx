import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container">
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="d-flex justify-content-center gap-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="image.jpg" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.salePrice} $</Card.Text>
                <Button variant="danger" onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
