import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [pros, setPros] = useState(null);
  const [refresh, setrefresh] = useState(null);
  

  useEffect(() => {
    const get = async () => {
      const res =await Axios.get("http://localhost:5000/getallmy");
      setPros(res.data);
    };
    get();
  }, [refresh]);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Processes:</h1>
       {pros && pros.map ? pros.map((pro, i) => (
        <div className="process" key={i} >
          <div className="header">
            {pro.hea}
          </div>
          {pro && pro.tasks ? pro.tasks.map((task, j) =>  
            (
              <button 
                onClick={async () => {

                }}
                key={j}
                className={task.complete ? "taskgreen" : "taskred"}
              >
                {task.name}
              </button>
            )
          ) : (<div className="task">ללא משימה</div>)}
          <button
            onClick={async () => {
              const res1 =  await Axios.post("http://localhost:5000/sendtask", {name:"name",id:pro._id});
              setrefresh(Math.random());
            }}
          >
            +
          </button>
        </div>)) : <div>ללא</div>}
    
      <button
        onClick={async() => {

          const res2 =  await Axios.post("http://localhost:5000/sendpro", {header:"header"});
          setrefresh(Math.random());

        }}
      >
        +
      </button>
    </div>
  );
}

export default App;
