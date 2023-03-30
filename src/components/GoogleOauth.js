import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

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
            document.getElementById('g-signin2'),
            {
                theme: 'outline',
                size: 'large'
            }
        )


        google.accounts.id.prompt();

    }, [])

    return (
        <div className='google-login'>
            <div id="g-signin2"></div>
        </div>
    )
}

export default GoogleOauth