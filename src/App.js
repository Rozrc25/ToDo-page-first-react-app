import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h2>Made with browser localStorage</h2>
      <div className='totl'>
        <input ref={todoNameRef} type="search" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div className='cont_disp'>{todos.filter(todo => !todo.complete).length} left to do</div>

      <div className='top_main'>
        <TodoList className="main_disp" class="main" todos={todos} toggleTodo={toggleTodo} />
      </div>
    </>
  )
}

export default App;