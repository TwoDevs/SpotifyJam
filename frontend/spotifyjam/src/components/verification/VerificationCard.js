//React
import React, {Component} from 'react';

//Components
import {Card} from 'antd';

//Helper Libraries
const queryString = require('query-string');

class VerificationCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: ""
        };
    }

    //Lifecycle Functions
    componentDidMount(){
        const {hash} = this.props.location;
        if (this.props.location.hash){
            this.setState({
                accessToken: queryString.parse(this.props.location.hash).access_token
            });
        }
    }

    render() {
        const {access_token} = this.state;
        return (
            <Card>
                <p>{access_token}</p>
            </Card>
        );
    }
}

export default VerificationCard;