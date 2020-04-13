// 组织机构下拉树
import React, { Component } from 'react'
import { message,  Select  } from 'antd';

const { Option  } = Select

export default class RoleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleList: [],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    const THE = this
    $.ajax({
      type:'GET',
      url:SERVER+"queryAllZuzhijigouJueses",
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({
          roleList: data.data
        })
      }
    });
  }


  render() {
    const { onChange, value } = this.props
    const child = this.state.roleList && this.state.roleList.map(item => {
      return(
        <Option key={item.value}>{item.label}</Option>
      )
    })
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        allowClear
        value={value}
        onChange={e => onChange(e)}
      >
        {child}
      </Select>
    )
  }
}
