import React from 'react';
import './Footer.css';
import github from '../Footer/github5.svg';
import youtube from '../Footer/youtube2.svg';
import twitter from '../Footer/twitter10.svg';
import gmail from '../Footer/gmail2.svg';

const Footer = () => (
  <div className="footer">
    <div className="leftFooter">
      <div className="svg">
        <img src={github} />
        <img src={twitter} />
        <img src={youtube} />
        <img src={gmail} />
      </div>
    </div>
    <div className="middleFooter">
      <div>
        <p className="middleText">Copyright 2021</p>
      </div>
    </div>
    <div className="rightFooter">
      <div>
        <p className="rightText">About</p>
        <p className="rightText">Our Mission</p>
        <p className="rightText">Contact</p>
        <p className="rightText">Donate</p>
      </div>
    </div>
  </div>
);

export default Footer;
