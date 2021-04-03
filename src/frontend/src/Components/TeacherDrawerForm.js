import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewTeacher} from "../client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {successNotification, errorNotification} from "./Notification";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function TeacherDrawerForm({showDrawer, setShowDrawer, fetchTeachers}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = teacher => {
        setSubmitting(true)
        console.log(JSON.stringify(teacher, null, 2))
        addNewTeacher(teacher)
            .then(() => {
                console.log("teacher added")
                onCLose();
                successNotification(
                    "Teacher successfully added",
                    `${teacher.name} was added to the system`
                )
                fetchTeachers();
            }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new Teacher"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter teacher name'}]}
                    >
                        <Input placeholder="Please enter teacher name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter teacher email'}]}
                    >
                        <Input placeholder="Please enter teacher email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="subject"
                        label="subject"
                        rules={[{required: true, message: 'Please select a subject'}]}
                    >
                        <Select placeholder="Please select a subject">
                            <Option value="MUSIC">MUSIC</Option>
                            <Option value="BIOLOGY">BIOLOGY</Option>
                            <Option value="CHEMISTRY">CHEMISTRY</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default TeacherDrawerForm;