# Emids Sprint Planner Web App 
This sprint planner app allows you to plan sprint with your team. You can create different teams and start planning for your sprint. This is a React app powered by **Vite**. This repository contains the front-end code of the sprint planner app. For backend code, soon I will add one more repository and link here.

## Installation
Clone the repository
In the root of the repository folder open terminal and run ``npm install``

## Start Project
``npm run dev``

## Modules 

- Team members Registration 

        Accept Invite -> Registration -> Join the Room 

- Team Lead Registration 

        Emids (TL) -> Creates a FE Team -> Send Invite -> Join/Start the Room 

        Emids (TL) -> Creates a BE Team -> Send Invite -> Join/Start the Room 

- Chat Room 

        For TL: Start Sprint Planning -> Send Notification to other members -> Add a title -> choose any one of the points. 

        For TM: Join the Room -> give votes -> Get the notification which points is accepted by TL. 

- Create Team & Invite 

- Login 
 

## Technologies 

- React 
- React Router v6 
- Socket.io 
- Redux 
- React Query 


## Team Invite link
- The link should be something like http://localhost:3000/join/{teamId}
  - When user click on the link clear user session.
  - Ask User Email
  - If user is already exists then move the user to the login page.
  - If user not exists then Register the user and move the user to the login page.


## Member Login
- A member can see the number of teams he/she is parts of.
- On click on start planning


## TODO
[☑️] Teams page load user teams data with their member name from the database.
[☑️] On Click of Start planning redirect user to Chat Component.
[ ] Create a room on the base of the team Id.
[⚒️] Create Chat Component.
[ ] Create Choose Card Component.