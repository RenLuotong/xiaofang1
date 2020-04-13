import React from 'react';
import {
    message,
    Table,
    Popconfirm, Icon,
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            renyuanbianhao:this.props.match.params.renyuanbianhao,
            baimingdanList:[],
            shebeiList:[],
        };
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
        });
    }

    getInfo() {
        const THE = this;
        let renyuanbianhao = THE.state.renyuanbianhao;
        $.ajax({
            type : 'GET',
            url : SERVER + "yqrltupianall?renyuanbianhao=" + renyuanbianhao,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    baimingdanList:data.data.list,
                    shebeiList:data.data.baimingdanlist,
                });
            }
        });
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER+"shanchuyqrltupian?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.getInfo();
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'tupianid',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '照片',
            dataIndex: 'renliantupian',
            render: (text, record) => (

                <span>
			    	<img src={record['renliantupian']} width="100px" height="100px"/>
			    </span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
			    	<Popconfirm placement="topLeft" title="确认要删除该照片?" onConfirm={this.toDelete.bind(this,record['tupianid'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        }];

        const columns2 = [{
            title: 'id',
            dataIndex: 'tupianid',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '设备序列号',
            dataIndex: 'shebeixuliehao',
        },{
            title: '设备用途',
            dataIndex: 'shebeiyongtu',
        },{
            title: '白名单状态',
            dataIndex: 'baimingdanzhuangtai',
        }];

        return (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>人员信息
                </p>
                <Table
                    columns={columns}
                    dataSource={this.state.baimingdanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>设备信息
                </p>
                <br/>
                <Table
                    columns={columns2}
                    dataSource={this.state.shebeiList}
                />

            </div>
        );
    }
}

export default App;
