import React, { useState, useEffect } from "react"
import { API } from "../components/config/api"
import ListItem from "../components/ListItem"
import "../styles/index.css"
import "../styles/App.css"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"

export default function Home() {
  // -*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*YupJs Init-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

  const schema = yup.object().shape({
    todolist: yup.string().required("This Field Must be Not Empty"),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  // -*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [todolistform, Settodolistform] = useState({
    todolist: "",
  })
  const { todolist } = todolistform

  const onChangeForm = e => {
    const updateForm = { ...todolistform }
    updateForm[e.target.name] = e.target.value
    Settodolistform(updateForm)
  }

  const addTodo = async e => {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    }
    const data = {
      name: todolist,
    }
    await API.post(`/todo`, data, config)
    fecthTodo()
    Settodolistform({ todolist: "" })
  }

  const fecthTodo = async () => {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await API.get(`/todo`, config)
    setTodos(res?.data?.data?.todo)
  }

  const deleteTodo = async id => {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    }
    await API.delete(`/todo/${id}`, config)
    fecthTodo()
  }

  const updateTodo = async (_id, isDone) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const data = {
      isDone: !isDone,
    }

    await API.put(`/todo/${_id}`, data, config)
    fecthTodo()
  }

  useEffect(() => {
    fecthTodo()
  }, [])
  return (
    <div className="container__">
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(addTodo)}>
          <input
            {...register("todolist")}
            className="form-size-100 form-design"
            type="text"
            name="todolist"
            value={todolist}
            id=""
            onChange={e => onChangeForm(e)}
          />
          {errors.todolist && (
            <p style={{ fontSize: "2rem", color: "Red", marginTop: "2rem" }}>
              {errors.todolist.message}
            </p>
          )}
          <div className="button-wrapper">
            <button
              className="button-style clicked"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "purple",
                fontWeight: "bold",
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="list-wrapper-outter">
          {todos.map(todo => (
            <ListItem
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
