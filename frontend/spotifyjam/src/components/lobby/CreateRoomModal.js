import React, {Component} from 'react';

//Components
import {Modal, Affix, Button, Icon} from 'antd';


class CreateRoomModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            createLoading: false
        };
    }

    showRoomModal = () => { this.setState({ modalVisible: true }) }
    confirmClicked = () => { this.setState({ createLoading: true }) }
    cancelClicked = () => { 
        if (!this.state.createLoading){
            this.setState({ modalVisible: false });
        }
    }

    render() {
        const {modalVisible, createLoading} = this.state;
        return(
            <div>
                <Modal 
                    title="Create a room!"
                    onOk={this.confirmClicked}
                    confirmLoading={createLoading}
                    onCancel={this.cancelClicked}
                    visible={modalVisible}>
                </Modal>
                <Affix style={{ position: 'absolute', bottom: '10%', right: '5%'}}>
                    <Button type="primary" size="large" onClick={this.showRoomModal}>
                        <Icon type="plus-circle-o" />Create Room
                    </Button>
                </Affix>
        </div>
        )
    }
}

export default CreateRoomModal;

