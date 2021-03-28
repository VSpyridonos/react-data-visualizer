import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


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
    </div>
  );
}
export default App;
