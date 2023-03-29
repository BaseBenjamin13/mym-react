import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

    const [user, setUser] = useState(false);
    const [data, setData] = useState();



    return (
        <div className="App">
            <h1 className="header">NASA: Image Of The Day</h1>

            <div className="forms-container">

                {!user &&
                    <>
                        <a href="/googleauth">Login With Google</a>

                        <div className="registerForm">
                            <h2>Register</h2>
                            <form action="/register" method="POST">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" name="userName" placeholder="userName here"
                                        aria-label="Username" aria-describedby="addon-wrapping"/>
                                </div>
                                <p className="required">Required ^</p>

                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">Password</span>
                                    <input type="text" className="form-control" name="password" placeholder="password here"
                                        aria-describedby="addon-wrapping"/>
                                </div>
                                <p className="required">Required ^</p>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </>
                }

                {!user &&
                    <div className="loginForm">
                        <h2>Login</h2>
                        <form action="/login" method="POST">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">@</span>
                                <input type="text" className="form-control" name="userName" placeholder="userName here"
                                    aria-label="Username" aria-describedby="addon-wrapping"/>
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
                }

                </div>
            {user &&
                <div className="user-container">
                    <h1>Hello {user.userName}</h1>
                    <form action="/logout" method="POST">
                        <button type="submit" className="btn-danger">Log Out</button>
                    </form>
                    <img src={data.hdurl} alt='NASAs picture of the day'/>
                </div>
            }
        </div>
    );
}

export default App;
