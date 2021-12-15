import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const initState = {
  todolist: [],
  paginatedList: [],
  filteredList: [],
  filter: 'all',
  take: 5,
  skip: 0
};

function reducer (state = initState, action) {
  switch (action.type) {

    case 'SET_FILTER': 
      return {
        ...state,
        filter: action.payload
      }

    case 'SET_FILTERLED_LIST': 
    const currentArr = 
      state.filter === 'all' ? state.todolist : 
      state.filter=== 'active' ? state.todolist.filter((item) => !item.completed) : 
      state.todolist.filter((item) => item.completed);
      return {
        ...state,
        filteredList: currentArr
      }

    case 'SET_SKIP': 
      return {
        ...state,
        skip: ((action.payload?.skip * state.take) || 0)
      }

    case 'GET_TODO_LIST':
      return {
        ...state,
        todolist: action.payload
      }

    case 'GET_PAGINATED_LIST':
      console.log('skip?', action.payload?.skip)
      console.log('filteredArr', state.filteredList.length)
      return {
        ...state,
        paginatedList: [...state.filteredList.slice(state.skip, state.skip + state.take)]
      }

    case 'TOGGLE_STATUS_TODO':
      return {
        ...state,
        todolist: [...state.todolist.map((task) => (task !== action.payload ? task : {...task, completed: !task.completed}))],
        paginatedList: [...state.paginatedList.map((task) => (task !== action.payload ? task : {...task, completed: !task.completed}))]
      }
    case 'EDIT_TASK':
      return {
        ...state,
        todolist: [...state.todolist.map((task) => {
          if (task.id === action.payload.id) {
            return {...task, title: action.payload.text}
          } else {
            return {...task}
          }
        })],
        paginatedList: [...state.paginatedList.map((task) => {
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