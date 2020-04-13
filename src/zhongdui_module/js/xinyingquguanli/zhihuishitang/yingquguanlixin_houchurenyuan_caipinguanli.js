import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
    message,
    Popconfirm,
    Button,
    Table,
    Divider
} from 'antd';
import yingquguanlixin_houchurenyuan_caipinguanlixinzeng from './yingquguanlixin_houchurenyuan_caipinguanlixinzeng';
import yingquguanlixin_houchurenyuan_caipinguanlixiugai from './yingquguanlixin_houchurenyuan_caipinguanlixiugai';

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_caipinguanlixinzeng/'} component = {yingquguanlixin_houchurenyuan_caipinguanlixinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_caipinguanlixiugai/:id'} component = {yingquguanlixin_houchurenyuan_caipinguanlixiugai} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            caipinList: [],
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
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    toDelete(id){
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"tb-caipins/"+id,
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("删除成功");
                THE.fetch();
            },
            error : function() {
                message.error('操作失败');
            }
        });
    }

    fetch(params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) {
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url : SERVER + "tb-caipins/getAllTbCaipins?page="+page+"&size="+size,
            success : function(data){
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["leixing"] == 'Huncai'){
                        data.data.content[i]["leixing"] = '荤菜'
                    }else if(data.data.content[i]["leixing"] == 'Sucai'){
                        data.data.content[i]["leixing"] = '素菜'
                    }else if(data.data.content[i]["leixing"] == 'Daguocai'){
                        data.data.content[i]["leixing"] = '大锅菜'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    caipinList: list,
                    pagination,
                });
            }
        });
    }

    componentDidMount () {
        this.fetch();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '菜品名称',
            dataIndex: 'mingcheng',
        },{
            title: '菜品类型',
            dataIndex: 'leixing',
        }, {
            title: '菜品图片',
            dataIndex: 'tupian',
            render: (text, record) => (

                <span>
			    	<img src={record['tupian']} width="100px" height="100px"/>
			    </span>
            ),
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
					<Link to={this.props.match.url+'/yingquguanlixin_houchurenyuan_caipinguanlixiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除此菜品吗?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        }];

        return (
            <div>
                <Link to={this.props.match.url+'/yingquguanlixin_houchurenyuan_caipinguanlixinzeng'}>
                    <Button type="primary" style={{margin:5}}>新增菜品</Button>
                </Link>
                <Table
                    columns={columns}
                    dataSource={this.state.caipinList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default Appmain;
