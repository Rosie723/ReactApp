import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/products', { name, price })
      .then((response) => {
        console.log(response.data);
        alert('Product added!');
        setName('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Error adding product!');
      });
  };

  return (
    <div>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;