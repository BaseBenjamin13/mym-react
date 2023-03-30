import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import GoogleOauth from './components/GoogleOauth';

function App() {

    const [user, setUser] = useState(false);
    const [data, setData] = useState();
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/`)
            .then((res) => {
                setData(res.data.data);
                setUser(res.data.user);
            })
            .catch(err => console.log(err));
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/register`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "userName": e.target.userName.value,
                "password": e.target.password.value
            }
        })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(err => console.log(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target.userName.value)
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/login`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "userName": e.target.userName.value,
                "password": e.target.password.value
            }
        })
            .then((user) => {
                if (typeof user.data.userName === "string") {
                    setUser(user.data);
                } else setPasswordError('Wrong password, try again.')
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="App">
            <h1 className="header">NASA: Image Of The Day</h1>

            <div className="forms-container">

                {!user &&
                    <>


                        <div className="registerForm">
                            <h2>Register</h2>
                            <form onSubmit={handleRegister}>
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" name="userName" placeholder="userName here"
                                        aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>
                                <p className="required">Required ^</p>

                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">Password</span>
                                    <input type="text" className="form-control" name="password" placeholder="password here"
                                        aria-describedby="addon-wrapping" />
                                </div>
                                <p className="required">Required ^</p>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                        <GoogleOauth setUser={setUser} />

                        <div className="loginForm">
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                {/* <form action='http://localhost:8080/api/login' method='post'> */}
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" name="userName" placeholder="userName here"
                                        aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>
                                <p className="required">Required ^</p>

                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">Password</span>
                                    <input type="text" className="form-control" name="password" placeholder="password here"
                                        aria-describedby="addon-wrapping" />
                                </div>
                                <p className="required">Required ^</p>

                                {passwordError && <h2 style={{ color: 'red' }}>{passwordError}</h2>}

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </>
                }

            </div>
            {user && data &&
                <div className="user-container">
                    <h1>Hello {user.userName}</h1>

                    <button onClick={() => setUser(false)} className="btn-danger">Log Out</button>
                    <br></br>
                    {/* <form onSubmit={handleLogout}>
                        <button type="submit" className="btn-danger">Log Out</button>
                    </form> */}
                    <img className="img-day" src={data.hdurl} alt='NASAs picture of the day' />
                </div>
            }
        </div>
    );
}

export default App;
