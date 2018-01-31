import React, { Component } from 'react';
import  axios from 'axios';

const Todo = ({todo, deleteTodo, index}) => (
    <li>
        {todo}
        <button style={{marginLeft: '10px',}} onClick={(item) => {
            deleteTodo(index);
            console.log(todo);
            console.log(item);
            axios.post(`/deleteTodo/${todo}`)

        }}>Delete</button>
    </li>
);

export default Todo;