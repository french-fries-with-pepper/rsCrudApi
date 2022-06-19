# CRUD API

## Description

My implementation of the CRUD API task from RS School.  
[Task link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Installation

Run `npm install` to get all dependensis.  
Create `.env` file in project folder and pass your port if you need it.
`.env`: `port=<your_port>`  
Whithout `.env` default port is `3000`

## Run

There are several npm scripts:

- `npm run start:dev`: Start server in development mode, you can change any code for inspect or debug something, and server will automatically restarts after saving.
- `npm run start:prod`: Start server in production mode, compile all `.ts` files and save them to `/dist` folder.
- `npm run start:multi`: Start server in multi-threaded mode _(experemental)_, also compile all `.ts` files to `/dist`.
- `npm run test`: Run tests.

## Usage

I implement all routes from task, so you can make api calls with any tool for it.  
Multi-threaded mode not implemented correctly - threads will created, and give all functionality, but they haven't shared memory between them. So it is my experement, i am not fully complete this part of task.
