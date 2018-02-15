//React | Router
import React from 'react';

//Components
import {Card, Button} from 'antd';

const SplashCard = (props) => {
    return(
        <Card title="Spotify Jam!" style={{ width: 300, position: "absolute", top: "40%", left: "42%", textAlign: "center" }}>
            <p>Come jam out to songs together!</p>
            <Button type="primary" href={process.env.REACT_APP_SERVER_URL + "/login"} size='large'>Verify Spotify</Button>
            <p>PORT: {process.env.REACT_APP_SERVER_PORT}</p>
        </Card>
    );
}

export default SplashCard;
