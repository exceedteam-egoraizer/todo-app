import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";

const ListPages = () => {
  const dispatch = useDispatch();
  const { take, todolist, lengthOfArr } = useSelector(state => state);

  const changePage = (skip) => {
    dispatch({ type: 'SET_SKIP', payload: { skip }})
    dispatch({ type: 'GET_PAGINATED_LIST'})
  }

  return (
    <ul className="list__page page">
      {!!todolist.length && (
        <Pagination total={lengthOfArr} pageSize={take} onChange={changePage}/>
      )}
    </ul>
  )
}

export default ListPages;
