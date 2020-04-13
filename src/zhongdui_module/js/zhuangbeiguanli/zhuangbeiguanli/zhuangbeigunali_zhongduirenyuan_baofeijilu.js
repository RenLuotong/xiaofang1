import React, { Component } from 'react';
import {message,Button,Table,Form,Select,DatePicker,Icon} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import moment from 'moment';
import zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing from './zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing';

const FormItem = Form.Item;
const Option = Select.Option;

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
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing/:id'} component = {zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing} />
                </Switch>
            </div>
        );
    }
}


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            wuziList: [],
            startValue: null,
            endValue: null,
            leixing: '',
        };
    }

    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
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
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let leixing = this.state.leixing;
        if (leixing == "-1") {
            leixing = '';
        }
        let page = params.page - 1;
      let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "lbzhuangbeixinzengbaofei?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&leixing="+leixing
            	+"&sort=shenqingshijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]['key'] = data.data.content[i]['id'];
                    if (data.data.content[i]['caozuoshijian'] != null && data.data.content[i]['caozuoshijian'] != "") {
                    	data.data.content[i]['caozuoshijian'] = moment(data.data.content[i]['caozuoshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    wuziList: list,
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

    leixingChange(value) {
        this.setState({
            leixing: value,
        });
    }


    componentDidMount() {
        this.fetch();
    }

    render() {

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,leixing} = this.state;

        const columns = [{
            title: 'shenqingdanbianhao',
            dataIndex: 'shenqingdanbianhao',
            colSpan : 0,
            className:'hidden_col',
          width: '10%'
        }, {
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '10%'
        }, {
            title: '操作人',
            dataIndex: 'caozuorenxingming',
          width: '10%'
        }, {
            title: '操作',
            dataIndex: 'leixing',
          width: '10%'
        }, {
            title: '装备名称',
            dataIndex: 'zhuangbeimingcheng',
          width: '10%'
        }, {
            title: '时间',
            dataIndex: 'caozuoshijian',
          width: '10%'
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
            	return (
                	<span>
                		<Link to={this.props.match.url + '/zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing/' + record['id']}>详情</Link>
			    	</span>
	    		)
            },
        }];



        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="操作类型">
                        <Select
                            style={{width:200}}
                            onChange={this.leixingChange.bind(this)}
                            value={leixing}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            <Select.Option value="报废">报废</Select.Option>
                            <Select.Option value="新增">新增</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.wuziList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 345px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
