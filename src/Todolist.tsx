import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import "./App.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (value: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    ChangeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.ChangeFilter('all', props.id)
    const onActiveClickHandler = () => props.ChangeFilter('active', props.id)
    const onCompletedClickHandler = () => props.ChangeFilter('completed',props.id)
    const removeTodolist =  () => {props.removeTodolist(props.id)}
    const changeTodolistTitle =  (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title:string) => {
        props.addTask(title,props.id)
    }

return <div>
    <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}><Delete /></IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
        {
            props.tasks.map(t => {
               const  onClickHandler = () => props.removeTask(t.id, props.id)
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                   props.changeStatus(t.id, e.currentTarget.checked, props.id)
               }
               const onChangeTitleHandler = (newValue: string) => {
                   props.changeTaskTitle(t.id, newValue, props.id)
               }

               return  <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox"
                           onChange={onChangeStatusHandler}
                           checked={t.isDone}/>
                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <IconButton onClick={onClickHandler}><Delete /></IconButton>
                </div>
            })
        }
    </div>
    <div style ={{padding: "5px"}}>
        <Button variant={props.filter === "all" ?'outlined' : "text"} onClick={onAllClickHandler} color = {'success'}>All</Button>
        <Button variant={props.filter === "active" ?'outlined' : "text"}onClick={onActiveClickHandler}>Active</Button>
        <Button variant={props.filter === "completed" ?'outlined' : "text"}onClick={onCompletedClickHandler} color = {'secondary'}>Completed</Button>
    </div>
</div>
}

