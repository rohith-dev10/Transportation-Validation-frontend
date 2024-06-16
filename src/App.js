import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ConfirmEmail from './components/ConfirmEmail';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { authState } from './recoil/atom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import ForgotPassword from './components/ForgotPassword';

function App() {
    const [auth, setAuthState] = useRecoilState(authState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Set isAuthenticated to true if token is present
            setAuthState((prevAuth) => ({ ...prevAuth, isAuthenticated: true }));
        }
    }, [setAuthState]);

    return (
        <Router>
            <Routes>
                <Route path="/confirm/:token" element={<ConfirmEmail />} />
                <Route path="/profile/:userId" element={<Profile />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/" element={auth.isAuthenticated ? <Navigate to="/dashboard" />:<Auth />} />
                {/* other routes */}
            </Routes>
        </Router>
    );
}

export default App;
