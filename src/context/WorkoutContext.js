import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
	switch (action.type) {
		case 'SET_WORKOUTS':
			return { workouts: action.payload };
		case 'CREATE_WORKOUT':
			return {
				workouts : [ action.payload, ...state.workouts ]
			};
		case 'DELETE_WORKOUT':
			return {
				workouts : state.workouts.filter((workout) => {
					return workout._id !== action.payload._id;
				})
			};
		default:
			return state;
	}
};

export const WorkoutProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(workoutReducer, { workouts: null });
	return <WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutContext.Provider>;
};
