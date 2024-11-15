

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ProductList from './ProductList';
import UserList from './UserList';
import axios from 'axios';

function Dashboard({ products = [], addProduct, deleteProduct, updateProduct, onLogout }) {
    const [activeSection, setActiveSection] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Product Quantity',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    // Fetch updated products list from backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            
            // Check if the response data is an array
            if (Array.isArray(response.data)) {
                setChartData({
                    labels: response.data.map((product) => product.name),
                    datasets: [
                        {
                            label: 'Product Quantity',
                            data: response.data.map((product) => product.quantity),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } else {
                console.error('Expected an array of products, but received:', response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Polling data every 5 seconds
    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 5000); // 5 seconds
        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setActiveSection('productList');
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Products Overview - Quantities',
            },
        },
    };

    return (
        <section>
            <div className="dashboard-container">
                <div class="button-group">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={() => handleSectionChange('productList')}>Product List</button>
                    <button onClick={() => handleSectionChange('userList')}>User List</button>
                    <button onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
                </div>
            </div>

            <h2>Dashboard</h2>
            <h3>Products Overview</h3>

            {/* Display bar chart */}
            <Bar data={chartData} options={options} />

            <div>
                {/* Safely map over items */}
                {products && products.map((item, index) => (
                    <div key={index}>{item.name}</div>
                ))}
            </div>

            {activeSection === 'productList' && (
                <ProductList 
                    addProduct={addProduct} 
                    product={editingProduct} 
                    setEditingProduct={setEditingProduct} 
                />
            )}
            {activeSection === 'userList' && <UserList />}
        </section>
    );
}

export default Dashboard;
