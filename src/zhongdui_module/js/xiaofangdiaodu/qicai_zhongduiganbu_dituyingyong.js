/*消防车实时位置*/
import React from 'react';
import ReactDOM from 'react-dom';
import Iframe from 'react-iframe';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    changeFrameHeight(){
        var ifm= document.getElementById("mainiframe");
        ifm.height=document.documentElement.clientHeight-100;
    }

    componentDidMount() {
       this.changeFrameHeight();
    }

    render() {
        return(
            <div>
                <iframe
                    id="mainiframe"
                    ref="iframe"
                    src="./common/html/amap.html"
                    width="98%"
                    height="600"
                    scrolling="no"
                    frameBorder="0"
                />
            </div>
        );
    }
}

export default App;
