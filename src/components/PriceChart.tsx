'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';

export interface PriceChartProps {
  tokenSymbol: string;
}

const PriceChart: FC<PriceChartProps> = ({ tokenSymbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [timeframe, setTimeframe] = useState('24h');
  
  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.6)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.6)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    
    // Add area series
    const areaSeries = chart.addSeries(AreaSeries, {
      topColor: 'rgba(38, 198, 218, 0.56)',
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 2,
    });
    
    // Generate mock price data based on token symbol
    const currentDate = new Date();
    const mockData = [];
    
    // Different price patterns based on token
    let basePrice = 0;
    let volatility = 0;
    
    switch (tokenSymbol) {
      case 'SOL':
        basePrice = 150;
        volatility = 5;
        break;
      case 'BWIRT':
        basePrice = 0.00002;
        volatility = 0.000005;
        break;
      case 'FANCE':
        basePrice = 0.03;
        volatility = 0.005;
        break;
      case 'JUP':
        basePrice = 1.2;
        volatility = 0.1;
        break;
      default:
        basePrice = 1;
        volatility = 0.2;
    }
    
    // Determine number of data points based on timeframe
    let dataPoints = 30;
    switch (timeframe) {
      case '1h':
        dataPoints = 60; // 1 minute intervals
        break;
      case '24h':
        dataPoints = 24; // 1 hour intervals
        break;
      case '7d':
        dataPoints = 7 * 24; // 1 hour intervals for 7 days
        break;
      case '30d':
        dataPoints = 30; // 1 day intervals
        break;
    }
    
    // Generate data
    for (let i = dataPoints; i >= 0; i--) {
      const date = new Date();
      
      // Adjust date based on timeframe
      if (timeframe === '1h') {
        date.setMinutes(date.getMinutes() - i);
      } else if (timeframe === '24h') {
        date.setHours(date.getHours() - i);
      } else if (timeframe === '7d') {
        date.setHours(date.getHours() - (i * 4)); // Every 4 hours
      } else {
        date.setDate(date.getDate() - i);
      }
      
      // Create some price movement patterns
      let priceChange = (Math.random() - 0.5) * volatility;
      
      // Add some trends
      if (i > dataPoints * 0.7) {
        priceChange -= volatility * 0.2; // Downtrend at start
      } else if (i > dataPoints * 0.3) {
        priceChange += volatility * 0.3; // Uptrend in middle
      } else {
        priceChange += (Math.sin(i) * volatility * 0.5); // Oscillation at end
      }
      
      if (i === 0) {
        // Ensure the last price matches the current price for SOL
        if (tokenSymbol === 'SOL') {
          mockData.push({
            time: formatDateToString(date),
            value: 150.25,
          });
        } else {
          mockData.push({
            time: formatDateToString(date),
            value: basePrice * (1 + (Math.random() - 0.3) * 0.1),
          });
        }
      } else {
        mockData.push({
          time: formatDateToString(date),
          value: basePrice + (basePrice * priceChange),
        });
        
        // Update base price for next iteration
        basePrice += basePrice * priceChange;
      }
    }
    
    // Set the data
    areaSeries.setData(mockData);
    
    // Fit content
    chart.timeScale().fitContent();
    
    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Save chart reference for cleanup
    chartRef.current = chart;
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [tokenSymbol, timeframe]);

  // Helper function to format date to string in YYYY-MM-DD format for daily data
  // or to timestamp for intraday data
  const formatDateToString = (date: Date): string => {
    if (timeframe === '30d') {
      // Use business day format for daily data (YYYY-MM-DD)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      // Use timestamp for intraday data
      return Math.floor(date.getTime() / 1000).toString();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm ${timeframe === '1h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md`}
            onClick={() => setTimeframe('1h')}
          >
            1H
          </button>
          <button 
            className={`px-3 py-1 text-sm ${timeframe === '24h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md`}
            onClick={() => setTimeframe('24h')}
          >
            24H
          </button>
          <button 
            className={`px-3 py-1 text-sm ${timeframe === '7d' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md`}
            onClick={() => setTimeframe('7d')}
          >
            7D
          </button>
          <button 
            className={`px-3 py-1 text-sm ${timeframe === '30d' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md`}
            onClick={() => setTimeframe('30d')}
          >
            30D
          </button>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[300px]" />
    </div>
  );
};

export default PriceChart; 