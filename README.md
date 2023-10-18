# Deliverables

### Project Title 

VerboVerse

### Team Members

##### Rubaiz Momin - 1006903479
##### Cindy Ji - 1006718223
##### Vanshika Virmani - 1006865251

## Web Application Description

_VerboVerse_ is an interactive web application that allows people from different cultural backgrounds and languages to communicate with each other effortlessly. The app offers users the option to create and schedule meetings with video and audio calling option. What makes this app an even more immersive experience for the users is that it serves as the platform for performing real time translation of the different languages so that people can overcome their language barriers. 

Overall, _VerboVerse_ is an innovative and user-friendly web app that offers an engaging experience for communicating more easily.

### Key Features for Beta Version

    - Login Page:
        - Users can sign in/ create an account using Auth0
        - Users can login to the website and access Home Page
    - Home Page:
        - User can see their user profile
            - Select their primary language (this will be the language that the audio in the meetings is translated to) 
        - Option to schedule a new meeting or join meeting
        - Feature for creating the room for a meeting
            - Enter email of the other user to invite them to the room
            - WebRTC for enabling two way communication channel, with both video and audio
            - Sendgrid to send email notification to the user with the meeting link/ room ID
        - Feature for joining a room
            - Click on the link in the email received
            - Enter the Room ID once you click “Join meeting” on Home Page
    - Translation Feature:
        - Use Web Speech API for detecting audio input, and using Google Cloud Speech-to-Text to convert the audio into text
        - Use Google Cloud Translation API to detect the language the text is in, and translate the text to the language of the other user’s choice
        - We will display the translated text on the screen of the other user
    
### Additional Features for Final Version

    - first feature
        - sub feature

### Technology Stack

    - ReactJS for the Frontend
    - ExpressJS and NodeJS for Backend
    - PostgreSql for Database
    - AWS Lightsail for deploying the Application

### 5 Technical Challenges

    - Managing asynchronous translation when two users are having a conversation
    - Allowing users to join the same meeting using WebRTC
        - Will be used for sending emails for invitations to the individual calls
        - The person who 'created' a room will be allowed to invite other users (who must sign up for the website) to collaborate on the same room. This invitation will involve sending a Room ID (or a secret key / link) to the user for authorization purposes.
    - Due to limitations on the usage of Google Translation API and Speech-To-Text API, we need to figure out when a user is speaking to prevent unnecessary and irrelevant API calls.
    - Ensuring the detection language is correct so that the entire process of gathering the audio to displaying the correct text translation.
