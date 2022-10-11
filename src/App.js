import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ProtectedRoutes } from './pages/ProtectedRoutes';
import { VisitorsRoute } from './pages/VisitorsRoute';

function App() {
	return (
		<div className="App">
			<Router>
        <Navbar />
				<div className="pages">
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/login' element={<VisitorsRoute><Login /></VisitorsRoute>} />
          <Route path='/signup' element={<VisitorsRoute><Signup /></VisitorsRoute>} />
        </Routes>
        </div>
			</Router>
		</div>
	);
}

export default App;
