import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext'
import ErrorNotice from '../../components/misc/ErrorNotice';
import axios from 'axios';


export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post('/user/register', newUser);
            const loginRes = await axios.post ('/user/login', ({email, password}) );
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
            <h2>Register</h2>
            {error && (<ErrorNotice message={error} clearError= {() => setError(undefined)} />)}
            <form className = "form" onSubmit={submit}>
                <label htmlform="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlorm="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Verify Password" onChange={(e) => setPasswordCheck(e.target.value)} />

                <label htmlform="register-displayName">Display name</label>
                <input id="register-displayName" type="text" onChange={(e) => setDisplayName(e.target.value)}/>

                <input type="submit" value="Register" />

            </form>
        </div>
    )
}