import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    return <Sider>
        <Menu>
            <Menu.Item key={'tasks'}>
                <NavLink to='/tasks'>Tasks</NavLink>
            </Menu.Item>
            <Menu.Item key={'contact-us'}>
                <NavLink to='/contact-us'>Contact Us</NavLink>
            </Menu.Item>
        </Menu>
    </Sider>
};

export default Sidebar;
