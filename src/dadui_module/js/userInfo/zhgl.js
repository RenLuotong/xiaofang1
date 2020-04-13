import React from 'react';
import { Tabs } from 'antd';
import EditUserInfo from './editUserInfo' ;

class Zhgl extends React.Component {
	
  	constructor(props) {
	    super(props);
	    this.state = { 
	    	
	    };
  	}
  	
  	componentWillMount() {
		this.setState({whcid:this.props.whcId});
	}
  	
    componentWillReceiveProps(nextProps) {
		this.setState({whcid:nextProps.whcId});
	}
    
  	render() {
	    return (
	      	<div id="account_div">	
	     		<Tabs  tabPosition="left"  >
	          		<Tabs.TabPane tab="个人信息" key="1">
	          			<EditUserInfo />
	          		</Tabs.TabPane>

	        	</Tabs>
			</div>
	    );
  	}
  	
}

export default Zhgl;