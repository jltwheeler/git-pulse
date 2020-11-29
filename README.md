# git-pulse

Node CLI tool to get concise information from github repos you follow.

## Initial planning

- TS app, look into ts config
- User runs commands to init config file, see latest repo versions, latest
  issue summaries that they track etc.
- command for adding things to config?
- What cli utility libs will it use?
- User config files best practice (linux for now)
- GitHub api, REST or GraphQL?
- How to handle user auth? 60 hit /day rate limit without auth, 5000 with auth
  token in header
- Global app that runs on `npm i git-pulse` or something
- mocking cli apps and api's
