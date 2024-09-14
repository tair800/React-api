import React, { useState, useEffect } from 'react';
import { getCategoryData } from '../../../Services/api'; // Adjust the import path if necessary
import axios from 'axios';

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [costPrice, setCostPrice] = useState('');

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryData();
        setCategories(response.data); // Assuming response.data is the list of categories
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create a product object with the form data
    const productData = {
      name: name,
      salePrice: parseFloat(salePrice),
      costPrice: parseFloat(costPrice),
      categoryId: selectedCategory, // Using categoryId from the selected dropdown value
    };

    try {
      // Send POST request to create the product
      const response = await axios.post('http://localhost:7261/api/Product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Product created successfully:', response.data);
      // Optionally, you can reset the form after a successful submission
      setName('');
      setSalePrice('');
      setCostPrice('');
      setSelectedCategory('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sale Price</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cost Price</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
