import { useAuthContext } from './useAuthContext';
import { useWorkouts } from './useWorkouts';

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkouts();

	const logout = () => {
		// remove user from localstorage
		localStorage.removeItem('user');

		// remove user from authcontext
		dispatch({ type: 'LOGOUT' });

		// clear global workout state
		workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
	};

	return { logout };
};
