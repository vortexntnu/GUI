import React from 'react';
import {Grid} from 'semantic-ui-react';
import BubbleLevel from './BubbleLevel';
import ROSLIB from "roslib";

class General extends React.Component {
    constructor() {
        super();
        this.state = {
            angles: {
                x: 0,
                y: 0,
            }
        };
    }

    componentDidMount() {
        this.ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });

        this.anglesTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/angles',
            messageType: 'geometry_msgs/Point'
        });

        this.anglesTopic.subscribe((msg) => {
            console.log(msg);
            this.setState({
                angles: {
                    x: msg.x,
                    y: msg.y,
                }
            });
        });

        this.spammer = setInterval(() => this.anglesTopic.publish(this.newPoint()), 100);
    }

    newPoint() {
        const x = (this.state.angles.x + Math.random() * 0.4 - 0.2) / 1.01;
        const y = (this.state.angles.y + Math.random() * 0.4 - 0.2) / 1.01;
        return {x: x, y: y};
    }

    componentWillUnmount() {
        this.anglesTopic.unsubscribe();
        clearInterval(this.spammer);
    }

    render() {
        return (
            <Grid id="obs-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h1>OBS-level</h1>
                        <BubbleLevel angles={this.state.angles}/>
                    </Grid.Column>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default General;