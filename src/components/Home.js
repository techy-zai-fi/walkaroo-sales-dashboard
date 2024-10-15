import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell } from 'recharts';

// Mock data generation functions (expanded)
const generateSalesData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2024, 9, i + 1).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 10000) + 5000,
    forecast: Math.floor(Math.random() * 10000) + 5000,
  }));
};

const generateProductData = () => {
  const products = ['Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers'];
  return products.map(product => ({
    name: product,
    sales: Math.floor(Math.random() * 5000) + 1000,
    inventory: Math.floor(Math.random() * 1000) + 100,
  }));
};

const generateOutletData = () => {
  return [
    { name: 'New York', revenue: 120000, performance: 0.8 },
    { name: 'Los Angeles', revenue: 100000, performance: 0.7 },
    { name: 'Chicago', revenue: 90000, performance: 0.75 },
    { name: 'Houston', revenue: 80000, performance: 0.6 },
    { name: 'Phoenix', revenue: 70000, performance: 0.65 },
  ];
};

const generateSalesDrivers = () => {
  return [
    { driver: 'Time of Day', importance: Math.random() * 100, category: 'Time' },
    { driver: 'Day of Week', importance: Math.random() * 100, category: 'Time' },
    { driver: 'Season', importance: Math.random() * 100, category: 'Time' },
    { driver: 'Product Type', importance: Math.random() * 100, category: 'Product' },
    { driver: 'Price Point', importance: Math.random() * 100, category: 'Product' },
    { driver: 'Promotions', importance: Math.random() * 100, category: 'Marketing' },
    { driver: 'Customer Demographics', importance: Math.random() * 100, category: 'Customer' },
    { driver: 'Weather', importance: Math.random() * 100, category: 'External' },
  ];
};

const generateSWOTData = (storeName) => {
  return {
    strengths: [
      `Strong brand recognition in ${storeName}`,
      'High-quality products',
      'Efficient supply chain',
    ],
    weaknesses: [
      `Limited online presence in ${storeName} market`,
      'High production costs',
      'Seasonal demand fluctuations',
    ],
    opportunities: [
      `Expanding e-commerce in ${storeName}`,
      'Emerging markets',
      'Sustainable product line',
    ],
    threats: [
      `Increasing competition in ${storeName}`,
      'Changing consumer preferences',
      'Economic downturns',
    ],
  };
};

const generateAIInsights = (storeName) => {
  return [
    `${storeName} shows a 15% increase in sales during weekends. Consider adjusting staffing and inventory accordingly.`,
    `Customer behavior analysis indicates a strong correlation between weather patterns and sandal sales in ${storeName}.`,
    `Inventory turnover rate for running shoes in ${storeName} is 20% higher than the company average. Consider increasing stock levels.`,
    `Price elasticity analysis suggests a 5% price decrease could lead to a 10% increase in sales volume for sneakers in ${storeName}.`,
    `${storeName} customers frequently purchase socks with running shoes. Consider bundling these items for promotions.`,
    `AI-driven demand forecasting predicts a 30% increase in boot sales for ${storeName} in the coming winter season.`,
  ];
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('week');
  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [outletData, setOutletData] = useState([]);
  const [salesDrivers, setSalesDrivers] = useState([]);
  const [selectedStore, setSelectedStore] = useState('New York');
  const [swotData, setSWOTData] = useState({});
  const [aiInsights, setAIInsights] = useState([]);

  useEffect(() => {
    // Simulate API calls to fetch data
    const days = dateRange === 'day' ? 7 : dateRange === 'week' ? 7 : dateRange === 'month' ? 30 : 365;
    setSalesData(generateSalesData(days));
    setProductData(generateProductData());
    setOutletData(generateOutletData());
    setSalesDrivers(generateSalesDrivers());
    setSWOTData(generateSWOTData(selectedStore));
    setAIInsights(generateAIInsights(selectedStore));
  }, [dateRange, selectedStore]);

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const averageOrderValue = totalSales / salesData.length;
  const topSellingProduct = productData.reduce((max, product) => max.sales > product.sales ? max : product, { sales: 0 }).name;
  const bestPerformingOutlet = outletData.reduce((max, outlet) => max.revenue > outlet.revenue ? max : outlet, { revenue: 0 }).name;

  return (
    <div className="p-4 space-y-4">
      {/* Header and KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium">Total Sales</h3>
          <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium">Average Order Value</h3>
          <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium">Top Selling Product</h3>
          <div className="text-2xl font-bold">{topSellingProduct}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium">Best Performing Outlet</h3>
          <div className="text-2xl font-bold">{bestPerformingOutlet}</div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Sales Trends Over Time */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sales Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Actual Sales" />
            <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Popularity and Sales Volume */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Product Popularity and Sales Volume</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Growth Analysis */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Revenue Growth Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" name="Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="forecast" stroke="#82ca9d" name="Quantity Sold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distributor/Outlet Performance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Distributor/Outlet Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={outletData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
            <Bar dataKey="performance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Inventory Turnover Rate */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Inventory Turnover Rate</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
            <Bar dataKey="inventory" fill="#82ca9d" name="Inventory" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Driver Identification */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sales Drivers (AI Insight)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="category" dataKey="driver" name="Sales Driver" />
            <YAxis type="number" dataKey="importance" name="Importance" />
            <ZAxis type="category" dataKey="category" name="Category" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Sales Drivers" data={salesDrivers} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Store Selector for SWOT and AI Insights */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Select Store for SWOT and AI Insights</h2>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {outletData.map(outlet => (
            <option key={outlet.name} value={outlet.name}>{outlet.name}</option>
          ))}
        </select>
      </div>

      {/* SWOT Analysis */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">SWOT Analysis for {selectedStore}</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(swotData).map(([key, values]) => (
            <div key={key} className="border p-4 rounded">
              <h3 className="font-bold capitalize">{key}</h3>
              <ul className="list-disc pl-5">
                {values.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">AI Insights for {selectedStore}</h2>
        <ul className="list-disc pl-5">
          {aiInsights.map((insight, index) => (
            <li key={index} className="mb-2">{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
