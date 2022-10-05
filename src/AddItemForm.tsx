import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [error, setError] = useState<string | null>(null)
    let [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key == 'Enter') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('');
        }
    }

    const addNewTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError("Field is empty")
        }
    }

    return <div>
        <TextField
            label = "title"
            helperText ={error}
            variant="standard"
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}/>
        <IconButton onClick={addNewTaskHandler} color = "primary"><AddBox/></IconButton>
    </div>
}