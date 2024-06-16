import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
    const { token } = useParams();
    console.log(token);
    const history = useNavigate();
    const baseurl="https://transportation-validation-platform.onrender.com"

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const res = await axios.get(`${baseurl}/api/auth/confirm/${token}`);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                history(`/profile/${res.data.userId}`);
                console.log("hey");
            } catch (err) {
                console.error(err.response.data);
            }
        };
        confirmEmail();
    }, [token, history]);

    return <div>Confirming your email...</div>;
};

export default ConfirmEmail;
