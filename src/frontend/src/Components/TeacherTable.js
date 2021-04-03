import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Popconfirm, Radio, Spin, Table, Tag} from "antd";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {deleteTeacher, getAllTeachers} from "../client";
import {errorNotification, successNotification} from "./Notification";
import TeacherDrawerForm from "./TeacherDrawerForm";
import {useState, useEffect} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {NewFooter} from "./NewFooter";



const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>
}

const removeTeacher = (teacherId, callback) => {
    deleteTeacher(teacherId).then(() => {
        successNotification("Teacher deleted", `Teacher with ID ${teacherId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
    })
}

const columns = fetchTeachers => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, teacher) =>
            <TheAvatar name={teacher.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, teacher) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${teacher.name}`}
                    onConfirm={() => removeTeacher(teacher.id, fetchTeachers)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function TeacherTable() {
    const [teachers, setTeachers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchTeachers = () =>
        getAllTeachers()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTeachers(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchTeachers();
    }, []);

    const renderTeachers = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (teachers.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Teacher
                </Button>
                <TeacherDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchTeachers={fetchTeachers}
                />
                <Empty/>
            </>
        }
        return <>
            <TeacherDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchTeachers={fetchTeachers}
            />
            <Table
                dataSource={teachers}
                columns={columns(fetchTeachers)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of teachers</Tag>
                        <Badge count={teachers.length} className="site-badge-count-4"/>
                        <br/><br/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                            Add New Teacher
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={student => student.id}
            />
        </>
    }
    return <>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {renderTeachers()}
                    </div>
                </Content>
                <NewFooter />
            </Layout>
    </>
}

export default TeacherTable;