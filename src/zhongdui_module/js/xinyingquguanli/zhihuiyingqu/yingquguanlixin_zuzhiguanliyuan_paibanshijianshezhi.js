import React, { Component } from 'react';
import {
  	Form,Input,Icon,Button,Select,InputNumber,message,TimePicker,Checkbox,Table
} from 'antd';
import moment from 'moment';

let id = 0;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
        	leixingList: [],
        	xinghaoList: {
        		0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[],17:[],18:[],19:[],20:[],
                21:[],22:[],23:[],24:[],25:[],26:[],27:[],28:[],29:[],30:[],31:[],32:[],33:[],34:[],35:[],36:[],37:[],38:[],39:[],40:[],
                shijianduanList:[],
                disabledtime:null,
        	}
        };
    }

    remove = (k) => {
    	const { form } = this.props;
    	const keys = form.getFieldValue('keys');
    	form.setFieldsValue({
      		keys: keys.filter(key => key !== k),
    	});
  	}

  	add = () => {
    	const { form } = this.props;
    	const keys = form.getFieldValue('keys');
    	const nextKeys = keys.concat(id++);
    	form.setFieldsValue({
      		keys: nextKeys,
    	});
  	}

	tijiao(e){
  		const { getFieldDecorator, getFieldValue } = this.props.form;
  		const keys = getFieldValue('keys');
    	console.log(keys);
    	if (keys.length == 0) {
    		message.warning("请新建时间段");
        	return;
    	}
    	const { form } = this.props;
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
      		if (!err) {
                let postList = [];
                for (let i = 0; i < keys.length; i++) {
                let kaishishijian = values.lx[keys[i]];
                if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
                   message.warning("请选择开始时间！");
                   return;
                } else {
                    kaishishijian = moment(kaishishijian).format('HH:mm');
                }
                let startisNext =values.bz[keys[i]];
                if(typeof(startisNext) == "undefined"||startisNext == null) {
                    startisNext=false;
                }
                let jieshushijian = values.gg[keys[i]];
                if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
                   message.warning("请选择结束时间！");
                   return;
                } else {
                    jieshushijian = moment(jieshushijian).format('HH:mm');
                }
                let endisNext =values.sl[keys[i]];
                if(typeof(endisNext) == "undefined"||endisNext == null) {
                    endisNext=false;
                }
                
                if(startisNext == true){
                    startisNext ="是";
                }else{
                    startisNext ="否";
                }
                if(endisNext == true){
                    endisNext ="是";
                 }else{
                    endisNext ="否";
                 }
                 console.log(startisNext,endisNext);
                 
                let obj = {};
                obj.jiezhiIsNext = endisNext;
                obj.jiezhishijian = jieshushijian;
                obj.qishiIsNext = startisNext;
                obj.qisyhishijian = kaishishijian;
    			postList.push(obj);
            }
            console.log(postList);
    			 const THE = this;
            $.ajax({
		            type:'POST',
		            url: SERVER + "tbPaibanShijian/create",
		            data : JSON.stringify(postList),
		            dataType : 'json',
		            contentType : "application/json",
		            success: function (data) {
		                if (data.status != 0) {
		                    message.warning(data.message);
		                    return;
		                }
						message.success("提交成功");
						THE.fetch();
		            }
               });
			   for(let i=0;i < keys.length; i++){
				console.log(i,keys[i]);
				this.remove(keys[i]);
			   }
      		}
    	});
  	}

      backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_zhibanlishijilu";
    }


      removeshijianduan(id) {
        const THE = this;
        $.ajax({
            type : 'post',
            url : SERVER + "tbPaibanShijian/delete?id="+id,
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
               message.success("删除成功");
			   THE.fetch();
            },
        });
    }

    fetch = () => {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tbPaibanShijian/findAll",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    shijianduanList: list,
                });
            }
        });
    }

    componentDidMount(){
        this.fetch();
	}
	getDisabledHours = (k) => {
		var hours=[];
		var checked ;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let kaishishijian = values.lx[k];
				let kaishishijian2 = moment(kaishishijian).format('HH:mm');
				checked = values.sl[k];
				if(checked == undefined || checked == null){
					checked =false;
				}
				console.log(checked);
				let timeArr = kaishishijian2.split(':')
				for (var i = 0; i < parseInt(timeArr[0]); i++) {
				hours.push(i)
				}
			}
				});
				if(checked === true){
					hours=[];
					return hours;
				}else{
					return hours;
				}
	}

	getDisabledMinutes = (k,selectedHour) => {
		var minutes = [];
		var checked ;
		this.props.form.validateFields((err, values) => {
			if (!err) {
			let kaishishijian = values.lx[k];
			let kaishishijian2 = moment(kaishishijian).format('HH:mm');
			checked = values.sl[k];
			if(checked == undefined || checked == null){
				checked =false;
			}
		let timeArr = kaishishijian2.split(':')
		if (selectedHour == parseInt(timeArr[0])) {
		  for(var i = 0; i < parseInt(timeArr[1]); i++) {
			minutes.push(i)
		  }
		}
	}
})
		if(checked === true){
			minutes=[];
			return minutes;
		}else{
			return minutes;
		}
	  }


    render(){

    	const { getFieldDecorator, getFieldValue } = this.props.form;
    	getFieldDecorator('keys', { initialValue: [] });
    	const keys = getFieldValue('keys');
    	const formItems = keys.map((k, index) => {
            const format = 'HH:mm';
    		return (
    			<div
					key={k}
				>
	      			<Form.Item
	    				required={false}
	    				key={k}
	  				>
	      				开始时间 :
	      				{getFieldDecorator
		        			(`lx[${k}]`, {
			        		})
			        		(
								<TimePicker 
								placeholder={"选择时间"} 
								format={format} 
								style={{margin:5}}/>
			        		)
	    				}
	      				是否为第二天 :
	      				{getFieldDecorator
		        			(`bz[${k}]`, {
			        		})
			        		(
                                <Checkbox style={{marginTop:5,marginRight:70,marginBottom:5,marginLeft:5}}></Checkbox>
			        		)
	    				}
	      				截止时间 :
	      				{getFieldDecorator
		        			(`gg[${k}]`, {
			        		})
			        		(
								<TimePicker 
								placeholder={"选择时间"} 
								format={format}style={{margin:5,}} 
								disabledHours={this.getDisabledHours.bind(this,k)}
								disabledMinutes={this.getDisabledMinutes.bind(this,k)}
								/>
			        		)
	    				}
	      				是否为第二天 :
	      				{getFieldDecorator
		        			(`sl[${k}]`, {
			        		})
			        		(
                                <Checkbox style={{margin:5}}></Checkbox>
			        		)
	    				}
	      				{/* 申请备注 :
	    				{getFieldDecorator
		        			(`bz[${k}]`, {
			        		})
			        		(
			          			<Input style={{margin:10,width:160 }} />
			        		)
	    				} */}
		        		{
		          			<Icon
		            			className="dynamic-delete-button"
		            			type="minus-circle-o"
                                onClick={() => this.remove(k)}
                                style={{marginLeft:20}}
		          			/>
		        		}
	      			</Form.Item>
	      			<br/>
		      	</div>
		    )
    	});

        const formItemss = this.state.shijianduanList && this.state.shijianduanList.map(item => {
            const format = 'HH:mm';
    		return (
    			<div>
	      			<Form.Item
	    				required={false}
	  				>
	      				开始时间 :
                                <TimePicker defaultValue={moment(item['qishishijian'], 'HH:mm')} format={format} style={{margin:5}} disabled/>
	      				是否为第二天 :
                                <Checkbox style={{marginTop:5,marginRight:70,marginBottom:5,marginLeft:5}} defaultChecked={item['qishiIsNext']}  disabled></Checkbox>
	      				截止时间 :
                                <TimePicker defaultValue={moment(item["jiezhishijian"], 'HH:mm')} format={format}style={{margin:5,}}  disabled/>
	      				是否为第二天 :
                                <Checkbox style={{margin:5}} disabled defaultChecked={item['jiezhiIsNext']} ></Checkbox>
		        		{
		          			<Icon
		            			className="dynamic-delete-button"
		            			type="minus-circle-o"
                                style={{marginLeft:20}}
                                onClick={this.removeshijianduan.bind(this,item['id'])}
		          			/>
		        		}
	      			</Form.Item>
	      			<br/>
		      	</div>
		    )
    	});

    	return(
            <div style={{ display: "block" }}>
                <Form onSubmit={this.handleSubmit} layout="inline">
                {formItemss}
                    {formItems}
                    <Form.Item style={{ display: "block" }}>
                        <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
                            <Icon type="plus" />新建时间段
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ display: "block" }}>
                        <Button type="primary" onClick={this.tijiao.bind(this)}>提交</Button>
                    </Form.Item>
                </Form>
              
            </div>
    	);
	}
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;