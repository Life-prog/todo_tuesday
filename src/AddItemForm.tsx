import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}/>
        <button onClick={addNewTaskHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}