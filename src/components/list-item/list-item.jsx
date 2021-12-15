import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, Input, Button } from "antd";

const ListItem = (props) => {
  const dispatch = useDispatch()
  const { id, title, completed } = props.item;
  const [text, setText] = useState(title);
  const [typeOfInput, setTypeOfInput] = useState('checkbox');
  
  const editTask = (id ,text) => {
    dispatch({type: 'EDIT_TASK', payload: {id, text}})
  }

  const toggleTODOItem = (item) => {
    dispatch({type: 'TOGGLE_STATUS_TODO', payload: item})
    dispatch({type: 'GET_PAGINATED_LIST', payload: item})
  }

  const changeInputType = (typeOfInput) => {
    if (typeOfInput === 'checkbox') {
      return (
          <Checkbox checked={completed} onChange={() => toggleTODOItem(props.item)}>
            <span>{title}</span>
          </Checkbox>
      )
    }
    if (typeOfInput === 'text') {
      return (
        <>
          <Input placeholder={title} onChange={({ target: { value }}) => setText(value)}/>
          <Button 
            type="primary" 
            size={'default'}
            onClick={() => {
              editTask(id, text);
              setTypeOfInput('checkbox');
          }}>Ok</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setTypeOfInput('checkbox');
              setText(title);
          }}>Exit</Button>
        </>
      )
    }
    return null;
  }


  return (
    <li className={completed ? 'list_item item finished' : 'list_item item'}>
        {changeInputType(typeOfInput)}
    </li>
  )
}


export default ListItem;