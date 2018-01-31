import React, { Component } from 'react';
import  axios from 'axios';

const Todo = ({todo, deleteTodo, index}) => (
    <li style={{display: 'flex', marginBottom: '5px',}}>
        <div style={{flex: '2'}}>
            {todo}
        </div>

        <button style={{marginLeft: '10px', flex: '0.2',}} onClick={(item) => {
            deleteTodo(index);
            console.log(todo);
            console.log(item);
            axios.post(`/deleteTodo/${todo}`)

        }}>Delete</button>
    </li>
);

export default Todo;