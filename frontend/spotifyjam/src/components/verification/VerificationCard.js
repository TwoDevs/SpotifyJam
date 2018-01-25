//React
import React from 'react';

//Components
import {Card, Spin} from 'antd';


const VerificationCard = (props) => {
    return (
        <Card title = "Verifying..." style={{ width: 300, position: "absolute", top: "40%", left: "42%", textAlign: "center" }}>
            <Spin size="large" />
        </Card>
    );
}

export default VerificationCard;