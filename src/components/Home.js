import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import HeatMap from '@uiw/react-heat-map';

const sampleData = [
  {
    TransactionID: 'T0001',
    Date: '2023-01-01',
    StoreID: 'S001',
    SKU_ID: 'P001',
    QuantitySold: 5,
    UnitPrice: 50,
    Revenue: 250,
    PromotionID: 'PR001',
    PromotionType: 'Discount',
    FootTrafficCount: 250,
    CurrentStockLevel: 15,
    RestockDate: '2023-01-06',
    LastRestockDate: '2022-12-30',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.85,
    RecommendedRestockQuantity: 50,
    RecommendedRestockDate: '2023-01-04',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0002',
    Date: '2023-01-01',
    StoreID: 'S002',
    SKU_ID: 'P002',
    QuantitySold: 3,
    UnitPrice: 70,
    Revenue: 210,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 220,
    CurrentStockLevel: 10,
    RestockDate: '2023-01-07',
    LastRestockDate: '2022-12-29',
    StockoutDays: 0,
    SupplierID: 'SUP002',
    SupplierName: 'Supplier B',
    LeadTime: '7 days',
    StockoutRiskScore: 0.25,
    RecommendedRestockQuantity: 15,
    RecommendedRestockDate: '2023-01-07',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0003',
    Date: '2023-01-01',
    StoreID: 'S003',
    SKU_ID: 'P003',
    QuantitySold: 2,
    UnitPrice: 30,
    Revenue: 60,
    PromotionID: 'PR002',
    PromotionType: 'Bundle',
    FootTrafficCount: 180,
    CurrentStockLevel: 14,
    RestockDate: '2023-01-05',
    LastRestockDate: '2022-12-28',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.58,
    RecommendedRestockQuantity: 30,
    RecommendedRestockDate: '2023-01-05',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0004',
    Date: '2023-01-01',
    StoreID: 'S004',
    SKU_ID: 'P004',
    QuantitySold: 4,
    UnitPrice: 40,
    Revenue: 160,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 300,
    CurrentStockLevel: 22,
    RestockDate: '2023-01-08',
    LastRestockDate: '2022-12-27',
    StockoutDays: 0,
    SupplierID: 'SUP003',
    SupplierName: 'Supplier C',
    LeadTime: '6 days',
    StockoutRiskScore: 0.22,
    RecommendedRestockQuantity: 14,
    RecommendedRestockDate: '2023-01-08',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0005',
    Date: '2023-01-01',
    StoreID: 'S005',
    SKU_ID: 'P005',
    QuantitySold: 6,
    UnitPrice: 35,
    Revenue: 210,
    PromotionID: 'PR003',
    PromotionType: 'Buy One Get One',
    FootTrafficCount: 200,
    CurrentStockLevel: 7,
    RestockDate: '2023-01-09',
    LastRestockDate: '2022-12-26',
    StockoutDays: 0,
    SupplierID: 'SUP004',
    SupplierName: 'Supplier D',
    LeadTime: '4 days',
    StockoutRiskScore: 0.78,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-09',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0006',
    Date: '2023-01-01',
    StoreID: 'S006',
    SKU_ID: 'P006',
    QuantitySold: 1,
    UnitPrice: 80,
    Revenue: 80,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 260,
    CurrentStockLevel: 13,
    RestockDate: '2023-01-10',
    LastRestockDate: '2022-12-25',
    StockoutDays: 0,
    SupplierID: 'SUP005',
    SupplierName: 'Supplier E',
    LeadTime: '8 days',
    StockoutRiskScore: 0.48,
    RecommendedRestockQuantity: 22,
    RecommendedRestockDate: '2023-01-10',
    ClusterID: 'C4',
    PerformanceIssue: 'Ineffective Marketing',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0007',
    Date: '2023-01-01',
    StoreID: 'S007',
    SKU_ID: 'P007',
    QuantitySold: 7,
    UnitPrice: 25,
    Revenue: 175,
    PromotionID: 'PR004',
    PromotionType: 'Clearance',
    FootTrafficCount: 240,
    CurrentStockLevel: 18,
    RestockDate: '2023-01-11',
    LastRestockDate: '2022-12-24',
    StockoutDays: 0,
    SupplierID: 'SUP006',
    SupplierName: 'Supplier F',
    LeadTime: '5 days',
    StockoutRiskScore: 0.88,
    RecommendedRestockQuantity: 58,
    RecommendedRestockDate: '2023-01-11',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 1,
    AnomalyType: 'Spike',
  },
  {
    TransactionID: 'T0008',
    Date: '2023-01-02',
    StoreID: 'S001',
    SKU_ID: 'P008',
    QuantitySold: 2,
    UnitPrice: 90,
    Revenue: 180,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 270,
    CurrentStockLevel: 6,
    RestockDate: '2023-01-12',
    LastRestockDate: '2022-12-23',
    StockoutDays: 1,
    SupplierID: 'SUP007',
    SupplierName: 'Supplier G',
    LeadTime: '6 days',
    StockoutRiskScore: 0.35,
    RecommendedRestockQuantity: 17,
    RecommendedRestockDate: '2023-01-12',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0009',
    Date: '2023-01-02',
    StoreID: 'S002',
    SKU_ID: 'P009',
    QuantitySold: 3,
    UnitPrice: 60,
    Revenue: 180,
    PromotionID: 'PR005',
    PromotionType: 'Flash Sale',
    FootTrafficCount: 210,
    CurrentStockLevel: 13,
    RestockDate: '2023-01-13',
    LastRestockDate: '2022-12-22',
    StockoutDays: 0,
    SupplierID: 'SUP008',
    SupplierName: 'Supplier H',
    LeadTime: '7 days',
    StockoutRiskScore: 0.60,
    RecommendedRestockQuantity: 32,
    RecommendedRestockDate: '2023-01-13',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0010',
    Date: '2023-01-02',
    StoreID: 'S003',
    SKU_ID: 'P010',
    QuantitySold: 5,
    UnitPrice: 55,
    Revenue: 275,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 190,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-14',
    LastRestockDate: '2022-12-21',
    StockoutDays: 2,
    SupplierID: 'SUP009',
    SupplierName: 'Supplier I',
    LeadTime: '5 days',
    StockoutRiskScore: 0.38,
    RecommendedRestockQuantity: 20,
    RecommendedRestockDate: '2023-01-14',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0011',
    Date: '2023-01-02',
    StoreID: 'S004',
    SKU_ID: 'P001',
    QuantitySold: 4,
    UnitPrice: 50,
    Revenue: 200,
    PromotionID: 'PR001',
    PromotionType: 'Discount',
    FootTrafficCount: 310,
    CurrentStockLevel: 20,
    RestockDate: '2023-01-06',
    LastRestockDate: '2022-12-30',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.75,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-04',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0012',
    Date: '2023-01-02',
    StoreID: 'S005',
    SKU_ID: 'P002',
    QuantitySold: 6,
    UnitPrice: 70,
    Revenue: 420,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 210,
    CurrentStockLevel: 9,
    RestockDate: '2023-01-07',
    LastRestockDate: '2022-12-29',
    StockoutDays: 0,
    SupplierID: 'SUP002',
    SupplierName: 'Supplier B',
    LeadTime: '7 days',
    StockoutRiskScore: 0.28,
    RecommendedRestockQuantity: 18,
    RecommendedRestockDate: '2023-01-07',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0013',
    Date: '2023-01-02',
    StoreID: 'S006',
    SKU_ID: 'P003',
    QuantitySold: 1,
    UnitPrice: 30,
    Revenue: 30,
    PromotionID: 'PR002',
    PromotionType: 'Bundle',
    FootTrafficCount: 270,
    CurrentStockLevel: 15,
    RestockDate: '2023-01-05',
    LastRestockDate: '2022-12-28',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.58,
    RecommendedRestockQuantity: 30,
    RecommendedRestockDate: '2023-01-05',
    ClusterID: 'C4',
    PerformanceIssue: 'Ineffective Marketing',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0014',
    Date: '2023-01-02',
    StoreID: 'S007',
    SKU_ID: 'P004',
    QuantitySold: 7,
    UnitPrice: 40,
    Revenue: 280,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 250,
    CurrentStockLevel: 20,
    RestockDate: '2023-01-08',
    LastRestockDate: '2022-12-27',
    StockoutDays: 0,
    SupplierID: 'SUP003',
    SupplierName: 'Supplier C',
    LeadTime: '6 days',
    StockoutRiskScore: 0.22,
    RecommendedRestockQuantity: 14,
    RecommendedRestockDate: '2023-01-08',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0015',
    Date: '2023-01-03',
    StoreID: 'S001',
    SKU_ID: 'P005',
    QuantitySold: 2,
    UnitPrice: 35,
    Revenue: 70,
    PromotionID: 'PR003',
    PromotionType: 'Buy One Get One',
    FootTrafficCount: 260,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-09',
    LastRestockDate: '2022-12-26',
    StockoutDays: 0,
    SupplierID: 'SUP004',
    SupplierName: 'Supplier D',
    LeadTime: '4 days',
    StockoutRiskScore: 0.78,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-09',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 1,
    AnomalyType: 'Dip',
  },
  {
    TransactionID: 'T0016',
    Date: '2023-01-03',
    StoreID: 'S002',
    SKU_ID: 'P006',
    QuantitySold: 3,
    UnitPrice: 80,
    Revenue: 240,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 230,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-10',
    LastRestockDate: '2022-12-25',
    StockoutDays: 1,
    SupplierID: 'SUP005',
    SupplierName: 'Supplier E',
    LeadTime: '8 days',
    StockoutRiskScore: 0.45,
    RecommendedRestockQuantity: 20,
    RecommendedRestockDate: '2023-01-10',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0017',
    Date: '2023-01-03',
    StoreID: 'S003',
    SKU_ID: 'P007',
    QuantitySold: 5,
    UnitPrice: 25,
    Revenue: 125,
    PromotionID: 'PR004',
    PromotionType: 'Clearance',
    FootTrafficCount: 200,
    CurrentStockLevel: 16,
    RestockDate: '2023-01-11',
    LastRestockDate: '2022-12-24',
    StockoutDays: 0,
    SupplierID: 'SUP006',
    SupplierName: 'Supplier F',
    LeadTime: '5 days',
    StockoutRiskScore: 0.88,
    RecommendedRestockQuantity: 58,
    RecommendedRestockDate: '2023-01-11',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0018',
    Date: '2023-01-03',
    StoreID: 'S004',
    SKU_ID: 'P008',
    QuantitySold: 4,
    UnitPrice: 90,
    Revenue: 360,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 320,
    CurrentStockLevel: 12,
    RestockDate: '2023-01-12',
    LastRestockDate: '2022-12-23',
    StockoutDays: 0,
    SupplierID: 'SUP007',
    SupplierName: 'Supplier G',
    LeadTime: '6 days',
    StockoutRiskScore: 0.33,
    RecommendedRestockQuantity: 17,
    RecommendedRestockDate: '2023-01-12',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 1,
    AnomalyType: 'Spike',
  },
  {
    TransactionID: 'T0019',
    Date: '2023-01-03',
    StoreID: 'S005',
    SKU_ID: 'P009',
    QuantitySold: 6,
    UnitPrice: 60,
    Revenue: 360,
    PromotionID: 'PR005',
    PromotionType: 'Flash Sale',
    FootTrafficCount: 220,
    CurrentStockLevel: 12,
    RestockDate: '2023-01-13',
    LastRestockDate: '2022-12-22',
    StockoutDays: 0,
    SupplierID: 'SUP008',
    SupplierName: 'Supplier H',
    LeadTime: '7 days',
    StockoutRiskScore: 0.63,
    RecommendedRestockQuantity: 31,
    RecommendedRestockDate: '2023-01-13',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0020',
    Date: '2023-01-03',
    StoreID: 'S006',
    SKU_ID: 'P010',
    QuantitySold: 1,
    UnitPrice: 55,
    Revenue: 55,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 280,
    CurrentStockLevel: 7,
    RestockDate: '2023-01-14',
    LastRestockDate: '2022-12-21',
    StockoutDays: 1,
    SupplierID: 'SUP009',
    SupplierName: 'Supplier I',
    LeadTime: '5 days',
    StockoutRiskScore: 0.38,
    RecommendedRestockQuantity: 20,
    RecommendedRestockDate: '2023-01-14',
    ClusterID: 'C4',
    PerformanceIssue: 'Ineffective Marketing',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0021',
    Date: '2023-01-04',
    StoreID: 'S001',
    SKU_ID: 'P001',
    QuantitySold: 7,
    UnitPrice: 50,
    Revenue: 350,
    PromotionID: 'PR001',
    PromotionType: 'Discount',
    FootTrafficCount: 280,
    CurrentStockLevel: 15,
    RestockDate: '2023-01-06',
    LastRestockDate: '2022-12-30',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.85,
    RecommendedRestockQuantity: 50,
    RecommendedRestockDate: '2023-01-04',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 1,
    AnomalyType: 'Spike',
  },
  {
    TransactionID: 'T0022',
    Date: '2023-01-04',
    StoreID: 'S002',
    SKU_ID: 'P002',
    QuantitySold: 2,
    UnitPrice: 70,
    Revenue: 140,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 240,
    CurrentStockLevel: 10,
    RestockDate: '2023-01-07',
    LastRestockDate: '2022-12-29',
    StockoutDays: 0,
    SupplierID: 'SUP002',
    SupplierName: 'Supplier B',
    LeadTime: '7 days',
    StockoutRiskScore: 0.25,
    RecommendedRestockQuantity: 15,
    RecommendedRestockDate: '2023-01-07',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 1,
    AnomalyType: 'Spike',
  },
  {
    TransactionID: 'T0023',
    Date: '2023-01-04',
    StoreID: 'S003',
    SKU_ID: 'P003',
    QuantitySold: 3,
    UnitPrice: 30,
    Revenue: 90,
    PromotionID: 'PR002',
    PromotionType: 'Bundle',
    FootTrafficCount: 210,
    CurrentStockLevel: 14,
    RestockDate: '2023-01-05',
    LastRestockDate: '2022-12-28',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.58,
    RecommendedRestockQuantity: 30,
    RecommendedRestockDate: '2023-01-05',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0024',
    Date: '2023-01-04',
    StoreID: 'S004',
    SKU_ID: 'P004',
    QuantitySold: 5,
    UnitPrice: 40,
    Revenue: 200,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 330,
    CurrentStockLevel: 22,
    RestockDate: '2023-01-08',
    LastRestockDate: '2022-12-27',
    StockoutDays: 0,
    SupplierID: 'SUP003',
    SupplierName: 'Supplier C',
    LeadTime: '6 days',
    StockoutRiskScore: 0.22,
    RecommendedRestockQuantity: 14,
    RecommendedRestockDate: '2023-01-08',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0025',
    Date: '2023-01-04',
    StoreID: 'S005',
    SKU_ID: 'P005',
    QuantitySold: 4,
    UnitPrice: 35,
    Revenue: 140,
    PromotionID: 'PR003',
    PromotionType: 'Buy One Get One',
    FootTrafficCount: 230,
    CurrentStockLevel: 7,
    RestockDate: '2023-01-09',
    LastRestockDate: '2022-12-26',
    StockoutDays: 0,
    SupplierID: 'SUP004',
    SupplierName: 'Supplier D',
    LeadTime: '4 days',
    StockoutRiskScore: 0.78,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-09',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0026',
    Date: '2023-01-04',
    StoreID: 'S006',
    SKU_ID: 'P006',
    QuantitySold: 2,
    UnitPrice: 80,
    Revenue: 160,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 290,
    CurrentStockLevel: 13,
    RestockDate: '2023-01-10',
    LastRestockDate: '2022-12-25',
    StockoutDays: 0,
    SupplierID: 'SUP005',
    SupplierName: 'Supplier E',
    LeadTime: '8 days',
    StockoutRiskScore: 0.48,
    RecommendedRestockQuantity: 22,
    RecommendedRestockDate: '2023-01-10',
    ClusterID: 'C4',
    PerformanceIssue: 'Ineffective Marketing',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0027',
    Date: '2023-01-04',
    StoreID: 'S007',
    SKU_ID: 'P007',
    QuantitySold: 6,
    UnitPrice: 25,
    Revenue: 150,
    PromotionID: 'PR004',
    PromotionType: 'Clearance',
    FootTrafficCount: 270,
    CurrentStockLevel: 18,
    RestockDate: '2023-01-11',
    LastRestockDate: '2022-12-24',
    StockoutDays: 0,
    SupplierID: 'SUP006',
    SupplierName: 'Supplier F',
    LeadTime: '5 days',
    StockoutRiskScore: 0.88,
    RecommendedRestockQuantity: 58,
    RecommendedRestockDate: '2023-01-11',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0028',
    Date: '2023-01-05',
    StoreID: 'S001',
    SKU_ID: 'P008',
    QuantitySold: 3,
    UnitPrice: 90,
    Revenue: 270,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 300,
    CurrentStockLevel: 6,
    RestockDate: '2023-01-12',
    LastRestockDate: '2022-12-23',
    StockoutDays: 1,
    SupplierID: 'SUP007',
    SupplierName: 'Supplier G',
    LeadTime: '6 days',
    StockoutRiskScore: 0.35,
    RecommendedRestockQuantity: 17,
    RecommendedRestockDate: '2023-01-12',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0029',
    Date: '2023-01-05',
    StoreID: 'S002',
    SKU_ID: 'P009',
    QuantitySold: 4,
    UnitPrice: 60,
    Revenue: 240,
    PromotionID: 'PR005',
    PromotionType: 'Flash Sale',
    FootTrafficCount: 250,
    CurrentStockLevel: 13,
    RestockDate: '2023-01-13',
    LastRestockDate: '2022-12-22',
    StockoutDays: 0,
    SupplierID: 'SUP008',
    SupplierName: 'Supplier H',
    LeadTime: '7 days',
    StockoutRiskScore: 0.60,
    RecommendedRestockQuantity: 32,
    RecommendedRestockDate: '2023-01-13',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 1,
    AnomalyType: 'Dip',
  },
  {
    TransactionID: 'T0030',
    Date: '2023-01-05',
    StoreID: 'S003',
    SKU_ID: 'P010',
    QuantitySold: 2,
    UnitPrice: 55,
    Revenue: 110,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 220,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-14',
    LastRestockDate: '2022-12-21',
    StockoutDays: 2,
    SupplierID: 'SUP009',
    SupplierName: 'Supplier I',
    LeadTime: '5 days',
    StockoutRiskScore: 0.38,
    RecommendedRestockQuantity: 20,
    RecommendedRestockDate: '2023-01-14',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 1,
    AnomalyType: 'Dip',
  },
  {
    TransactionID: 'T0031',
    Date: '2023-01-05',
    StoreID: 'S004',
    SKU_ID: 'P001',
    QuantitySold: 5,
    UnitPrice: 50,
    Revenue: 250,
    PromotionID: 'PR001',
    PromotionType: 'Discount',
    FootTrafficCount: 340,
    CurrentStockLevel: 20,
    RestockDate: '2023-01-06',
    LastRestockDate: '2022-12-30',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.75,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-04',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0032',
    Date: '2023-01-05',
    StoreID: 'S005',
    SKU_ID: 'P002',
    QuantitySold: 7,
    UnitPrice: 70,
    Revenue: 490,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 240,
    CurrentStockLevel: 9,
    RestockDate: '2023-01-07',
    LastRestockDate: '2022-12-29',
    StockoutDays: 0,
    SupplierID: 'SUP002',
    SupplierName: 'Supplier B',
    LeadTime: '7 days',
    StockoutRiskScore: 0.28,
    RecommendedRestockQuantity: 18,
    RecommendedRestockDate: '2023-01-07',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0033',
    Date: '2023-01-05',
    StoreID: 'S006',
    SKU_ID: 'P003',
    QuantitySold: 2,
    UnitPrice: 30,
    Revenue: 60,
    PromotionID: 'PR002',
    PromotionType: 'Bundle',
    FootTrafficCount: 300,
    CurrentStockLevel: 15,
    RestockDate: '2023-01-05',
    LastRestockDate: '2022-12-28',
    StockoutDays: 0,
    SupplierID: 'SUP001',
    SupplierName: 'Supplier A',
    LeadTime: '5 days',
    StockoutRiskScore: 0.58,
    RecommendedRestockQuantity: 30,
    RecommendedRestockDate: '2023-01-05',
    ClusterID: 'C4',
    PerformanceIssue: 'Ineffective Marketing',
    AnomalyFlag: 1,
    AnomalyType: 'Dip',
  },
  {
    TransactionID: 'T0034',
    Date: '2023-01-05',
    StoreID: 'S007',
    SKU_ID: 'P004',
    QuantitySold: 8,
    UnitPrice: 40,
    Revenue: 320,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 280,
    CurrentStockLevel: 20,
    RestockDate: '2023-01-08',
    LastRestockDate: '2022-12-27',
    StockoutDays: 0,
    SupplierID: 'SUP003',
    SupplierName: 'Supplier C',
    LeadTime: '6 days',
    StockoutRiskScore: 0.22,
    RecommendedRestockQuantity: 14,
    RecommendedRestockDate: '2023-01-08',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0035',
    Date: '2023-01-06',
    StoreID: 'S001',
    SKU_ID: 'P005',
    QuantitySold: 3,
    UnitPrice: 35,
    Revenue: 105,
    PromotionID: 'PR003',
    PromotionType: 'Buy One Get One',
    FootTrafficCount: 310,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-09',
    LastRestockDate: '2022-12-26',
    StockoutDays: 0,
    SupplierID: 'SUP004',
    SupplierName: 'Supplier D',
    LeadTime: '4 days',
    StockoutRiskScore: 0.78,
    RecommendedRestockQuantity: 45,
    RecommendedRestockDate: '2023-01-09',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0036',
    Date: '2023-01-06',
    StoreID: 'S002',
    SKU_ID: 'P006',
    QuantitySold: 4,
    UnitPrice: 80,
    Revenue: 320,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 260,
    CurrentStockLevel: 5,
    RestockDate: '2023-01-10',
    LastRestockDate: '2022-12-25',
    StockoutDays: 1,
    SupplierID: 'SUP005',
    SupplierName: 'Supplier E',
    LeadTime: '8 days',
    StockoutRiskScore: 0.45,
    RecommendedRestockQuantity: 20,
    RecommendedRestockDate: '2023-01-10',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0037',
    Date: '2023-01-06',
    StoreID: 'S003',
    SKU_ID: 'P007',
    QuantitySold: 2,
    UnitPrice: 25,
    Revenue: 50,
    PromotionID: 'PR004',
    PromotionType: 'Clearance',
    FootTrafficCount: 230,
    CurrentStockLevel: 16,
    RestockDate: '2023-01-11',
    LastRestockDate: '2022-12-24',
    StockoutDays: 0,
    SupplierID: 'SUP006',
    SupplierName: 'Supplier F',
    LeadTime: '5 days',
    StockoutRiskScore: 0.88,
    RecommendedRestockQuantity: 58,
    RecommendedRestockDate: '2023-01-11',
    ClusterID: 'C1',
    PerformanceIssue: 'Low Conversion Rate',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0038',
    Date: '2023-01-06',
    StoreID: 'S004',
    SKU_ID: 'P008',
    QuantitySold: 5,
    UnitPrice: 90,
    Revenue: 450,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 350,
    CurrentStockLevel: 12,
    RestockDate: '2023-01-12',
    LastRestockDate: '2022-12-23',
    StockoutDays: 0,
    SupplierID: 'SUP007',
    SupplierName: 'Supplier G',
    LeadTime: '6 days',
    StockoutRiskScore: 0.33,
    RecommendedRestockQuantity: 17,
    RecommendedRestockDate: '2023-01-12',
    ClusterID: 'C3',
    PerformanceIssue: 'High Stockouts',
    AnomalyFlag: 1,
    AnomalyType: 'Spike',
  },
  {
    TransactionID: 'T0039',
    Date: '2023-01-06',
    StoreID: 'S005',
    SKU_ID: 'P009',
    QuantitySold: 5,
    UnitPrice: 60,
    Revenue: 300,
    PromotionID: 'PR005',
    PromotionType: 'Flash Sale',
    FootTrafficCount: 250,
    CurrentStockLevel: 12,
    RestockDate: '2023-01-13',
    LastRestockDate: '2022-12-22',
    StockoutDays: 0,
    SupplierID: 'SUP008',
    SupplierName: 'Supplier H',
    LeadTime: '7 days',
    StockoutRiskScore: 0.63,
    RecommendedRestockQuantity: 31,
    RecommendedRestockDate: '2023-01-13',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  },
  {
    TransactionID: 'T0040',
    Date: '2023-01-06',
    StoreID: 'S006',
    SKU_ID: 'P010',
    QuantitySold: 2,
    UnitPrice: 55,
    Revenue: 110,
    PromotionID: '',
    PromotionType: '',
    FootTrafficCount: 310,
    CurrentStockLevel: 7,
    RestockDate: '2023-01-14',
    LastRestockDate: '2022-12-21',
    StockoutDays: 1,
    SupplierID: 'SUP009',
    SupplierName: 'Supplier H',
    LeadTime: '7 days',
    StockoutRiskScore: 0.63,
    RecommendedRestockQuantity: 31,
    RecommendedRestockDate: '2023-01-13',
    ClusterID: 'C2',
    PerformanceIssue: 'Inventory Mismanagement',
    AnomalyFlag: 0,
    AnomalyType: '',
  }
]

const WalkarooDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // State for the current slide
  const [currentGraph, setCurrentGraph] = useState('stockoutRisk');
  const renderGraph = () => {
    switch (currentGraph) {
      case 'stockoutRisk':
        return renderStockoutRiskBarChart();
      case 'clusterAnalysis':
        return renderClusterAnalysis();
      case 'salesAnomaly':
        return renderSalesAnomalyDetection();
      case 'salesTrend':
        return renderSalesTrend();
      case 'productPerformance':
        return renderProductPerformance();
      case 'promotionEffectiveness':
        return renderPromotionEffectiveness();
      case 'inventoryTurnover':
        return renderInventoryTurnover();
      default:
        return renderStockoutRiskBarChart();
    }
  };

  useEffect(() => {
    // Fetch data here
    // For now, we'll use sampleData
    setData(sampleData);
  }, []);

  // Data processing functions
  // 1. Process Stockout Risk Data for Bar Chart
  const processStockoutRiskData = () => {
    // Group by SKU_ID and calculate average risk
    const groupedData = data.reduce((acc, item) => {
      const skuId = item.SKU_ID;
      if (!acc[skuId]) {
        acc[skuId] = { skuId, averageRisk: 0, count: 0 };
      }
      acc[skuId].averageRisk += item.StockoutRiskScore;
      acc[skuId].count += 1;
      return acc;
    }, {});
    return Object.values(groupedData).map(item => ({
      skuId: item.skuId,
      averageRisk: item.averageRisk / item.count,
    }));
  };

  // 2. Process Cluster Data
  const processClusterData = () => {
  // Group the data by store and summarize the necessary fields
  const groupedData = data.reduce((acc, item) => {
    const storeId = item.StoreID;
    if (!acc[storeId]) {
      acc[storeId] = {
        storeId: storeId,
        totalFootTraffic: 0,
        totalRevenue: 0,
        totalQuantitySold: 0,
        cluster: item.ClusterID,
      };
    }
    acc[storeId].totalFootTraffic += item.FootTrafficCount;
    acc[storeId].totalRevenue += item.Revenue;
    acc[storeId].totalQuantitySold += item.QuantitySold;
    return acc;
  }, {});

  // Convert the object to an array and sort by totalFootTraffic (x-axis)
  return Object.values(groupedData)
    .map(store => ({
      x: store.totalFootTraffic,
      y: store.totalRevenue,
      z: store.totalQuantitySold,
      cluster: store.cluster,
      storeId: store.storeId,
    }))
    .sort((a, b) => a.x - b.x); // Sort by x (totalFootTraffic) in ascending order
};


  // 3. Process Sales Anomaly Data
    // Updated data processing function
  const processSalesAnomalyData = () => {
  // Get a list of unique dates and sort them
    const dates = [...new Set(data.map(item => item.Date))].sort();

  // Get a list of unique stores
    const stores = [...new Set(data.map(item => item.StoreID))];

  // Initialize the data array
    const processedData = dates.map(date => {
      const dataForDate = { Date: date };
      stores.forEach(store => {
      // Get the total revenue for the store on this date
        const revenue = data
          .filter(item => item.Date === date && item.StoreID === store)
          .reduce((sum, item) => sum + item.Revenue, 0);
        dataForDate[store] = revenue || 0; // Set to 0 if no revenue
      });
      return dataForDate;
  });

  return processedData;
};

  
  // 4. Process Sales Trend Data
  const processSalesTrendData = () => {
    // Group by Date and summarize revenue and quantitySold
    const groupedData = data.reduce((acc, item) => {
      const date = item.Date;
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, quantitySold: 0 };
      }
      acc[date].revenue += item.Revenue;
      acc[date].quantitySold += item.QuantitySold;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  // 5. Process Product Performance Data
  const processProductPerformanceData = () => {
    // Group by SKU_ID and summarize quantitySold and revenue
    const groupedData = data.reduce((acc, item) => {
      const skuId = item.SKU_ID;
      if (!acc[skuId]) {
        acc[skuId] = { skuId, quantitySold: 0, revenue: 0 };
      }
      acc[skuId].quantitySold += item.QuantitySold;
      acc[skuId].revenue += item.Revenue;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  // 6. Process Store Performance Data
  const processStorePerformanceData = () => {
    // Group by StoreID and summarize revenue, footTraffic, and transactions
    const groupedData = data.reduce((acc, item) => {
      const storeId = item.StoreID;
      if (!acc[storeId]) {
        acc[storeId] = { storeId, revenue: 0, footTraffic: 0, transactions: 0 };
      }
      acc[storeId].revenue += item.Revenue;
      acc[storeId].footTraffic += item.FootTrafficCount;
      acc[storeId].transactions += 1;
      return acc;
    }, {});
    return Object.values(groupedData).map(store => ({
      ...store,
      conversionRate: store.transactions / store.footTraffic,
    }));
  };

  // 7. Process Promotion Effectiveness Data
  const processPromotionEffectivenessData = () => {
    // Group by PromotionID and summarize revenue and salesLift
    const totalRevenue = data.reduce((sum, item) => sum + item.Revenue, 0);
    const averageDailyRevenue = totalRevenue / data.length;
    const groupedData = data.reduce((acc, item) => {
      if (!item.PromotionID) return acc;
      const promotionId = item.PromotionID;
      if (!acc[promotionId]) {
        acc[promotionId] = { promotionId, revenue: 0, salesLift: 0 };
      }
      acc[promotionId].revenue += item.Revenue;
      acc[promotionId].salesLift += item.Revenue - averageDailyRevenue;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  // 8. Process Inventory Turnover Data
  const processInventoryTurnoverData = () => {
    // Group by SKU_ID and calculate turnover rate
    const groupedData = data.reduce((acc, item) => {
      const skuId = item.SKU_ID;
      if (!acc[skuId]) {
        acc[skuId] = { skuId, totalSold: 0, totalStock: 0, daysCount: 0 };
      }
      acc[skuId].totalSold += item.QuantitySold;
      acc[skuId].totalStock += item.CurrentStockLevel;
      acc[skuId].daysCount += 1;
      return acc;
    }, {});
    return Object.values(groupedData).map(item => ({
      skuId: item.skuId,
      turnoverRate: item.totalSold / (item.totalStock / item.daysCount || 1),
    }));
  };

  // Filter data based on selection
  const filterData = selectedData => {
    if (!selectedFilter) return selectedData;
    return selectedData.filter(
      item =>
        item.promotionId === selectedFilter ||
        item.skuId === selectedFilter ||
        item.storeId === selectedFilter
    );
  };
  const InsightsContainer = styled.div`
  margin-top: -10px; /* Add space between graphs and this container */
  background-color: #ffffff; /* White background for contrast */
  padding: 10px; /* Padding for better readability */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
`;

const renderInsights = () => (
  <InsightsContainer>
    <h2 className="text-2xl font-bold mb-4" style={{ color: '#00003f' }}>Overall Insights & Suggestions</h2>
    <ul className="list-disc pl-5" style={{ fontSize: '1.2rem' }}>
      <li>Optimize Stock for High-Traffic Stores: Cluster C1 (S001, S003, S005) needs stock prioritization to capture sales opportunities.</li>
      <li>Prevent Stockouts Proactively: Monitor real-time inventory to avoid high stockout risks for products like P007.</li>
      <li>Improve Marketing for Low Conversions: Enhance marketing and product positioning for stores in Cluster C1 to boost conversion rates.</li>
      <li>Align Promotions with Inventory: Tailor promotions to match well-stocked products to reduce sales dips, like those linked to PR003.</li>
      <li>Adjust Pricing for High-Volume Products: Raise prices slightly for high-selling, low-revenue products like P007 to improve profit margins.</li>
      <li>Target Store-Specific Issues: Cluster C3 (S002, S004, S006) needs stock improvement to address stockout challenges and boost sales.</li>
      <li>Revise Underperforming Promotions: Consider adjusting or replacing promotions like PR003 for better sales impact.</li>
     </ul>
  </InsightsContainer>
);

  
  // Render functions for each visualization
  // 1. Render Stockout Risk Bar Chart
  const renderStockoutRiskBarChart = () => {
    const stockoutRiskData = processStockoutRiskData();
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">
          Predictive Stockout Risk Model
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filterData(stockoutRiskData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skuId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageRisk" fill="#8884d8">
              {stockoutRiskData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgb(255, ${255 -
                    Math.floor(entry.averageRisk * 255)}, 0)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3srem' }}>
            <li>
              <span className="font-bold">SKU P007</span> has the highest stockout risk score of <span className="font-bold">0.88</span>, indicating an urgent need for restocking.
            </li>
            <li>
              <span className="font-bold">SKUs P001</span> and <span className="font-bold">P005</span> also have high risk scores of <span className="font-bold">0.85</span> and <span className="font-bold">0.78</span>, requiring immediate attention.
            </li>
            <li>
              <span className="font-bold">SKU P004</span> has the lowest risk score of <span className="font-bold">0.22</span>, suggesting stock levels are adequate.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  
  const renderClusterAnalysis= () => (
  <div className="dashboard-card">
    <h2 className="text-xl font-bold mb-4">
      Root Cause Analysis via AI-Driven Clustering
    </h2>
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        onClick={handleGraphClick}
      >
        <CartesianGrid />
        <XAxis dataKey="x" name="Foot Traffic" />
        <YAxis dataKey="y" name="Revenue" />
        <ZAxis dataKey="z" range={[64, 144]} name="Quantity Sold" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        
        {/* Explicit Legend configuration */}
        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          payload={[
            { value: 'Cluster C1', type: 'circle', id: 'ID01', color: '#8884d8' },
            { value: 'Cluster C2', type: 'circle', id: 'ID02', color: '#82ca9d' },
            { value: 'Cluster C3', type: 'circle', id: 'ID03', color: '#ffc658' },
            { value: 'Cluster C4', type: 'circle', id: 'ID04', color: '#ff7300' },
          ]}
        />

        <Scatter
          name="Stores"
          data={filterData(processClusterData())} // Sorted data
          fill="#8884d8"
        >
          {processClusterData().map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.cluster === 'C1'
                  ? '#8884d8'
                  : entry.cluster === 'C2'
                  ? '#82ca9d'
                  : entry.cluster === 'C3'
                  ? '#ffc658'
                  : '#ff7300'
              }
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
    <div className="mt-4">
      <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
      <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
        <li>
          <span className="font-bold">Cluster C1</span> stores have high foot traffic but low revenue, indicating potential issues with conversion rates.
        </li>
        <li>
          <span className="font-bold">Cluster C2</span> stores show signs of inventory mismanagement, affecting sales despite steady foot traffic.
        </li>
        <li>
          <span className="font-bold">Cluster C3</span> stores are experiencing high stockouts, leading to lost sales opportunities.
        </li>
        <li>
          <span className="font-bold">Cluster C4</span> store suffers from ineffective marketing, resulting in lower foot traffic and revenue.
        </li>
      </ul>
    </div>
  </div>
);
  const renderSalesTrend = () => {
    const salesTrendData = processSalesTrendData();
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">Sales Trend Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filterData(salesTrendData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="quantitySold"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
            <li>
              Sales peaked on <span className="font-bold">2023-01-06</span>, indicating a potential end-of-week surge.
            </li>
            <li>
              There is a consistent upward trend in both revenue and quantity sold over the week.
            </li>
            <li>
              The alignment of revenue and quantity sold suggests stable pricing without significant discounts.
            </li>
            
          </ul>
        </div>
      </div>
    );
  };

  const renderProductPerformance = () => {
    const productPerformanceData = processProductPerformanceData();
    // Get top 3 products by quantitySold and revenue
    const topByQuantity = [...productPerformanceData]
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 3)
      .map(item => item.skuId);
    const topByRevenue = [...productPerformanceData]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3)
      .map(item => item.skuId);
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">Product Performance Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filterData(productPerformanceData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skuId" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="quantitySold" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
            <li>
              <span className="font-bold">Top-selling products by quantity:</span> P004, P001, P007.
            </li>
            <li>
              <span className="font-bold">Highest revenue-generating products:</span> P002, P008, P009.
            </li>
            <li>
              <span className="font-bold">Product P007</span> sells well but at a lower price point; consider pricing strategies to improve margins.
            </li>
          </ul>
        </div>
      </div>
    );
  };
 
  
  

  const renderSalesAnomalyDetection = () => {
    const salesAnomalyData = processSalesAnomalyData();

    // Get a list of unique stores for generating lines
    const stores = [...new Set(data.map(item => item.StoreID))];

    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">
          Sales Performance Anomaly Detection
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filterData(salesAnomalyData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {stores.map((store, index) => (
              <Line
                key={store}
                type="monotone"
                dataKey={store}
                stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                activeDot={{ r: 8 }}
                name={`Store ${store}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
            <li>
              <span className="font-bold">Store S001</span> shows a sudden spike in sales on <span className="font-bold">2023-01-04</span>, possibly due to a successful promotion.
            </li>
            <li>
              <span className="font-bold">Store S005</span> experienced a dip in sales on <span className="font-bold">2023-01-04</span>, indicating potential supply issues.
            </li>
            <li>
              Consistent anomalies may point to systemic issues that need addressing.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  


  const renderPromotionEffectiveness = () => {
    const promotionEffectivenessData = processPromotionEffectivenessData();
    // Find the promotion with the highest salesLift
    const topPromotion = promotionEffectivenessData.reduce(
      (max, item) =>
        item.salesLift > (max.salesLift || 0) ? item : max,
      {}
    );
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">
          Promotion Effectiveness Tracking
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filterData(promotionEffectivenessData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="promotionId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
            <Bar dataKey="salesLift" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
            <li>
              <span className="font-bold">Promotion PR003</span> ("Buy One Get One") generated the negative sales lift, indicating strong customer .
            </li>
            <li>
              <span className="font-bold">Promotion PR005</span> ("Flash Sale") had moderate revenue but low sales lift, suggesting limited effectiveness.
            </li>
            <li>
              Consider reallocating marketing resources to more successful promotions like PR003.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderInventoryTurnover = () => {
    const inventoryTurnoverData = processInventoryTurnoverData();
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-bold mb-4">Inventory Turnover Rate</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filterData(inventoryTurnoverData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skuId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="turnoverRate" fill="#8884d8">
              {inventoryTurnoverData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.turnoverRate > 4 ? '#82ca9d' : '#ff7300'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-bold" style={{ fontSize: '1.5rem' }}>Insights:</h3>
          <ul className="list-disc pl-5" style={{ fontSize: '1.3rem' }}>
            <li>
              <span className="font-bold">SKU P005</span> has the highest turnover rate, indicating strong sales performance and efficient inventory use.
            </li>
            <li>
              <span className="font-bold">SKU P003</span> has the lowest turnover rate, suggesting overstocking or low demand.
            </li>
            <li>
              Adjust inventory levels for low-turnover products to reduce holding costs.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Function to handle click events on graph elements
  const handleGraphClick = data => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setSelectedFilter(
        clickedData.promotionId || clickedData.skuId || clickedData.storeId
      );
    }
  };
  // Function to clear filters
  const clearFilters = () => {
    setSelectedFilter(null);
  };
  

  // Array of render functions for the slides
  const slides = [
    renderStockoutRiskBarChart,
    renderClusterAnalysis,
    renderSalesAnomalyDetection,
    renderSalesTrend,
    renderProductPerformance,
    renderPromotionEffectiveness,
    renderInventoryTurnover,
  ];

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
  }
}

  // Functions to navigate between slides
  const goToPreviousSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Main component return
  // Main component return
  return (
  <div className="min-h-screen bg-light-blue-50" style={{ backgroundColor: '#F9FAFC', left: '1000px', display: 'flex', alignItems: 'center' }}>
    {/* Left Sidebar */}
    <div
  className="fixed top-0 left-0 h-full bg-dark-blue p-4 text-white"
  style={{ backgroundColor: '#00003f', left: '10px', width: '350px', height: '100vh', zIndex: 100, top: '0px' }} 
>
  <h2 className="text-xl font-bold mb-4" 
      style={{ 
        color: 'white', 
        textAlign: 'center',  // Center the header
        marginTop: '150px' ,
        fontSize: '2rem'    // Adjust this value to move the header further down
      }}
  >
    Graphs
  </h2>

  {/* Separate container for the list */}
  <div className="list-container" style={{ marginTop: '180px' }}> {/* You can adjust marginTop as needed */}
    <ul className="space-y-100">
      <li>
        <button
          onClick={() => setCurrentGraph('stockoutRisk')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'stockoutRisk' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Stockout Risk Model
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('clusterAnalysis')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'clusterAnalysis' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }}
        >
          Root Cause Analysis
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('salesAnomaly')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'salesAnomaly' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Sales Anomaly Detection
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('salesTrend')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'salesTrend' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Sales Trend Analysis
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('productPerformance')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'productPerformance' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Product Performance
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('promotionEffectiveness')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'promotionEffectiveness' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Promotion Effectiveness
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentGraph('inventoryTurnover')}
          className={`text-white hover:text-blue-300 ${currentGraph === 'inventoryTurnover' ? 'font-bold' : ''}`}
          style={{ fontSize: '1.5rem', marginBottom: '30px' }} 
        >
          Inventory Turnover
        </button>
      </li>
    </ul>
  </div>
</div>

    {/* Main Dashboard Content */}
    <div className="ml-[300px] p-8" style={{ paddingLeft: '320px', width: '80%' }}> {/* Updated the padding to reflect the new sidebar width */}
      <header className="mb-4 text-center" style={{ position: 'fixed', top: '0px', width: '110%', right: '-4rem', backgroundColor: '#00003f' }}>
	
	
        <h1 className="text-4xl font-bold" style={{ color: '#fffafa', textAlign: 'center', top: '100px' }}>
          Walkaroo Sales Dashboard
        </h1>
        <p className="text-gray-600" style={{ color: '#fffafa', fontSize: '1.5rem', textAlign: 'center', top: '10px' }}>
          Comprehensive sales and inventory analytics for data-driven decision making
        </p>
	<div className="image-container" style={{ position: 'absolute', top: '25px', right: '100px',backgroundColor: '#fff', padding: '5px', borderRadius: '10px' }}>
    	 <img 
	      src="/undefined.png" 
	      alt="Logo" 
	      style={{ height: '70px', width: '150px' }}
	    />
	
	 </div>
	<div className="image-container2" style={{ position: 'absolute', top: '25px', right: '400px',Zindex:100}}>
    	 <img 
	      src="/Walk.png" 
	      alt="Logo"
	      style={{ height: '70px', width: '150px' }}
	    />
	 </div><div className="image-container3" style={{ position: 'absolute', top: '30px', right: '280px',Zindex:100}}>
    	 <img 
	      src="/i3.png" 
	      alt="Logo"
	      style={{ height: '70px', width: '100px' }}
	    />
	 </div>
      </header>

      {/* Display Current Graph */}
      <div className="flex-grow flex justify-center items-center" style={{ height: 'calc(50vh)', paddingLeft: '20px', width: '90%' }}>
        <div className="w-full max-w-md">
          {renderGraph()}
        </div>
      </div>
	{renderInsights()}
    </div>
  </div>
);

};

export default WalkarooDashboard;
