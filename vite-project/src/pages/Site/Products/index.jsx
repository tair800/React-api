import React, { useEffect, useState } from 'react';
import { getProtecdedData } from '../../../Services/api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import { FaHeart } from "react-icons/fa";

const Products = () => {
  const [lists, setLists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]); 
  const itemsPerPage = 2; 

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProtecdedData(currentPage); 
        setLists(res.data.items);
        setTotalCount(res.data.totalCount); 
      } catch (error) {
        console.log(error);
      }
    };

    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);

    getData();
  }, [currentPage]); 

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToBasket = (product) => {
    const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];

    const productIndex = currentBasket.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      currentBasket[productIndex].quantity += 1;
    } else {
      currentBasket.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('basket', JSON.stringify(currentBasket));

    alert(`${product.name} has been added to the basket!`);
  };

  const toggleWishlist = (product) => {
    const currentWishlist = [...wishlist];
    const index = currentWishlist.findIndex(item => item.id === product.id);

    if (index !== -1) {
      currentWishlist.splice(index, 1);
    } else {
      currentWishlist.push(product);
    }

    setWishlist(currentWishlist);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className='container'>
      <h1>Products</h1>
    
      <div className="d-flex justify-content-center gap-4">
       {lists && lists.map((list) => (
          <Card key={list.id} style={{ width: '18rem'  }}>
            <Card.Img variant="top" src="image.jpg" />
            <Card.Body>
              <Card.Title>{list.name}</Card.Title>
              <Card.Text>{list.salePrice} $</Card.Text>
              <Button variant="primary" onClick={() => addToBasket(list)}>
                Add to Basket
              </Button>
              <FaHeart
                className='mx-5'
                style={{ fontSize: '30px', color: isInWishlist(list.id) ? 'red' : 'gray', cursor: 'pointer' }}
                onClick={() => toggleWishlist(list)}
              />
            </Card.Body>
          </Card>
       ))}
      </div>
        
      <Pagination>
        <Pagination.Prev 
          onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : currentPage)} 
          disabled={currentPage === 1} 
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item 
            key={i + 1} 
            active={i + 1 === currentPage}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : currentPage)} 
          disabled={currentPage === totalPages} 
        />
      </Pagination>
    </div>
  );
};

export default Products;
