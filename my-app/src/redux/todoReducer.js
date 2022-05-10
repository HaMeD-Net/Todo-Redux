import { actionTypes } from "./actionTypes";

const initialState = {
    todo: []
};

export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_LIST:
            return {
                ...state,
                todo: state.todo.concat({
                    message: action.payload.message,
                    id: action.payload.id,
                    completed: action.payload.completed,
                    edit: action.payload.edit
                })
            };
        case actionTypes.DELETE_FROM_LIST:
            return {
                ...state,
                todo: state.todo.filter((item) => item.id !== action.payload.id)
            };
        case actionTypes.COMPLETED:
            return {
                ...state,
                todo: state.todo.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, completed: !action.payload.completed }
                        : item
                )
            };
        case actionTypes.SAVE:
            return {
                ...state,
                todo: state.todo.map((item) =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            message: action.payload.message,
                            edit: !action.payload.edit
                        }
                        : item
                )
            };
        case actionTypes.EDIT:
            return {
                ...state,
                todo: state.todo.map((item) =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            edit: !action.payload.edit
                        }
                        : item
                )
            };
        default:
            return state;
    }
};
