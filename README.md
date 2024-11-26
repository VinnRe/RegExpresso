![](https://github.com/VinnRe/RegExpresso/blob/main/frontend/src/assets/header_reg_expresso.svg)

# RegExpresso
A web Application for converting Regular Expressions into Finite State Automata, specifically NFA or DFA. Using MongoDB, Express, React, NodeJS (MERN) for the entire web application and D3-graphwiz node_module for the visualization of the converted Regular Expressions.

Copyright © 2024 TripleThreat

[Kobe Capinpin - Project Manager](https://github.com/VinnRe)
[Timothy Alimagno - Frontend](https://github.com/mothy-08)
[Alexander Penuliar - Backend](https://github.com/Exuille)

## Features
- Login / Signup System
- Password change of user
- Conversion of Regular Expression into NFA or DFA
- Functioning User System and Regular Expression Parser
- Parsing of dotscript received from the inputted Regular Expression
- 5 Tuples Generation
- History of typed Regular Expressions

## How to Setup
### Clone the repository
We are assuming that you are going to use Visual Studio Code (VSCode) and have the at least node v22.11.0 and npm v10.9.0 installed.

Use this url to clone the project

> https://github.com/VinnRe/RegExpresso.git

Or use the "Open in Github Desktop"

### Frontend Setup
Open the frontend folder in the CLI

`cd frontend`

Once opened, download the required node_modules

`npm install`

OR

`npm i`

Then we can open up the web application

`npm run dev`
-------------
### Backend Setup
Open up another cmd terminal or press " CTRL + SHIFT + ` "

Open the backend folder in the CLI

`cd backend`

Once opened, download the required node_modeles by writing

`npm install` 

OR

`npm i`

Assuming that you have already made a new MongoDB Database
Create a '.env' file inside the backend folder and write this to connect the server to your MongoDB Database

```
    URI=INPUT+YOUR+MONGODB+SERVER+HERE
    PORT=3000 // Do not change the Port this is the port that the server is using
    JWT_SECRET=INPUT_YOUR_JWT_SECRET_HERE
    JWT_EXPIRES_IN=1h
```

After everything is done launch the server

`npm start`

With all that up and running you can now use the application and try out all the features.
-------------

# Have Fun using our web application!