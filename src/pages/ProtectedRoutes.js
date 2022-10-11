import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const ProtectedRoutes = ({ children }) => {
	const { user } = useAuthContext();

	if (!user) {
		return <Navigate to="/login" />;
	}
	else {
		return children;
	}
};
