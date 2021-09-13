import React from "react"
import { BsTrashFill, BsCardChecklist } from "react-icons/bs"

function ListItem({ todo, deleteTodo, updateTodo }) {
  return (
    <div className="list-wrapper">
      <div>
        {todo.isDone ? (
          <h1 className="done-true">{todo?.name}</h1>
        ) : (
          <h1>{todo?.name}</h1>
        )}
      </div>
      <div className="icon-wrapper">
        <div className="clicked" onClick={() => deleteTodo(todo._id)}>
          <BsTrashFill
            style={{
              color: "purple",
              width: "4rem",
              height: "4rem",
            }}
          />
        </div>
        <div
          className="clicked"
          onClick={() => updateTodo(todo._id, todo.isDone)}
        >
          <BsCardChecklist
            style={{
              color: "purple",
              width: "4rem",
              height: "4rem",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ListItem
