//React
import React, {Component} from 'react';
import {connect} from 'react-redux';

//Components
import {Button, Radio} from 'antd';

//Selectors
import {selectSpotifyName} from '../../redux/selectors';

//Name Gen
var generateName = require('sillyname');
var generate_names = require('name-jam-rator');

const RadioGroup = Radio.Group;

class UsernameChoices extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmedUsername:"",
            randomUsername: generate_names()[0],
            value: 1
        };
    }

    setRadioChoice = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    generateUsername = () => {
        const {handleUsername} = this.props;
        const {randomUsername} = this.state;
        const newRandomUsername = generate_names()[0];
        this.setState({
          randomUsername: newRandomUsername
        });
        handleUsername(newRandomUsername);
      }

    render(){
        const {display_name, handleUsername} = this.props
        const {randomUsername, value} = this.state;
        return(
            <RadioGroup
                onChange = {this.setRadioChoice}
                value = {value}>
                <Radio className = {randomUsername} style={RadioStyle} value = {0} onClick = {() => handleUsername(randomUsername)}>
                    <Button onClick = {this.generateUsername}> Generate Random Name</Button>
                    {randomUsername}
                </Radio>
                <Radio className = {display_name} style={RadioStyle} value = {1} onClick = {() => handleUsername(display_name)}>
                    Spotify Account: {display_name} 
                </Radio>
            </RadioGroup>
        );
    }
}

const RadioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const mapStateToProps = (state) => ({
    display_name: selectSpotifyName(state)
});

export default connect(mapStateToProps, null)(UsernameChoices);