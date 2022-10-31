import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkouts } from '../hooks/useWorkouts';

export default function Home() {
	const { workouts, dispatch } = useWorkouts();
	const [ error, setError ] = useState(null);

	const {user} = useAuthContext()

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await fetch('https://fitness-tracker03.herokuapp.com/api/workouts', {
					headers : { Authorization: `Bearer ${user.token}` },
				});
				const json = await response.json();

				if (response.ok) {
					dispatch({ type: 'SET_WORKOUTS', payload: json });
				}
				if (!response.ok) {
					setError('Failed to fetch workouts')
				}
			} catch (error) {
				setError('Failed to fetch');
			}
		};

		fetchWorkouts();
	}, []);
	console.log(error)
	return (
		<div className="home">
			<div className="workouts">
				{error && <div className="error">{error}</div>}
				{workouts && workouts.length === 0 && <p>no workouts yet</p>}
				{workouts &&
					workouts.length > 0 &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} setError={setError} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
}
