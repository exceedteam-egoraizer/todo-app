import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ListFilter = () => {
  const dispatch = useDispatch();
  const {filter: filterState, take} = useSelector(state => state);

  const handleFilter = (filterOption) => {
    dispatch({type: 'SET_FILTER', payload: filterOption})
    dispatch({type: 'SET_FILTERLED_LIST', payload: filterOption})
    dispatch({type: 'SET_SKIP'});
    dispatch({type: 'GET_PAGINATED_LIST'})
  }


  return (
    <>
      <div className="list__info"></div>
      <ul className="list__filter filter">
        <li className={filterState === 'all' ? 'list__filter filter__all filter' : 'list__filter filter' } 
            onClick={() => handleFilter('all')}
        >All</li>
        <li className={filterState === 'active' ? 'list__filter filter__active filter' : 'list__filter filter' } 
            onClick={() => handleFilter('active')}
        >Active</li>
        <li className={filterState === 'completed' ? 'list__filter filter__completed filter' : 'list__filter filter' } 
            onClick={() => handleFilter('completed')}
        >Completed</li>
      </ul>
    </>

  )
}


export default ListFilter;