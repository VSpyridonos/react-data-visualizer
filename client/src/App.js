import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { arc } from 'd3';
import BackgroundCircle from './components/BackgroundCircle';
import Mouth from './components/Mouth';




function App() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:3001/testresponse',
      );
      console.log(result)
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data}
      <svg width='960' height='500'>
        <g transform={`translate(${250}, ${250})`}>
          <BackgroundCircle radius={245} strokeWidth={10} />
          <Mouth />
        </g>
      </svg>
    </div>
  );
}
export default App;
