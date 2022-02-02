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
    flex: 1;
  }
  .copyright {
    text-align: left;
    padding: 1rem 0;
  }
  @media only screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 0rem;
      & > div {
        margin-top: 5rem;
      }
    }
    .footer__col1 .para {
      max-width: 100%;
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
