import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Checkbox } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //User story 1: User có thể thêm task mới.
  const addTask = () => {
    if (currentTask.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: currentTask,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setCurrentTask("");
  };

  //User story 2: User có thể hoàn thành task đó.
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  //User story 3: User có thể chuyên giữa All, Active, Complete.
  const filterTasks = (type) => {
    setFilter(type);
    setActiveTab(type);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

 // User story 4: User có thể xoá 1 hoặc tất cả các task đang có.
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  
  

  return (
    <>
      <div className="container">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h2>Todo App</h2>
            <div className="tab-center">
              <Button
              className={`btn-tab ${activeTab === "all" ? "active" : ""}`}
                variant="secondary"
                onClick={() => filterTasks("all")}
              >
                All
              </Button>
              <Button
                className={`btn-tab ${activeTab === "active" ? "active" : ""}`}
                variant="secondary"
                onClick={() => filterTasks("active")}
              >
                Active
              </Button>
              <Button
                className={`btn-tab ${activeTab === "completed" ? "active" : ""}`}
                variant="secondary"
                onClick={() => filterTasks("completed")}
              >
                Completed
              </Button>
            </div>
            <hr></hr>
            <div className="todo-input">
              <Form>
                <InputGroup className="input-task">
                  <FormControl
                    className="task-value"
                    placeholder="add details"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                  />
                  <Button
                    className="btn-task"
                    variant="primary"
                    onClick={addTask}
                  >
                    Add
                  </Button>
                </InputGroup>
              </Form>
            </div>
            <div className="todo-center">
              <div className="list-group">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="todo-left">
                      <Checkbox
                        className="checkbox-completed"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                      />
                      <span
                        onClick={() => toggleComplete(task.id)}
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.text}
                      </span>
                    </div>

                    <div className="todo-right">
                      <Button
                        className="btn-delete"
                        variant="danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        <AiOutlineDelete />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <div
          className={`todo-button ${filter === "completed" ? "" : "d-none"}`}
        >
          <Button
            className="btn-delete-all"
            variant="danger"
            onClick={clearCompletedTasks}
          >
            <AiOutlineDelete />
            delete all
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
