import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext'
import ErrorNotice from '../../components/misc/ErrorNotice';

import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginRes = await axios.post ('/user/login', loginUser );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
      };

    return (
        <div className="page">
        <h2>Login</h2>
        {error && (<ErrorNotice message={error} clearError= {() => setError(undefined)} />)}
        <form className = "form" onSubmit={submit}>
            <label htmlform="register-email">Email</label>
            <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlform="login-password">Password</label>
            <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)}/>

            <input type="submit" value="Login" />
        </form>
    </div>
    )
}