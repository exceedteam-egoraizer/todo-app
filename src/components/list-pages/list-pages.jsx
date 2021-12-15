import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListPages = () => {
  const dispatch = useDispatch();
  const {take, filteredList} = useSelector(state => state);
  const { filter, active, completed, todolist } = useSelector(state => state);
  const [countPages, setCountPages] = useState(0);

  useEffect(() => {
    if (filter === 'all') {
      setCountPages(todolist.length / take);
    }
    if (filter === 'active') {
      setCountPages(filteredList.length / take);
    }
    if (filter === 'completed') {
      setCountPages(filteredList.length / take);
    }
  }, [filter, todolist, completed, active])

  const goToPage = (skip) => {
    dispatch({ type: 'SET_SKIP', payload: { skip }})
    dispatch({ type: 'SET_FILTERLED_LIST'})
    dispatch({ type: 'GET_PAGINATED_LIST', payload: { skip }})
    console.log(filteredList)
  }

  const renderPages = () => {
    const arrOfPages = [];
    for (let i = 0; i < countPages; i++) {
      arrOfPages.push(i);
    }
    return (
      <div>
        {
          arrOfPages.map((page) => 
          <span 
            key={page} 
            style={{ margin: '0 3px', cursor: 'pointer' }}  // Here
            onClick={() => goToPage(page)}
          >{page + 1}</span>)
        }
      </div>
    )
  }

  return (
    <ul className="list__page page">
      {renderPages()}
    </ul>
  )
}

export default ListPages;
