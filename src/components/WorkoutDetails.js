import React from 'react';
import { useWorkouts } from '../hooks/useWorkouts';
import Trash from '../assets/trash-can-icon-28689.png';
import { useAuthContext } from '../hooks/useAuthContext';

export default function WorkoutDetails({ workout, setError }) {
	const { dispatch } = useWorkouts();
	const { user } = useAuthContext();
	const handleDelete = async () => {
		if (!user) {
			return;
		}
		const response = await fetch(`https://fitness-tracker03.herokuapp.com/api/workouts/${workout._id}`, {
			headers : { Authorization: `Bearer ${user.token}` },
			method  : 'DELETE'
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: 'DELETE_WORKOUT', payload: json });
		}
		if (!response.ok) {
			setError('Failed to delete workout. Please Try again');
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Reps : </strong>
				{workout.reps}
			</p>
			<p>{workout.createdAt}</p>
			<span onClick={handleDelete}>
				<img width='20px' src={Trash} alt="trach-can icon" />
			</span>
		</div>
	);
}
