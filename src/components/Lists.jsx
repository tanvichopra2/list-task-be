import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Lists = ({ lists, addList }) => {
    const [newList, setNewList] = useState("")

    const addToLists = () => {
        addList(newList)
        setNewList('')
    }
    return (
        <div>
            <input type="text" value={newList} onChange={(e) => setNewList(e.target.value)} />
            <button onClick={addToLists}>Add a new list </button>
            {
                lists.map((list, i) => {
                    return (
                        <div key={i}>
                            <Link to={`list/${list.id}`}>
                                <button>
                                    {list.id}. {list.title}
                                </button>

                            </Link>
                        </div>
                    )

                })
            }
        </div>
    )
}
export default Lists;