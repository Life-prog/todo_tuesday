import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValueType = 'all' | 'completed' | 'active'

type TodolistType = {
    filter: FilterValueType
    id: string
    title: string
}

type TaskStateType = {
    [key: string]: Array<TaskType>
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
        //достаём нужный массив todolistid
        let tasks = tasksObj[todolistId]
        //находим нужную таску
        let task = tasks.find(t => t.id === taskId)
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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

    function addTodoList(title: string) {
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style = {{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing = {3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id]

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }

                            return <Grid item>
                                <Paper style = {{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                ChangeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}

                            />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
