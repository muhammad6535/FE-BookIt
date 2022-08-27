import React, { Component, useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./ServiceModal.css";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

function ServiceModal(props) {
  // super();
  const [state, setState] = useState({
    todo_array: [],
    task: "",
    timeAvg: "",
    edit_task: "",
    edit_timeAvg: "",
  });

  useEffect(() => {
    props.setServices(state.todo_array);
  }, [state]);

  const onChangeTask = (e) => {
    setState({ ...state, task: e.target.value });
  };

  const onChangeTimeAvg = (e) => {
    setState({ ...state, timeAvg: e.target.value });
  };

  const addTask = () => {
    let { todo_array, task } = state;

    let obj = {
      id:
        todo_array?.length == 0 ? 1 : todo_array[todo_array?.length - 1].id + 1,
      name: task,
      timeAvg: state.timeAvg,
      is_editing: false,
      is_done: false,
    };
    todo_array.push(obj);
    setState({ ...state, todo_array: todo_array, task: "", timeAvg: "" });
  };

  const edit = (object) => {
    let { todo_array } = state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].is_editing = !todo_array[i].is_editing;

    todo_array.map((task) => {
      task.id !== object.id
        ? (task.is_editing = false)
        : (task.is_editing = task.is_editing);
      return task;
    });

    setState({
      ...state,
      todo_array: todo_array,
      edit_task: object.name,
      edit_timeAvg: object.timeAvg,
    });
  };

  const editTask = (task) => {
    setState({ ...state, edit_task: task });
  };

  const editTimeAvg = (timeAvg) => {
    setState({ ...state, edit_timeAvg: timeAvg });
  };

  const saveEditTask = (object) => {
    let { todo_array, edit_task, edit_timeAvg } = state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].name = edit_task;
    todo_array[i].timeAvg = edit_timeAvg;
    todo_array[i].is_editing = !todo_array[i].is_editing;
    setState({
      ...state,
      todo_array: todo_array,
      edit_task: "",
      edit_timeAvg: "",
    });
  };

  const remove = (object) => {
    let { todo_array } = state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array.splice(i, 1);
    setState({ ...state, todo_array: todo_array });
  };

  const done = (object) => {
    let { todo_array } = state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].is_done = true;

    setState({ ...state, todo_array: todo_array });
  };

  return (
    <div className="Container">
      <div>
        <TextField
          id="standard-basic"
          className="customInputCss"
          autoComplete="off"
          value={state.task}
          onChange={onChangeTask}
          placeholder="Add Service Name"
          required
        />
        <TextField
          id="standard-basic"
          autoComplete="off"
          className="customInputCss"
          value={state.timeAvg}
          onChange={onChangeTimeAvg}
          placeholder="Add Service TimeAvg"
          required
          type="number"
        />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={state.task == "" || state.timeAvg == ""}
          onClick={addTask}
        >
          Add Service
        </Button>
      </div>

      {state.todo_array?.length > 0 ? (
        <div>
          <table className="centerTable" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Services</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            {state.todo_array.map((object, i) => {
              return (
                <tbody>
                  <tr>
                    <td>
                      {object.is_editing ? (
                        <div>
                          <TextField
                            id="standard-basic"
                            value={state.edit_task}
                            onChange={(e) => editTask(e.target.value)}
                            required
                          />
                          <TextField
                            id="standard-basic"
                            value={state.edit_timeAvg}
                            onChange={(e) => editTimeAvg(e.target.value)}
                            required
                          />
                        </div>
                      ) : object.is_done ? (
                        <s>
                          {object.timeA}: {object.timeAvg}
                        </s>
                      ) : (
                        <span>
                          {object.name}: {object.timeAvg}
                        </span>
                      )}
                    </td>
                    <td>
                      {object.is_editing ? (
                        <div>
                          <Button
                            className="button_style"
                            variant="outlined"
                            color="primary"
                            size="small"
                            disabled={state.edit_task == ""}
                            onClick={(e) => saveEditTask(object)}
                          >
                            Save
                          </Button>
                          <Button
                            className="button_style"
                            variant="outlined"
                            color=""
                            size="small"
                            onClick={(e) => edit(object)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Button
                            className="button_style"
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={(e) => edit(object)}
                          >
                            Edit
                          </Button>
                          {/* <Button
                              className="button_style"
                              variant="outlined"
                              color="secondary"
                              size="small"
                              disabled={object.is_done}
                              onClick={(e) => done(object)}
                            >
                              Done
                            </Button> */}
                          <Button
                            className="button_style"
                            variant="outlined"
                            size="small"
                            onClick={(e) => remove(object)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        // <h5>Empty List!</h5>
        null
      )}
    </div>
  );
}

export default ServiceModal;
