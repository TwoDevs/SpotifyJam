//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect, withRouter} from 'react-router-dom';

//Components
import {Steps, Icon, Spin} from 'antd';

//Actions
import {authorize} from '../../redux/session/sessionActions';

//Selectors
import {selectLoadingStatus} from '../../redux/selectors';

const Step = Steps.Step;

class Verification extends Component {

    //Lifecycle Functions
    componentDidMount(){
        this.props.authorize();
    }

    render() {
        const {tokenStatus, profileStatus, auth} = this.props.loadingStatus;
        return (
            <div>
                <div>
                    <Spin size = "large" style = {{textAlign: 'center', width: '100%', left: '40%'}}/>
                    <Steps>
                        
                        <Step status={tokenStatus} title="Retrieving Tokens" 
                            icon={<Icon type= {tokenStatus === "process" ? "loading" : "key"} />} />
                        
                        <Step status={profileStatus} title="Loading Profile" 
                            icon={<Icon type={profileStatus === "process" ? "loading" : "solution"} />} />
                    
                    </Steps>
                </div>
            </div>
        );
    }
}

// {auth ? 
//     <Redirect to='/lobby'/> 
//     :
// }

const mapDispatchToProps = dispatch => bindActionCreators({
    authorize
}, dispatch);

const mapStateToProps = (state) => {
    return {
        loadingStatus: selectLoadingStatus(state)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verification));