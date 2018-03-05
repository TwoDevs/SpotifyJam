//React | Router
import React from 'react';

//Components
import {Card, Button} from 'antd';

//Icons
import SpotifyIcon from 'react-icons/lib/fa/spotify';

const buttonStyle = {
    background: '#1DB954',
    borderColor: '#1DB954'
}

const SplashCard = (props) => {
    return(
        <Card title="Spotify Jam" style={{ width: 300, position: "absolute", top: "40%", left: "42%", textAlign: "center" }}>
            <Button type="primary" style = {buttonStyle} href={process.env.REACT_APP_SERVER_URL + "/login"} size='large'>
                <SpotifyIcon/> Login with Spotify!
            </Button>
        </Card>
    );
}

export default SplashCard;
