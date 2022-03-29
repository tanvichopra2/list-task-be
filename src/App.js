import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lists from './components/Lists';
import Tasks from './components/Tasks';
import makeRequest from './utils/makeRequest';
import { ALL_LISTS_ROUTE, LIST_ROUTE } from "./constants/routes"



function App() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    makeRequest({ method: 'get', url: `${ALL_LISTS_ROUTE}` }).then((listsData) => {

      setLists(listsData);

    });

  }, []);

  const addList = (name) => {
    console.log(name);
    makeRequest({ method: 'post', url: `${LIST_ROUTE}` }, { data: { title: name } }).then((listData) => {
      setLists([...lists, listData]);

    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Lists lists={lists} addList={addList} />}
        >

        </Route>
        <Route
          path={`/list/:id`}
          element={<Tasks />}>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
