import { FaCheck, FaTrashAlt } from 'react-icons/fa';

function activeList(props) {
	return (
		<>
			<h2 className="list-heading">Ongoing Todo</h2>
			<ul className="list-group">
				{props.todos.every((item) => {
					return item.isDone === true;
				}) ? (
					<li className="list-group-item list-group-item-dark">No ongoing task...</li>
				) : (
					props.todos.map((item, index) => {
						if (!item.isDone) {
							return (
								<li key={item.id} className="todo-list">
									<div className="task-list">
										<p>{item.text}</p>
										<span>{item.date}</span>
									</div>

									<div className="d-flex my-auto">
										<FaCheck onClick={() => props.doneClick(index)} className="check-icons" aria-label="item done" tabIndex={0} />
										<FaTrashAlt onClick={() => props.deleteClick(index)} className="trash-icons" aria-label="remove item" tabIndex={0} />
									</div>
								</li>
							);
						}
						return null;
					})
				)}
			</ul>
			{/* <button onClick={props.removeAll} className="btn btn-danger w-100 mt-3">
					Delete All Ongoing Todos
				</button> */}
		</>
	);
}
export default activeList;
