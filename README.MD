
# Ramda API Overview
This application gets information about the Ramda organization from the GitHub API

# Developer Setup
1. Download and install Node.Js and NPM via https://nodejs.org.
2. Open a terminal of your choice at the root folder of this application. Git Bash, CMD (Windows) or Terminal (Mac) is recommended.
3. Run npm install to install the required packages via the command below:
```
npm install
```

# How to Run the Project
The following command is the most simple way to run the project in any terminal. 
Simply run the below command at the root folder of the project:
```
npm run build && node dist/index.js
```

The project also has a "launch.json" file set up for Visual Studio code located in the ".vscode" folder.
This will allow you to debug the project easily via "Run" -> "Start Debugging" or pressing the F5 hotkey.
Note that everything in the .vscode folder is excluded in gitignore with the exception of the launch.json file

# Project Structure Overview
The code entry point is located at:
```
src/index.ts
```

Any Business Logic services should be created at:
```
src/business_logic/services
```

Any Models should be created at:
```
src/models
```

# Project Naming Conventions
- Folders should always use snake case such as "business_logic" or "my_folder"
- Files should always use kebab case as well as "type indicators". 
  - Services should be named with ".service.ts" such as "hello-world.service.ts"
  - Interfaces should be named with ".interface.ts" such as "person.interface.ts"
  - Models should be named with ".model" such as "person.model.ts"

# Generating Models for External APIs
To generate model files for external API's, this project uses [quicktype](https://quicktype.io/). 
You can use either the website itself, or the Visual Studio Code extension "Paste JSON as Code" by "quicktype"