import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Divider } from 'antd';

const Signup = () => {
  const { Meta } = Card;

  return (
    <div className="container">
      <div>
        <h1>Signup</h1>
      </div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          />
        }
      >
        <Meta
          description="Ready to gain the technical skills required to become a Software Engineer?
          Sign up to become a Mentee and connect with an industry expert!
          "
        />
        <Link to="/menteeapplication">
          <Button type="primary" block>
            Mentee
          </Button>
        </Link>
      </Card>

      <Divider type="vertical" style={{ margin: '3em', height: '100px' }} />

      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          />
        }
      >
        <Meta
          description="Interested in supporting aspiring Software Engineers on their journey to achieve their goals? 
            Sign up to become a Mentor and start teaching!
            "
        />
        <Link to="/mentorapplication">
          <Button type="primary" block>
            Mentor
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Signup;
