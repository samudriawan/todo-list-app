import React, { useState, useEffect } from 'react';
import './index.scss';
import Form from './components/Form';
import ActiveList from './components/ActiveList';
import CompletedList from './components/CompletedList';

function App() {
	const [task, setTask] = useState({ id: 1, text: '', date: '', isDone: false });
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let getLocalStorage = getStorage();
		setTodos(getLocalStorage);
	}, []);

	// get todo list from local storage
	function getStorage() {
		let storage;
		if (localStorage.getItem('todo-list') === null) {
			storage = [];
		} else {
			storage = JSON.parse(localStorage.getItem('todo-list'));
		}
		// array of object
		return storage;
	}

	// save todo list to local storage
	function setStorage(newTodo, data) {
		setTodos(newTodo);
		localStorage.setItem('todo-list', JSON.stringify(data));
	}

	function addTask(e) {
		let input = e.target.value;
		const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
		setTask({ id: id, text: input, date: new Date().toLocaleString(), isDone: false });
	}

	function saveTodo(e) {
		e.preventDefault();
		if (task.text) {
			let newTodos = todos.slice();
			newTodos.push(task);
			setTask({ text: '' });
			setStorage(newTodos, newTodos);
		}
		console.log(todos);
	}

	function doneTodo(index) {
		const arr = todos.slice();
		arr[index].isDone = true;
		arr[index].date = new Date().toLocaleString();
		setStorage(arr, todos);
		console.log(todos);
	}

	function redoTodo(index) {
		const arr = todos.slice();
		arr[index].isDone = false;
		arr[index].date = new Date().toLocaleString();
		setStorage(arr, todos);
	}

	function deleteTodo(index) {
		const storage = getStorage();
		const arr = [...todos];
		arr.splice(index, 1);
		storage.splice(index, 1);
		setStorage(arr, storage);
	}

	return (
		<main>
			<div className="wrapper mt-3 rounded overflow-hidden shadow">
				<header className="header position-relative py-4">
					<div className="circle position-absolute"></div>
					<h1 className="text-center">Todo List</h1>
					<div className="row justify-content-center">
						<div className="col-11 col-md-8">
							<Form onSubmitHandle={saveTodo} onChangeHandle={addTask} inputValue={task.text} />
						</div>
					</div>
				</header>

				{/* ongoing todo list */}
				<div className="row justify-content-center py-3 bg-white">
					<div className="col-11">
						<ActiveList todos={todos} doneClick={doneTodo} deleteClick={deleteTodo} />
					</div>
				</div>

				{/* finished todo list */}
				<div className="row justify-content-center pb-4 bg-white">
					<div className="col-11">
						<CompletedList todos={todos} deleteClick={deleteTodo} redoClick={redoTodo} />
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
