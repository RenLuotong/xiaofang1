import React, { Component } from 'react';
import {message,Button,Table,Form,Select,DatePicker,Icon,Divider,Popconfirm} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                </Switch>
            </div>
        );
    }
}


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <p style={{fontSize: '30px',color: '#000'}}>
                    待完善...
                </p>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
