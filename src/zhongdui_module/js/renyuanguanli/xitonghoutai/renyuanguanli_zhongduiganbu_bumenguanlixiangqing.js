import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import { 
	Select,
  	Layout, 
  	Menu, 
  	Breadcrumb, 
  	Icon, 
  	Input, 
  	Form, 
  	Button,
  	Table, 
  	Divider
} from 'antd';

class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			bumenInfo:{},
		};
	}
	
	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "bumenXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    bumenInfo: data.data,
                });
            }
        });
	}
	
	componentDidMount () {
		this.getInfo();
    }
	
  	render() {
  		
  		let info = this.state.bumenInfo;
  		
	    return (
	      	<div>
		        <table id="mytable" cellSpacing="0">
                	<tbody>
                    	<tr>
                        	<th scope="col" className="nobg">部门详情</th>
                        	<th scope="col"></th>
                        	<th scope="col"></th>
                        	<th scope="col"></th>
                    	</tr>
                    	<tr>
                            <th scope="row" className="spec">部门名称</th>
                            <td>{info['bumenmingcheng']}</td>
                            <th scope="row" className="spec">部门描述</th>
                            <td>{info['bumenmiaoshu']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="specalt">部门简称</th>
                            <td className="alt">{info['bumenjiancheng']}</td>
                            <th scope="row" className="specalt">部门负责人</th>
                            <td className="alt">{info['fuzerenxingming']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="spec">机构名称</th>
                            <td>{info['jigoumingcheng']}</td>
                            <th scope="row" className="spec">上级部门</th>
                            <td>{info['shangjibumen']}</td>
                    	</tr>
                  	</tbody>
              	</table>
	      	</div>
	    );
  	}
}

const AppForm = Form.create()(App);
export default AppForm;
