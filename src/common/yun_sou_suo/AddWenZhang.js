import React, {Component} from 'react'
import { Input, Upload, Icon, message, Button, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

class AddWenzhang extends Component{
  constructor (props) {
    super(props)
    this.state={
      loading: false,
      editInfo: {},
      biaoti: '',
      fileList: [],
      dataSource:[],
      zilanmubianhao: ''
    }
  }

  componentDidMount() {
    this.getZilanmuList()
  }

  getZilanmuList = () => {
    let _this = this;
    $.ajax({
      type:'GET',
      url: SERVER + `yunsousuo/zilanmu-all/`,
      data: {
        zhulanmubianhao: this.props.match.params.id
      },
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.length; i++) {
          list.push(data.data[i]);
        }
        _this.setState({
          dataSource: list,
        });
      }
    });
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
          fileList: info.fileList
        }),
      );
    }
  };

  tianshuFromFn = (e) => {
    let arr = [];
    this.state.editInfo.titles.map(item => {
      arr.push(item);
    })
    arr.splice(Number(e.target.name),1,{ ...this.state.editInfo.titles[Number(e.target.name)],shujuxiang: e.target.value});
    this.setState({
      editInfo:{
        ...this.state.editInfo,
        titles: arr
      }
    })
  }

  titleFn = (e) => {
    let arr = [];
    this.state.editInfo.titles.map(item => {
      arr.push(item);
    })
    arr.splice(Number(e.target.name),1,{ ...this.state.editInfo.titles[Number(e.target.name)],neirong: e.target.value});
    this.setState({
      editInfo:{
        ...this.state.editInfo,
        titles: arr
      }
    })
  }

  removeTitles = (e) => {
    let arr = [];
    this.state.editInfo.titles.map(item => {
      arr.push(item);
    })
    arr.splice(Number(e),1);
    this.setState({
      editInfo:{
        titles: arr
      }
    })
  }

  addTitles = () => {
    let arr = [];
    if(this.state.editInfo.titles === undefined){
      arr.push({shujuxiang: '', neirong: ''});
    }else {
      this.state.editInfo.titles.map(item => {
        arr.push(item);
      })
      arr.splice(arr.length,0,{shujuxiang: '', neirong: ''});
    }
    this.setState({
      editInfo:{
        titles: arr
      }
    })
  }

  addWenzhan = () => {
    let _this = this;
    let data = {
      biaoti: this.state.biaoti,
      zilanmubianhao: this.state.zilanmubianhao
    }
    if(this.state.fileList.length > 0){
      data['fengmian'] = this.state.fileList[0].response
    }
    if(JSON.stringify(this.state.editInfo) !== '{}'){
      data['neirong'] = this.state.editInfo.titles
    }
    if(this.state.zilanmubianhao === ""){
      return message.warning("请选择子栏目名称!");
    }
    if(this.state.biaoti === ""){
      return message.warning("请输入文章名称!");
    }
    $.ajax({
      type : 'post',
      url : SERVER + "yunsousuo/xinzeng-wenzhang",
      data: JSON.stringify(data),
      dataType : 'json',
      contentType : "application/json",
      success : function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        else {
          message.success("添加文章成功!");
          _this.setState({
            biaoti: '',
            zilanmubianhao: '',
            editInfo: {},
            fileList: [],
          })
          history.go(-1);
        }
      }
    });
  }

  onChangeBiaoti = (e) => {
    this.setState({
      biaoti: e.target.value
    })
  }

  onChangeSelect = (e) => {
    this.setState({
      zilanmubianhao: e
    })
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    const titlesList = this.state.editInfo.titles && this.state.editInfo.titles.length > 0 && this.state.editInfo.titles.map((item, index) => {
      return(
        <div style={{paddingBottom: 10}} key={index}>
          <Input value={item.shujuxiang} style={{width: '200px'}} placeholder="请输入标题" name={index} onChange={this.tianshuFromFn} /><br/>
          <TextArea style={{width: '300px'}} value={item.neirong} name={index} placeholder="请输入内容" onChange={this.titleFn} />
          <Icon type="minus-circle" style={{marginLeft: '10px'}} onClick={this.removeTitles.bind(this,index)} />
        </div>
      )
    })
    let uploadProps = {
      name: 'files',
      action: SERVER+"files/image",
      headers: {
        Authorization:"Bearer "+sessionStorage.getItem("token")
      },
    };
    return (
      <div style={{overflowY: 'scroll',height: 'calc(100vh - 90px)',padding: '5%'}}>
        <h3>新增文章</h3>
        <div style={{width: 320, display: 'flex'}}>
          <label style={{width: 190, display: 'inline-block'}}>上传封面:</label>
          <Upload
            {...uploadProps}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div><br/><br/>
        <label style={{width: 120, display: 'inline-block'}}>子栏目名称:</label>
          <Select style={{ width: 200 }} allowClear onChange={this.onChangeSelect}>
            {
              this.state.dataSource && this.state.dataSource.map((item)=>{
                return(
                  <Option key={item.zilanmubianhao} value={item.zilanmubianhao}>{item.biaoti}</Option>
                )
              })
            }
          </Select><br/><br/>
        <label style={{width: 120, display: 'inline-block'}}>文章名称:</label>
        <Input style={{width: 200}} value={this.state.biaoti} onChange={this.onChangeBiaoti}/><br/><br/>
        <label style={{width: 120, display: 'inline-block'}}>内容:</label>
        <div>
          {titlesList}
          <Button type="dashed" block icon="plus-circle" onClick={this.addTitles} style={{width: 300}}>
            新增标题
          </Button>
        </div>
        <p style={{paddingTop: 10}}>
          <Button type="primary" onClick={this.addWenzhan}>提交</Button>
        </p>
      </div>
    );
  }
}
export default AddWenzhang
