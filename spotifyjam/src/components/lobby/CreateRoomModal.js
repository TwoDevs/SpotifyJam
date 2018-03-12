import React, { Component } from "react";

//Components
import { Modal, Affix, Button, Icon, Input, Form } from "antd";
const FormItem = Form.Item;

class CreateRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      createLoading: false,
      roomName: ""
    };
  }

  showRoomModal = () => {
    this.setState({ modalVisible: true });
  };
  cancelClicked = () => {
    if (!this.state.createLoading) {
      this.setState({ modalVisible: false });
    }
  };

  handleRoomNameInput = e => {
    this.setState({ roomName: e.target.value });
  };
  handleCreateRoomSubmit = () => {
    const { roomName } = this.state;
    if (roomName.length > 0) {
      this.setState({ createLoading: true });
      this.props.createRoom(roomName);
      this.setState({ createLoading: false });
    }
  };

  render() {
    const { modalVisible, createLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Create a room!"
          onOk={this.handleCreateRoomSubmit}
          onCancel={this.cancelClicked}
          confirmLoading={createLoading}
          visible={modalVisible}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Form layout="vertical" onSubmit={this.handleCreateRoomSubmit}>
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "Room title required" }]
              })(
                <Input
                  prefix={
                    <Icon
                      type="play-circle-o"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Room Title"
                  onChange={this.handleRoomNameInput}
                />
              )}
            </FormItem>
          </Form>
        </Modal>

        <Affix style={{ position: "absolute", bottom: "10%", right: "5%" }}>
          <Button type="primary" size="large" onClick={this.showRoomModal}>
            <Icon type="plus-circle-o" />Create Room
          </Button>
        </Affix>
      </div>
    );
  }
}

export default Form.create()(CreateRoomModal);
