import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import "./App.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
        <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
        {
            props.tasks.map(t => {
               const  onClickHandler = () => props.removeTask(t.id, props.id)
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                   props.changeStatus(t.id, e.currentTarget.checked, props.id)
               }
               const onChangeTitleHandler = (newValue: string) => {
                   props.changeTaskTitle(t.id, newValue, props.id)
               }

               return  <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox"
                           onChange={onChangeStatusHandler}
                           checked={t.isDone}/>
                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <button onClick={onClickHandler}>X</button>
                </li>
            })
        }
    </ul>
    <div>
        <button className={props.filter === "all" ?'active-filter' : ""} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ?'active-filter' : ""}onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ?'active-filter' : ""}onClick={onCompletedClickHandler}>Completed</button>
    </div>
</div>
}

