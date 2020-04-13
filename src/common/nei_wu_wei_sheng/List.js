import React, { Component } from 'react';
import moment from 'moment';
import {
  message, DatePicker, Popover, Tree, Card, Table, Select, Button, Icon
} from 'antd';
import Orgtree from '../components/OrgTree';
import { Link } from 'react-router-dom';
import TreeSideBar from '../components/TreeSideBar';

const { RangePicker } = DatePicker;

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current : 1
      },
      dataSource: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  expandedRowRenders = (record) => {
    let listData = record.info && record.info.length > 0 && record.info.map(item => {
      return (
        <div style={{display: 'flex',borderBottom: '1px dashed #afa9a9'}} key={record.jilubianhao}>
          <p style={{width: '12%',lineHeight: '30px'}}>
            {item.renyuanxingming}
          </p>
          <div style={{width: '88%'}}>
            {
              item.scores && item.scores.length > 0 && item.scores.map(items => {
                return (
                  <div style={{display: 'flex'}}>
                    <p style={{width: '20%',lineHeight: '30px'}}>{items.koufenliyou}</p>
                    <p style={{width: '20%',lineHeight: '30px'}}>{items.fenshu}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })
    return listData;
  }

  fetch = (params = {
    rows: this.state.pagination.pageSize,
    page: this.state.pagination.current
  }) => {
    let _this = this;
    let page = params.page - 1;
    let size = params.rows === undefined ? 10 : params.rows;
    let data = {
      jianchaleixing: '内务卫生',
      page: page,
      size: size
    }
    if(this.state.jianchashijian_before !== undefined && this.state.jianchashijian_before !== ""){
      data['jianchashijian_before'] = this.state.jianchashijian_before;
      data['jianchashijian_after'] = this.state.jianchashijian_after;
    }
    if(this.state.chakanfanwei !== undefined && this.state.chakanfanwei !== ""){
      data['chakanfanwei'] = this.state.chakanfanwei;
    }
    if(this.state.jigoudaima !== undefined && this.state.jigoudaima !== ""){
      data['jigoudaima'] = this.state.jigoudaima;
    }

    $.ajax({
      type:'GET',
      url: SERVER + "fengjiweisheng/jianchajilu-page2",
      data: data,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          list.push(data.data.content[i]);
        }
        const pagination = { ..._this.state.pagination };
        pagination.total = data.data.totalElement;
        _this.setState({
          dataSource: list,
          pagination,
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

  onChange = (date) => {
    if(date.length > 0){
      this.setState({
        jianchashijian_after: date[0].format('YYYY-MM-DD 00:00:01'),
        jianchashijian_before: date[1].format('YYYY-MM-DD 23:59:59')
      })
    }else {
      this.setState({
        jianchashijian_before: '',
        jianchashijian_after: ''
      })
    }
  }

  onClickFanwei = (e) => {
    this.setState({
      chakanfanwei: e
    })
  }

  onTreeClick = (e) => {
    if (e !== null) {
      this.setState({
        jigoudaima: e
      },function () {
        this.fetch();
      })
    }
  }

  search = () => {
    this.fetch();
  }

  render() {
    const columns = [{
      title: '机构名称',
      dataIndex: 'jigoumingcheng',
      width: '50%'
    }, {
      title: '检查时间',
      dataIndex: 'jianchashijian',
      width: '50%',
      render: (text) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    }];

    return (
      <div className='page_dui_rong_feng_ji' style={{ display: 'flex', flexDirection: 'row' }}>
        <TreeSideBar  onSelect={this.onTreeClick} />
        <div className="treeRight" style={{ flex: '1' }}>
          <label>日期：</label>
          <RangePicker onChange={this.onChange} allowClear style={{marginRight: 20}} />
          <label>查看范围：</label>
          <Select style={{width: 200}} onChange={this.onClickFanwei} allowClear>
            <Select.Option value="管辖范围">管辖范围</Select.Option>
            <Select.Option value="所属范围">所属范围</Select.Option>
          </Select>
          <Button type="primary"  onClick={this.search} style={{marginLeft: 20}}>
            <Icon type="search" />查询
          </Button>
          <Table
            columns={columns}
            rowKey={record => record.jilubianhao}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            expandedRowRender={this.expandedRowRenders}
            onChange={this.handleTableChange}
            scroll={{ y: "calc(100vh - 350px)", x: true }}
          />
        </div>
      </div>
    );
  }
}


export default List;
