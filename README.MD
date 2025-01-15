
# Ramda API Overview
This application gets information about the Ramda organization from the GitHub API

# Developer Setup
1. Download and install Node.Js and NPM via https://nodejs.org.
2. Open a terminal of your choice at the root folder of this application. Git Bash, CMD (Windows) or Terminal (Mac) is recommended.
3. Run npm install to install the required packages via the command below:
```
npm install
```

# Project Prerequisites: Configuration / API Keys
In order to authenticate to the GitHub API, you'll need a personal access token.
Create a classic personal access token via https://github.com/settings/tokens. 
When creating the token, simply check the "read" options to give yourself read permissions to the different parts of the Github API.

Now you'll need to create a private config for the project to access your API token.

Create a file at the root of the project (at the same level as package.json, README, etc) named:
```
config.private.json
```
Create your json like this:
```json
{
    "githubApiToken": "YOUR_API_TOKEN_HERE"
}
```

# How to Run and Build the Project
Once you have completed the instructions in the 'Developer Setup' and 'Project Prerequisites' sections, you're ready to run the project. The following command will both build and run the project in a terminal of your choice. See the 'Developer Setup' section for recommended terminals. Simply run the below command at the root folder of the project:
```
npm run start
```

If you simply want to build the project without running it, the following build command is also available:
```
npm run build
```

# Project Structure Overview
The code entry point is located at:
```
src/index.ts
```

## Business Logic
Business Logic is broken out into "services" and "logic". Service files are meant to perform reuseable tasks such as retrieving data from an API. Logic files are meant to perform the business logic of the application, and will call services when necessary. Note that logic files are intended to call services but services should never call logic files.

Any Business Logic service files should be created at:
```
src/business_logic/services
```

Any Business Logic logic files should be created at:

```
src/business_logic/logic
```

## Models
Any Models should be created at:
```
src/models
```

# Project Naming Conventions
- Folders should always use snake case such as "business_logic" or "my_folder"
- Files should always use kebab case as well as "type indicators".
    - Services should be named with ".service.ts" such as "hello-world.service.ts"
    - Logic files should be named with ".logic.ts" such as "hello-world.logic.ts"
    - Models should be named with ".model.ts" such as "person.model.ts"

# Dependency Management
- In order to facilitate high quality testing standards, this project opts for a constructor based dependency injection pattern when possible.
- Service classes, logic classes, and any other classes or functions that need to be tested with mock implementations should always be injected via constructor dependency injection.
- Implementations of service and logic classes should always export a constant implementation with the proper dependencies created and passed into the constructor.
- In the case where a real service implementation is sufficient for a test (such as constants, utility methods, etc.), direct imports are acceptable.

# Generating Models for External APIs
To generate model files for external API's, this project uses [quicktype](https://quicktype.io/). 
You can use either the website itself, or the Visual Studio Code extension "Paste JSON as Code" by the author "quicktype"