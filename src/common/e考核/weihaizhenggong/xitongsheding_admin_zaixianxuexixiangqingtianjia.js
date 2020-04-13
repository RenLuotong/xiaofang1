import React, { Component } from "react";
import { Form, Input, Icon, Button, Select, InputNumber, message } from "antd";

let id = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
		'U',
		'v',
        'W',
        'X',
        'Y',
        'Z',
      ],
    };
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  tijiao(e) {}

  backPage() {
    window.location.href = "./zhongdui.html#/xitongsheding_admin_xinlijiankang";
  }

  componentDidMount() {}

  //选择器点击
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    let answer = [0, 1];
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <Form.Item required={false} key={k}>
            题目:
            {getFieldDecorator(
              `tm[${k}]`,
              {}
            )(<Input size="default" style={{ margin: 10, width: 1040 }} />)}
            <br />
            选项A :
            {getFieldDecorator(
              `a[${k}]`,
              {}
            )(<Input style={{ margin: 10, width: 200 }} />)}
            选项B :
            {getFieldDecorator(
              `bb[${k}]`,
              {}
            )(<Input style={{ margin: 10, width: 160 }} />)}
            选项C :
            {getFieldDecorator(
              `c[${k}]`,
              {}
            )(<Input style={{ margin: 10, width: 160 }} />)}
            选项D :
            {getFieldDecorator(
              `d[${k}]`,
              {}
            )(<Input style={{ margin: 10, width: 160 }} />)}
            正确答案 :
            {getFieldDecorator(
              `da[${k}]`,
              {}
            )(
              <Select
                mode="multiple"
                style={{margin:10,width:200}}
                placeholder="选择正确的答案"
                // defaultValue={}
                onChange={this.handleChange}
                optionLabelProp="label"
              >
                {answer.map((item, index) => {
                  return (
                    <Option value={this.state.arr[index]} label={this.state.arr[index]}>
                      <div className="demo-option-label-item">
                        选项{this.state.arr[index]}
                      </div>
                    </Option>
                  );
                })}
              </Select>
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Form.Item>
          <br />
        </div>
      );
    });
    // const formItems = keys.map((k, index) => {
    // 	return (
    // 		<div
    // 			key={k}
    // 		>
    // 			<Form.Item
    // 				required={false}
    // 				key={k}
    // 			>
    // 				题目:
    // 				{getFieldDecorator
    // 				(`tm[${k}]`, {
    // 				})
    // 				(
    // 					<Input
    // 						size="default"
    // 						style={{margin:10,width:1040 }}
    // 					/>

    // 				)
    // 				}
    // 				<br/>
    // 				选项A :
    // 				{getFieldDecorator
    // 				(`a[${k}]`, {
    // 				})
    // 				(
    // 					<Input style={{margin:10,width:200 }} />
    // 				)
    // 				}
    // 				选项B :
    // 				{getFieldDecorator
    // 				(`bb[${k}]`, {
    // 				})
    // 				(
    // 					<Input style={{margin:10,width:160 }} />
    // 				)
    // 				}
    // 				选项C :
    // 				{getFieldDecorator
    // 				(`c[${k}]`, {
    // 				})
    // 				(
    // 					<Input style={{margin:10,width:160 }} />
    // 				)
    // 				}
    // 				选项D :
    // 				{getFieldDecorator
    // 				(`d[${k}]`, {
    // 				})
    // 				(
    // 					<Input style={{margin:10,width:160 }} />
    // 				)
    // 				}
    // 				正确答案 :
    // 				{getFieldDecorator
    // 				(`da[${k}]`, {
    // 				})
    // 				(
    // 					<Select style={{margin:10,width:200}}>
    // 						<Select.Option value="选项A">选项A</Select.Option>
    // 						<Select.Option value="选项B">选项B</Select.Option>
    // 						<Select.Option value="选项C">选项C</Select.Option>
    // 						<Select.Option value="选项D">选项D</Select.Option>
    // 					</Select>
    // 				)
    // 				}
    // 				{keys.length > 1 ? (
    // 					<Icon
    // 						className="dynamic-delete-button"
    // 						type="minus-circle-o"
    // 						disabled={keys.length === 1}
    // 						onClick={() => this.remove(k)}
    // 					/>
    // 				) : null}
    // 			</Form.Item>
    // 			<br/>
    // 		</div>
    // 	)
    // });

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: "200px" }}>
            <Icon type="plus" />
            添加题目
          </Button>
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" onClick={this.tijiao.bind(this)}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: "dynamic_form_item" })(App);
export default WrappedApp;
