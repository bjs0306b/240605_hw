import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import { Button, Typography, Box } from '@mui/material';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList]; // Create a new array to avoid mutating state directly
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList]; // Create a new array to avoid mutating state directly
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList]; // Create a new array to avoid mutating state directly
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <>
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Typography variant="h3">Todo List</Typography>
                <Button variant="contained" color="primary" onClick={toggle} sx={{ marginTop: 2 }}>Create Task</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                    {taskList && taskList.map((obj, index) => (
                        <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                    ))}
                </Box>
            </Box>
            <CreateTask modal={modal} toggle={toggle} save={saveTask} />
        </>
    );
};

export default TodoList;
