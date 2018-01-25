//React | Router
import React from 'react';

//Components
import {Card, Button} from 'antd';

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;


const SplashCard = (props) => {
    return(
        <Card title="Spotify Jam!" style={{ width: 300, position: "absolute", top: "40%", left: "42%", textAlign: "center" }}>
            <p>Come jam out to songs together!</p>
            <Button type="primary" href={server_url + "/login"} size='large'>Verify Spotify</Button>
        </Card>
    );
}

export default SplashCard;
