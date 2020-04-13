import React from 'react';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            bumenInfo:{},
        };
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"Yingqucheliangxinxi?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    bumenInfo: data.data,
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }

    render() {

        let info = this.state.bumenInfo;

        return (
            <div>
                <table id="mytable" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th scope="col" className="nobg">车辆信息详情</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    <tr>
                        <th scope="row" className="spec">车辆管理人</th>
                        <td>{info['cheliangguanliren']}</td>
                        <th scope="row" className="spec">车牌号码</th>
                        <td>{info['chepaihaoma']}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="specalt">车辆品牌</th>
                        <td className="alt">{info['cheliangpinpai']}</td>
                        <th scope="row" className="specalt">车辆类别</th>
                        <td className="alt">{info['cheliangleixing']}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="spec">所属部门</th>
                        <td>{info['suosubumen']}</td>
                        <th scope="row" className="spec"></th>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
