
**🏎️ IITG Racing Web App**

A full-stack MERN application for managing and showcasing IIT Guwahati Racing’s cars, teams, sponsors, competitions, and events.
It includes a secure admin panel for CRUD operations and a public-facing site for visitors.

**🌟 Core Features**

**Public Website**

View current and past teams, cars, sponsors, events, and competitions.

Dedicated detail pages for each car, team, and event.

**Admin Dashboard**

Login-protected admin area.

Add / edit / delete:

Teams, cars, sponsors, competitions, events.

Image uploads handled on the backend.

**Data Seeding**

Seed scripts for:

Admin user

Cars, teams (including 2025), sponsors, events, competitions.

**Responsive UI**

Built with React components, protected routes, and a global auth context.

**📁 Project Structure**

**🧠 Backend (/backend)**

server.js – Express server entry point.

models/

Car.js, Team.js, Sponsor.js, Competition.js, Event.js, User.js

routes/

auth.js – Login / auth routes.

cars.js, teams.js, sponsors.js, competitions.js, events.js, public.js

middleware/

auth.js – JWT/authorization middleware.

scripts/

seedAdmin.js

seedCars.js

seedTeam2025.js

seedOldTeams.js

seedSponsors.js

seedCapablEvents.js / other event/competition seeding scripts

seedFromConfig.js

uploads/

Folder for uploaded images/files.

test-models.js, seed.js – utilities for testing and seeding.

**🎨 Frontend (/frontend or /src)**

src/components/

Navbar.js

ProtectedRoute.js

src/context/

AuthContext.js – authentication and user state.

src/pages/

Admin pages
AdminCars.js, AdminTeams.js, AdminSponsors.js, AdminEvents.js, AdminCompetitions.js

Public pages
PublicCars.js, PublicTeam.js, PublicSponsors.jsx, PublicEvents.js, PublicCompetitions.js, CarDetail.js, CarEdit.js

Login.js – admin login page.

src/assets/footer/ – footer assets.

Root files: App.js, App.css, index.js, index.css, logo.svg, postcss.config.js, .env, seed.js, server.js (if using CRA + custom dev proxy).

**⚙️ Installation & Local Setup**

1️⃣ Clone the repo

git clone https://github.com/Pranav-Shalya/iitgracing.git

cd iitgracing

2️⃣ Backend setup


cd backend

npm install

Create a .env file:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000

UPLOAD_DIR=uploads

Run the backend:

npm run dev

#or

npm start

**3️⃣ Seed initial data**

From the backend folder:


node scripts/seedAdmin.js

node scripts/seedCars.js

node scripts/seedTeam2025.js

node scripts/seedOldTeams.js

node scripts/seedSponsors.js

node scripts/seedCapablEvents.js

# add other scripts as needed
**4️⃣ Frontend setup**

cd ../frontend

npm install

npm start

By default:

Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000

Configure proxy in frontend/package.json if needed:

json
"proxy": "http://localhost:5000"
🔐 Admin Panel

Visit /login to sign in as admin.

After login, access pages like:

/admin/cars

/admin/teams

/admin/sponsors

/admin/events

/admin/competitions

ProtectedRoute.js + AuthContext.js ensure only authenticated users can access admin routes.


**🌍 Deployment**

**✅ Frontend**

Deployed on Vercel

Live domain: https://iitgracing.vercel.app/

Project: iitgracing on your Vercel account.

Typical frontend env variables (on Vercel):

REACT_APP_API_BASE_URL=https://your-backend-domain.com

**✅ Backend**

Deployed on Render

Live backend: https://iitgracing.onrender.com/ 

Typical Render environment variables:

PORT=10000        # or provided by Render

MONGODB_URI=your_production_mongodb_uri

JWT_SECRET=your_strong_secret

CLIENT_URL=https://iitgracing.vercel.app

UPLOAD_DIR=uploads

🔗 End-to-end flow
Frontend (Vercel) sends API requests to Render backend.

Backend serves:

Public routes (for site content).

Protected admin routes (CRUD).

Static uploads from /uploads.

🎯 Scripts

Backend package.json (example)
json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed.js",
  "test-models": "node test-models.js"
}

Frontend package.json (example)
json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}

**💡 Future Improvements**
Role-based permissions (multiple admin roles).

Analytics dashboard for events and sponsors.

Image optimization & CDN.

Automated seeding from external config/Instagram.

🏁 Built with speed, precision and a lot of racing spirit.
