import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import alanBtn from "@alan-ai/alan-sdk-web";
import { app, database } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
function App() {
  const dbInstance = collection(database, "todo-list"); // this is to create or select collection
  const [update, setUpdate] = useState(false);
  // https://alan.app/docs/client-api/web/react/ to integrate react
  useEffect(() => {
    alanBtn({
      key: "YOUR_ALAN_AI_KEY",
      onCommand: (commandData) => {
        console.log(commandData.data);
        let todoData = commandData.data;
        if (commandData.data) {
          addDoc(dbInstance, { todo: todoData }).then(() => {
            toast.info(`${todoData} added`);
          });
          setUpdate(true);
        } 
      },
    });
  }, []);
  return (
    <div className="App">
      <Todo update={update} setUpdate={setUpdate} />
    </div>
  );
}

export default App;
