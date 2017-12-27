import React, { Component } from 'react';

const Todo = ({todo, deleteTodo, index}) => (
    <div>
        {todo}
        <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
)

export default Todo