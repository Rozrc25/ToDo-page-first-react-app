import React from 'react'
import './App.css'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div className='div_ck_box'>
      <label className='ck_box'>
        <input  type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label>
    </div>
  )
}
