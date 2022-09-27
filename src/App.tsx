import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active'

type TodolistType = {
    filter: FilterValueType
    id: string
    title: string
}

type TaskStateType = {
    [key: string]:Array<TaskType>
}

export function App() {

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})

    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filtheredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filtheredTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What  to buy', filter: 'active'},
        {id: todolistId2, title: 'What  to learn', filter: 'completed'}
    ])

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
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
    })

    function addTodoList(title:string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        ChangeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />

                })
            }
        </div>
    );
}

export default App;