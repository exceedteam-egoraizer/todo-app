import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const initState = {
  todolist: [],
  completed: [],
  active: [],
  paginatedList: [],
  filter: 'all',
  take: 5,
  skip: 0
};

function reducer (state = initState, action) {
  switch (action.type) {
    case 'GET_TODO_LIST':
      return {
        ...state,
        todolist: action.payload,
        paginatedList: action.payload.slice(state.skip, state.skip + state.take)
      }
    case 'TOGGLE_STATUS_TODO':
      return {
        ...state,
        todolist: [...state.todolist.map((task) => (task !== action.payload ? task : {...task, completed: !task.completed}))]
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
        })]
      }
    case 'GET_ALL_TODOS': 
      return {
        ...state,
        filter: 'all',
        paginatedList: state.todolist.slice(action.payload.skip, action.payload.skip + action.payload.take),
        todolist: state.todolist
      }
    case 'GET_ACTIVE_TODOS': 
      return {
        ...state,
        filter: 'active',
        paginatedList: state.todolist.filter((item) => !item.completed).slice(action.payload.skip, action.payload.skip + action.payload.take),
        active: state.todolist.filter((item) => !item.completed)
      }
    case 'GET_COMPLETED_TODOS': 
      return {
        ...state,
        filter: 'completed',
        paginatedList: state.todolist.filter((item) => item.completed).slice(action.payload.skip, action.payload.skip + action.payload.take),
        completed: state.todolist.filter((item) => item.completed)
      }
    case 'GET_PAGINATED_DATA':
      const arr = state.filter === 'all' ? state.todolist : state.filter === 'active' ? state.active : state.completed;
      return {...state, paginatedList: arr.slice(action.payload.skip, action.payload.skip + action.payload.take) }
    default:
      return state
  }
}

// let store = createStore(reducer, applyMiddleware(logger))
let store = createStore(reducer)

export default store;