import { useDispatch, useSelector } from "react-redux";
import { InitStateProps, Filter} from '../interfaces';
import { Radio } from 'antd';

const ListFilter = () => {
  const dispatch = useDispatch();
  const { todolist, paginatedList } = useSelector<InitStateProps, InitStateProps>(( state ) => state)

  const handleFilter = (filterOption : Filter) => {
    dispatch({ type: 'SET_FILTER', payload: { filterOption } })
    dispatch({ type: 'SET_CURRENT_PAGE' })
    dispatch({ type: 'SET_SKIP' });
    dispatch({ type: 'GET_PAGINATED_LIST' })
  }


  return (
      <ul className="list__filter filter">
        {!!todolist.length && (
          <Radio.Group>
            <Radio onClick={() => handleFilter({filterOption: 'all'})}>all</Radio>
            <Radio onClick={() => handleFilter({filterOption: 'active'})} value={1}>achieve</Radio>
            <Radio onClick={() => handleFilter({filterOption: 'completed'})} value={2}>completed</Radio>
          </Radio.Group>
        )}
      </ul>
  )
}

export default ListFilter;