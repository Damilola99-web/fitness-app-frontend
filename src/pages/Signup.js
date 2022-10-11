import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign up</h3>

			{error && <div className='error'>{error}</div>}
			<label>
				<span>Email:</span>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>

			<label>
				<span>Password:</span>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>

			{!isLoading && <button disabled={isLoading}>Sign up</button>}
			{isLoading && <div className='loading'>Loading...</div>}
		</form>
	);
};

export default Signup;
