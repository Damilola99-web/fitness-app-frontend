import { createContext, useEffect, useReducer } from 'react';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload };
		case 'LOGOUT':
			return { user: null };
		default:
			return state;
	}
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(authReducer, {
		user : null
	});

	useEffect(() => {
		// checking if user has a token
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	console.log(state);
	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
