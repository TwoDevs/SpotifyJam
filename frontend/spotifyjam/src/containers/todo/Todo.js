import React from 'react';
import {Steps, Icon, List} from 'antd';

const Todo = (props) => {
    const data = [
        {
            title: "Setup Redux Store",
            description: "https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react",
            status: "Completed"
        },
        {
            title: "Setup React Router",
            description: "https://reacttraining.com/react-router/web/guides/philosophy",
            status: "Completed"
        },
        {
            title: "Setup Antd UI Library",
            description: "https://ant.design/",
            status: "Completed"
        },
        {
            title: "Create Redirect/Verification Page",
            description: "https://reacttraining.com/react-router/web/example/auth-workflow",
            status: "In Progress"
        },
        {
            title: "Create Memoized Selectors with Reselect",
            description: "...",
            status: "In Progress"
        },
        {
            title: "Setup Simple Serverside Rendering",
            description: "https://youtu.be/82tZAPMHfT4",
            status: "In Progress"
        },
        {
            title: "Setup Firebase CDN Caching ",
            description: "https://youtu.be/82tZAPMHfT4",
            status: "In Progress"
        },
        {
            title: "Automated Unit Testing ",
            description: "...",
            status: "In Progress"
        },
        {
            title: "Logging Systems Integrated with Redux Actions ",
            description: "...",
            status: "In Progress"
        },

    ];
    return(
        <div>
            <h1>Todo List</h1>
            <hr/>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}/>
                        <div>{item.status}</div>
                    </List.Item>
                )}
            />
        </div>
    );
};


export default Todo;