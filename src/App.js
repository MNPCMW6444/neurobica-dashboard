import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [pros, setPros] = useState(null);
  const [refresh, setrefresh] = useState(null);
  const [edit, setedit] = useState(false);
  const [data, setdata] = useState(false);
  const [iid, setid] = useState();
  const [ii, seti] = useState();

  useEffect(() => {
    const get = async () => {
      const res = await Axios.get(
        "https://neurobica-dashboard-server.herokuapp.com/getallmy"
      );
      setPros(res.data);
    };
    get();
  }, [refresh]);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Processes:</h1>
      {pros && pros.map ? (
        pros.map((pro, i) => (
          <div className="process" key={i}>
            <div className="header">{pro.hea}</div>
            {pro && pro.tasks ? (
              pro.tasks.map((task, j) => (
                <>
                  <button
                    style={{}}
                    onClick={async () => {
                      const res3 = await Axios.post(
                        "https://neurobica-dashboard-server.herokuapp.com/color",
                        { id: pro._id, i: j }
                      );
                      setrefresh(Math.random());
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (e.nativeEvent.which === 1) {
                        console.log("Left click");
                      } else if (e.nativeEvent.which === 3) {
                        setedit(true);
                        setid(pro._id);
                        seti(j);
                      }
                    }}
                    key={j}
                    className={task.complete ? "taskgreen" : "taskred"}
                  >
                    {task.name}
                  </button>{" "}
                  <span className="arrow">></span>
                </>
              ))
            ) : (
              <div className="task">ללא משימה</div>
            )}
            <button
              className="taskred2"
              onClick={async () => {
                const res1 = await Axios.post(
                  "https://neurobica-dashboard-server.herokuapp.com/sendtask",
                  { name: Math.random(), id: pro._id }
                );
                setrefresh(Math.random());
              }}
            >
              add task
            </button>
          </div>
        ))
      ) : (
        <div>ללא</div>
      )}
      <br></br>
      <br></br>
      <button
        className="taskred2"
        onClick={async () => {
          const res2 = await Axios.post(
            "https://neurobica-dashboard-server.herokuapp.com/sendpro",
            { header: "header" }
          );
          setrefresh(Math.random());
        }}
      >
        add process
      </button>
      {edit && (
        <div style={{ backgroundColor: "white" }}>
          <label>Name the task: </label>
          <input value={data} onChange={(e) => setdata(e.target.value)}></input>
          <button
            onClick={async () => {
              const res5 = await Axios.post(
                "https://neurobica-dashboard-server.herokuapp.com/name",
                { id: iid, i: ii, name: data }
              );
              setrefresh(Math.random());
              setedit(null);
              setdata(null);
            }}
          >
            save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
