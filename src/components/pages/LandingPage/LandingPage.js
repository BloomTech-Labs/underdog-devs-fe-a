import React from 'react';
import './LandingPage.css';
import { Header } from 'antd/lib/layout/layout';
import { Layout } from 'antd';

//Another Pull request is going to need figure out the best way to implement the current application wide header.

function LandingPage() {
  return (
    <>
      <Header>
        {/* <div className="header">
          <div className="headerLinks">
            <a className="links" href="/">
              Mentee
            </a>
            <a className="links" href="/">
              Mentor
            </a>
            <a className="links" href="/">
              About
            </a>
            <a className="links" href="/">
              Contact Us
            </a>
          </div>
          <div className="loginLinks">
            <a className="signup" href="/signup">
              Sign Up
            </a>
            <a className="login" href="/login">
              Log in
            </a>
          </div>
        </div> */}
      </Header>
      <div className="landInfo1">
        <div className="left1">
          <h2 className="head1">UNDERDOG DEVS</h2>
          <p className="text1">
            We are a group of software engineers helping aspiring developers who
            are either formerly incarcerated or from an economically
            disadvantaged background.
          </p>
          <p className="text1">
            We are creating opportunities in tech for people who might no
            otherwise get an opportunity.
          </p>
          <p className="text1">We were founded in September of 2020.</p>
          <p className="text1">
            We currently depend on 100% volunteer support.
          </p>
        </div>
        <div className="right1">
          <img
            className="img1"
            src="https://unsplash.com/photos/IgUR1iX0mqM"
            alt="Mentor helping Mentee"
          ></img>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
