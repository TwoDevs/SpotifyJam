import React from 'react';
import {Card} from 'antd';
const {Meta} = Card;

const RoomCard = (props) => {
    const {roomName, owner} = props;
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta
                title={roomName}
                description="www.instagram.com"/>
        </Card>
    )
}

export default RoomCard;