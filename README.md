## About The Project

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jltwheeler/git-pulse">
   <img src="assets/icon.png" width=100>
  </a>

  <h3 align="center">Git Pulse</h3>

  <p align="center">Node CLI tool to get concise information from the github repos you follow!
    <br />
    <br />
    <a href="https://github.com/jltwheeler/git-pulse/issues">Report Bug</a>
    |
    <a href="https://github.com/jltwheeler/git-pulse/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [TODO](#todo)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## TODO

- User runs commands to init config file, see latest repo versions, latest
  issue summaries that they track etc.
- command for adding things to config?
- User config files best practice (linux for now)
- How to handle user auth? 60 hit /day rate limit without auth, 5000 with auth
  token in header
- mocking cli apps and api's
- Establish CI/CD pipeline using github actions. Tasks should include:
  - install (`npm ci` and `npm audit`)
  - lint (`eslint` and `prettier`)
  - test (`jest` + generate code coverage)
  - build (transpile using `typescript`)
  - push (release tag `github` and `npm publish`)

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- put screen shot here?  -->

Node CLI tool to get concise information from github repos you follow.

### Built With

- [graphql-request](https://www.npmjs.com/package/graphql-request)
- [GitHub GraphQL API](https://docs.github.com/en/github-ae@latest/graphql/overview/about-the-graphql-api)
- [yargs](https://www.npmjs.com/package/yargs)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

```sh
git clone git@github.com:jltwheeler/git-pulse.git
cd git-pulse
npm start
```

### Prerequisites

- [npm](https://nodejs.org/en/download/)
- GitHub account

### Installation

1. Install package from npm globally

```sh
npm i -g git-pulse
```

2. Set up your GitHub Authetntication Tokens...

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature-amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature-amazing-feature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Josh Wheeler

Project Link: [https://github.com/jltwheeler/git-pulse](https://github.com/jltwheeler/git-pulse)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [plugins](plugins)
