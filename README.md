# URL Shortener (aka. Tiny URL)

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&style=flat)
![Express](https://img.shields.io/badge/Express-lightgrey?logo=express&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&style=flat)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&style=flat)
![Ngrok](https://img.shields.io/badge/ngrok-black?logo=ngrok&style=flat)
![MySQL](https://img.shields.io/badge/MySQL-red?logo=mysql&style=flat)
![Prisma](https://img.shields.io/badge/Prisma-blueviolet?logo=prisma&style=flat)

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Schema](#schema)
- [Setup](#setup)

## Introduction
Have you ever had that moment when you send a funny video link to a friend, and then the suspense kicks in? Did they watch it? Did they laugh? Or did the link disappear into the void of unread messages? Well, one day, I decided enough was enough. Inspired by this very dilemma, I built a solution—a backend app that doesn’t just shorten URLs but also lets you know exactly when your friend opens the link by logging their IP and location.
Sure, it might sound a little crazy (and okay, a bit like a digital detective), but it works! And now, I can rest easy knowing my comedy masterpiece didn’t go unnoticed. 😂

## Prerequisites
- Download and install [Nodejs](https://nodejs.org/en)
- Download and install [MySQL](https://www.mysql.com/downloads/) using [Docker](https://www.docker.com/) from [Docker Hub](https://hub.docker.com/_/mysql)
- A text editor (e.g. Visual Studio Code `recommended`)
- A platform for testing APIs like [Postman](https://www.postman.com/downloads/)

## Features
- **URL Shortening**: Shorten long URLs into smaller ones.
- **Link Analytics**: Track the geographical locations of users accessing the shortened URL.
- **IP & Location Logging**: Log user IP addresses and their geographical location when they visit the shortened link.

## Future Enhancements
- [ ] Implement Link Expiration for time-limited URLs.
- [ ] Investigate and handle VPN usage for more accurate analytics.
- [ ] Enable Custom URL Patterns for personalized slugs.
- [ ] Dockerize the Application.
- [ ] API Documentation using Swagger.
- [ ] Deploy the Application to a Cloud Platform.

## Schema
![schema](https://github.com/user-attachments/assets/c698bfa0-0503-4e03-ae43-774070ffecb2)

## Setup  
To set up this project locally, follow these steps:  
1. Clone the repository
  ```
  https://github.com/MuhammedMagdyy/url-shortener 
  ``` 
2. Change the project's directory  
  ```
  cd url-shortener
  ```  
3. Install required [packages](https://github.com/MuhammedMagdyy/url-shortener/blob/main/package.json) using `npm install`   
4. Rename the `.env.example` file to `.env`, then add your [environment variables](https://github.com/MuhammedMagdyy/url-shortener/blob/main/.env.example)

5. Run the following commands in order:
  ```
  npm run prisma:migrate
  npm run prisma:generate
  npm run prisma:push
  ``` 
6. Start the application:  
   - Production: `npm start`  
   - Development: `npm run dev`  
---
Note
---
## Exposing Local Server with ngrok
If you need to expose your local development server to the internet (for testing, or accessing the app remotely), you can use **ngrok**. It creates a secure tunnel from the public internet to your local machine.

### Why ngrok?
We use ngrok to expose a local development server to the internet, especially in my case:
- Tested How IPs getting logged with locations because it didn't work fine in localhost.
- Access our local app from a remote location.

### Steps to Use ngrok:
1. **Install ngrok**:
   - Download and install ngrok from [here](https://ngrok.com/download).

2. **Authenticate ngrok**:
   - Create a free account on [ngrok](https://ngrok.com).
   - Get your authtoken from the [dashboard](https://dashboard.ngrok.com/get-started/your-authtoken).
   - Authenticate with the command:
     ```bash
     ngrok authtoken <your-authtoken>
     ```
3. **Expose Your Local Server**:
   - Start your local server (e.g., `localhost:3000`).
   - Run this command to expose it:
   
     ```bash
     ngrok http 3000
     ```
   - You will get a public URL (e.g., `(https://<random-string>.ngrok-free.app )`) that tunnels to your local server.

4. **Access Your Local Server**:
   - Use the public URL to access your local app from anywhere (e.g. make an HTTP request from Postman).
