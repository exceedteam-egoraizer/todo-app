import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import List from "../list/list";

import '../../styles/reset.css';
import 'antd/dist/antd.css';
import '../../styles/style.css';


const App = () => {
  const { loading } = useSelector(state => state)
  return (
    <Spin spinning={loading}>
      <List />
    </Spin>
  )
}


export default App;