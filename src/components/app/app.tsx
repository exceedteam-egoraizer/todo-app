import { Spin } from "antd";
import { useSelector } from "react-redux";
import List from "../list/list";
import { InitStateProps } from "../interfaces";

import '../../styles/reset.css';
import 'antd/dist/antd.min.css';
import '../../styles/style.css';


const App = () => {
  const { loading } = useSelector((state : InitStateProps) => state) 
  return (
    <Spin spinning={loading}>
      <List />
    </Spin>
  )
}


export default App;