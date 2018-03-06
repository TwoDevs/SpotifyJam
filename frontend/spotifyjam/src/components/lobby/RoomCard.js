import React from 'react';
import {Card} from 'antd';
const {Meta} = Card;

const RoomCard = (props) => {
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta
                title={props.roomName}
                description="www.instagram.com"/>
        </Card>
    )
}

export default RoomCard;