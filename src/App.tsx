import React, { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from 'antd';

const { Sider, Content } = Layout;

const Tasks = lazy(() => import('./components/tasks'))
const Header = lazy(() => import('./components/header'))
const Sidebar = lazy(() => import('./components/sidebar'))

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Content className='main-container'>
            <Routes>
              <Route path={'/'} element={<Navigate to={'/tasks'} />} />
              <Route path={'/tasks'} element={<Tasks />} />
              <Route path={'/contact-us'} element={<h1>Contact US</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
}

export default App;
