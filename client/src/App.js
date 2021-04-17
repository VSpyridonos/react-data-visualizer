import React, { useEffect, useState } from "react";
import './App.css';
import ResponsiveDrawer from './components/Drawer';


const App = () => {
  const [data, setData] = useState([]);
  return (

    <div>
      <ResponsiveDrawer />
    </div>
  );

}
export default App;
