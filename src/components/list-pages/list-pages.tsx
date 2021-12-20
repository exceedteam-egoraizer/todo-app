import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitStateProps } from "../interfaces";
import { Pagination } from "antd";

const ListPages = () => {
  const dispatch = useDispatch();
  const { take, todolist, lengthOfArr, paginatedList } = useSelector<InitStateProps, InitStateProps>(( state ) => state);

  const changePage = (skip : number) => {
    dispatch({ type: 'SET_SKIP', payload: { skip }})
    dispatch({ type: 'GET_PAGINATED_LIST'})
  }

  return (
    <ul className="list__page page">
      {!!paginatedList.length && (
        <Pagination total={lengthOfArr} pageSize={take} defaultCurrent={1} current={3} onChange={changePage}/>
      )}
    </ul>
  )
}

export default ListPages;
