import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LIST_ROUTE, TODO_ROUTE } from "../constants/routes";
import makeRequest from "../utils/makeRequest";

const Tasks = () => {
    const { id } = useParams();

    const [list, setList] = useState();
    console.log(id,list)
    useEffect(() => {
        const getListData = () => {
            makeRequest({ method: 'get', url: `${LIST_ROUTE}/${parseInt(id)}` }).then((listData) => {
                setList({
                    id: id, tasks: listData
                })
            });

        };
        getListData()
    }, [id])
    const [newTask, setNewTask] = useState("");

    const addTask = (listId, title) => {
        makeRequest({ method: 'post', url: `${LIST_ROUTE}${TODO_ROUTE}/${listId}` }, { data: { description: title } }).then((todoData) => {
            console.log(todoData)
            setList({ ...list, tasks: [...list.tasks, todoData] })
        });

    };

    const addToList = () => {
        addTask(parseInt(id), newTask);
        setNewTask("");
    };
    return list ? (
        <div>
            <h2>
                List ID - {list.id}
            </h2>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addToList}>Add to List</button>
            {list.tasks.map((task, index) => (
                <p key={index}>
                    {task.id}. {task.description}
                </p>
            ))}
        </div>
    ) : (
        <div>List doesn't exist</div>
    );
};

export default Tasks;
