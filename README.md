```
  _   _       _              __        __   _       _____         _
 | | | |_ __ | | __ _ _   _  \ \      / /__| |__   |_   _|__  ___| |_
 | | | | '_ \| |/ _` | | | |  \ \ /\ / / _ \ '_ \    | |/ _ \/ __| __|
 | |_| | |_) | | (_| | |_| |   \ V  V /  __/ |_) |   | |  __/\__ \ |_
  \___/| .__/|_|\__,_|\__, |    \_/\_/ \___|_.__/    |_|\___||___/\__|
       |_|            |___/                             Uplay Web Test
################################################################################
```

Welcome to your new job at Acme Games. You have been hired to make a web site
where users can log in to view their account information and their games.

Your task is to implement a responsive single page application, with two
mandatory features:

1) Log-in
Using their e-mail address and password as credentials a user should only be
allowed to view their own account.

2) Games Library
This page should list all the games you own. This can be done with additional
helpers like filters, sorting, search etc.

We also want you to write a report describing your thought process for both
choosing which features to implement but also designing your application as
well as an analysis on what would need to be done to make your application
production ready, if this is not something you were able to accomplish.

Non-functional requirements
* The application should run in all evergreen browsers (Chrome, Firefox, Edge)
* Testability needs to be covered in your report or by writing tests
* The application should be written in React or Vue
* You are allowed to use CSS frameworks
* You are allowed to use Babel, less, sass, packers, etc.

Please provide a link to a git repository or a zipped file containing your
application and the report as submission of your assignment.

--------------------------------------------------------------------------------

We have provided a back end API that you can use to fetch the required data.

The system handles user accounts, games and ownership of games.

A user account is an entity with the following information:
- User account id
- First name
- Last name
- E-mail address
- Password
- Date of birth
- Is admin

An ownership is an entity that connects a user account with a game and has the
following information:
- Ownership id
- User account id
- Game id
- State (indicates owned/revoked)
- Registered date

A game is an entity with the following information:
- Game id
- Name
- Thumbnail
- Age restriction

To run the server:
1. Clone this repository
2. Install the latest LTS version of node from here: https://nodejs.org/en/download/.
3. Navigate to the cloned folder with a terminal.
4. Run these commands:
    ```
    $ npm install
    $ npm start
    ```

The API endpoints are documented using swagger and available at
http://localhost:8081/api-docs/ when the API is running.

--------------------------------------------------------------------------------

Gl hf!
