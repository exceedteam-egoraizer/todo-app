import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, Input, Button } from "antd";
import { ListItemProps, Item} from '../interfaces'
//import { Item } from "../list/list";

const ListItem = (props: ListItemProps) => {
  const dispatch = useDispatch()
  const { id, title, completed } = props.item;
  const [text, setText] = useState(title);
  const [typeOfInput, setTypeOfInput] = useState(true);
  
  const editTask = (id : number, text : string) => {
    dispatch({type: 'EDIT_TASK', payload: {id, text}})
  }

  const toggleTODOItem = (item : Item) => {
    dispatch({type: 'TOGGLE_STATUS_TODO', payload: item})
    dispatch({type: 'GET_PAGINATED_LIST', payload: item})
  }

  const changeInputType = (typeOfInput : boolean) => {
    if (typeOfInput) { 
      return (
          <Checkbox checked={completed} onChange={() => toggleTODOItem(props.item)}>
            <span>{title}</span>
          </Checkbox>
      )
    }
    if (!typeOfInput) { 
      return (
        <>
          <Input placeholder={title} onChange={({ target: { value }}) => setText(value)}/>
          <Button 
            type="primary" 
            onClick={() => {
              console.log(id, text)
              editTask(id, text);
              setTypeOfInput(!typeOfInput);
          }}>Ok</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setTypeOfInput(!typeOfInput);
              setText(title);
          }}>Exit</Button>
        </>
      )
    }
    return (<div>Some troubles</div>);
  }

  const changeTypeOfInput = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setTypeOfInput(!typeOfInput);
  }

  return (
    <li className={completed ? 'list_item item finished' : 'list_item item'} onDoubleClick={(e) => changeTypeOfInput(e)}> 
        {changeInputType(typeOfInput)}
    </li>
  )
}


export default ListItem;