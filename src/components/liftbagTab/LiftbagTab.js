import React, {Component} from 'react';
import './LiftbagTab.css';
import BigRedButton from '../common/BigRedButton/BigRedButton';
import ROSLIB from 'roslib';

class LiftbagTab extends Component {
    componentDidMount() {
        const ros = new ROSLIB.Ros({url: 'ws://localhost:9090'});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/liftbag_release',
            messageType: 'std_msgs/String',
        });
    }

    componentWillUnmount() {
        this.topic.unsubscribe();
    }

    render() {
        return <div id="liftbag-tab"><BigRedButton onClick={() => this.topic.publish({data: 'Release'})} text="Release"/></div>
    }
}

export default LiftbagTab;
