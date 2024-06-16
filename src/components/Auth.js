import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { authState } from '../recoil/atom';
import { useSetRecoilState } from 'recoil';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        userType: 'Transportation Company'
    });
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast();
    const history = useNavigate();
    const setAuthState = useSetRecoilState(authState);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        const { fullName, email, password, userType } = formData;
        if (isLogin) {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                localStorage.setItem('token', res.data.token);
                console.log(res);
                if (!res.data.isVerified) {
                    toast({
                        title: "Email Not Verified",
                        description: "Verify Your Email to Login!",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                }
                else if (!res.data.isProfiledataUpdated) {
                    history(`/profile/${res.data.userId}`)
                }
                else {
                    setAuthState({
                        isAuthenticated: true,
                        isProfileComplete: res.data.isProfiledataUpdated,
                    });
                }
            } catch (err) {
                toast({
                    title: "Invalid Credentials",
                    description: "Enter a valid email and password",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                console.error(err.response.data);
            }
            finally {
                setIsLoading(false)
            }
        } else {
            try {
                let res = await axios.post('http://localhost:5000/api/auth/signup', { fullName, email, password, userType });
                toast({
                    title: "Sign Up Successfull",
                    description: res.data,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (err) {
                console.error(err.response.data.msg);
                toast({
                    title: "Sign Up Failed",
                    description: err.response.data.msg,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <Flex mt={150}>
            <div className="auth-container">
                <div className="toggle-buttons">
                    <button onClick={toggleForm} className={isLogin ? 'active' : ''}>Login</button>
                    <button onClick={toggleForm} className={!isLogin ? 'active' : ''}>Signup</button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                            <select name="userType" value={formData.userType} onChange={handleChange}>
                                <option value="Truck Owner">Truck Owner</option>
                                <option value="Driver">Driver</option>
                                <option value="Transportation Company">Transportation Company</option>
                            </select>
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" isLoading={isLoading}>{isLogin ? 'Login' : 'Signup'}</Button>
                    {isLogin && (
                        <Link className='forgot-password' to={'/forgot-password'}>
                            Forgot Password?
                        </Link>
                    )}
                </form>
            </div>
        </Flex>
    );
};

export default Auth;
