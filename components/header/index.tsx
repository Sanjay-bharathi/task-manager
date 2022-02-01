import React from 'react';
import { Layout } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header: HeaderLayout } = Layout;

const Header = () => {
    return <HeaderLayout>
        <h2>Company Name</h2>
        <div className='user-header'>
            <h4>Albert</h4>
            <ExclamationCircleOutlined />
        </div>
    </HeaderLayout>
};

export default Header;
