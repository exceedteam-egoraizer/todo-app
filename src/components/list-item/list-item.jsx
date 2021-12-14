import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";


 
const ListItem = (props) => {
  const {userId, id, title, completed} = props.item;
  const dispatch = useDispatch()
  const [typeOfInput, setTypeOfInput] = useState('checkbox');
  const [text, setText] = useState(title);
  
  const editTask = (id ,text) => {
    console.log(text)
    dispatch({type: 'EDIT_TASK', payload: {id, text}})
  }

  const editText = (e) => {
    e.preventDefault();
    setTypeOfInput('text')
  }
  
  return (
    <li className={completed ? 'list_item item finished' : 'list_item item not-finished'} onDoubleClick={(e) => editText(e)}>
      <input
        type={typeOfInput}
        value={typeOfInput === 'text' && text}
        checked={completed}
        onChange={({target: { value }}) => {
          if (typeOfInput === 'checkbox') {
            props.toggleTODOItem(props.item)
          } else {
            setText(value);
          }
        }}/>
      <span>{typeOfInput === 'checkbox' ? title : null}</span>
      {typeOfInput === 'text' && (
        <div>
          <button 
            onClick={() => {
              editTask(id, text);
              setTypeOfInput('checkbox');
            }}
          >
              Ok
          </button>
          <button
            onClick={() => {
              setTypeOfInput('checkbox');
              setText(title);
            }}
          >
            Exit
          </button>
        </div>
      )}
    </li>
  )
}


export default ListItem;