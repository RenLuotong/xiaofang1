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
        let sblx = "人脸识别仪";
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
	                        <th scope="col" className="nobg" colSpan="4">人脸识别仪详情</th>
	                    </tr>
	                    <tr>
	                        <th scope="row" className="spec">IP地址</th>
	                        <td>{info['juyuwangip']}</td>
	                        <th scope="row" className="spec">端口号</th>
	                        <td>{info['juyuwangduankou']}</td>
	                    </tr>
	                    <tr>
	                        <th scope="row" className="specalt">设备地点</th>
	                        <td className="alt">{info['weizhi']}</td>
	                        <th scope="row" className="specalt">设备用途</th>
	                        <td className="alt">{info['yongtu']}</td>
	                    </tr>
	                    <tr>
	                        <th scope="row" className="spec">设备序列号</th>
	                        <td>{info['shebeixuliehao']}</td>
	                        <th scope="row" className="spec">生产厂家</th>
	                        <td>{info['shengchanchangjia']}</td>
	                    </tr>
	                    <tr>
	                        <th scope="row" className="specalt">设备账号</th>
	                        <td className="alt">{info['zhanghao']}</td>
	                        <th scope="row" className="specalt">设备密码</th>
	                        <td className="alt">{info['mima']}</td>
	                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
