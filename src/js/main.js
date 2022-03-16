const todo = document.getElementById('todo');
const addBtn = document.getElementById('btnSubmit');
const resetBtn = document.getElementById('btnReset');
const todoUI = document.querySelector('.todos');

// load todo list from localStorage if any
window.addEventListener('DOMContentLoaded', function () {
	let todos = getTodos();

	// populate ongoing task list from localStorage
	todos.forEach((todo) => {
		createLiElement(todoUI, todo, 'ongoing-list_item');
	});

	// delete todo item when clicked
	deleteTaskList();
});

// get todo list from localStorage if any
const getTodos = () => {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	return todos;
};

// save todo item to localStorage
const saveTodos = (inputData) => {
	const todos = getTodos();
	todos.push(inputData);
	localStorage.setItem('todos', JSON.stringify(todos));
};

// display new input todo item
const addNewTodos = (e) => {
	e.preventDefault();

	createLiElement(todoUI, todo.value, 'ongoing-list_item');
	saveTodos(todo.value);
	todo.value = '';

	deleteTaskList();
};

// delete todo item
const deleteTaskList = () => {
	let todos = getTodos();
	const deleteTask = document.querySelectorAll('.delete-task');
	deleteTask.forEach((item) => {
		item.addEventListener('click', (e) => {
			let str = e.target.parentElement.textContent;
			deleteTodos(todos, str.slice(0, str.length - 6));
			e.target.parentElement.remove();
			// console.log(str.slice(0, str.length - 6));
			// console.log(e.target.parentElement);
		});
	});
};

// delete task from todos localStorage
const deleteTodos = (todo, e) => {
	const targetLi = todo.indexOf(e);
	todo.splice(targetLi, 1);
	localStorage.setItem('todos', JSON.stringify(todo));
};

// create li element
function createLiElement(ui, item, liClass) {
	let li = document.createElement('li');
	let p = document.createElement('p');
	const deleteSpan = createSpan('delete-task');
	li.className = liClass;
	p.textContent = item;
	ui.appendChild(li);
	li.appendChild(p);
	li.appendChild(deleteSpan);
	return li;
}

// create span element
function createSpan(spanClass) {
	let span = document.createElement('span');
	span.className = spanClass;
	span.className += ' rounded';
	span.textContent = 'Delete';
	return span;
}

// display and add to localStorage new input
addBtn.addEventListener('click', addNewTodos);

// remove all display list and localStorage item
resetBtn.addEventListener('click', () => {
	localStorage.clear();
	while (todoUI.hasChildNodes()) {
		todoUI.removeChild(todoUI.firstChild);
	}
	// console.log(todoUI.firstChild);
});
