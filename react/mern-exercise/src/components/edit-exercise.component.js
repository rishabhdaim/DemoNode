/**
 * Created by diam on 10/08/19.
 */

import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercises extends Component {

    constructor(props) {
        super(props);

        // to  bind this inside the methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/mern/exercise/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.error(err));

        axios.get('http://localhost:5000/mern/user/').
        then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                })
            }
        });

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(exercise);

        axios.post('http://localhost:5000/mern/exercise/update/'+ this.props.match.params.id, exercise).then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(user => <option key={user} value={user}>{user}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
