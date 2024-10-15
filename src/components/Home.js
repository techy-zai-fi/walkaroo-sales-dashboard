import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './Dashboard.css';

// Mock data generation functions (expanded)
const generateSalesData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2024, 9, i + 1).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 10000) + 5000,
    forecast: Math.floor(Math.random() * 10000) + 5000,
    profit: Math.floor(Math.random() * 5000) + 2000,
  }));
};

const generateProductData = () => {
  const products = ['Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers'];
  return products.map(product => ({
    name: product,
    sales: Math.floor(Math.random() * 5000) + 1000,
    inventory: Math.floor(Math.random() * 1000) + 100,
    profit: Math.floor(Math.random() * 3000) + 500,
  }));
};

const generateOutletData = () => {
  return [
    { name: 'Thanjavur', revenue: 120000, performance: 0.8, customerSatisfaction: 4.2 },
    { name: 'Coimbatore', revenue: 100000, performance: 0.7, customerSatisfaction: 4.0 },
    { name: 'Chennai', revenue: 90000, performance: 0.75, customerSatisfaction: 4.1 },
    { name: 'Trichy', revenue: 80000, performance: 0.6, customerSatisfaction: 3.8 },
    { name: 'Madurai', revenue: 70000, performance: 0.65, customerSatisfaction: 3.9 },
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
  const swotData = {
    'Thanjavur': {
      strengths: [
        'Prime location in fashion district',
        'High foot traffic',
        'Diverse customer base',
      ],
      weaknesses: [
        'High operational costs',
        'Limited storage space',
        'Intense local competition',
      ],
      opportunities: [
        'Collaborate with local designers',
        'Expand luxury shoe line',
        'Implement virtual try-on technology',
      ],
      threats: [
        'Rising rent prices',
        'Online shopping trend',
        'Seasonal weather affecting foot traffic',
      ],
    },
    'Coimbatore': {
      strengths: [
        'Strong celebrity endorsements',
        'Trendsetting reputation',
        'Excellent social media presence',
      ],
      weaknesses: [
        'Dependency on seasonal trends',
        'High marketing expenses',
        'Inconsistent supply chain',
      ],
      opportunities: [
        'Expand into athleisure market',
        'Partner with local sports teams',
        'Develop eco-friendly shoe line',
      ],
      threats: [
        'Fast-changing fashion trends',
        'Increasing competition from online retailers',
        'Economic downturns affecting luxury purchases',
      ],
    },
    'Chennai': {
      strengths: [
        'Strong presence in business district',
        'Loyal customer base',
        'Efficient inventory management',
      ],
      weaknesses: [
        'Limited appeal to younger demographics',
        'Underperforming e-commerce platform',
        'Lack of innovative designs',
      ],
      opportunities: [
        'Expand work-from-home comfort shoe line',
        'Implement loyalty program',
        'Collaborate with local artists for unique designs',
      ],
      threats: [
        'Shift to casual work attire',
        'Increasing popularity of sneaker culture',
        'Harsh winters affecting in-store traffic',
      ],
    },
    'Trichy': {
      strengths: [
        'Strong partnerships with local businesses',
        'Diverse product range',
        'Excellent customer service',
      ],
      weaknesses: [
        'Limited brand recognition',
        'Inconsistent marketing strategy',
        'High employee turnover',
      ],
      opportunities: [
        'Expand into outdoor and work boot market',
        'Implement AR for virtual fittings',
        'Develop partnerships with local sports teams',
      ],
      threats: [
        'Increasing competition from big-box retailers',
        'Economic fluctuations in oil industry affecting sales',
        'Extreme weather events disrupting operations',
      ],
    },
    'Madurai': {
      strengths: [
        'Specialization in hot weather footwear',
        'Strong online presence',
        'Efficient distribution center',
      ],
      weaknesses: [
        'Limited winter shoe selection',
        'Dependency on tourism',
        'Lack of brand loyalty',
      ],
      opportunities: [
        'Expand into hiking and outdoor adventure shoes',
        'Develop sun-protective footwear line',
        'Partner with local resorts and spas',
      ],
      threats: [
        'Increasing competition from sports brands',
        'Seasonal fluctuations in sales',
        'Water scarcity affecting production',
      ],
    },
  };
  return swotData[storeName] || {};
};

const generateAIInsights = (storeName) => {
  const insights = {
    'Thanjavur': [
      'Customer data suggests a 25% increase in demand for designer collaborations. Consider expanding partnerships with local fashion houses.',
      'Analysis shows peak sales hours between 12 PM and 2 PM. Adjust staffing to maximize customer service during lunch rushes.',
      'Social media sentiment analysis indicates growing interest in sustainable materials. Explore eco-friendly shoe options to capture this trend.',
      'Foot traffic patterns show a 40% increase on weekends. Consider extending hours or hosting special events to capitalize on this trend.',
      'Data indicates a strong correlation between weather and boot sales. Implement a weather-based inventory management system to optimize stock levels.',
    ],
    'Coimbatore': [
      'Instagram engagement rates are 50% higher for posts featuring celebrity endorsements. Increase collaborations with local influencers and celebrities.',
      'Sales data shows a 30% uptick in athleisure shoe sales. Consider expanding this product line and featuring it prominently in-store and online.',
      'Customer feedback indicates a desire for more vegan shoe options. Develop a dedicated vegan line to capture this growing market segment.',
      'Heatmap analysis of store layout shows low engagement in the formal shoe section. Redesign this area to improve visibility and customer interaction.',
      'Online search trends show increasing interest in personalized shoes. Explore offering custom design options to tap into this market.',
    ],
    'Chennai': [
      'Sales data indicates a 35% increase in comfort shoe sales among 25-35 year olds. Target marketing efforts towards this demographic.',
      'Customer loyalty program analysis shows members spend 45% more annually. Enhance program benefits to increase enrollment and retention.',
      'Inventory turnover for business casual shoes is 20% lower than other categories. Reassess pricing strategy and marketing for this line.',
      'Website analytics show 60% of traffic comes from mobile devices. Prioritize mobile UX improvements to increase online conversions.',
      'Seasonal analysis indicates a sharp decline in sandal sales during winter. Implement dynamic pricing to clear inventory before the season ends.',
    ],
    'Trichy': [
      'Customer survey results show 70% interest in work boot customization. Develop a build-your-own boot program to capture this market.',
      'Geolocation data indicates customers travel an average of 5 miles to visit the store. Expand targeted advertising to a 10-mile radius.',
      'Sales data shows a 40% increase in children\'s shoe sales during back-to-school season. Increase inventory and marketing for this period.',
      'Employee turnover is highest among part-time staff. Implement a mentorship program and flexible scheduling to improve retention.',
      'Analysis of returns shows size inconsistency as the top reason. Invest in 3D foot scanning technology to improve fit accuracy.',
    ],
    'Madurai': [
      'Customer data shows a 50% increase in hiking shoe sales during spring. Expand outdoor footwear selection and promote aggressively during this season.',
      'Heat map analysis of the store shows low engagement with the winter boot display. Relocate this section to a more visible area to boost sales.',
      'Online reviews indicate high satisfaction with the store\'s water-resistant sandals. Expand this product line and feature it in summer marketing campaigns.',
      'Sales data shows a 30% increase in shoe protection product sales when bundled with purchases. Train staff to recommend these add-ons consistently.',
      'Social media engagement spikes with posts about local outdoor activities. Partner with local hiking groups and tour operators for cross-promotion.',
    ],
  };
  return insights[storeName] || [];
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('week');
  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [outletData, setOutletData] = useState([]);
  const [salesDrivers, setSalesDrivers] = useState([]);
  const [selectedStore, setSelectedStore] = useState('Thanjavur');
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="dashboard-container p-8 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
         <img src="/Walk.png" alt="Walk Logo" className="h-auto" style={{ width: '13%' }} />
          <h1 className="text-4xl font-bold text-center">Demo Dashboard</h1>
          <img src="/undefined.png" alt="Undefined Logo" className="h-auto" style={{ width: '13%' }} />
       </div>

      
      {/* Header and KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Sales", value: `$${totalSales.toLocaleString()}` },
          { title: "Average Order Value", value: `$${averageOrderValue.toFixed(2)}` },
          { title: "Top Selling Product", value: topSellingProduct },
          { title: "Best Performing Outlet", value: bestPerformingOutlet }
        ].map((item, index) => (
          <div key={index} className="glass-card p-6">
            <h3 className="kpi-title">{item.title}</h3>
            <div className="kpi-value">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="glass-card p-6">
        <h2 className="section-title">Select Date Range</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="select-store"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Sales Trends Over Time */}
      <div className="glass-card p-6">
        <h2 className="section-title">Sales Trends Over Time</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Actual Sales" />
              <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="profit" stroke="#ffc658" name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Popularity and Sales Volume */}
      <div className="glass-card p-6">
        <h2 className="section-title">Product Popularity and Sales Volume</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="inventory" fill="#82ca9d" name="Inventory" />
              <Bar dataKey="profit" fill="#ffc658" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outlet Performance Comparison */}
      <div className="glass-card p-6">
        <h2 className="section-title">Outlet Performance Comparison</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={outletData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 150000]} />
              <Radar name="Revenue" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Performance" dataKey="performance" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="Customer Satisfaction" dataKey="customerSatisfaction" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      

      {/* Store Selector for SWOT and AI Insights */}
      <div className="glass-card p-6">
        <h2 className="section-title">Select Store for SWOT and AI Insights</h2>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="select-store"
        >
          {outletData.map(outlet => (
            <option key={outlet.name} value={outlet.name}>{outlet.name}</option>
          ))}
        </select>
      </div>


