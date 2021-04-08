import React, {useState} from 'react';
import {Modal, Button, Radio, Form, Input} from 'antd';
import {updateTeacher} from "../client";
import {errorNotification} from "./Notification";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


const UpdateTeacherModal = ({dataParentToChild, fetchTeachers}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState(dataParentToChild.name);
    const [email, setEmail] = useState(dataParentToChild.email);
    const [gender, setGender] = useState(dataParentToChild.gender);
    const [id] = useState(dataParentToChild.id);
    const [subject, setSubject] = useState(dataParentToChild.subject)


    const showModal = () => {
        setIsModalVisible(true);
        console.log(JSON.stringify(dataParentToChild))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const sendTeacherData = (e) => {
        e.preventDefault();
        let teacher = {name, gender, email, id, subject};
        console.log('teacher => ' + JSON.stringify(teacher));
        updateTeacher(teacher).then(res => {
        }).catch(err => {
                if (typeof err !== 'undefined') {
                    console.log(err.response)
                    err.response.json().then(res => {
                        console.log(res);
                        errorNotification(
                            "There was an issue",
                            `${res.message} [${res.status}] [${res.error}]`
                        )
                    })
                }
            }
        ).then(() => {
            setIsModalVisible(false);
            fetchTeachers();
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Radio.Button type="default" onClick={showModal}>
                Edit Teacher
            </Radio.Button>
            <Modal
                visible={isModalVisible}
                title="Edit Teacher"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: false}}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        rules={[{required: true, message: 'Please input the new Teacher-Name!'}]}
                    >
                        <Input placeholder={name}/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please input the new Email!'}]}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                        <Input placeholder={email}/>
                    </Form.Item>
                    <Form.Item label="Gender">
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </Form.Item>
                    <Form.Item label="Subject">
                        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="MUSIC">MUSIC</option>
                            <option value="BIOLOGY">BIOLOGY</option>
                            <option value="CHEMISTRY">CHEMISTRY</option>
                        </select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={sendTeacherData}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateTeacherModal;