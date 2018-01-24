//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import VerificationCard from './VerificationCard';
import { withRouter } from 'react-router-dom'

//Selectors
import {selectLocationHash} from '../../redux/selectors';

//Actions
import {verify} from '../../redux/features/session/sessionActions';

class Verification extends Component {

    redirectToLobby = () => {
        const {history} = this.props;
        history.push('/lobby');
    }

    //Lifecycle Functions
    componentDidMount(){
        const {verify, hash} = this.props;
        verify(hash);
        this.redirectToLobby();
    }

    render() {
        return (
            <VerificationCard/>
        );
    }
}

const mapStateToProps = (state) => ({
    hash: selectLocationHash(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    verify
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verification));