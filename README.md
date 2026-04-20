# Sethu – Hyderabad Manufacturing Staffing Marketplace

**Full-stack, cross-platform MVP** for Hyderabad industrial staffing. Connects factories to blue/grey-collar workers via AI-driven matching, area/role filters, and real-time chat.

### Branding
- **Name:** Sethu (bridge in Telugu)
- **Tagline:** Connecting Hyderabad Factories to Top Talent
- **Theme:** Industrial steel blues (#234f77) + orange (#f97316) accents
- **Logo:** Bridge icon (see [BridgeLogo.tsx](mobile/src/components/BridgeLogo.tsx))

---

## 🚀 Quick Start (30 minutes)

### Prerequisites
- Node.js 20+ ([nodejs.org](https://nodejs.org))
- MongoDB running locally or MongoDB Atlas URI
- npm 10+

### 1. Clone & Install
```bash
cd sethu
npm install
```

### 2. Backend Setup
```bash
# Create backend/.env (copy from .env.example if needed)
cp .env.example backend/.env

# Seed demo data
npm run seed

# Run backend (http://localhost:5000)
npm run dev:backend
```

### 3. Mobile Setup
```bash
# In new terminal, ensure backend is running

# Run mobile (starts on http://localhost:8081)
npm run dev:mobile

# Or directly test iOS/Android
npm --workspace mobile run ios
npm --workspace mobile run android

# Build for web
npm run build:mobile:web
```

### 4. Demo Logins (all use `Password@123`)
| Role    | Email              | Purpose                          |
|---------|-------------------|----------------------------------|
| Worker  | `worker@sethu.app` | Browse jobs, apply, manage profile |
| Factory | `factory@sethu.app`| Post jobs, search workers        |
| Admin   | `admin@sethu.app`  | View analytics, verify users     |

---

## 🏗️ Architecture

```
sethu/
  ├── mobile/           # Expo + Expo Router (iOS/Android/Web)
  │   ├── app/          # Route structure
  │   ├── src/
  │   │   ├── api/      # API client & services
  │   │   ├── components/ # UI components
  │   │   ├── constants/ # Areas, roles, theme
  │   │   ├── store/    # Zustand stores (auth, app state)
  │   │   └── types/    # TypeScript interfaces
  │   └── package.json
  │
  ├── backend/          # Express + MongoDB + Socket.IO
  │   ├── src/
  │   │   ├── routes/   # API endpoints
  │   │   ├── models/   # MongoDB schemas
  │   │   ├── middleware/ # Auth, error handling
  │   │   ├── utils/    # JWT, matching algorithm
  │   │   ├── config/   # DB, env
  │   │   └── seeds/    # Demo data
  │   ├── .env          # Local config
  │   └── package.json
  │
  ├── package.json      # Monorepo + scripts
  └── render.yaml       # Backend deployment config
```

---

## 📊 Core Features

### Workers
✅ Auth (email/password)  
✅ Profile (skills, roles, areas, shifts, salary, certs)  
✅ Job search (area/role/shift filters)  
✅ AI matching (skills + area + shift + distance geo-radius)  
✅ Applications tracking  
✅ Realtime chat (Socket.IO)  
✅ Notifications ready  

### Factories
✅ Auth  
✅ Job posting (area, skills, shift, pay, openings)  
✅ Worker discovery (area/skill/role search)  
✅ Hiring funnel dashboard  

### Admins
✅ Analytics (total jobs, workers, factories, applications)  
✅ Area-wise demand ranking  
✅ Role-wise demand ranking  
✅ Verify workers/factories  

### Platform
✅ 12 Hyderabad industrial areas (Balanagar, Jeedimetla, Patancheru, Cherlapally, IDA Bollaram, Pashamylaram, Genome Valley, Adibatla, Shamshabad, Fab City, GMR Aero City, Kattedhan)  
✅ 50+ manufacturing roles (Production Supervisor, CNC Operator, Welder, Quality Engineer, Maintenance Tech, Automation Engineer, etc.)  
✅ Geo-radius distance calculation (Haversine algorithm)  
✅ Razorpay temp staffing payments (mock fallback)  
✅ TypeScript + Zod validation  
✅ ESLint + Prettier  
✅ Demo seed data (24 jobs across all areas)  

---

## 🛠️ Tech Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| **Mobile** | Expo 53, React Native 0.79, Expo Router, NativeWind (Tailwind), Zustand, React Hook Form, Zod |
| **Backend** | Node.js/Express 4.21, MongoDB 8.13, Socket.IO 4.8, JWT, Multer, Razorpay |
| **Dev**  | TypeScript 5.8, ESLint 9, Prettier, tsx, Zod |
| **Deploy** | Vercel (web), Render (backend), MongoDB Atlas (prod DB) |

---

## 🌍 Deployment (Production)

### Backend (Render)

1. **Push to GitHub** (if not already)
   ```bash
   git init && git add . && git commit -m "Initial Sethu MVP"
   git remote add origin https://github.com/yourusername/sethu.git
   git push -u origin main
   ```

2. **Create Render blueprint** (included in `render.yaml`)
   - Go to [render.com](https://dashboard.render.com)
   - New → Blueprint
   - Connect GitHub repo
   - Use `render.yaml` (pre-configured)
   - Set env vars:
     ```
     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sethu
     JWT_SECRET=your-prod-secret-key
     CLIENT_URL=https://your-vercel-app.vercel.app
     ```

3. **Deploy** → Render auto-deploys on push to `main`  
   Backend URL: `https://sethu-backend-xxxx.onrender.com`

### Mobile Web (Vercel)

1. **Build web export**
   ```bash
   npm run build:mobile:web
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel deploy ./mobile/dist
   ```

3. **Set env vars in Vercel dashboard**
   ```
   EXPO_PUBLIC_API_URL=https://sethu-backend-xxxx.onrender.com/api
   ```

### Database (MongoDB Atlas)

1. Create cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Add IP whitelist: `0.0.0.0/0` (or your IP)
3. Create user with strong password
4. Copy connection string → use as `MONGODB_URI` in Render/backend

---

## 🗂️ File Structure

### Key Backend Files
- `backend/src/models/` → User, Job, Application, Message schemas
- `backend/src/routes/` → Auth, jobs, users, admin, chat, payments endpoints
- `backend/src/utils/match.ts` → AI matching algorithm (skills + area + shift + distance)
- `backend/src/seeds/index.ts` → 24 demo jobs across all areas
- `backend/src/server.ts` → Express + Socket.IO setup

### Key Mobile Files
- `mobile/app/(tabs)/jobs.tsx` → Main job listing with filters
- `mobile/app/(tabs)/profile.tsx` → Worker profile edit
- `mobile/app/factory/post-job.tsx` → Factory job posting
- `mobile/src/store/auth.ts` → Auth state (Zustand)
- `mobile/src/api/services.ts` → API calls with demo fallback
- `mobile/src/constants/` → Areas, roles, theme

---

## 📋 API Endpoints

### Auth
```
POST   /api/auth/register     # Create account
POST   /api/auth/login        # Login (returns JWT + user)
GET    /api/auth/me           # Get current user (requires auth)
```

### Jobs
```
GET    /api/jobs              # List all open jobs (filters: area, role, shift)
GET    /api/jobs/recommended/me # AI-ranked jobs for worker
GET    /api/jobs/:id          # Get job details
POST   /api/jobs              # Post new job (factory only)
POST   /api/jobs/:id/apply    # Apply to job (worker only)
```

### Users
```
GET    /api/users/workers/search  # Search workers (factory only)
PATCH  /api/users/me          # Update profile
POST   /api/users/me/location # Update location
POST   /api/users/me/document # Upload document (multer)
GET    /api/users/me/applications # Get my applications
GET    /api/users/me/matches  # Get AI matches
```

### Admin
```
GET    /api/admin/stats       # Dashboard stats
PATCH  /api/admin/verify/:userId # Verify user
```

### Chat
```
GET    /api/chat/:peerId      # Get messages with peer
POST   /api/chat/:peerId      # Send message
```

### Payments
```
POST   /api/payments/order    # Create Razorpay order (mock fallback)
```

---

## 🧪 Testing

### Run Backend Tests
```bash
npm run lint
npm run build:backend
```

### Run Mobile Tests
```bash
npm run lint
```

### Seed Fresh Data
```bash
npm run seed
```

---

## 🎯 Next Steps (Post-MVP)

- [ ] Geo-map UI (expo-maps with clustering)
- [ ] Commute time calculation (Google Maps API)
- [ ] Notifications (Expo Notifications)
- [ ] Video ID verification
- [ ] SMS OTP (Twilio)
- [ ] WhatsApp integration for chat
- [ ] Advanced match filtering (CIBIL score, experience, certifications)
- [ ] Employer branding dashboard
- [ ] Worker portfolio (projects, certifications)
- [ ] Batch hiring flows
- [ ] Analytics export (CSV)
- [ ] Mobile app store publishing (iOS App Store, Google Play)

---

## 🤝 Demo Walkthrough

1. **Start backend** → `npm run dev:backend`
2. **Start mobile** → `npm run dev:mobile`
3. **Login as worker** → `worker@sethu.app / Password@123`
4. **Browse jobs** → See area/role filters, AI scores
5. **Apply** → Click job card, get confirmation
6. **Login as factory** → `factory@sethu.app / Password@123`
7. **Post job** → Fill form, get instant listing
8. **View analytics** → Login as admin, see area/role demand

---

## 📚 Documentation

- **Backend API** → See `backend/src/routes/` for endpoint details
- **Mobile Components** → See `mobile/src/components/ui.tsx` for UI library
- **Matching Algorithm** → See `backend/src/utils/match.ts` for scoring logic
- **TypeScript Types** → See `mobile/src/types/index.ts` and backend models

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod` (local) or check MongoDB Atlas connection
- Check `MONGODB_URI` in `.env`

### "Backend API not found"
- Ensure backend is running: `npm run dev:backend`
- Check `EXPO_PUBLIC_API_URL` in mobile `.env`

### "npm install fails"
- Clear cache: `npm cache clean --force`
- Delete `node_modules`: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

### "Port 5000 already in use"
- Change `PORT` in backend `.env`
- Or kill process: `lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill`

---

## 📄 License

This project is part of the Sethu MVP for Hyderabad industrial staffing. Open source under MIT.

## Hyderabad industrial areas seeded in this project

Balanagar, Jeedimetla, Patancheru, Cherlapally, IDA Bollaram, Pashamylaram, Genome Valley, Adibatla, Shamshabad, Fab City, GMR Aero City Aerospace Park, and Kattedhan Industrial Area.

## Quick start (30 minutes)

### 1) Install dependencies

From the repo root:

```bash
npm install
```

### 2) Configure environment

```bash
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
```

Update these values:
- `backend/.env` → MongoDB URI, JWT secret, Razorpay keys (optional)
- `mobile/.env` → `EXPO_PUBLIC_API_URL`

### 3) Seed demo data

```bash
npm run seed
```

### 4) Run backend

```bash
npm run dev:backend
```

API health check:

```bash
http://localhost:5000/health
```

### 5) Run mobile/web app

```bash
npm run dev:mobile
```

Then choose:
- `w` for web
- Android emulator/device via Expo
- iOS simulator (macOS)

## Demo accounts after seeding

| Role | Email | Password |
|---|---|---|
| Admin | admin@sethu.app | Password@123 |
| Factory | factory@sethu.app | Password@123 |
| Worker | worker@sethu.app | Password@123 |

## Backend API overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Jobs
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (factory/admin)
- `POST /api/jobs/:id/apply` (worker)
- `GET /api/jobs/recommended/me` (worker)

### Workers/factories/admin
- `GET /api/users/workers/search`
- `PATCH /api/users/me`
- `POST /api/users/me/location`
- `POST /api/users/me/document`
- `GET /api/admin/stats`
- `PATCH /api/admin/verify/:userId`

### Chat
- `GET /api/chat/:peerId`
- `POST /api/chat/:peerId`
- Socket event: `send_message`

### Payments
- `POST /api/payments/order`

## Deployment

### Web → Vercel
Deploy from the `mobile/` folder.

Suggested Vercel settings:
- **Framework preset:** Other
- **Install command:** `npm install`
- **Build command:** `npx expo export --platform web`
- **Output directory:** `dist`

Also set:
- `EXPO_PUBLIC_API_URL=https://your-render-backend.onrender.com/api`

### Backend → Render
Deploy from the `backend/` folder.

Suggested Render settings:
- **Environment:** Node
- **Build command:** `npm install && npm run build`
- **Start command:** `npm run start`

Add env vars:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `RAZORPAY_KEY_ID` (optional)
- `RAZORPAY_KEY_SECRET` (optional)

## Notes
- The map screen uses **approximate seed coordinates** for Hyderabad industrial areas. Replace them with your preferred exact coordinates before production.
- The mobile app gracefully falls back to seeded local demo content if the backend is offline, so the UI can still be explored.
- Razorpay is wired as an API-first placeholder. Add your production keys and preferred frontend checkout flow before going live.

## Production hardening checklist
- Add OTP login
- Add KYC/work-doc verification workflow
- Add push notification delivery keys
- Add rate limiting and audit logging
- Add image optimization + S3/Cloudinary storage
- Add pagination and full-text search indexes
- Add background jobs for recommendations and notifications
- Add unit/integration tests
