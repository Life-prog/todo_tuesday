import {FilterValueType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleActionType, RemoveTodolistAC,
    RemoveTodolistActionType, todolistId1, todolistId2
} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState:TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: "Book", isDone: true},
        {id: v1(), title: "Milk", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "GraphQl", isDone: false},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "Rest PI", isDone: true}
    ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            let tasks = state[action.todolistId]
            let filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return {...stateCopy}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            let tasks = state[action.todolistId]
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return {...stateCopy}
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
