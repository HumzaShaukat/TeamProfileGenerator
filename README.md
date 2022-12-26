# TeamProfileGenerator

## Description

This is a CLI application that prompts the user for different members in a work team.  After the user answers question regarding the employees' roles, email, id, as well as some role specific questions, an HTML file populated with cards filled with information about the team is generated.  

## Usage

Once you open up the terminal in the directory in which this application is located type 
```terminal
node app.js
```
to begin the program. Once the program has been initialized, inquirer will ask you a series of questions asking you to fill out information about the team you are creating.  Once you answer the basic questions like name, ID, and email, inquirer will ask you for the employees role and will ask you a role specific question.  Once you select not to add a new team member, an HTML file will be created in the dist/output folder that will contain the newly generated page.

## Demo

[Here](./Assets/demo/demo.webm) is a link to the video demo of the CLI in action.
[Here](./dist/output/team.html) is the output file created during the demo.

## Credits

Starter code was provided by the instructor

## License

This software is licensed under the MIT license.
