
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

graph TD
    iitgracing[iitgracing/]
    
    %% Backend
    backend[🧠 backend/]
    server[server.js<br/>Express server]
    models[models/]
    car[Car.js]
    team[Team.js]
    sponsor[Sponsor.js]
    comp[Competition.js]
    event[Event.js]
    user[User.js]
    routes[routes/]
    auth_rt[auth.js<br/>Login/Auth]
    cars_rt[cars.js]
    teams_rt[teams.js]
    spons_rt[sponsors.js]
    events_rt[events.js]
    public_rt[public.js]
    middleware[middleware/]
    auth_mw[auth.js<br/>JWT middleware]
    scripts[scripts/]
    seedAdmin[seedAdmin.js]
    seedCars[seedCars.js]
    seedTeam25[seedTeam2025.js]
    seedOld[seedOldTeams.js]
    seedSpons[seedSponsors.js]
    seedEvents[seedCapablEvents.js<br/>+ others]
    seedConfig[seedFromConfig.js]
    uploads[uploads/<br/>Image storage]
    utils[test-models.js<br/>seed.js]
    
    %% Frontend
    frontend[🎨 frontend/]
    src[src/]
    components[components/]
    navbar[Navbar.js]
    protected[ProtectedRoute.js]
    context[context/]
    auth_ctx[AuthContext.js]
    pages[pages/]
    admin_pages[Admin pages]
    adminCars[AdminCars.js]
    adminTeams[AdminTeams.js]
    adminSpons[AdminSponsors.js]
    adminEvents[AdminEvents.js]
    adminComp[AdminCompetitions.js]
    public_pages[Public pages]
    publicCars[PublicCars.js]
    publicTeam[PublicTeam.js]
    publicSpons[PublicSponsors.jsx]
    publicEvents[PublicEvents.js]
    publicComp[PublicCompetitions.js]
    carDetail[CarDetail.js]
    carEdit[CarEdit.js]
    login[Login.js]
    assets[assets/footer/]
    root_files[Root files<br/>App.js, index.js,<br/>logo.svg, .env]
    
    %% Connections
    iitgracing --> backend
    iitgracing --> frontend
    
    backend --> server
    backend --> models --> car
    models --> team
    models --> sponsor
    models --> comp
    models --> event
    models --> user
    
    backend --> routes --> auth_rt
    routes --> cars_rt
    routes --> teams_rt
    routes --> spons_rt
    routes --> events_rt
    routes --> public_rt
    
    backend --> middleware --> auth_mw
    backend --> scripts --> seedAdmin
    scripts --> seedCars
    scripts --> seedTeam25
    scripts --> seedOld
    scripts --> seedSpons
    scripts --> seedEvents
    scripts --> seedConfig
    backend --> uploads
    backend --> utils
    
    frontend --> src
    src --> components --> navbar
    components --> protected
    src --> context --> auth_ctx
    src --> pages --> admin_pages --> adminCars
    admin_pages --> adminTeams
    admin_pages --> adminSpons
    admin_pages --> adminEvents
    admin_pages --> adminComp
    pages --> public_pages --> publicCars
    public_pages --> publicTeam
    public_pages --> publicSpons
    public_pages --> publicEvents
    public_pages --> publicComp
    pages --> carDetail
    pages --> carEdit
    pages --> login
    src --> assets
    frontend --> root_files
    
    classDef backendStyle fill:#1f2937,stroke:#dc2626,stroke-width:3px,color:#fff
    classDef frontendStyle fill:#3b82f6,stroke:#1e40af,stroke-width:3px,color:#fff
    classDef modelStyle fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    classDef routeStyle fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    
    class backend,server,models,routes,middleware,scripts,uploads,utils backendStyle
    class car,team,sponsor,comp,event,user modelStyle
    class auth_rt,cars_rt,teams_rt,spons_rt,events_rt,public_rt routeStyle
    class frontend,src,components,context,pages,admin_pages,public_pages,assets,root_files frontendStyle


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
