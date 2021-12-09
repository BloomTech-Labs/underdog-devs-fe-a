import React from 'react';
import { Layout } from 'antd';
import { Skeleton } from 'antd';

const { Content, Sider } = Layout;

const SkeletonLoadingComponent = () => {
  
  return (
    <>
      <Layout style={{minHeight: '100vh'}} >
        <Sider style={{backgroundColor: 'rgb(240, 242, 242)'}}>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{width: 200, height: 44, marginTop: 4}} active={true} size={'Large'} shape={'default'} block={true}/>
          <br/>
            <Skeleton.Button style={{position: 'fixed',bottom: 0, zIndex: 1,height: 48 ,lineHeight: 48 , width: 200}} active={true} size={'Large'} shape={'default'} block={true}/>
        </Sider>
        <Layout style={{backgroundColor: 'rgb(247, 247, 247)' }}>
          <Content style={{margin: '2vh 1vw 12.99vh 1vw', backgroundColor: 'white', paddingLeft: '10px', paddingRight: '10px'}}>
            <Content>
              <Skeleton active round={true}/>
              <br/>
              <Skeleton active round={true}/>
              <br/>
              <Skeleton active round={true}/>
              <br/>
              <Skeleton active round={true}/>
              <Skeleton active round={true}/>
            </Content>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default SkeletonLoadingComponent;
