# Verboverse

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works.


## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 



## Project Description

**Task:** Provide a detailed description of your app

VerboVerse is an interactive web application that allows people from different cultural backgrounds and languages to communicate with each other effortlessly. The app offers users the option to create and schedule meetings with video and audio calling option. What makes this app an even more immersive experience for the users is that it serves as the platform for performing real time translation of the different languages so that people can overcome their language barriers.

Overall, VerboVerse is an innovative and user-friendly web app that offers an engaging experience for communicating more easily.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

The app first uses WebRTC for meeting connection between 2 users. We, then use WebSpeechAPI to convert audio to text. As soon as we get the text, we use the Google Translation API to translate to the remote user's preferred language and send data using WebRTC data channels. The chatbox feature works in the similar way.

We used ReactJS for our framework as our application consisted of various components and we could leverage the component aspect of the ReactJS to build our application easily.
We use the three layer framework architecture where the frontend communicates with the backend through API service to post and get various data and the backend communicates with the database to fulfil frontend's needs.

Programming Language: HTML, CSS, Javascript
CSS Libraries: Mui, chatscope
Database: MongoDB and Firebase
Third Party API: WebSpeech API (Audio-to-Text), Google Translation(For translation), SendGrid(Email Notification)

## Deployment

**Task:** Explain how you have deployed your application. 


## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. The working of the webSpeechAPI along with Google Translation was challenging as we had to reset translation at some point for   subtitles to be concise in size.
2. The meeting connection was a challenge as Peer Connection is sensitive to breaking down
3. Securing the endpoints from signed-out user was a challenge using jwt token.

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

Vanshika: Backend, Middleware, Backend API Service for Frontend, Login and Sign up, MemCache, CSS for the application, SendGrid, Account Profile, Backend Schema
Cindy: WebSpeech API, Google Translation, Chat Box, CSS for the application, Data State for various functionalities (Audio, Video,  Transcription), Language Mapping, Account Profile
Rubaiz: Meeting Connection, Google Translation, Data Channels, Chat Box, Video Preview Meeting, WebSpeechAPI, Error handling, Security for frontend endpoints, Backend CORS

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
