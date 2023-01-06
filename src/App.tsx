import { useEffect, useState } from "react";
import {
	addData,
	getDataByKeyPath,
	getAllData,
	getAllKeys,
	getDataByKeyRange,
	getCount,
} from "./db";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Space,
	Table,
} from "antd";
import { useAsyncFn } from "react-use";
import "./App.css";

const { Option } = Select;
const { Column } = Table;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function App() {
	const [form] = Form.useForm();
	const [addForm] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [dataState, fetchAllData] = useAsyncFn(async (type?: string) => {
		if (type === "keyPath") {
			return await getDataByKeyPath(+form.getFieldValue("ssn"));
		}
		if (type === "index") {
			const lower = form.getFieldValue("lower");
			const upper = form.getFieldValue("upper");
			return await getDataByKeyRange(lower, upper);
		}
		const data = await getAllData();
		return data;
	});

	useEffect(() => {
		fetchAllData();
	}, []);

	const onFinish = (values: any) => {
		addData(values).then(() => fetchAllData());
		setVisible(false);
	};

	return (
		<div className='App'>
			<Form {...layout} layout='inline' form={form}>
				<Form.Item name='ssn' label='按keyPath查询'>
					<Input placeholder='ssn' />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						onClick={() => fetchAllData("keyPath")}
					>
						Search
					</Button>
				</Form.Item>
				<Form.Item label='按索引age查询'>
					<Space>
						<Form.Item name='lower'>
							<InputNumber />
						</Form.Item>
						<Form.Item>-</Form.Item>
						<Form.Item name='upper'>
							<InputNumber />
						</Form.Item>
					</Space>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button
						type='primary'
						onClick={() => fetchAllData("index")}
					>
						Search
					</Button>
				</Form.Item>
			</Form>
			<div style={{ textAlign: "left", padding: "10px 0" }}>
				<Button type='primary' onClick={() => setVisible(true)}>
					Add data
				</Button>
			</div>

			<Table
				rowKey='ssn'
				dataSource={dataState.value}
				loading={dataState.loading}
			>
				<Column title='ssn' dataIndex='ssn' />
				<Column title='name' dataIndex='name' />
				<Column title='age' dataIndex='age' />
			</Table>
			<Modal
				title='添加数据'
				open={visible}
				footer={null}
				onCancel={() => setVisible(false)}
			>
				<Form
					{...layout}
					form={addForm}
					name='control-hooks'
					onFinish={onFinish}
				>
					<Form.Item
						name='name'
						label='name'
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='age'
						label='age'
						rules={[{ required: true }]}
					>
						<InputNumber />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default App;
