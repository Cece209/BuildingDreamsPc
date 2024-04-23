# CSC4330Project

Make sure to cd to the pc-builds directory

Here's a list of commands to use to install:

install nodejs (maybe with pip if using windows)

npm install react-bootstrap

npm install aws-amplify

npm install react-bootstrap bootstrap

npm install react-router-dom

npm install react-icons

npm install react-scripts

npm install -g @aws-amplify/cli

npm install -g @aws-amplify/ui-react

Then you do configuring in the terminal:

amplify configure

Remember to ignore questions about xdg-utils or such by pressing Enter

select region as us-east-2 (Ohio).

enter accessKeyId, which we should send to each person we want to open the project.

then enter your secret access key.

use any profile name.

Then you create an environment with:

amplify init

Use the defaults for everything given and use the user you created with amplify configure. 

then you run in the same directory:
npm start

This should create a local host run through your browser for accessing the website. 

Once in the website, create an account on the website and use the verification code sent to your email to authenticate.

