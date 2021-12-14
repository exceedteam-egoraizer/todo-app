import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListPages = () => {
  const dispatch = useDispatch();
  const take = useSelector(state => state.take);
  const { filter, active, completed, todolist } = useSelector(state => state);
  const [countPages, setCountPages] = useState(0);

  useEffect(() => {
    if (filter === 'all') {
      setCountPages(todolist.length / 5);
    }
    if (filter === 'active') {
      setCountPages(active.length / 5);
    }
    if (filter === 'completed') {
      setCountPages(completed.length / 5);
    }
  }, [filter, todolist, completed, active])

  const goToPage = (skip) => {
    dispatch({ type: 'GET_PAGINATED_DATA', payload: {skip, take: take} })
  }

  const renderPages = () => {
    const arrOfPages = [];
    for (let i = 0; i < countPages; i++) {
      arrOfPages.push(i);
    }
    return (
      <div>
        {console.log(12312312, arrOfPages)}
        {
          arrOfPages.map(page => 
          <span 
            key={page} 
            style={{ margin: '0 3px', cursor: 'pointer' }}  // Here
            onClick={() => goToPage(page * take)}
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