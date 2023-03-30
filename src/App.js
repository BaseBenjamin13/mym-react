import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import GoogleOauth from './components/GoogleOauth';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {

    const [user, setUser] = useState(false);
    const [data, setData] = useState();
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/`)
            .then((res) => {
                setData(res.data.data);
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
            .then((user) => {
                setUser(user.data);
            })
            .catch(err => console.log(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();

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

            {!user && <h2 className="header">Login to see the image of the day</h2>}

            <div className="forms-container">

                {!user &&
                    <Tabs>
                        <TabList>
                            <Tab>Google Login</Tab>
                            <Tab>Register</Tab>
                            <Tab>Login</Tab>
                        </TabList>

                        <TabPanel>
                            <GoogleOauth setUser={setUser} />
                        </TabPanel>

                        <TabPanel>
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

                        </TabPanel>



                        <TabPanel>
                            <div className="loginForm">
                                <h2>Login</h2>
                                <form onSubmit={handleLogin}>
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
                        </TabPanel>
                    </Tabs>
                }

            </div>
            {user && data &&
                <div className="user-container">
                    <h1>Hello {user.userName}</h1>

                    <button onClick={() => setUser(false)} className="btn-danger">Log Out</button>
                    <br></br>
                    <img className="img-day" src={data.hdurl} alt='NASAs picture of the day' />
                </div>
            }
        </div>
    );
}

export default App;
