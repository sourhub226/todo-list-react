import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import useStickyState from "./useStickySate";

function TodoList() {
	const [todos, setTodos] = useStickyState([], "Todos");

	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}
		const newTodos = [todo, ...todos];

		setTodos(newTodos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}

		setTodos((prev) =>
			prev.map((item) => (item.id === todoId ? newValue : item))
		);
	};

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);
		setTodos(removeArr);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		updatedTodos.push(
			updatedTodos.splice(
				updatedTodos.indexOf(
					updatedTodos.filter((todo) => {
						return todo.isComplete;
					})[0]
				),
				1
			)[0]
		);

		setTodos(updatedTodos);
	};

	return (
		<div>
			<h1>What's the plan for today?</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
}

export default TodoList;
