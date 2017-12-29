import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
const actionTypes = {
    deleteName: 'DELETE_NAME',
    editName: 'EDIT_NAME',
    modifyNameList: 'MODIFY_NAMES',
    addTodo: 'ADD_TODO',
    deleteTodo: 'DELETE_TODO',
    fillTodos: 'FILL_TODOS'
}
const name = (state = '', action) => {
    switch (action.type) {
        case actionTypes.deleteName:
            return '';
        case actionTypes.editName:
            return action.newName;
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case actionTypes.addTodo:
            return [...state, action.newTodo];
        case actionTypes.deleteTodo:
            return state.filter((item, index) => action.currentTodo != index)
        case actionTypes.fillTodos:
        console.log(actionTypes.fromDb)
            return action.fromDb;
        default:
            return state;
    }
}

const reducers = combineReducers({
    name,
    todos,

})

const initStore = () => createStore(
    reducers,
    {
        name: 'matejcsok',
        todos: ['megtanulni rendesen programozni']
    },
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
export default initStore;