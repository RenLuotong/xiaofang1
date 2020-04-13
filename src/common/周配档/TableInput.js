// 组织机构下拉树
import React, { Component, Fragment } from 'react'
import moment from 'moment';
class TableInput extends Component {
  constructor(props) {
    super(props)
    // console.log(props.mode)
    this.state = {
      mode: props.mode
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.mode !== state.mode) {
      return {
        mode: props.mode
      }
    }
    return null
  }

  render() {
    // console.log(mode)
    const { mode } = this.state
    const { data, riqi, currentDate } = this.props // props 如果传 了 mode ，按照propsMode 的优先级高

    const compare = moment(riqi).isBefore(moment(currentDate)) || moment(riqi).isSame(moment(currentDate)) // 如果选择的日期 <= 当前日期

    const handleData =  data ? data.replace(/\r{0,}\n/g, '<br/>').replace(/\s/g, '&nbsp;') : ''

    return <Fragment>{(mode === 'show' || compare)  ?
      <span dangerouslySetInnerHTML={{ __html: handleData}} style={{ margin: 'auto'}} /> : this.props.children}</Fragment>
  }
}
export default TableInput
