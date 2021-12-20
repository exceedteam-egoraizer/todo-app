import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitStateProps, Item } from "../interfaces";
import axios from "axios";
import { Typography } from "antd";
import ListItem from "../list-item/list-item";
import ListFilter from "../list-filter";
import ListPages from "../list-pages";


const List = () => {
  const dispatch = useDispatch()
  const { paginatedList } = useSelector(( state : InitStateProps ) => state);

  const getTODOList = async () => {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
    dispatch({type: 'GET_TODO_LIST', payload: data.data})
    dispatch({type: 'GET_PAGINATED_LIST'})
  }
  
  useEffect(() => {
    getTODOList();
  }, []) 

  return (
    <div className="list">
      <Typography.Title>To-Do List</Typography.Title>
      <ul className="list__items">
        {paginatedList.map((item : Item) => {
          return ( <ListItem key={item.id} item={item} /> )
        })}
      </ul>
      <div className="list__bottom">
        <ListFilter />
      </div>
      <div className="list__pages">
        <ListPages />
      </div>
    </div>
  )
}

export default List;