import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
// import GetCanvas from '../qicai_zhongduiganbu_fushituchaxun'
import moment from 'moment';
// import test from "../../../imgs/test.jpg";
import {
    message,
    Upload,
    Modal,
    Steps,
    Icon,
    Form,
    Table, Tabs,Tag
} from 'antd';
const { Step } = Steps;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize: 10,
                current: 1,
                total:0
            },
            lvlipagination: {
                pageSize: 10,
                current: 1,
                total:0
            },
            xiaofangchelvlilist:[],
            xiaofangchelvlilists:[],
            // qicaiList: [],
            // qicaiLists: [],
            id:this.props.match.params.id,
            xiaofangcheInfo:{},
            fileList: [],
            previewVisible: false,
            previewImage: '',
            imgurl: [],
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
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "chaxunXiaofangcheNewXiangqingNew?id=" + id,
            success : function (data) {
                let list = [];
                if (data.status != 0) {

                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.zhaopiandizhiList.length;i++){
                    let obj = {};
                    obj.url = data.data.zhaopiandizhiList[i];
                    obj.key = i;
                    list.push(obj);
                }
                const pagination = { ...THE.state.pagination };
                // pagination.total = data.data.qicailist.length;
                const lvlipagination = { ...THE.state.lvlipagination };
                lvlipagination.total = data.data.xiaofangchelvlilist.length;

                THE.setState({
                    xiaofangcheInfo: data.data,
                    // qicaiList: data.data.qicailist,
                    // qicaiLists: data.data.qicailist,
                    xiaofangchelvlilist: data.data.xiaofangchelvlilist,
                    xiaofangchelvlilists: data.data.xiaofangchelvlilist,
                    imgurl: list,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data.cheliangzhaopian,
                    }],
                    // pagination,
                    lvlipagination
                });
            }
        });
    }


    // handleTableChange = (pagination) => {
    //     const pager = {...this.state.pagination};
    //     pager.current = pagination.current;
    //     this.setState({
    //         pagination: pager,
    //         qicaiLists: this.state.qicaiList.slice((pager.current-1)*this.state.pagination.pageSize,pager.current*this.state.pagination.pageSize)
    //     });
    // }

    handleTablelvliChange = (pagination) => {
        const pager = {...this.state.lvlipagination};
        pager.current = pagination.current;
        this.setState({
            lvlipagination: pager,
            xiaofangchelvlilists: this.state.xiaofangchelvlilist.slice((pager.current-1)*this.state.lvlipagination.pageSize,pager.current*this.state.lvlipagination.pageSize)
        });
    }

    componentDidMount () {
        this.getInfo();
    }

    key = ''
    callback(key) {
        this.key = key;
    }
    render() {

        let imgs = this.state.imgurl.map(item =>
            <img src={item['url']}  style={{margin:10,width:300,height:300}}/>
        );

        let stepList2;

        stepList2 = (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>车辆图片
                </p>
                {imgs}
            </div>
        )

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '装备类型',
                dataIndex: 'zhuangbeileixingmingcheng'
            },
            {
                title: '仓库名称',
                dataIndex: 'cangkumingcheng'
            },
            {
                title: '存放地点',
                dataIndex: 'cunfangdidianmingcheng',
            },{
                title: '状态',
                dataIndex: 'zhuangbeizhuangtai',
            }
        ]

        const columnsxiaofangche = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '机构名称',
                dataIndex: 'caozuorenjigoumingcheng'
            },
            {
                title: '状态',
                dataIndex: 'caozuo'
            },
            {
                title: '时间',
                dataIndex: 'caozuoshijian',
                render: (text) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        ]

        let info = this.state.xiaofangcheInfo;
        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let xiaofangchexiangqing1 = (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>消防车详情
                </p>
                {/*<tr>*/}
                {/*    <th scope="row" className="specalt">车辆照片</th>*/}
                {/*    <td colSpan="3"  className="alt">*/}
                {/*        <Upload*/}
                {/*            {...uploadProps}*/}
                {/*            listType="picture-card"*/}
                {/*            fileList={fileList}*/}
                {/*            onPreview={this.handlePreview}*/}
                {/*            onChange={this.handleChange}*/}
                {/*            showUploadList={{ showPreviewIcon: true, showRemoveIcon: false }}*/}
                {/*        >*/}
                {/*            {fileList.length >= 1 ? null : uploadButton}*/}
                {/*        </Upload>*/}
                {/*        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>*/}
                {/*            <img alt="example" style={{ width: '100%' }} src={previewImage} />*/}
                {/*        </Modal>*/}
                {/*    </td>*/}
                {/*</tr>*/}
                <Tag id="myTag">车牌号码: {info['chepaihaoma']}</Tag>
                <Tag id="myTag">消防车名称: {info['xiaofangchemingcheng']}</Tag>
                <Tag id="myTag">车辆类型: {info['xiaofangcheleixing']}</Tag>
                <Tag id="myTag">机构名称: {info['jigoumingcheng']}</Tag>
                <Tag id="myTag">车架号: {info['chejiahao']}</Tag>
                <Tag id="myTag">出警次数: {info['chujingcishu']}</Tag>
                <Tag id="myTag">最大载人数: {info['cheliangzuidazairenshu']}</Tag>
                <Tag id="myTag">水罐容量(T): {info['cheliangshuiguanrongliang']}</Tag>
                <Tag id="myTag">泡沫车容量(T): {info['cheliangpaomoguanrongliang']}</Tag>
                <Tag id="myTag">油箱容量(L): {info['cheliangyouxiangrongliang']}</Tag>
                <Tag id="myTag">长度(m): {info['cheliangchangdu']}</Tag>
                <Tag id="myTag">高度(m): {info['chelianggaodu']}</Tag>
                <Tag id="myTag">宽度(m): {info['cheliangkuandu']}</Tag>
                <Tag id="myTag">最大行驶速度(km/h): {info['cheliangzuidaxingshisudu']}</Tag>
                <Tag id="myTag">发动机型号 : {info['cheliangfadongjixinghao']}</Tag>
                <Tag id="myTag">采购时间: {moment(info['caigoushijian']).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <Tag id="myTag">更新时间: {moment(info['gengxinshijian']).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <Tag id="myTag">燃油种类: {info['ranyouzhonglei']}</Tag>
                <Tag id="myTag">出厂时间: {moment(info['chuchangshijian']).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <Tag id="myTag">水泵流量: {info['shuibengliuliang']}</Tag>
                <Tag id="myTag">车载炮流量: {info['chezaipaoliuliang']}</Tag>
                <Tag id="myTag">水炮射程: {info['shuipaoshecheng']}</Tag>
                <Tag id="myTag">遥控距离: {info['yaokongjuli']}</Tag>
                <Tag id="myTag">车载灭火剂: {info['chezaimiehuoji']}</Tag>
                <br/><br/>
                {stepList2}
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>适用范围
                </p>
                <div id="baoyangshouce">
                    {info['shiyongfanwei']}
                </div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>消防车履历
                </p>
                <Table
                    columns={columnsxiaofangche}
                    dataSource={this.state.xiaofangchelvlilists}
                    pagination={this.state.lvlipagination}
                    onChange={this.handleTablelvliChange}
                />
                {/*<p>*/}
                {/*    <Icon type="info" style={{color: '#1890ff'}}/>随车器材*/}
                {/*</p>*/}
                {/*<Table*/}
                {/*    columns={columns}*/}
                {/*    dataSource={this.state.qicaiLists}*/}
                {/*    pagination={this.state.pagination}*/}
                {/*    onChange={this.handleTableChange}*/}
                {/*/>*/}
            </div>
        );

        // let qiciaxinxi =(
        //     <div >
        //         <GetCanvas fushitu={this.state.xiaofangcheInfo.fushitu} cheliangbianhao={this.state.xiaofangcheInfo.cheliangbianhao}></GetCanvas>
        //     </div>
        // )
        const TabPane = Tabs.TabPane;
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} type="card">
                <TabPane tab="消防车详情" key="1">{xiaofangchexiangqing1}</TabPane>
                {/*<TabPane tab="器材信息" key="器材">{qiciaxinxi}</TabPane>*/}
            </Tabs>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
