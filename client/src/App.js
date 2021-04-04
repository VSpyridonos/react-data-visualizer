import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { scaleBand, scaleLinear, max } from 'd3';
import BackgroundCircle from './components/BackgroundCircle';
import Mouth from './components/Mouth';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:3001/testresponse',
      );
      console.log(result.data)
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) return <pre>Loading data...</pre>

  const yScale = scaleBand()
    .domain(data.map(d => d.country))
    .range([0, 250]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => parseFloat(d.money))])
    .range([0, 250]);

  return (
    <div>
      <ul>
        {data.map(row => <li key={row.id}>Country: {row.country}, Money: {row.money}</li>)}
      </ul>

      <svg width={960} height={500}>
        {data.map(d => (
          <rect
            key={d.id}
            x={0}
            y={yScale(d.country)}
            width={xScale(parseFloat(d.money))}
            height={yScale.bandwidth()}
          />
        ))}
      </svg>
    </div>
  );

}
export default App;
