# Full Stack Implementation Exercise

# NotesApp

## 1. Intro

This is a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

- **Phase 1**: Note creation
- **Phase 2**: Tag application and filtering


## 2. Functionality

This app offer the following functionality:
- Create, Edit, delete notes.
- Archive / unarchive notes.
- List active notes.
- List archived notes.
- Create and delete categories for the notes.
- Add, edit and remove categories for the notes.
- Filter notes by categories.


## 3. Technologies

The app was developed using the Node.js ecosystem, using Express for Backend, React for Frontend and Sequelize as ORM and MySQL for database, versions of tools used during this development:

- Node.js (v18.16)
- MySQL (v8.0.30)
- npm (v9.5.1)
- Sequelize (v6.35.2)
- Express (v4.18.2)
- React (v18.2.0)

## 4. Considerations when running the app

In the app folder, there is a run.sh file, this file will execute all comands necesary to run the app but you need to have a few considerations:

1. You need to modify the values (NOT THE NAMES) of the environment variables declared at the very begining of the file so they can work on your own machine.

2. The first time you run the app the tables within the database will be empty, so you will have to manually add info using the App, this will be helpfull so you can check the functionality of the app while doing it.

3. Execute the backend in the port 3000, as all the Api calls from the Frontend are made to this endpoint. The Front end can run in any port you want, the CORS from the backend are configured so anyone can call the API.

4. You can run the run.sh script only by running the comand `./run.sh` on a command window (Personally i use git bash) while standing in the global folder of the project (Bedoya-99bfb3).
