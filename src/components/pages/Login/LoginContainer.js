import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  const history = useHistory();
  const loadWidget = useCallback(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      el: '#sign-in-widget',
      clientId,
      redirectUri,
      registration: {
        click: function () {
          history.push('apply');
        },
        // there is more we can do to handle some errors here.
      },
      features: { registration: true, showPasswordToggleOnSignInPage: true },
      // turning this feature on allows your widget to use Okta for user registration
      i18n: {
        en: {
          'primaryauth.title': 'Welcome to Underdog Devs Please sign in',
          'errors.E0000004': 'Invalid Credentials',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.showSignInAndRedirect({}).catch(function (error) {});
  }, [history]);

  useEffect(() => {
    loadWidget();
  }, [loadWidget]);

  return <div id="sign-in-widget" />;
};

export default LoginContainer;
