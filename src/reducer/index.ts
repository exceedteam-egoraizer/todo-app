import { applyMiddleware, createStore } from 'redux';
import { Item, InitStateProps, Actions } from '../components/interfaces';
// import logger from 'redux-logger';

const initState: InitStateProps = {
  loading: true,
  todolist: [],
  paginatedList: [],
  filter: { filterOption: 'all' },
  lengthOfArr: 20,
  take: 5,
  skip: 0,
  currentPage: 1
};


function reducer (state = initState, action: Actions) { 
  switch (action.type) {
    case 'SET_FILTER': 
    console.log('entry filter', action.payload?.filterOption)
      return {
        ...state,
        filter:  action.payload.filterOption
      }

    case 'SET_SKIP': 
      return {
        ...state,
        skip: (((action.payload?.skip - 1) * state.take) || 0)
      }

    case 'GET_TODO_LIST':
      return {
        ...state,
        todolist: action.payload,
        loading: !state.loading
      }

    case 'GET_PAGINATED_LIST':
      console.log('current state filter: ', state.filter.filterOption);
      const filteredArr = 
        state.filter.filterOption === 'all' ? state.todolist: // false
        state.filter.filterOption === 'active' ?  // false
        state.todolist.filter((item : Item) => !item.completed) : 
        state.todolist.filter((item : Item) => item.completed);
      return {
        ...state,
        lengthOfArr: filteredArr.length,
        paginatedList: filteredArr.slice(state.skip, state.skip + state.take)
      }

    case 'TOGGLE_STATUS_TODO':
      return {
        ...state,
        todolist: [...state.todolist.map((task : Item) => (task.id !== action.payload.id ? task : {...task, completed: !task.completed}))],
        paginatedList: [...state.paginatedList.map((task : Item) => (task.id !== action.payload.id ? task : {...task, completed: !task.completed}))],
      }
    case 'EDIT_TASK':
      return {
        ...state,
        todolist: [...state.todolist.map((task : Item) => {
          if (task.id === action.payload.id) {
            return {...task, title: action.payload.text}
          } else {
            return {...task}
          }
        })],
        paginatedList: [...state.paginatedList.map((task : Item) => {
          if (task.id === action.payload.id) {
            return {...task, title: action.payload.text}
          } else {
            return {...task}
          }
        })] 
      }

    default:
      return state
  }
}

// let store = createStore(reducer, applyMiddleware(logger))
let store = createStore(reducer)

export default store;