*************** 👨‍💻 HUBBY: your personal hub where you can manage your creative deals, whether you're a company or a designer! 👨‍💻 ***************

Hubby is a simple and practical tool designed to facilitate the working relationship between designers and clients.

*************** 🖥 ONLINE VERSION 🖥 ***************
►  https://sensational-nasturtium-2c1df2.netlify.app/

Feel free to login with the following credentials:
► designer account: email: testdesigner@me.it - password: 1234567
► client account: email: testclient@me.it - password: 1234567

*************** ⚡️ CORE FEATURE ⚡️ ***************
Hubby's primary feature allows a designer to create a deal with a client. This deal has different states that change through interactions between the two users (designer and client). 

The client can accept or reject a deal, and the designer can start, complete, and generate an invoice for it. 
Deals are visible within their respective dashboards, where users can interact with them.

*************** ⚡️ SECONDARY FEATURES ⚡️ ***************
Hubby also offers some secondary features:

► Clients can post job offers (to which designers can respond directly).
► Designers can upload their projects.
► Both clients and designers can view projects, a list of clients, and a list of designers.
► Technologies Used:

*************** 💻 TECHNOLOGIES 💻 ***************
Hubby is developed using the following technologies:

► Front-end: React
► Back-end: Node.js
► Database: MongoDB

*************** 🚥 HOW TO START 🚥 ***************
To get started with Hubby, clone this repository to your local machine and follow these steps:

/// 🟠 REQUIRED SERVICES 🟠 ////

► Create an account on Cloudinary and generate the name, API key, and API secret. Insert them into your .env file in the backend (https://cloudinary.com/).
► Create an account on MongoDB, generate the link, and insert it into your .env file in the backend (https://www.mongodb.com/try/download/compass).

//// 🟠 BACK END 🟠 ////

► In your project's backend folder, run the following commands in the terminal:
  - npm init
  - npm install
► Install the following dependencies:
  bcrypt
  cloudinary
  cors
  dotenv
  express
  express-session
  express-validator
  jsonwebtoken
  mongoose
  multer
  multer-storage-cloudinary
  path
  pdfkit
  nodemon
► In your .env file, add the following configurations:
  CLOUDINARY_CLOUD_NAME=""
  CLOUDINARY_API_KEY=""
  CLOUDINARY_API_SECRET=""
  MONGO_DB_URL=""
  JWT_SECRET=""
► Run the command `npm run dev` to start the server.

//// 🟠 FRONT END 🟠 ////

► In your project's frontend folder, run the following command in the terminal:
  - npm install
► Install the following dependencies:
  @fortawesome/fontawesome-svg-core
  @fortawesome/free-regular-svg-icons
  @fortawesome/free-solid-svg-icons
  @fortawesome/react-fontawesome
  @reduxjs/toolkit
  axios
  bootstrap
  jwt-decode
  react
  react-bootstrap
  react-dom
  react-redux
  react-router-dom
► In your .env file, add the following configuration:
  REACT_APP_SERVER_BASE_URL="http://localhost:5050" (if you're using port 5050 in the backend).
► In your project's frontend folder, run the command `npm start`.


*************** 👌🏻 USAGE 👌🏻 ***************

► As a designer, you can create deals with clients, manage projects, and generate invoices.
► As a client, you can post job offers, manage deals with designers, and view projects.

*************** 🙏 CONTRIBUTING 🙏 ***************
Contributions to Hubby are welcome. If you'd like to contribute, please follow these steps:

► Fork the repository on GitHub.
► Clone your forked repository to your local machine.
► Create a new branch for your feature or bug fix.
► Make your changes and commit them with descriptive messages.
► Push your branch to your forked repository on GitHub.
► Create a pull request to merge your changes into the main repository.
License:

*************** 🟢 LICENSE 🟢 ***************
This project is licensed under the MIT License.

