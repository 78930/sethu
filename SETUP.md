# Sethu MVP – Complete Setup & Deployment Guide

This guide walks you through launching the Sethu MVP (full-stack Hyderabad manufacturing staffing marketplace) in **30 minutes**.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development (First 15 min)](#local-development-first-15-min)
3. [Demo Data & Testing](#demo-data--testing)
4. [Production Deployment](#production-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Software
- **Node.js 20+** – [Download](https://nodejs.org)
  - Verify: `node --version` (should be v20.x or higher)
- **npm 10+** – comes with Node.js
  - Verify: `npm --version`
- **MongoDB** (one of):
  - Local: Install from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud) (recommended for production)
- **Git** – [Download](https://git-scm.com)
- **VS Code** (optional) – [Download](https://code.visualstudio.com)

### Knowledge
- Basic command-line usage
- REST API concepts (GET, POST, PATCH)
- Environment variables (`.env` files)

---

## Local Development (First 15 min)

### Step 1: Navigate & Install (2 min)

```bash
# Navigate to project
cd sethu

# Install all dependencies (backend + mobile)
npm install
```

**Expected output:** Should see ~1050 packages installed with 0 vulnerabilities.

### Step 2: Start MongoDB (2 min)

**Option A: Local MongoDB**
```bash
# macOS/Linux
brew services start mongodb-community

# Windows
# Open Services → find "MongoDB Server" → Right-click → Start
# Or from terminal (if installed globally):
mongod
```

Verify: `mongosh` or MongoDB Compass shows database connection.

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Sign up → Create project → Create cluster
3. Add IP `0.0.0.0/0` (or your IP)
4. Create database user
5. Copy connection string (use as `MONGODB_URI` in Step 3)

### Step 3: Seed Backend with Demo Data (2 min)

```bash
# From project root

# Ensure backend/.env exists (use defaults)
# If not, create one:
cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sethu
JWT_SECRET=sethu-super-secret-change-in-production
CLIENT_URL=*
EOF

# Seed demo data (creates 3 users + 24 demo jobs)
npm run seed
```

**Expected output:**
```
✅ Seed complete
Admin: admin@sethu.app / Password@123
Factory: factory@sethu.app / Password@123
Worker: worker@sethu.app / Password@123
```

### Step 4: Start Backend API (3 min)

```bash
# In terminal 1
npm run dev:backend
```

**Expected output:**
```
✅ MongoDB connected: sethu
🚀 Sethu backend running on http://localhost:5000
```

Test API: Visit `http://localhost:5000/health` → Should return `{"ok":true,"service":"sethu-backend",...}`

### Step 5: Start Mobile App (4 min)

```bash
# In terminal 2 (new terminal window, backend still running)
npm run dev:mobile
```

**Expected output:**
```
▲ [webpack] Compiling...
► Press 'w' to open web
► Press 'a' to open Android
► Press 'i' to open iOS
► Press 'j' to toggle debugger
...
```

**Try the web version first:**
- Press `w` → Opens browser at `http://localhost:8081`
- Should see Sethu landing page

**Note:** Android/iOS require simulators/emulators set up separately.

### Step 6: Test Login & Browse (2 min)

In browser (`http://localhost:8081`):

1. **Worker Flow:**
   - Click "Login"
   - Select "Worker" role
   - Email: `worker@sethu.app`
   - Password: `Password@123`
   - Click "Login"
   - Should see 24 AI-matched jobs
   - Filter by area (Jeedimetla, Balanagar, etc.)
   - Click job card → See fit score & apply

2. **Factory Flow:**
   - Logout (profile → logout)
   - Click "Login"
   - Select "Factory" role
   - Email: `factory@sethu.app`
   - Password: `Password@123`
   - Should see "Post urgent hiring" button
   - Click → Fill form → Post job

3. **Admin Flow:**
   - Same process, select "Admin" role
   - Email: `admin@sethu.app`
   - Visit `http://localhost:5000/api/admin/stats` → See analytics JSON

---

## Demo Data & Testing

### Users (Pre-seeded)

| Role    | Email              | Password      | Skills                                  |
|---------|-------------------|---------------|------------------------------------------|
| Worker  | worker@sethu.app  | Password@123  | 5S, SOP, Line balancing, Quality inspection |
| Factory | factory@sethu.app | Password@123  | Hiring, Shift planning, Vendor coordination |
| Admin   | admin@sethu.app   | Password@123  | Operations, Verification                |

### Demo Jobs (24 pre-seeded)

All jobs are posted by the factory user across 12 Hyderabad industrial areas:
- **Balanagar**: Production Supervisor (Day)
- **Jeedimetla**: CNC Operator (Night)
- **Patancheru**: Welder (Rotational)
- **Cherlapally**: Quality Engineer (General)
- ... and 20 more

Each job has:
- ✅ Required skills
- ✅ Shift preference
- ✅ Pay range (₹22k–₹42k)
- ✅ Geo-coordinates (for distance matching)

### Testing Endpoints (via Postman/curl)

```bash
# 1. Health check
curl http://localhost:5000/health

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@sethu.app","password":"Password@123"}'

# Response includes JWT token, copy it

# 3. Get current user (replace TOKEN with JWT from login)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# 4. Get all jobs
curl http://localhost:5000/api/jobs

# 5. Get AI-recommended jobs for worker
curl http://localhost:5000/api/jobs/recommended/me \
  -H "Authorization: Bearer TOKEN"

# 6. Apply to job (replace JOB_ID)
curl -X POST http://localhost:5000/api/jobs/{JOB_ID}/apply \
  -H "Authorization: Bearer TOKEN"

# 7. Admin stats
curl http://localhost:5000/api/admin/stats
```

---

## Production Deployment

### Option 1: Render (Backend) + Vercel (Mobile)

**Recommended for quick deployment.**

#### 1A. Deploy Backend to Render

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Sethu MVP"
   git remote add origin https://github.com/YOUR_USERNAME/sethu.git
   git push -u origin main
   ```

2. **Create Render Blueprint**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect GitHub repo
   - Render auto-detects `render.yaml` in root
   - Review and click "Deploy"

3. **Set Environment Variables** (in Render dashboard)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: (get from MongoDB Atlas connection string)
   - `JWT_SECRET`: Generate strong secret
   - `CLIENT_URL`: (Vercel app URL, add later after web deployment)

4. **Wait for deployment** (3–5 min)
   - Render provides URL: `https://sethu-backend-xxxx.onrender.com`
   - Test: Visit `https://sethu-backend-xxxx.onrender.com/health`

#### 1B. Deploy Mobile Web to Vercel

1. **Build web export**
   ```bash
   npm run build:mobile:web
   ```
   Creates `mobile/dist/` folder.

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   cd mobile
   vercel deploy dist/
   ```
   Follow prompts, gets URL: `https://sethu-xxxx.vercel.app`

3. **Set Vercel Environment Variable**
   - Dashboard → Project Settings → Environment Variables
   - Add: `EXPO_PUBLIC_API_URL=https://sethu-backend-xxxx.onrender.com/api`

4. **Update Render** (go back to Render dashboard)
   - Set `CLIENT_URL=https://sethu-xxxx.vercel.app`
   - Redeploy

### Option 2: Self-Hosted (Advanced)

1. **VPS** (DigitalOcean, AWS EC2, Linode, etc.)
2. **Install Node.js + MongoDB** on VPS
3. **Clone repo + run backend**
4. **Use Nginx** as reverse proxy
5. **SSL cert** (Let's Encrypt)

(See [Render.yaml](./render.yaml) for reference.)

---

## Troubleshooting

### "npm install fails"
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "Cannot connect to MongoDB"
- **Local**: Run `mongod` in separate terminal
- **Atlas**: Check connection string format
  - Should be: `mongodb+srv://user:password@cluster.mongodb.net/sethu?retryWrites=true&w=majority`
- Check firewall allows port 27017

### "Backend won't start on port 5000"
```bash
# Check what's using port 5000
# macOS/Linux:
lsof -i :5000

# Windows (PowerShell):
Get-Process | Where-Object {$_.Handles -like "*5000*"}

# Change PORT in backend/.env or kill the process
```

### "Mobile won't connect to backend"
- Ensure backend running: `npm run dev:backend`
- Check `EXPO_PUBLIC_API_URL` in mobile/.env
- For web: Should be `http://localhost:5000/api`
- For native: Might need phone's IP address

### "Seed fails"
- Ensure MongoDB is running
- Check `MONGODB_URI` in backend/.env
- Delete existing collections manually (MongoDB Compass)

### "TypeScript build errors"
```bash
cd backend
npm run build  # Shows error details
# Fix files, then:
npm run dev:backend
```

---

## File Checklist

Verify these files exist before launching:

```
sethu/
  ✓ backend/.env
  ✓ mobile/.env
  ✓ .env.example
  ✓ backend/dist/ (after npm run build)
  ✓ mobile/dist/ (after npm run build:mobile:web)
  ✓ node_modules/ (after npm install)
```

---

## Next Steps

After local testing:

1. ✅ Deploy backend to Render
2. ✅ Deploy web to Vercel
3. ✅ Test production URLs
4. ✅ Share with Hyderabad factories & workers
5. 📝 Collect feedback
6. 🚀 Iterate: Add more areas, roles, features

---

## Support

- **Backend logs**: Terminal where you ran `npm run dev:backend`
- **Mobile logs**: Terminal where you ran `npm run dev:mobile`
- **MongoDB logs**: Check MongoDB Compass or Atlas dashboard
- **API docs**: See README.md for endpoint list

---

## Summary

| Step | Time | Command |
|------|------|---------|
| Install | 2 min | `npm install` |
| Setup DB | 2 min | Start MongoDB |
| Seed | 2 min | `npm run seed` |
| Backend | 3 min | `npm run dev:backend` |
| Mobile | 4 min | `npm run dev:mobile` |
| **Total** | **~15 min** | — |

You're now ready to show Sethu to Hyderabad factories! 🚀
