import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = ({ data, dataKey, color, title, unit }) => {
  return (
    <div className="h-100">
      <h6 className="fw-bold mb-4 text-secondary text-uppercase small tracking-wider">{title}</h6>
      <div className="w-full" style={{ height: '240px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              hide={true}
            />
            <YAxis 
              stroke="#adb5bd" 
              fontSize={11} 
              tickFormatter={(val) => `${val}${unit}`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #dee2e6', 
                borderRadius: '6px',
                boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)',
                fontSize: '12px'
              }}
              labelStyle={{ display: 'none' }}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: color, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
