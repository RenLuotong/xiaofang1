import React from 'react'
import { Button, Icon, Upload, Modal, notification, message } from 'antd'
import PropTypes from 'prop-types'

class UploadComp extends React.Component {
  // // 如果没有传递该属性时的默认值
  static defaultProps = {
    listType: 'text',
    fileList: [],
    multiple: true,
    maxNum: 50 //一次性上传最大量， 多了不显示 上传按钮
    // uploading: false
  }

  // 如果传递该属性，该属性值必须为字符串
  static propTypes = {
    listType: PropTypes.string,
    multiple: PropTypes.bool,
    fileList: PropTypes.array,
    maxNum: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      fileList: this.props.fileList
    }
  }
  componentDidMount(){
    this.props.onRef(this);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.data !== nextProps.data && nextProps.data) {
      this.setState({
        fileList: [
          {
            uid: '-1',
            name: 'image.jpg',
            status: 'done',
            url: `${SERVERADDR}${nextProps.data}`
          }
        ]
      })
    }
  }

  handleChangefile = info => {

    if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`)
      this.setState({ fileList: [...info.fileList] })
      return
    }
    // 删除图片 两种情况 1.刚刚上传到oss的图片删除，没有保存到数据库 ， 2.已经上传的且保存到数据库的图片删除，编辑已发布产品的 主图模块
    // 根据是否有 id 字段 判断 是1 or 2
    if (info.file.status === 'removed') {
      // if (!info.file.id) {
      //   // this.removePicFromOss(info.file.url)
      // }
      if (this.props.listType === 'picture-card') {
        // this.props.uploadForPhoto('')
      }

      this.setState({ fileList: [...info.fileList] })
      return
    }

    //上传成功
    if (info.file.status === 'done') {
      // this.props.uploadForPhoto(info.file.response)
      let fileList = [...info.fileList]
      // fileList = fileList.slice(-2)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = SERVERADDR + file.response // 添加url 属性，用于大图预览
          file.thumbUrl = ''
        }
        return file
      })
      // console.log(fileList)
      this.setState({ fileList })
      return
    }

    // 不能删除 否则 只会进入本onchange函数 一次 ，捕获不到 done 的onchange 事件回调
    if (info.file.status === 'uploading') {
      this.setState({ fileList: [...info.fileList] })
    }
  }

  handlePreview = file => {
    this.setState({
      // previewImage: file.thumbUrl || file.url,
      previewImage: SERVERADDR + file.response,
      previewVisible: true
    })
  }

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 0.5
    if (!isLt2M) {
      notification.info({ message: '上传大小应小于500kb' })
    }
    return isLt2M
  }

  render() {
    const uploadProps = {
      name: 'photo',
      // style: { padding: 100 },
      multiple: this.props.multiple,
      accept: '.jpg,.jpeg,.png,.gif,.bmp',
      listType: this.props.listType,
      // action: `${SERVERADDR}/api/excel/uploadPhoto`,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      fileList: this.state.fileList,
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      beforeUpload: this.beforeUpload,
      onChange: this.handleChangefile,
      onPreview: this.handlePreview
    }

    const uploadBtn =
      this.props.listType === 'picture-card' ? (
        <div style={{ width: 150, height: 150, boxSizing: 'border-box', paddingTop: '50px' }}>
          <span>
            <Icon type='plus' />
            <div>上传</div>
          </span>
        </div>
      ) : (
        <Button>
          <Icon type='upload' /> 上传
        </Button>
      )

    return (
      <div className='upload'>
        {this.props.listType === 'picture-card' ? (
          <Upload {...uploadProps} >
            {this.state.fileList.length >= this.props.maxNum ? null : uploadBtn}
          </Upload>
        ) : (
          <Upload {...uploadProps}>{this.state.fileList.length >= this.props.maxNum ? null : uploadBtn}</Upload>
        )}

        <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img alt='预览' style={{ width: '100%' }} src={this.state.previewImage ? this.state.previewImage : `${SERVERADDR}${this.props.data}`} />
        </Modal>
      </div>
    )
  }
}

export default UploadComp
