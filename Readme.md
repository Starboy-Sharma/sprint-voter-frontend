# Emids Sprint Planner Web App 
This sprint planner app allows you to plan sprint with your team. You can create different teams and start planning for your sprint. This is a React app powered by **Vite**. This repository contains the front-end code of the sprint planner app. For backend code, soon I will add one more repository and link here.

## Installation
Clone the repository
In the root of the repository folder open terminal and run ``npm install``

## Start Project
``npm run dev``

## Modules 
- Login
- Signup
- Teams 
- Chat
- Dynamic Sprint title and description
- Add Team Members
- Available/Joined Members
- Sprint Vote Card
 

## Technologies 

- React 
- Socket.io 
- React Router v6
- Bootstrap


## Member Login
- A member can see the number of teams he/she is parts of.
- Member can join the sprint planning.


## TODO
[☑️] Teams page load user teams data with their member name from the database.

[☑️] On Click of Start planning redirect user to Chat Component.

[☑️] Create a room on the base of the team Id.

[☑️] Create Chat Component.

[☑️] Create Choose Card Component.

[☑️] Update Sprint title and description dynamically and pass with the socket connection.

[⚒️👷] Add team members

[ ] Show conditional view for team manager and members.

[ ] History Component.

[ ] Show the voting result when the user gives his vote with their name.

[ ] Create a navar which can logout the user and redirect user to teams page as well.

[ ] Show members listing when user joined the sprint planning.