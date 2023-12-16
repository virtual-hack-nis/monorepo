# NIS Virtual Hack 2023

(Link to the github repo)[https://github.com/virtual-hack-nis/monorepo.git]

## Brief Description - Idea & Technologies 

### System

### Description

We are trying to implement the American Airlines AAdvantage program model to the already existing business of the NIS Group, with the focus on Taxi Drivers as the target group. We will create a proof of concept set of entities that should paint the picture of our vision.

Team:
- Nevena Tomic - [Linkedin](https://www.linkedin.com/in/nevena-tomic-762b121b9/)
- Luka Radisavljevic - [Linkedin](https://www.linkedin.com/in/luka-radisavljevic/), [Github](https://github.com/Madjarx)

### Tech Stack

We decided to go with the Javascript & derivatives in order to move quickly as time is limited. Supabase, backend as a service, really helped us out, although we're not managing it properly. React was the choice for frontend. We avoided using Typescript as the idea & value prop behind the hackathon idea changed often.

## Instructions

### Installing the project

Upon downloading the project, run `yarn install` within the root of the project to install all dependencies. Note that we're using the yarn caching mechanism to speed up the installation process - a.k.a. zero-installs.

note about node_modules:
Don't worry if packages are installed "two times", yarn will create simlinks between the packages, If you want to get the autocomplete thingy going on in your code editor and you're missing node_modules, run yarn install directly in the package and you'll get a lot of simlinks iirc.

### Running the scripts

Within the root of the project, run the scripts by typing `yarn run <script-name>`. For example, to run the `build` script, type `yarn run build`. Scripts are defined in the root `package.json` file.

Within this yarn workspaces monorepo, you can invoke lower level scripts by typing `yarn workspace <workspace-name> <script-name>`. For example, to run the `build` script in the `packages/client` workspace, type`yarn workspace client build`.

## Available Scripts

Not all scripts may be documented here.

Use the `./scripts/start.sh` script to run the program, it is meant to automatically hook up everything you need.

Start scripts:
- `start:docs` - starts the docusaurus docs
- `start:faucet` - starts the faucet locally
- `start:app` - starts the metro bundler for the expo app
- `start:supabase` - starts the supabase on the localhost. NOTE - Luka to make sure that other people dont need to worry bout supabase, introduce nodemon to do hotreloads or something every now and then
- `start:visualizer` - starts the visualizer on localhost:3000 (figure out if supabase needs port 3000)

Build scripts:
- 

Note that theres no `mocks` script, we will have more direct scripts be invokable from within that package, we won't lose time on having them be invokable from the root level.

## Packages within the monorepo

### Refer to package specific directory for docs about that package (or docusaurus docs)

Currently we're planning on using the following packages within our monorepo:
- supabase - this is our backend as a service package, we're using the supabase cli to manage the database / edge functions etc.
- app - package containing our expo application
- mocks - since we're building a POC, we shall add some sort of mock services / simulations that would help us explain our idea further. This package will contain such.
- docs - this package will contain docusaurus documentation about the endpoints and such
- visualizer - visualization service, you can check it out [here](https://github.com/zernonia/supabase-schema), kudos to the guy. Used for visualizing the database schemas.

## Versioning the monorepo

Semantic versioning

## Branch structure during the Hackathon
- master - this branch will contain the LTS version of the project. Luka shall manage the pull requests and merges
- develop - this branch shall be our rolling branch
- feat/feature-name - feature specific branches

Hotfixes go into develop!!!