**IITG Racing - Official Web Platform**

IITG Racing is the Formula Student team from Indian Institute of Technology Guwahati, dedicated to designing, fabricating, and racing high-performance vehicles in national and international competitions like Baja SAE and Formula Student. This full-stack MERN application serves as the official digital platform for team management, showcasing cars, competitions, events, sponsors, and teams. Built from scratch without cloning any repositories, it provides admin and public interfaces for seamless content management.
​
**
Key Features**

Authentication & Authorization: Secure login with protected routes for admins using JWT and context management.

CRUD Operations: Full create, read, update, delete functionality for cars, events, competitions, sponsors, and teams across admin and public views.

Responsive UI: Modern React components with Tailwind CSS (inferred from structure), including detailed pages for car details, event listings, and sponsor showcases.

Admin Dashboard: Dedicated pages like AdminCars, AdminEvents, AdminSponsors, AdminTeams for content management.

Public Pages: User-friendly interfaces for PublicCars, PublicCompetitions, PublicEvents, PublicSponsors, PublicTeams.
​

**Tech Stack**

**Component	Technologies**

Frontend	React.js, Components (ProtectedRoute, AuthContext), CSS (App.css, index.css)

Backend	Node.js, Express.js (server.js, routes/, models/)

Database	MongoDB (inferred from MERN structure and seed files)

Deployment	Vercel (https://iitgracing.vercel.app/), Render (https://iitgracing.onrender.com/)

Tools	Postman testing (inferred), GitHub version control, Seed scripts (JS seed team2025.js)

**Project Structure**

iitgracing/
├── backend/
│   ├── models/     # MongoDB schemas
│   ├── routes/     # API endpoints (auth, cars, events, etc.)
│   ├── server.js   # Express server
│   └── seed/       # Data seeding scripts
├── frontend/src/
│   ├── components/ # Reusable UI (ProtectedRoute, AuthContext)
│   ├── pages/      # Admin/Public pages for all entities
│   └── assets/     # Images (logos: IIT, Instagram, LinkedIn, etc.)
├── package.json    # Dependencies for full-stack
└── README.md       # This file
Seed scripts like seed-team2025.js populate initial data for teams, cars, and events.
​

**Quick Setup & Run**

Clone the repo: git clone https://github.com/Pranav-Shalya/iitgracing.git

Backend: cd backend, npm install, npm run dev (uses nodemon from package.json).

Frontend: cd frontend, npm install, npm start.

Seed DB: Run node seed/JS seed team2025.js after MongoDB connection.

Environment: Copy .env template and add MONGODB_URI, JWT_SECRET.

Access at http://localhost:3000 (frontend) and http://localhost:5000 (backend APIs).
​

**Live Deployments**

Primary: https://iitgracing.vercel.app/ [Vercel for frontend]

Backend: https://iitgracing.onrender.com/ [Render hosting]

**Team & Contributions**

Developed by Pranav Shalya, IIT Guwahati student and software developer. Contributions welcome via pull requests—focus on performance, new features like real-time updates (Socket.io), or EV car dashboards inspired by IITG Racing's prototypes (Srijan, Tachyon). Follow the official team: @iitg.racing on Instagram.
​

**Future Roadmap**

Integrate real-time notifications for events/competitions.

Add car telemetry dashboards with charts.

EV-specific features for Formula Student Electric participation.

Mobile app with React Native.
