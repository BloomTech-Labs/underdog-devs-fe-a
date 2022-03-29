import React from 'react';
import {
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import './LandingPage.css';
import pointAtScreen from './resources/pointatscreen.jpg';
import mentorHelpingMentee from './resources/mentorhelpingmentee.jpg';
import guyAtComputer from './resources/guyatcomputer.jpg';
import FooterLanding from '../FooterLanding/FooterLanding';

//Another Pull request is going to need figure out the best way to implement the current application wide header.
//Main content is separated into 4 containers named landInfo1,2... All have a left and right side corresponding with their container number.
//Images acquired from unsplash.com

function LandingPage() {
  return (
    <>
      <div className="landInfo1">
        <div className="left1">
          <h2 className="head1">UNDERDOG DEVS</h2>
          <p className="text1">
            We are a group of software engineers helping aspiring developers who
            are either formerly incarcerated or from an economically
            disadvantaged background.
          </p>
          <p className="text1">
            We are creating opportunities in tech for people who might not
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
            src={mentorHelpingMentee}
            alt="Mentor helping Mentee"
          ></img>
        </div>
      </div>
      <h2 className="head2">Why Choose Underdog Devs?</h2>
      <div className="landInfo2">
        <div className="left2">
          <h3 className="subHead2">Recidivism</h3>
          <p className="text1">
            According to data from the U.S. Bureau of Justice Statistics (BJS),
            67.8% of released state prisoners were arrested for a new crime
            within three years, and 76.7% were arrested within five years
            (Durose, Cooper, & Snyder, 2014). Reducing recidivism not only
            protects society at large, but also imporves the life quality of
            individual ex-prisoners.
          </p>
          <p className="text1">
            Incarceration rates in the U.S. began increasing dramatically in the
            1990s. The U.S. has the highest prison population of any country,
            comprising 25% of the world's prisoners.
          </p>
          <p className="text1">
            Out of a sample of 401,268 prisoners state prisoners released in
            2005:
            <br />
            68% of released prisoners were arrested within 3 years.
            <br />
            79% of released prisoners were arrested within 6 years.
            <br />
            83% of released prisoners were arrested within 9 years.
            <br />
            Using this study as a basepoint, one could state that the national
            recidivism rate is 83%
          </p>
          <p className="text1">
            recidivism and reentry on prisonpolicy.org/recidivism the ultimate
            guide on prisoninsight.com
          </p>
        </div>
        <div className="right2">
          <h3 className="subHead2">Unemployment and Poverty</h3>
          <p className="text1">
            Employment has long been recognized as having a negative
            correclation with crime (Uggen, 1999; Uggen et al., 2005)
            <br />
            <br />
            employment recidivism on ebpsociety.org
            <br />
            Researchers also have found that unemployment is associated with
            reduced recidivism(Skardhamar & Telle, 2012). The strongest
            predictor for recidivism: poverty + unemployment.
            <br />
            <br />
            poverty state capital and recidivism among women offenders on
            ojp.gov
          </p>
        </div>
        <div className="buttons2">
          <button className="learn">Learn more</button>
          <button className="learn2">Learn More</button>
        </div>
      </div>
      <div className="landInfo3">
        <div className="left3">
          <img
            className="img3"
            src={pointAtScreen}
            alt="Someone pointing at a computer screen"
          ></img>
        </div>
        <div className="right3">
          <h3 className="subHead3">What is a Mentor?</h3>
          <p className="text1">
            Our mentors are industry experts. They are experienceed software
            engineers from all over the industry who are committed to guiding
            the Underdog Devs. They have bi-weekly meeting with their mentees
            where they offer support in the form of encouragement, interview
            prep, resume analysis, and coding practice. They mentors develop
            relationships with the potential for referrals as their mentee
            develops and becomes job ready.
          </p>
        </div>
      </div>{' '}
      <div className="landInfo4">
        <div className="left4">
          <h3 className="subHead4">What is a Mentee?</h3>
          <p className="text1">
            Our mentees are aspiring software engineers from either
            disadvantaged backgrounds or are formerly incarcerated. They are
            ambitious and determined people learning the ins-and-outs of the
            software industry in order to land full time offers.
          </p>
        </div>
        <div className="right4">
          <img
            className="img4"
            src={guyAtComputer}
            alt="Man working on a computer"
          ></img>
        </div>
      </div>
      <div className="landSocial">
        <h3 className="subHeadSocial">Follow Us On Social Media</h3>
        <div className="iconRow">
          <GithubOutlined style={{ fontSize: '25px' }} />
          <TwitterOutlined style={{ fontSize: '25px' }} />
          <InstagramOutlined style={{ fontSize: '25px' }} />
          <YoutubeOutlined style={{ fontSize: '25px' }} />
          <LinkedinOutlined style={{ fontSize: '25px' }} />
        </div>
      </div>
      <FooterLanding />
    </>
  );
}

export default LandingPage;
