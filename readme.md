# Social Media Project (MERN Stack)

This is a social media project built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to provide users with a platform to connect, share, and interact with each other.

## Features

- User authentication and authorization
- User profiles with customizable settings
- News feed displaying posts from followed users
- Ability to create, edit, and delete posts
- Like and comment functionality on posts
- Real-time notifications for new interactions
- Search functionality to find other users and posts
- Messaging system for private conversations

## Installation

1. Clone the repository: `git clone https://github.com/your-username/social-media-project-MERN.git`
2. Navigate to the project directory: `cd social-media-project-MERN`
3. Install dependencies: `npm run build`
4. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
      ```
      MONGODB_URI=your-mongodb-uri
      JWT_SECRET=your-jwt-secret
      PORT=your-prefered-port
      SENDER_MAIL=mail-id-for-sending-otps
      MAIL_KEY=mail-application-key
      CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
      CLOUDINARY_API_KEY=your-cloudinary-api-key
      CLOUDINARY_API_SECRET=your-cloudinary-api-secret
      ```
5. Start the server: `npm run server`
5. Start the client: `npm run client`

## Technologies Used

- MongoDB: NoSQL database for storing user data and posts
- Express.js: Web application framework for building the server-side API
- React.js: JavaScript library for building the user interface
- Node.js: JavaScript runtime environment for running server-side code
- Socket.io: Real-time communication library for handling notifications and messaging
- Redux: State management library for managing application state
- Material-UI: UI component library for styling the application

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
