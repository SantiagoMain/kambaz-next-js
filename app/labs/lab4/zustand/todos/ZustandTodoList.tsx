"use client";
import { useTodoStore } from "./useTodoStore";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } = useTodoStore();
  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={() => addTodo(todo)}
                  className="me-1"
                  id="wd-add-todo-click">
            Add
          </Button>
          <Button onClick={() => updateTodo(todo)}
                  variant="warning"
                  className="me-1"
                  id="wd-update-todo-click">
            Update
          </Button>
          <FormControl value={todo.title}
                       onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button onClick={() => deleteTodo(t.id)}
                    variant="danger"
                    className="me-1"
                    id="wd-delete-todo-click">
              Delete
            </Button>
            <Button onClick={() => setTodo(t)}
                    variant="primary"
                    className="me-1"
                    id="wd-set-todo-click">
              Edit
            </Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}