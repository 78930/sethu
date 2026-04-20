# 🚀 Sethu – Quick Start (SYSTEM RUNNING NOW)

## ✅ What's Running

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | http://localhost:5000 | 🟢 Running |
| **Mobile App** | http://localhost:8081 | 🟢 Running |
| **Database** | mongodb://127.0.0.1:27017/sethu | 🟢 Connected |

---

## 📱 Access the App NOW

### Option 1: Browser (Easiest)
```
Open: http://localhost:8081
```
Login with demo credentials:
- **Email:** worker@sethu.app
- **Password:** Password@123

### Option 2: Expo Go (Mobile)
- Scan QR code from terminal output
- Opens in Expo Go app on your phone

### Option 3: iOS Simulator
- Press `i` in terminal

### Option 4: Android Emulator
- Press `a` in terminal

---

## 🔑 Demo Credentials

### Worker Account
```
Email: worker@sethu.app
Password: Password@123
```

### Factory Account
```
Email: factory@sethu.app
Password: Password@123
```

### Admin Account
```
Email: admin@sethu.app
Password: Password@123
```

---

## 🧪 Test the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs | jq '.' | head -50
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@sethu.app","password":"Password@123"}'
```

### Get Admin Stats
```bash
curl http://localhost:5000/api/admin/stats | jq '.'
```

---

## 📊 What You Can Do

### As a Worker
1. Browse jobs from 12 Hyderabad industrial areas
2. Filter by skill, role, shift, salary
3. Get AI-ranked recommendations
4. Apply to jobs
5. View applications status
6. Chat with factories
7. Manage profile

### As a Factory
1. Post new job openings
2. View worker applications
3. Search for workers by area/skill/role
4. Chat with interested workers
5. View dashboard analytics
6. Manage job postings

### As Admin
1. View system statistics
2. Manage users & jobs
3. Monitor applications
4. Analytics dashboard

---

## 🌍 Industrial Areas (12)

All with real Hyderabad coordinates for geo-matching:

1. **Balanagar** – Pharmaceutical, chemicals
2. **Jeedimetla** – Auto, manufacturing
3. **Patancheru** – Pharma, bulks
4. **Cherlapally** – Electronics, textiles
5. **IDA Bollaram** – Precision engineering
6. **Pashamylaram** – Light manufacturing
7. **Genome Valley** – Biotech, pharma
8. **Adibatla** – General manufacturing
9. **Shamshabad** – Aerospace, heavy industries
10. **Fab City** – Electronics, semiconductors
11. **GMR Aero City Aerospace Park** – Aerospace, defense
12. **Kattedhan** – Automotive, engineering

---

## 👷 Manufacturing Roles (50+)

**Production:** CNC Operator, Welder, Assembler, Quality Inspector, Production Supervisor...

**Engineering:** Mechanical Engineer, Electrical Engineer, Design Engineer, Process Engineer...

**Support:** Forklift Operator, Material Handler, Loader, Packer...

**Leadership:** Plant Head, Factory Manager, Shift Manager...

**Plus 40+ more roles!**

---

## 💼 Job Data Sample

**24 pre-seeded jobs with:**
- ✅ Real titles & descriptions
- ✅ Skill requirements
- ✅ Salary range: ₹22,000 – ₹42,000
- ✅ Shift types: Day, Night, Rotational
- ✅ Multiple openings per job
- ✅ All 12 areas covered

---

## ⚡ Quick Commands

### Terminal Commands
```bash
# Run backend
npm run dev:backend

# Run mobile
npm run dev:mobile

# Run both
npm run dev

# Seed database
npm run seed

# Build for production
npm run build

# Run linter
npm run lint
```

### Mobile Terminal Keys
```
? – Help menu
s – Switch to dev build
i – iOS simulator
a – Android emulator
w – Web browser
j – Log telemetry
c – Clear cache
d – Debug menu
r – Reload app
q – Quit
```

---

## 🔍 Example Workflows

### Workflow 1: Worker Finding Jobs
1. Go to http://localhost:8081
2. Click "Login as Worker"
3. Enter: worker@sethu.app / Password@123
4. Browse "Jobs" tab
5. Filter by area (e.g., Jeedimetla)
6. Filter by role (e.g., CNC Operator)
7. Click job → "Apply"
8. Go to "Applications" to track status

### Workflow 2: Factory Posting Jobs
1. Go to http://localhost:8081
2. Click "Login as Factory"
3. Enter: factory@sethu.app / Password@123
4. Click "Post a Job"
5. Fill details (title, skills, pay, area)
6. Submit
7. View applications in dashboard

### Workflow 3: Real-time Chat
1. Login as worker
2. Find a job and apply
3. Factory logs in → sees application
4. Factory clicks "Chat"
5. Real-time messaging via Socket.IO
6. Both see messages instantly

---

## 🎯 Testing Checklist

- [ ] Access http://localhost:8081
- [ ] Login with worker account
- [ ] Browse jobs with filters
- [ ] Apply to a job
- [ ] Switch to factory account
- [ ] See application in dashboard
- [ ] Post a new job
- [ ] Initiate chat with worker
- [ ] Check admin dashboard
- [ ] View system stats

---

## 🛠️ If Something Breaks

### Mobile Not Loading?
```bash
# In mobile/ folder:
rm -rf node_modules .expo
npm install
npm start --clear
```

### Backend Errors?
```bash
# Check database
curl http://localhost:5000/health

# Reseed data
npm run seed
```

### Port Already in Use?
```bash
# Backend (5000)
npx kill-port 5000 --yes

# Mobile (8081)
npx kill-port 8081 --yes
```

---

## 📱 Mobile App Screens

| Screen | What You Can Do |
|--------|-----------------|
| Login | Choose role, login with credentials |
| Dashboard | View stats, quick actions |
| Jobs | Browse all jobs, apply, filter |
| Job Detail | View full details, apply |
| Applications | Track your applications |
| Chat | Message with employers/workers |
| Map | View job locations |
| Profile | Edit info, view applications |

---

## 🔐 Security

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens (7-day expiry)
- ✅ Role-based access control
- ✅ Protected API endpoints
- ✅ No sensitive data in client

---

## 🌟 Key Features

### AI Job Matching
- Skills match: 55%
- Role match: 20%
- Area match: 15%
- Shift preference: 10%
- Distance bonus: Up to 15%
- **Total: 0–100 fit score**

### Real-time Updates
- Socket.IO for instant messaging
- Live job posting
- Application notifications
- Chat updates

### Search & Filter
- By area (12 locations)
- By role (50+ options)
- By shift (Day/Night/Rotational)
- By salary range
- By skills required

---

## 📈 Dashboard Analytics

**Admin sees:**
- Total jobs posted
- Total workers registered
- Total factories
- Total applications
- Top areas by demand
- Top roles by demand

---

## 🚀 Next: Production Deployment

See `DEPLOYMENT.md` for:
- Render backend deployment
- Vercel mobile hosting
- MongoDB Atlas setup
- Environment configuration

---

## 💬 Support

Check documentation:
- `SYSTEM_STATUS.md` – Full system info
- `API_REFERENCE.md` – API endpoints
- `SETUP.md` – Installation guide
- `FEATURES.md` – Complete features

---

**🎉 You're all set! Open http://localhost:8081 now!**
