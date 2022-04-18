import { FaRedo, FaTrashAlt } from 'react-icons/fa';

function completedList(props) {
	if (props.todos.every((item) => item.isDone === false)) {
		return <></>;
	} else {
		return (
			<>
				<h2 className="list-heading">Completed Todo</h2>
				<ul className="list-group">
					{props.todos.map((item, index) => {
						if (item.isDone) {
							return (
								<li key={item.id} className="todo-list">
									<div className="task-list">
										<p>{item.text}</p>
										<span>done@{item.date}</span>
									</div>
									<div className="my-auto">
										<FaRedo onClick={() => props.redoClick(index)} className="redo-icons" aria-label="redo item" tabIndex={0} />
										<FaTrashAlt onClick={() => props.deleteClick(index)} className="trash-icons" aria-label="remove item" tabIndex={0} />
									</div>
								</li>
							);
						}
						return null;
					})}
				</ul>
			</>
		);
	}
}
export default completedList;
