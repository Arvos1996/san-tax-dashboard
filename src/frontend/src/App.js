import {useState} from 'react'
import {Layout, Menu, Breadcrumb, Divider } from 'antd';
import {DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import StudentTable from "./Components/StudentTable";
import TeacherTable from "./Components/TeacherTable";
import {BrowserRouter as Router , Route , Switch, Link} from 'react-router-dom';

import './App.css';

const {Header, Content, Footer, Sider} = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    <Link to="/students">Students</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    <Link to="/teacher">Teachers</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Switch>
            <Route path="/teacher">
                <TeacherTable/>
            </Route>
            <Route path="/students">
                <StudentTable/>
            </Route>
        </Switch>

    </Layout>
}

export default App;
