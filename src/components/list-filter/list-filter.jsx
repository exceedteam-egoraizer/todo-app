import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ListFilter = () => {
  const dispatch = useDispatch();
  const {filter: filterState, take} = useSelector(state => state);

  const handleFilter = (filter) => {
    dispatch({type: filter, payload: { skip: 0, take }})
  }


  return (
    <>
      <div className="list__info"></div>
      <ul className="list__filter filter">
        <li className={filterState === 'all' ? 'list__filter filter__all filter' : 'list__filter filter' } onClick={() => handleFilter('GET_ALL_TODOS')}>All</li>
        <li className={filterState === 'active' ? 'list__filter filter__active filter' : 'list__filter filter' } onClick={() => handleFilter('GET_ACTIVE_TODOS')}>Active</li>
        <li className={filterState === 'completed' ? 'list__filter filter__completed filter' : 'list__filter filter' } onClick={() => handleFilter('GET_COMPLETED_TODOS')}>Completed</li>
      </ul>
    </>

  )
}


export default ListFilter;