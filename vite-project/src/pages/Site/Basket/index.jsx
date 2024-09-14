import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
  
    const savedBasket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(savedBasket);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedBasket = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + quantity) }; 
      }
      return item;
    });

    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const clearBasket = () => {
    localStorage.removeItem('basket');
    setBasketItems([]); 
  };

  return (
    <div className="container">
      <h1>Your Basket</h1>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {basketItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                    </div>
                  </td>
                  <td>{item.salePrice} $</td>
                  <td>{(item.salePrice * item.quantity).toFixed(2)} $</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <h3>
              Total: {basketItems.reduce((acc, item) => acc + item.salePrice * item.quantity, 0).toFixed(2)} $
            </h3>
            <Button variant="danger" onClick={clearBasket}>
              Clear Basket
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
