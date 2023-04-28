import React from 'react';
import logo from '../Navbar/ud_logo2.png';
import { FooterStyle } from './FooterStyle';
import FooterCol from './FooterCol';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function FooterLanding() {
  return (
    <>
      <Footer>
        <FooterStyle>
          <div className="container">
            <div className="footer__col1">
              <img
                src={logo}
                to={`/landing`}
                alt="underdog devs logo"
                height="68"
                style={{ marginLeft: '1vw' }}
              />
            </div>
            <div className="footer__col2">
              <FooterCol
                heading="Company"
                links={[
                  {
                    title: 'About Us',
                    path: '/',
                    type: 'Link',
                  },
                  {
                    title: 'Donate',
                    path: '/',
                    type: 'Link',
                  },
                  {
                    title: 'Contact Us',
                    path: '/',
                    type: 'Link',
                  },
                ]}
              />
            </div>
          </div>
        </FooterStyle>
      </Footer>
    </>
  );
}
