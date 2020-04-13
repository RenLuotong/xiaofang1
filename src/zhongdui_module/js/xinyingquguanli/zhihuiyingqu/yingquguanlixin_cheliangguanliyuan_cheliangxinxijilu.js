import React from 'react';
import yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai from './yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai';
import yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng from './yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng';
import {Link, Route ,Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Input, Select,
} from 'antd';

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            YingqucheliangList: [],
        };
    }

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai/:id'} component = {yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng'} component = {yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng} />
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            cheliangleibieiList: [],
        };
    }

    getcheliangleibieiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "cheliangleixingMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    cheliangleibieiList: list,
                });
            }
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let cheliangleibie = form.getFieldValue('cheliangleibie');
        if (typeof(cheliangleibie) == "undefined"||cheliangleibie == "-1") {
            cheliangleibie = '';
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "YingqucheliangList?page="+page+"&size="+size+"&chepaihaoma="+chepaihaoma+"&cheliangLeixingEnum="+cheliangleibie,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    YingqucheliangList: data.data.content,
                    pagination,
                });
            }
        });
    }

    search() {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    //删除车辆
    toDelete(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER+"deleteYingqucheliang?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.fetch();
            }
        });
    }

    //导出功能
    output() {
        let _headers = ['机构名称','营区名称','车辆管理人', '车牌号码','车辆品牌', '车辆类别', '所属部门']
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let cheliangleibie = form.getFieldValue('cheliangleibie');
        if (typeof(cheliangleibie) == "undefined"||cheliangleibie == "-1") {
            cheliangleibie = '';
        }
        $.ajax({
            type:'GET',
            url: SERVER+ "YingqucheliangList?page=0&size=100000?chepaihaoma="+chepaihaoma+"&cheliangleibie="+cheliangleibie,
            success: function(data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj={};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqumingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqumingcheng'];
                    }
                    if (data.data.content[i]['xingming'] == null) {
                        obj['车辆管理人'] = '';
                    } else {
                        obj['车辆管理人'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['chepaihaoma'] == null) {
                        obj['车牌号码'] = '';
                    } else {
                        obj['车牌号码'] = data.data.content[i]['chepaihaoma'];
                    }
                    if (data.data.content[i]['cheliangpinpai'] == null) {
                        obj['车辆品牌'] = '';
                    } else {
                        obj['车辆品牌'] = data.data.content[i]['cheliangpinpai'];
                    }
                    if (data.data.content[i]['cheliangleixing'] == null) {
                        obj['车辆类别'] = '';
                    } else {
                        obj['车辆类别'] = data.data.content[i]['cheliangleixing'];
                    }
                    if (data.data.content[i]['suosubumen'] == null) {
                        obj['所属部门'] = '';
                    } else {
                        obj['所属部门'] = data.data.content[i]['suosubumen'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前车辆信息没有数据！");
                    return;
                }

                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };

                //导出 Excel
                XLSX.writeFile(wb, '车辆信息记录.xlsx');
            }

        })

    }

    componentDidMount() {
        this.fetch();
        this.getcheliangleibieiList();
    }

    render() {

        let cheliangleibieOptions = this.state.cheliangleibieiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '20%'
        },{
            title: '车主',
            dataIndex: 'xingming',
          width: '20%'
        },{
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
          width: '20%'
        }, {
            title: '车辆品牌',
            dataIndex: 'cheliangpinpai',
          width: '20%'
        },{
            title: '车辆类别',
            dataIndex: 'cheliangleixing',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该车辆信息?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="车辆类别">
                        {getFieldDecorator('cheliangleibie')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {cheliangleibieOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.output.bind(this)} style={{margin: 5}}>
                            <Icon type="export" />导出
                        </Button>
                    </FormItem>
                </Form>
                <Button>
                    <Link to={this.props.match.url + '/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng'} style={{margin: 5}}>
                        <Icon type="plus" /><span>车辆登记</span></Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.YingqucheliangList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 405px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
