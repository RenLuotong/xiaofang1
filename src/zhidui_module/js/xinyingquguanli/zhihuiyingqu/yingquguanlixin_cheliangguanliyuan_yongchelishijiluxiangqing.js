/*消防车实时位置*/
import React from 'react';
import ReactDOM from 'react-dom';
import Iframe from 'react-iframe';
import moment from 'moment';
import 'moment/locale/zh-cn';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chepaihaoma:this.props.match.params.chepaihaoma,
            paichekaishishijian:this.props.match.params.paichekaishishijian,
            paichejieshushijian:this.props.match.params.paichejieshushijian,
        }
    }


    componentDidMount() {
        myFramez.window.chepaihaoma=this.props.match.params.chepaihaoma;
        myFramez.window.paichekaishishijian=moment(this.props.match.params.paichekaishishijian).format('YYYY-MM-DD HH:mm:ss');
        myFramez.window.paichejieshushijian=moment(this.props.match.params.paichejieshushijian).format('YYYY-MM-DD HH:mm:ss');
    }

    render() {
        return(
            <div>
                <iframe
                    ref="iframe"
                    src="./common/html/amapgongwuchexiangqingLink.html"
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
