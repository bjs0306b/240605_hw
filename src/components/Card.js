import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const categoryColors = {
        Work: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        Personal: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        Shopping: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        Health: { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        Other: { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    };

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        let tempObj = { ...taskObj, isCompleted: !taskObj.isCompleted };
        updateTask(tempObj);
        deleteTask(index);
    };

    const colors = categoryColors[taskObj.Category] || categoryColors["Other"];

    return (
        <Box sx={{
            position: 'relative',
            marginBottom: 2,
            "& .card-top": {
                backgroundColor: colors.primaryColor,
                height: '10px',
            },
            "& .task-holder": {
                backgroundColor: colors.secondaryColor,
                borderRadius: '10px',
                padding: 2,
                "& .card-header": {
                    display: 'flex',
                    alignItems: 'center',
                },
                "& .actions": {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                }
            }
        }}>
            <Box className="card-top" />
            <Box className="task-holder">
                <Typography variant="h6" component="span" className="card-header">
                    <Checkbox
                        checked={taskObj.isCompleted}
                        onChange={handleCheckboxChange}
                        sx={{ marginRight: 1 }}
                    />
                    {taskObj.Name}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>{taskObj.Description}</Typography>
                <Typography variant="body2"><strong>Category: </strong>{taskObj.Category}</Typography>
                <Typography variant="body2"><strong>Deadline: </strong>{taskObj.Deadline ? new Date(taskObj.Deadline).toLocaleDateString() : "No deadline"}</Typography>
                <Box className="actions">
                    <IconButton size="small" sx={{ color: colors.primaryColor }} onClick={toggle}>
                        <Edit />
                    </IconButton>
                    <IconButton size="small" sx={{ color: colors.primaryColor }} onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Box>
            </Box>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </Box>
    );
};

export default Card;
