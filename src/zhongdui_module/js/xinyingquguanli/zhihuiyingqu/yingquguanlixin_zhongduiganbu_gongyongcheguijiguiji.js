/*消防车实时位置*/
import React from 'react';
import ReactDOM from 'react-dom';
import Iframe from 'react-iframe'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chepaihaoma:this.props.match.params.chepaihaoma,
        }
    }


    componentDidMount() {
        myFramez.window.chepaihaoma=this.props.match.params.chepaihaoma;
    }

    render() {
        return(
            <div>
                <iframe
                    ref="iframe"
                    src="./common/html/amapgongwucheLink.html"
                    width="100%"
                    height="800px"
                    scrolling="no"
                    frameBorder="0"
                    name='myFramez'
                />
            </div>
        );
    }
}

export default App;
