import react, { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [user, setUser] = useState(false);
    const [data, setData] = useState();

    return (
        <div className="App">
            <h1 class="header">NASA: Image Of The Day</h1>

            <div class="forms-container">

                {!user &&
                    <>
                        <a href="/googleauth">Login With Google</a>

                        <div class="registerForm">
                            <h2>Register</h2>
                            <form action="/register" method="POST">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" class="form-control" name="userName" placeholder="userName here"
                                        aria-label="Username" aria-describedby="addon-wrapping"/>
                                </div>
                                <p class="required">Required ^</p>

                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping">Password</span>
                                    <input type="text" class="form-control" name="password" placeholder="password here"
                                        aria-describedby="addon-wrapping"/>
                                </div>
                                <p class="required">Required ^</p>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </>
                }

                {!user &&
                    <div class="loginForm">
                        <h2>Login</h2>
                        <form action="/login" method="POST">
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping">@</span>
                                <input type="text" class="form-control" name="userName" placeholder="userName here"
                                    aria-label="Username" aria-describedby="addon-wrapping"/>
                            </div>
                            <p class="required">Required ^</p>

                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping">Password</span>
                                <input type="text" class="form-control" name="password" placeholder="password here"
                                    aria-describedby="addon-wrapping" />
                            </div>
                            <p class="required">Required ^</p>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                }

                </div>
            {user &&
                <div className="user-container">
                    <h1>Hello {user.userName}</h1>
                    <form action="/logout" method="POST">
                        <button type="submit" class="btn-danger">Log Out</button>
                    </form>
                    <img src={data.hdurl} />
                </div>
            }
        </div>
    );
}

export default App;