{/* Sales Driver Identification */}
<div className="glass-card p-6">
        <h2 className="section-title">Sales Drivers (AI Insight)</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
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
      </div>

      {/* SWOT Analysis */}
      <div className="glass-card p-6">
        <h2 className="section-title">SWOT Analysis for {selectedStore}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(swotData).map(([key, values]) => (
            <div key={key} className="swot-card">
              <h3 className="swot-title">{key}</h3>
              <ul className="swot-list">
                {values.map((item, index) => (
                  <li key={index} className="swot-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6">
        <h2 className="section-title">AI Insights for {selectedStore}</h2>
        <ul className="space-y-4">
          {aiInsights.map((insight, index) => (
            <li key={index} className="ai-insight">{insight}</li>
          ))}
        </ul>
      </div>

      {/* Product Category Distribution */}
      <div className="glass-card p-6">
        <h2 className="section-title">Product Category Distribution</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productData}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Satisfaction by Outlet */}
      <div className="glass-card p-6">
        <h2 className="section-title">Customer Satisfaction by Outlet</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outletData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="customerSatisfaction" fill="#8884d8" name="Customer Satisfaction" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory vs Sales Comparison */}
      <div className="glass-card p-6">
        <h2 className="section-title">Inventory vs Sales Comparison</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="inventory" name="Inventory" />
              <YAxis type="number" dataKey="sales" name="Sales" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Products" data={productData} fill="#8884d8">
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;