# Deliverables

### Project Title 

VerboVerse

### Team Members

##### Rubaiz Momin - 1006903479
##### Cindy Ji - 1006718223
##### Vanshika Virmani - 1006865251


### 5 Technical Challenges

- Managing asynchronous translation when two users are having a conversation
    - Will research more into implementing a message queue system for asynchronous processing of translation requests.
    - Can also use Redis, or a caching system for storing frequently accessed translations to improve efficiency and performance of the application 
- Allowing users to join the same meeting using WebRTC
    - Sendgrid be used for sending emails for invitations to the individual calls. The person who 'created' a room will be allowed to invite other users (who must sign up for the website) to collaborate on the same room. This invitation will involve sending a Room ID (or a secret key / link) to the user for authorization purposes.
- Due to limitations on the usage of Google Translation API and Speech-To-Text API, we need to figure out when a user is speaking to prevent unnecessary and irrelevant API calls.
- Ensuring the detection language is correct so that the entire process of gathering the audio to displaying the correct text translation.
- Figuring out how to use the Microsoft library for translating the documents, while preserving the original format will be a challenge.

## Project URL

verboverse.tech

**Task:** Provide the link to your deployed application. Please make sure the link works. 

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

_VerboVerse_ is an interactive web application that allows people from different cultural backgrounds and languages to communicate with each other effortlessly. The app offers users the option to create meetings with video and audio calling option. What makes this app an even more immersive experience for the users is that it serves as the platform for performing real time translation of the different languages so that people can overcome their language barriers. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. \\

Here is the tech stack:

### Technology Stack

- ReactJS for the Frontend
- ExpressJS and NodeJS for Backend
- Firebase for storing information about calls for WebRTC
- MongoDB for Database

## Deployment

**Task:** Explain how you have deployed your application. 

- Google cloud for deploying backend
- Versel for deploying the frontend of the application

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. It took a really long time for to figure out the authentication of our application. It was my first time using JWT tokens. I was easy to set up in the backend as we were attaching them as a cookie in the response when the user signs in. But it took me a while to figure out to access the token in the frontend, and send them through the middleware service for each endpoint that was accessable in the application. 
2. 
3. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 
Vanshika Virmani: 
    - Set up the backend using MongoDb 
    - Completed the pages for login and signin 
    - Completed user authentication in the backend using JWT tokens
    - Set up the memcache in the backend
    - Implemented the backend for Sendgrid feature for sending email invites to registered users
    - Did a refactoring of frontend code to redesign the UI for landing page and home page
    - Integrated user authentication on frontend
    - Application deployment using Google Cloud Platform and Vercel
    
# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
