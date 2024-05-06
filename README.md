Loan Application System
Description
This is a loan application system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to apply for loans, and administrators to review and approve these loan applications. The system also features protected routes and role-based authentication to ensure security and privacy.

Features
User Registration: Users can create accounts to apply for loans.
Loan Application: Users can submit loan applications with necessary details.
Admin Dashboard: Administrators can view and manage loan applications.
Approval Process: Admins can review and approve loan applications.
Protected Routes: Certain routes are protected and accessible only to authenticated users.
Role-based Authentication: Users and admins have different roles with different access permissions.
Technologies Used
MongoDB: NoSQL database used for storing user and loan application data.
Express.js: Web application framework used for building the backend server.
React.js: JavaScript library used for building the user interface.
Node.js: JavaScript runtime environment used for running the backend server.
JSON Web Tokens (JWT): Used for authentication and authorization.
Axios: Promise-based HTTP client for making requests to the backend API.

Installation
Clone the repository:https://github.com/developerxabhishek/Loan-Application
Navigate to the project directory:cd Loan-Application
Install dependencies for the frontend and backend:
cd client && npm install
cd ..
cd server && npm install
Set up environment variables:
Create a .env file in the server directory.
Define the following environment variables:

SECRET_KEY=<your jwtkey>
MONGODB_SERVER_PORT="mongodb://127.0.0.1:27017/techdom"
PORT=5000
Start the backend server:
cd server && npm start
Start the frontend development server:
Open your browser and navigate to http://localhost:3000 to access the application.
Usage
Register as a user or login as an admin.
for registering as an admin you have to an api request where you will have assign role to admin or directally manupulate the database and assign admin role to your account...
now login and you will be redirected to the appropriate dashboard (user or admin).
Apply for a loan (user) or review loan applications and approve/reject them (admin).
Logout when done.
Contributors
Abhishek Pandey
Acknowledgements
MongoDB
Express.js
React.js
Node.js
JSON Web Tokens
Axios
Contact
For any inquiries, please contact abhishekpandey095155@gmail.com.

Feel free to customize it further based on your specific project details and preferences!
Thank you

