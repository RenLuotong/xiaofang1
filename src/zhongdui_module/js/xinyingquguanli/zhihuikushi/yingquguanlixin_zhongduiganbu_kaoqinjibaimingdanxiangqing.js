import React from 'react';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            getInfo:{},
        };
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        let sblx = "考勤机";
        $.ajax({
            type : 'GET',
            url : SERVER+"shebeixinxi?shebeileixing="+sblx+"&id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    getInfo: data.data,
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }

    render() {
        let info = this.state.getInfo;
        return (
            <div>
                <table id="mytable" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th scope="col" className="nobg" colSpan="4">考勤机详情</th>
                    </tr>
                    <tr>
                        <th scope="row" className="spec">设备地点</th>
                        <td >{info['weizhi']}</td>
                        <th scope="row" className="spec">设备用途</th>
                        <td >{info['yongtu']}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="specalt">设备序列号</th>
                        <td className="alt">{info['shebeixuliehao']}</td>
                        <th scope="row" className="specalt">连通状态</th>
                        <td className="alt">{info['liantongzhuangtai']}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
