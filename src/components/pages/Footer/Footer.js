import React from 'react';
import './Footer.css';
import github from '../Footer/github.svg';
import youtube from '../Footer/youtube.svg';
import twitter from '../Footer/twitter.svg';
import gmail from '../Footer/gmail.svg';

const Footer = () => (
  <div className="footer">
    <div className="leftFooter">
      <div className="svg">
        <img src={github} alt="Github icon and link" />
        <img src={twitter} alt="Twitter icon and link" />
        <img src={youtube} alt="YouTube icon and link" />
        <img src={gmail} alt="Email icon and link" />
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
