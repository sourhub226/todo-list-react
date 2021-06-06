import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import TodoForm from "./TodoForm";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
	const [edit, setEdit] = useState({ id: null, value: "" });

	const submitUpdate = (value) => {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			value: "",
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}
	return todos.map((todo, index) => (
		<div
			className={todo.isComplete ? "todo-row complete" : "todo-row"}
			key={index}
			style={{ background: todo.bgColor }}
		>
			<div
				className="todo-row-text"
				key={todo.id}
				onClick={() => completeTodo(todo.id)}
			>
				{todo.text}
			</div>
			<div className="icons">
				<MdDelete
					className="delete-icon"
					onClick={() => removeTodo(todo.id)}
				/>
				<MdEdit
					className="edit-icon"
					onClick={() => setEdit({ id: todo.id, value: todo.text })}
				/>
			</div>
		</div>
	));
}

export default Todo;
