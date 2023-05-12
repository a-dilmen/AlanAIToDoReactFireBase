import React, { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { getDocs, collection,deleteDoc,doc } from "firebase/firestore";
import {ToastContainer,toast} from 'react-toastify';
// react toastify https://www.npmjs.com/package/react-toastify
import 'react-toastify/dist/ReactToastify.css';
export default function Todo({update,setUpdate}) {
  const [todoList, setTodoList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  let dbName = "todo-list";
  const dbInstance = collection(database, dbName);
  useEffect(() => {
    const getData = async () => {
      let data = await getDocs(dbInstance);
      setTodoList(data.docs.map((item)=> ({...item.data()})));
      setDeleted(true);
    };
    getData();
    setUpdate(false);
  }, [update,deleted]);
  const deleteItems = (id) => {
    const data = doc(database,dbName,id);
    deleteDoc(data)
        .then(()=>{
            setDeleted(false);
            toast.success('Deleted so ez!');
        })
  }
  return (
    <div>
        <ToastContainer/>
      <h2 className="todo-header">
        Todo List Using React Alan AI and Firebase
      </h2>
      <div className="todo-main">
        {todoList.map((item) => {
          return (
            <div className="todo-items">
              <p className="todo-item">{item.todo}</p>
              <p className="close-icon" onClick={()=> deleteItems(item.id)}>x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
