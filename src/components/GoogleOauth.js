import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function GoogleOauth({ setUser }) {

    function handleCallback(response) {
        const userObject = jwt_decode(response.credential);
        setUser({ userName: userObject.name })
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallback
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {
                theme: 'outline',
                size: 'large'
            }
        )

        google.accounts.id.prompt();

    }, [])

    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}

export default GoogleOauth