🚀 IITG Racing - Official Website

✨ Live Site

🔗 Frontend: https://iitgracing.vercel.app/team
🔗 Backend:  https://iitgracing.onrender.com/api/public/teams

📁 Project Structure

iitg-racing-site/
├── frontend/                 # React 19 + Tailwind
│   ├── src/
│   │   ├── components/PublicTeam.js     # ✨ Team showcase
│   │   ├── pages/PublicCar.js           # Cars gallery
│   │   ├── pages/PublicEvents.js        # Events calendar
│   │   ├── pages/PublicSponsors.js      # Sponsors grid
│   │   └── pages/Admin/*                # Admin dashboard
│   └── package.json
├── backend/                  # Node + Express + MongoDB
│   ├── routes/public.js      # Public APIs
│   ├── routes/admin.js       # Admin APIs
│   ├── models/               # Team, Car, Event schemas
│   └── seed/                 # Data seeding scripts
└── README.md
🎯 Features

Frontend (Public Pages)

👥 PublicTeam - Responsive team showcase (5 categories: Management, Subsystem Heads, Marketing, Core, Alumni)

🚗 PublicCar - Formula Student cars gallery

📅 PublicEvents - Competitions & workshops

💰 PublicSponsors - Partners & supporters

📱 Mobile-first - Perfect on all screens

🎨 Dark/Light themes - Tailwind CSS 3.4

Admin Dashboard

🔐 Authentication - JWT + bcrypt

📝 CRUD - Teams, Cars, Events, Sponsors

📤 File uploads - Multer + Cloudinary

📊 Seeding - Bulk data import

🚀 Quick Start

1. Backend (Render LIVE)

# Already deployed: https://iitgracing.onrender.com
# APIs ready: /api/public/teams, /api/public/cars, etc.
2. Frontend (Local)
bash
cd frontend
npm install
npm start
# http://localhost:3000/team
3. Production Deploy
bash
cd frontend
npm run build
vercel --prod
# Auto-connects to Render backend
🔧 API Endpoints
javascript
// Public (No auth)
GET  /api/public/teams
GET  /api/public/cars  
GET  /api/public/events
GET  /api/public/sponsors

// Admin (JWT required)
POST /api/admin/teams
PUT  /api/admin/teams/:id
DELETE /api/admin/teams/:id
🛠 Tech Stack
text
Frontend: React 19, Tailwind CSS 3.4, React Router, Axios
Backend:  Node.js, Express 5, MongoDB, Mongoose 9
Auth:     JWT, bcryptjs
Upload:   Multer
Deploy:   Render (Backend), Vercel (Frontend)
📱 Responsive Features
text
✅ Mobile: 1-col → Touch-friendly
✅ Tablet: 2-3 cols  
✅ Desktop: 4-5 cols
✅ 4K: Perfect spacing
✅ Square team cards (all screens)
🎨 Team Page Highlights
text
✅ 5 Categories (Management/Core/Alumni +3)
✅ Auto-role detection
✅ LinkedIn integration
✅ Darker green theme (emerald-600)
✅ Glassmorphism effects
✅ Loading states + Error handling
🤝 Contributing
Fork repository

Create feature branch (git checkout -b feature/team-page)

Commit changes (git commit -m 'Add team filter')

Push (git push origin feature/team-page)

Open Pull Request

📄 License
MIT License - Free to use/modify

👥 Team Credits
Built for IIT Guwahati Formula Student Team
Pranav-Shalya - Full Stack Developer

🚀 Deployed with ❤️ for IITG Racing!
Visit: https://iitgracing.vercel.app/team
