//React | Redux
import React from 'react';
import {connect} from 'react-redux';

//Components
import ReactJson from 'react-json-view'

const ReduxView = (props) => {
    return(
        <div>
            <h1>Redux Store</h1>
            <hr/>
            <ReactJson src={props.store} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    store: state
});

export default connect(mapStateToProps, null)(ReduxView);