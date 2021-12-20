import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitStateProps } from "../interfaces";
import { Pagination } from "antd";

const ListPages = () => {
  const dispatch = useDispatch();
  const { take, lengthOfArr, paginatedList, currentPage } = useSelector<InitStateProps, InitStateProps>(( state ) => state);

  const changePage = (skip : number, curentPage: number) => {
    dispatch({ type: 'SET_SKIP', payload: { skip: skip }});
    dispatch({ type: 'SET_CURRENT_PAGE', payload: { currentPage: skip }})
    dispatch({ type: 'GET_PAGINATED_LIST'});
  }

  return (
    <ul className="list__page page">
      {!!paginatedList.length && 
      (
        <Pagination total={lengthOfArr} pageSize={take} defaultCurrent={1} current={currentPage} onChange={changePage}/>
      ) 
      }
    </ul>
  )
}

export default ListPages;
