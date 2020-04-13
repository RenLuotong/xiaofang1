import React, { Component } from 'react';
import {
  message, Select
} from 'antd';
class UserSelect extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const THE = this
    $.ajax({
      type:'GET',
      url: SERVER + "renyuan/all-by-jigoudaima",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({ data: data.data })
      }
    });
  }


  render() {
    const { onChange, value, mode } = this.props
    const options = this.state.data && this.state.data.map(item => <Select.Option key={item.renyuanbianhao}>{item.xingming}</Select.Option>)
    return (
      <Select allowClear value={value} onChange={e => onChange(e)} mode={mode}>
        {options}
      </Select>
    )
  }
}


export default UserSelect;
