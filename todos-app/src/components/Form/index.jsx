import { FaPlus } from 'react-icons/fa';

function form(props) {
	return (
		<form onSubmit={props.onSubmitHandle}>
			<div className="input-group my-3">
				<input type="text" className="form-control" name="task" value={props.inputValue} onChange={props.onChangeHandle} placeholder="Add new task..." aria-label="Add new task" required />
				<button type="submit" className="btn btn-outline-secondary " id="button-addon2">
					<FaPlus className="plus-icon" />
				</button>
			</div>
		</form>
	);
}
export default form;
