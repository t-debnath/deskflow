# DeskFlow - IT Service Desk and Asset Management Portal

DeskFlow is a full-stack web application that I created for my final project. The purpose of the project is to manage IT service tickets and IT assets in one place.

Users can create, view, update, and delete tickets and assets. The application uses a React frontend, Express backend, and MongoDB Atlas database.

## Live Project

Frontend:

https://happy-forest-03af1600f.7.azurestaticapps.net

Backend API:

https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net

GitHub Repository:

https://github.com/t-debnath/deskflow

## Main Features

- Create, view, edit, and delete service tickets
- Create, view, edit, and delete IT assets
- Track ticket priority and status
- Track asset type, status, location, and assigned user
- Store ticket and asset information in MongoDB Atlas
- Access the application online through Microsoft Azure
- Use GitHub Actions for automatic deployment

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express
- Mongoose

### Database

- MongoDB Atlas

### Deployment and Project Tools

- GitHub
- GitHub Actions
- Microsoft Azure App Service
- Azure Static Web Apps
- Azure DevOps Boards

## Project Folder Structure

```text
deskflow/
├── client/
├── server/
├── screenshots/
├── .github/
├── .gitignore
└── README.md
```

The `client` folder contains the React frontend.

The `server` folder contains the Express backend and API routes.

The `screenshots` folder contains project screenshots.

The `.github` folder contains the GitHub Actions workflow files.

## API Endpoints

### Health Check

```text
GET /api/health
```

### Tickets

```text
GET /api/tickets
POST /api/tickets
PUT /api/tickets/:id
DELETE /api/tickets/:id
```

### Assets

```text
GET /api/assets
POST /api/assets
PUT /api/assets/:id
DELETE /api/assets/:id
```

## Run the Project Locally

### Backend

Open a terminal and go to the server folder:

```bash
cd server
npm install
npm start
```

The backend runs on:

```text
http://localhost:5001
```

The server requires a `.env` file with the MongoDB connection string.

Example:

```text
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

The `.env` file is not uploaded to GitHub because it contains private database information.

### Frontend

Open another terminal and go to the client folder:

```bash
cd client
npm install
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

## Cloud Deployment

The backend is deployed to Azure App Service.

The frontend is deployed to Azure Static Web Apps.

GitHub Actions automatically builds and deploys the project when changes are pushed to the main branch.

MongoDB Atlas is used as the cloud database.

## Azure DevOps

I used Azure DevOps Boards to create and track the project backlog.

The board includes work items for:

- Managing service tickets
- Managing IT assets
- Connecting MongoDB Atlas
- Deploying the application to Azure
- Setting up GitHub Actions
- Testing the live application
- Preparing project documentation

## Screenshots

Project screenshots are available in the `screenshots` folder. They show the development process, CRUD testing, MongoDB connection, GitHub repository, Azure deployment, GitHub Actions, and Azure DevOps board.

## What I Learned

This project helped me understand how the frontend, backend, and database work together in a full-stack application.

I also learned how to use GitHub for source control, GitHub Actions for deployment, Microsoft Azure for cloud hosting, MongoDB Atlas for database storage, and Azure DevOps for project planning.

## Author

Tanmoy Debnath
