
# Hubby

👨‍💻 HUBBY: your personal hub where you can manage your creative deals, whether you're a company or a designer! 👨‍💻

Hubby is a simple and practical tool designed to facilitate the working relationship between designers and clients

- As a designer, you can create deals with clients, manage projects, and generate invoices.
- As a client, you can post job offers, manage deals with designers, and view projects.

This project is licensed under the MIT License.
## Demo
https://sensational-nasturtium-2c1df2.netlify.app/

Feel free to login with the following credentials:
- designer account: email: testdesigner@me.it - password: 1234567
- client account: email: testclient@me.it - password: 1234567



## Features
Hubby's primary feature allows a designer to create a deal with a client. This deal has different states that change through interactions between the two users (designer and client). 

The client can accept or reject a deal, and the designer can start, complete, and generate an invoice for it. 
Deals are visible within their respective dashboards, where users can interact with them.

Hubby also offers some secondary features:

- Clients can post job offers (to which designers can respond directly).
- Designers can upload their projects.
- Both clients and designers can view projects, a list of clients, and a list of designers.



## Tech Stack

**Fronte End:** React, Redux Toolkit, React-Bootstrap

**Back End:** Node.js, Express, JsonWebToken


## Run Locally

To get started with Hubby, clone this repository to your local machine and follow these steps


In your project's backend folder, run the following commands in the terminal:

```bash
npm init
```

Install dependencies

```bash
npm install
npm i bcrypt
npm i cloudinary
npm i cors
npm i dotenv
npm i express
npm i express-session
npm i express-validator
npm i jsonwebtoken
npm i mongoose
npm i multer-storage-cloudinary
npm i path
npm i pdfkit
npm i nodemon
```
In your .env file, add the following configurations:
  ```bash
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
MONGO_DB_URL=""
JWT_SECRET=""
```

Start the server

```bash
npm run dev
```

In your project's frontend folder, run the following commands in the terminal to install dependencies:

```bash
npm i @fortawesome/fontawesome-svg-core
npm i @fortawesome/free-regular-svg-icons
npm i @fortawesome/free-solid-svg-icons
npm i @fortawesome/react-fontawesome
npm i @reduxjs/toolkit
npm i axios
npm i bootstrap
npm i jwt-decode
npm i react
npm i react-bootstrap
npm i react-dom
npm i react-redux
npm i react-router-dom
```

In your .env file, add the following configurations:
  ```bash
 REACT_APP_SERVER_BASE_URL="http://localhost:5050" (if you're using port 5050 in the backend).
```

Start the project

```bash
npm start
```
## Contributing
Contributions to Hubby are welcome. If you'd like to contribute, please follow these steps:

- Fork the repository on GitHub.
- Clone your forked repository to your local machine.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Push your branch to your forked repository on GitHub.
- Create a pull request to merge your changes into the main repository.

