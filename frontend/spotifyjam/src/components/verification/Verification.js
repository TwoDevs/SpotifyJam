//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter, Link} from 'react-router-dom';

//Components
import {Steps, Icon, Spin, Button, Row, Col} from 'antd';

//Actions
import {connectionHandler} from '../../redux/session/sessionActions';

//Selectors
import {selectLoadingStatus, selectReAuthStatus} from '../../redux/selectors';

//Redirect
import {
    redirectToLobby
} from '../../redux/API/historyFunctions';

const Step = Steps.Step;

class Verification extends Component {

    componentWillMount(){
        if (this.props.reAuthStatus === 'finished'){
            this.props.redirectToLobby();
        }
        else{
            this.props.connectionHandler();
        }
    }

    render() {
        const {tokenStatus, profileStatus, authStatus} = this.props.loadingStatus;
        const loadCompleted = tokenStatus === 'finished' && profileStatus === 'finished' && authStatus === 'finished';
        return (
            <div>
                {
                loadCompleted ? 
                    <div style = {{textAlign: 'center', width: '100%', left: '40%', paddingTop: '10%'}}>
                        <h1>Ready!</h1>
                    </div>
                        :
                    <div style = {{textAlign: 'center', width: '100%', left: '40%', paddingTop: '10%'}}>
                        <h2>Loading...</h2>
                        <Spin size = "large"/> 
                    </div>
                    
                }

                <Row gutter={32} type="flex" justify="center" align="middle" style = {{paddingTop: '10%'}}>
                    <Col span={16} >
                        <Steps>              
                            <Step status={tokenStatus} title="Authenicating Tokens" 
                                icon={<Icon type= {tokenStatus === "process" ? "loading" : "key"} />} />
                            
                            <Step status={profileStatus} title="Loading Profile" 
                                icon={<Icon type={profileStatus === "process" ? "loading" : "solution"} />} />
                            
                                <Step status={authStatus} title="Connecting Network" 
                                icon={<Icon type={authStatus === "process" ? "loading" : "cloud-download"} />} />           
                        </Steps>
                    </Col>
                </Row>

                <Row gutter={32} type="flex" justify="center" align="middle" style = {{paddingTop: '10%'}}>
                    <Col offset={14}>
                        {
                        loadCompleted && 
                            <Link to="/lobby"> 
                                <Button size="large" type="primary" >
                                    Next<Icon type="arrow-right"/>
                                </Button>
                            </Link>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    connectionHandler,
    redirectToLobby
}, dispatch);

const mapStateToProps = (state) => {
    return {
        loadingStatus: selectLoadingStatus(state),
        reAuthStatus: selectReAuthStatus(state)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verification));