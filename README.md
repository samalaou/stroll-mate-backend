# Stroll mMate - Backend (Express API)

## Description

This repository contains the **Backend** code for the **Stroll Mate App**, built using **Express.js** and **MongoDB**. The backend provides APIs for user authentication, managing walks, messaging between users, and more.

If you are looking for the **Frontend** (built with React), you can find it [here](https://github.com/samalaou/stroll-mate-frontend).


## Instructions

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `ORIGIN=https://mycoolapp.netlify.com`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=ilovepizza`)
  - PORT: Port to run the server (default is `5005`)
- run the application: `npm run dev` or `npm start`

## API Endpoints

<br/>

### **Health Check Endpoint**

| HTTP Verb | Path         | Headers | Request Body | Description                     |
| --------- | ------------ | ------- | ------------ | ------------------------------- |
| GET       | `/api/health` | –       | –            | Returns the API health status    |

<br/>

### **Auth Endpoints**

| HTTP Verb | Path            | Headers                          | Request Body                             | Description             |
| --------- | --------------- | -------------------------------- | ---------------------------------------- | ----------------------- |
| POST      | `/auth/signup`   | –                                | `{ email: String, password: String }`    | Create a new account    |
| POST      | `/auth/login`    | –                                | `{ email: String, password: String }`    | Log in a user           |
| GET       | `/auth/verify`   | `Authorization: Bearer <jwt>`    | –                                        | Verify JWT              |

<br/>

### **User Endpoints**

| HTTP Verb | Path            | Headers                          | Request Body                             | Description             |
| --------- | --------------- | -------------------------------- | ---------------------------------------- | ----------------------- |
| GET       | `/api/users`     | `Authorization: Bearer <jwt>`    | –                                        | Get authenticated user’s info |
| PUT       | `/api/users`     | `Authorization: Bearer <jwt>`    | `{ name: String, isAvailable: Boolean }` | Update authenticated user’s info |

<br/>

### **Walks Endpoints**

| HTTP Verb | Path                  | Headers                          | Request Body                             | Description             |
| --------- | --------------------- | -------------------------------- | ---------------------------------------- | ----------------------- |
| POST      | `/api/walks`           | `Authorization: Bearer <jwt>`    | `{ title: String, description: String }` | Create a new walk        |
| GET       | `/api/walks`           | –                                | –                                        | Get all walks            |
| GET       | `/api/walks/:walkId`   | –                                | –                                        | Get details of a specific walk |
| PUT       | `/api/walks/:walkId`   | `Authorization: Bearer <jwt>`    | `{ title: String, description: String }` | Update a walk (owner only) |
| DELETE    | `/api/walks/:walkId`   | `Authorization: Bearer <jwt>`    | –                                        | Delete a walk (owner only) |

<br/>

### **Messages Endpoints**

| HTTP Verb | Path                  | Headers                          | Request Body                             | Description             |
| --------- | --------------------- | -------------------------------- | ---------------------------------------- | ----------------------- |
| POST      | `/api/messages`        | `Authorization: Bearer <jwt>`    | `{ content: String, to: ObjectId }`      | Send a message           |
| GET       | `/api/messages`        | `Authorization: Bearer <jwt>`    | –                                        | Get messages between two users |
| GET       | `/api/messages/chats`  | `Authorization: Bearer <jwt>`    | –                                        | Get list of users the authenticated user has messaged with |

## Demo

A demo of the REST API can be found here: https://stroll-mate.onrender.com/api/
