
# Social Network Application - React / Next.js

Constel Social Network is a web application built with [Next.js](https://nextjs.org/) that offers a social media platform where users can interact with posts, create new content, and engage with their friends. Here's a summary of its key functionality:

> [Watch the application demo video](https://www.loom.com/share/4649940c1ad24606a50776787544cb87?sid=ecd1b588-9226-4b29-93d9-1ed54a1a11ed)
> 
 - **Live website:** https://constel-social-network.vercel.app/home
 - **Credentials:** *pajicaleksandar44@gmail.com* / *mH5gx86dwSgSVBE*

## Table of Contents

- [Project Brief](#project-brief)
- [Getting Started](#getting-started)
- [Development](#development)
- [Folder Structure](#folder-structure)
- [Production](#production)

## Project Brief

### Login

**Route:** `/login`
- The login screen allows users to log in with their email and password.
- Frontend validation ensures that the email contains the '@' symbol, and the password is at least 6 characters long.
- Error messages are displayed for invalid inputs, such as incorrect email, wrong password, or other validation errors.
- Upon successful login, users are redirected to the home page.

### Home
**Route:** `/home`
- The home screen presents users with a feed of their friends' posts, similar to popular social media platforms like Twitter.
- Posts can consist of text, text with an image, or text with audio.
- Each post displays the number of comments and likes, along with options to like/unlike and comment.
- Users can create new posts, which are sent to the server for saving and then displayed in the feed.
-   Audio posts are recorded and visualize audio levels.
- The maximum length of audio posts is limited to 10 seconds.
- Users can add and remove comments on posts.
- The application is responsive and designed for both mobile and desktop devices.

### Backend
- Backend APIs are provided for authentication, post management, user account information, and more.
- Authentication is handled via a POST request to `/login`, which returns a token upon successful login.
- Users can access their account information via a GET request to `/accounts/me`.
- Posts are managed through routes such as `/posts`, `/posts/{post_id}`, and `/posts/{post_id}/like`.
- Deleting posts and comments is supported via DELETE requests.
- Users can like and unlike posts via POST and DELETE requests to `/posts/{post_id}/like`.
- Comments are retrieved and created using `/posts/{post_id}/comments` routes.
- The backend includes error handling and responds with appropriate status codes and messages.

### Design
- The application follows a design provided in Figma, which includes both mobile and desktop layouts.
- FontAwesome icons are used, except for the logo, which can be copied from the Figma design as an SVG.

For a detailed look at the design and additional implementation details, please refer to the [Figma design link](https://www.figma.com/file/CsDymzCuWqFQNzSHBTdZR1/Front-End-Zadatak?type=design&node-id=0-1&mode=design).

This project is a demo that offers a comprehensive social network experience with features for posting, liking, commenting, and more, making it a great platform for connecting with friends and sharing content.

## Getting Started

Follow these steps to set up and run the project on your local machine:

**1. Clone the repository to your local machine:**

`git clone https://github.com/aleksandar-pajic-44/constel-social-network.git`

**2.  Change your working directory to the project folder:**

`cd constel-social-network` 

**3.  Install the project dependencies using npm:**

`npm install` 

## Folder Structure

The project follows a specific folder structure to organize your code and assets effectively. Here's an overview of the important directories and files:

-   `components`: This directory is where all React components are placed.
-   `pages`: Next.js uses this directory to automatically generate pages based on the file structure.
-   `public`: Static assets like images, fonts, and other files go here.
-   `styles`: SCSS stylesheets or global styles for the project.
-   `utils`: Utility functions or modules that can be reused across the application.
-   `services`: Service functions for handling HTTP requests.
-   `models`: Typescript models and types for handling data.
-   `validation`: Validation for handling user forms

... etc.

## Development

To start a development server and work on your project, use the following command:

`npm run dev` 

This will start the Next.js development server, and you can access your project at [http://localhost:3000](http://localhost:3000/). The server will automatically reload when you make changes to your code.

## Production

To build your project for production and prepare it for deployment, use the following command:

`npm run build` 

This will create an optimized production build in the `build` directory.

To start the production server, use:

`npm start` 

Your production-ready app will be available at [http://localhost:3000](http://localhost:3000/).

Happy coding!
