# UNDERDOG DEVS

Creating opportunities in tech for people who are either formerly incarcerated or from an economically disadvantaged background.
By using a mentor / mentee format, the individual will be paired with a mentor to help them.

## DEPLOYED PROJECT

[UnderdogDevs](https://a.underdogdevs.dev/login)

## Installation

Clone the repo front-end repository to your machine. DO NOT FORK.

- Create an environment file (.env) based on the sample .env front-end and populate the environment variables .env variables

```bash
  git clone link-to-project
```

Go to the project directory

```bash
  cd underdog_devs-fe-a
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

---

_This app will need to run locally on port 3000._

---

## Axios with Auth0

This project uses auth0 to authenticate users Auth0 [Documentation](https://auth0.com/docs/). When a user attempts to login or to access a
protected routed they will be directed to auth0's third party sign on. After successful login they will be redirected to the dashboard or to
the protected endpoint they were attempting to reach.\

For a hands-on understanding of the mechanics here is a link to build your own app secured by auth0: [Quickstart](https://auth0.com/docs/quickstart/spa/react/01-login).
Auth0 stores the token privately so that it can't be accessed in the dev console or by another developer. So the `axiosWithAuth` process
requires that we utilize one of auth0's methods `getAccessTokenSilently` to get the token directly from auth0.

React does not allow us to use the useAuth0 hook (or its method: `getAccessTokenSilently`) in the `axiosWithAuth` helper. Here are the related
React docs that address this issue [hooks rules](https://reactjs.org/docs/hooks-rules.html) so we have built a `useAxiosWithAuth0()` hook to connect
`axiosWithAuth` to `getAccessTokenSilently`. This requires one extra step in `axiosWithAuth`'s implementation within components: We import the hook
and destructure `axiosWithAuth` from the hook. This is a good article that provided us a template for building this hook:
[link to article](https://blog.openreplay.com/integrating-axios-with-react-hooks.)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](https://github.com/BloomTech-Labs/underdog-devs-fe-a/blob/main/CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

Please adhere to this project's `code of conduct`.

## Bug / Issue Request

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Pull Request

If you have developed a patch, bug fix, or new feature that would improve this app, please submit
a pull request. It is best to communicate your ideas with the developers first before investing a
great deal of time into a pull request to ensure that it will mesh smoothly with the project.
\
\
Remember that this project is licensed under the MIT license, and by submitting a pull request,
you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Backend Documentation

See [Documentation](https://github.com/BloomTech-Labs/underdog-devs-be-a) for details on the backend of our project.
