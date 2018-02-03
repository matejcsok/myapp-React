import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

const actionTypes = {
    deleteName: 'DELETE_NAME',
    editName: 'EDIT_NAME',
    modifyNameList: 'MODIFY_NAMES',
    addTodo: 'ADD_TODO',
    deleteTodo: 'DELETE_TODO',
    fillTodos: 'FILL_TODOS',
    fillUsers: 'FILL_USERS',
    loggedIn: 'LOGGED',
    notLoggedIn: 'NOT_LOGGED',
    writeErrorMessage: 'WRITE_ERROR_MESSAGE',
    singUpErrorMessage: 'SINGUP_ERROR_MESSAGE',
};
const name = (state = '', action) => {
    switch (action.type) {
        case actionTypes.deleteName:
            return '';
        case actionTypes.editName:
            return action.newName;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case actionTypes.addTodo:
            return [...state, action.newTodo];
        case actionTypes.deleteTodo:
            return state.filter((item, index) => action.currentTodo != index);
        case actionTypes.fillTodos:
            return action.fromDb;
        default:
            return state;
    }
};

const user = (state = [], action) => {
    switch (action.type) {
        case actionTypes.fillUsers:
            return action.dbUsers;
        default:
            return state;
    }
};

const isLogged = (state = '', action) => {
    switch (action.type) {
        case actionTypes.loggedIn:
            return true;
        case actionTypes.notLoggedIn:
            return false;
        default:
            return state;
    }
};

const errorMessage = (state = '', action) => {
  switch (action.type){
      case actionTypes.writeErrorMessage:
          return action.message;
      case actionTypes.singUpErrorMessage:
          return action.message;
      default:
          return state;
  }
};

const reducers = combineReducers({
    name,
    todos,
    user,
    isLogged,
    errorMessage,

});

const initStore = () => createStore(
    reducers,
    {
        name: 'matejcsok',
        todos: ['megtanulni rendesen programozni'],
        isLogged: false,
        errorMessage: '',
    },
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
export default initStore;