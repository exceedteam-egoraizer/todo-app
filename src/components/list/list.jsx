import React from "react";
import ListItem from "../list-item/list-item";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListFilter from "../list-filter";
import ListPages from "../list-pages";


const List = () => {
  const dispatch = useDispatch()
  const { 
    todolist: allTodos, 
    paginatedList: paginatedTodos, 
  } = useSelector(state => state);

  useEffect(() => {
    getTODOList();
  }, []) 

  const getTODOList = async () => {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
    dispatch({type: 'GET_TODO_LIST', payload: data.data})
    dispatch({type: 'SET_FILTERLED_LIST'})
    dispatch({type: 'GET_PAGINATED_LIST'})
  }

  const toggleTODOItem = (item) => {
    dispatch({type: 'TOGGLE_STATUS_TODO', payload: item})
  }

  return (
    <div className="list">
      <ul className="list__items">
        {paginatedTodos.map((item) => {
          return (
            <ListItem 
              key={item.id} 
              item={item} 
              toggleTODOItem={toggleTODOItem}
            />
          )
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