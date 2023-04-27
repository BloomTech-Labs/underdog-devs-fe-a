import styled from 'styled-components';

export const FooterStyle = styled.div`
  .container {
    display: flex;
    gap: 3rem;
  }
  .footer__col1,
  .footer__col5 {
    flex: 2;
  }
  .footer__col2,
  .footer__col3,
  .footer__col4 {
    flex: 15;
  }
  .copyright {
    text-align: left;
    padding: 1rem 0;
  }
  @media only screen and (max-width: 768px) {
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0rem;
      & > div {
        margin-top: 5%;
      }
    }
    .footer__col1 {
      width: 100%;
      flex-basis: 100%;
      display: flex;
      justify-content: center;
    }
    .footer__col2,
    .footer__col3,
    .footer__col4 {
      margin: 0 auto;
      padding: 0 1% 0 1%;
    }
    .copyright {
      .container {
        div {
          margin-top: 0;
        }
      }
    }
  }
`;

export const ColStyle = styled.div`
  .heading {
    font-size: 1.2rem;
  }
  a {
    font-size: 1rem;
  }
`;
