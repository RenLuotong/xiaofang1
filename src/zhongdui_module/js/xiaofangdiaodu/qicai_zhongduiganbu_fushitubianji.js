/*消防车实时位置*/
import React from 'react';
import ReactDOM from 'react-dom';
import Iframe from 'react-iframe';
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
                    <Route exact path = {this.props.match.path} component = {App} />
                </Switch>
            </div>
        );
    }
}
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return(
            <div>
                <iframe
                    ref="iframe"
                    src="./common/html/set.html"
                    width="98.5%"
                    height="1000px"
                    scrolling="no"
                    frameBorder="0"
                />
            </div>
        );
    }
}

export default App;
