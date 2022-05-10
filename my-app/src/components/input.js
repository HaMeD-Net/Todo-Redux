import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./input.css";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const Input = () => {
    const [input, setInput] = useState("");
    const [saveInput, setSaveInput] = useState("");

    const dispatch = useDispatch();
    const todo = useSelector((state) => state.TodoReducer.todo);
    const inputRef = useRef();

    const addTodo = () => {
        if (input !== "") {
            dispatch({
                type: "ADD_TO_LIST",
                payload: { message: input, id: uuid(), completed: false, edit: false }
            });
            setInput("");
        }
    };
    function Delete(id) {
        dispatch({ type: "DELETE_FROM_LIST", payload: { id: id } });
    }

    const keyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
        }
    };

    const complete = (item) => {
        dispatch({
            type: "COMPLETED",
            payload: { id: item.id, completed: item.completed }
        });
    };

    const save = (item) => {
        if (saveInput !== "") {
            dispatch({
                type: "SAVE",
                payload: { message: saveInput, id: item.id, edit: item.edit }
            });
            setSaveInput("");
        }
    };

    const edit = (item) => {
        dispatch({
            type: "EDIT",
            payload: { id: item.id, edit: item.edit }
        });
        setSaveInput(item.message);
    };

    useEffect(() => {
        console.log(todo);
    }, [todo]);

    return (
        <>
            <div className="input">
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        inputRef={inputRef}
                        id="outlined-basic"
                        variant="filled"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => keyPress(e)}
                    />
                </Box>
                <Button onClick={addTodo} variant="contained" >
                    Add
                </Button>
            </div>
            <br />
            {todo.map((item, index) => {
                return (
                    <div key={index} className="todoslist">
                        {item.edit ? (
                            <>
                                <TextField
                                    id="outlined-basic2"
                                    variant="filled"
                                    value={saveInput}
                                    onChange={(e) => setSaveInput(e.target.value)}
                                // onKeyPress={(e) => keyPress(e)}
                                />

                                <Button onClick={() => save(item)} variant="contained">
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Stack direction="row" spacing={0}>
                                <Chip
                                    color="error"
                                    label={item.message}
                                    variant="filled"
                                    style={item.completed ? { opacity: ".5" } : { opacity: "1" }}
                                    onClick={() => complete(item)}
                                    onDelete={() => Delete(item.id)}
                                />
                                {!item.completed && (
                                    <Button onClick={() => edit(item)}>
                                        Edit
                                    </Button>
                                )}
                            </Stack>
                        )}
                    </div>
                );
            })}
        </>
    );
};
export default Input;
