import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

function TodoForm(props) {
	const colors = [
		["#ff7614", "#ff5411"],
		["#5d0cff", "#9b00fa"],
		["#ff0cf1", "#fa0087"],
		["#149fff", "#117aff"],
	];
	const [input, setInput] = useState(props.edit ? props.edit.value : "");
	const inputFocus = useRef(null);
	useEffect(() => {
		inputFocus.current.focus();
	});

	const [count, setCount] = useState(0);

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input,
			bgColor: `linear-gradient(
				90deg, 
				${colors[count % colors.length][0]} 0%, 
				${colors[count % colors.length][1]} 100%
				)`,
		});

		setCount(count + 1);
		setInput("");
	};
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<div className="todo-input-container">
					<input
						type="text"
						placeholder="Update the todo"
						value={input}
						name="text"
						className="todo-input edit"
						onChange={handleChange}
						ref={inputFocus}
					/>
					<button className="todo-button edit">
						<FaSave className="icons" />
					</button>
				</div>
			) : (
				<div className="todo-input-container">
					<input
						type="text"
						placeholder="Add a todo"
						value={input}
						name="text"
						className="todo-input"
						onChange={handleChange}
						ref={inputFocus}
					/>
					<button className="todo-button">
						<AiFillPlusCircle className="icons" />
					</button>
				</div>
			)}
		</form>
	);
}

export default TodoForm;
