# Contributing

Thanks in advance for wanting to contribute and make the project better!

**If this is your first Pull Request** you can learn how to do Pull Requests
from this _free_ series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1. **Fork** and **clone** the repo
2. Run `npm install` to install dependencies and run validation
3. Create a `.env` file in the root directory.
4. Add a variable for your GitHub account auth token `GITHUB_TOKEN=<your_token>`
5. Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/jltwheeler/git-pulse.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Adding / Updating Features

### Project Structure

If you are planning to add new commands to the project, please follow the existing
project structure, that is, **modules** for each new **command** in the
`src/command/` directory.

### Tests

Please make sure to write tests for any features you would like to add to the
project. I'm aiming to maintain a high test coverage for the project.

### Committing

This project uses `husky` pre-commit hooks to enforce working tests and a
consistent code style using `eslint`. Anything you commit will need to pass
the `husky` pre-commit hook.

### Update Typings

Ensure any new or changed types that are global go into `src/index.d.ts` file.

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

## Acknowledgements

- Inspiration for `CONTRIBUTING.md` template from Kent C. Dodds

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[issues]: https://github.com/jltwheeler/git-pulse
