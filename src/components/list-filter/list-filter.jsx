import React from "react";
import { useDispatch } from "react-redux";
import { Radio } from 'antd';

const ListFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = (filterOption) => {
    dispatch({type: 'SET_FILTER', payload: filterOption})
    dispatch({type: 'SET_SKIP'});
    dispatch({type: 'GET_PAGINATED_LIST'})
  }

  return (
      <ul className="list__filter filter">
          <Radio.Group>
            <Radio onClick={() => handleFilter('all')} defaultValue>all</Radio>
            <Radio onClick={() => handleFilter('active')} value={1}>achieve</Radio>
            <Radio onClick={() => handleFilter('completed')} value={2}>completed</Radio>
          </Radio.Group>
      </ul>
  )
}

export default ListFilter;