import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkouts } from '../hooks/useWorkouts';

export default function WorkoutForm() {
	const [ title, setTitle ] = useState('');
	const [ load, setLoad ] = useState('');
	const [ reps, setReps ] = useState('');
	const [ error, setError ] = useState('');
	const [ emptyFields, setEmptyFields ] = useState([]);

	const { dispatch } = useWorkouts();

	const {user} = useAuthContext()
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setError('You must be logged in')
			return
		}

		const workout = {
			title,
			load,
			reps
		};

		const response = await fetch('https://fitness-tracker03.herokuapp.com/api/workouts', {
			method  : 'POST',
			body    : JSON.stringify(workout),
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${user.token}`
			}
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}

		if (response.ok) {
			setError(null);
			setEmptyFields(null);
			setTitle('');
			setLoad('');
			setReps('');
			dispatch({ type: 'CREATE_WORKOUT', payload: json });
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>

			{error && <div className="error">{error}</div>}
			<label>
				<span>Excersize Title: </span>
				<input
					type="text"
					className={emptyFields?.includes('title') ? 'error' : ''}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</label>

			<label>
				<span>Load (in Kg): </span>
				<input
					type="number"
					className={emptyFields?.includes('load') ? 'error' : ''}
					value={load}
					onChange={(e) => setLoad(e.target.value)}
				/>
			</label>

			<label>
				<span>Reps: </span>
				<input
					type="number"
					className={emptyFields?.includes('reps') ? 'error' : ''}
					value={reps}
					onChange={(e) => setReps(e.target.value)}
				/>
			</label>

			<button>Add Workout</button>
		</form>
	);
}
