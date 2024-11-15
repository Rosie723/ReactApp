import React, { useState, useEffect } from 'react';

function ProductList() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        // Load the product list from MySQL when the component mounts
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((data) => setProductList(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a new product object
        const newProduct = { name: productName, price };

        // Send a POST request to the backend to add a product
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Product added successfully') {
                    // Add the new product to the local state
                    setProductList([...productList, { ...newProduct, id: data.productId }]);
                    // Clear the form
                    setProductName('');
                    setPrice('');
                }
            })
            .catch((error) => console.error('Error adding product:', error));
    };

    const handleDelete = (productId) => {
        // Send a DELETE request to the backend to delete a product by id
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Product deleted successfully') {
                    // Remove the product from local state
                    setProductList(productList.filter((product) => product.id !== productId));
                }
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    return (
        <section id="product-management">
            <h2>Product Management</h2>
            <form id="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Initial Quantity"
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            <div id="product-list">
                <h3>Product List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ProductList;
