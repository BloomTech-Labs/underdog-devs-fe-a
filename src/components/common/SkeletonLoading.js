import React from 'react';
import { Layout } from 'antd';
import { Skeleton } from 'antd';

const { Content, Sider } = Layout;

const SkeletonLoadingComponent = () => {

  let siderBackgroundColor = 'rgb(240, 242, 242)';
  let layoutSkeleton = 'rgb(247, 247, 247)';
  let contentSkeleton = 'white';

  if (localStorage.theme === 'dark') {
    siderBackgroundColor = '#262626';
    layoutSkeleton = '#000';
    contentSkeleton = '#262626';
  }

  return (
    <>
      <Layout style={{minHeight: '100vh'}} data-testid="skeleton-loading">
        <Sider style={{backgroundColor: siderBackgroundColor }}>
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
        <Layout style={{backgroundColor: layoutSkeleton }}>
          <Content style={{margin: '2vh 1vw 12.99vh 1vw', backgroundColor: contentSkeleton, paddingLeft: '10px', paddingRight: '10px'}}>
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
