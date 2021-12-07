import React from 'react';
import './Footer.css';
import github from '../Footer/github.svg';
import youtube from '../Footer/youtube.svg';
import twitter from '../Footer/twitter.svg';
import gmail from '../Footer/gmail.svg';

const Footer = () => (
  <div className="footer">
    <div className="leftFooter">
      <p className="leftText">About</p>
      <p className="leftText">Our Mission</p>
      <p className="leftText">Contact</p>
      <p className="leftText">Donate</p>
    </div>
    <div className="middleFooter">
      <p className="middleText">Copyright 2021</p>
    </div>
    <div className="rightFooter">
      <img src={github} alt="Github icon and link" />
      <img src={twitter} alt="Twitter icon and link" />
      <img src={youtube} alt="YouTube icon and link" />
      <img src={gmail} alt="Email icon and link" />
    </div>
  </div>
);

export default Footer;
