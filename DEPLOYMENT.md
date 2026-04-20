# Production Deployment Guide

This document provides detailed steps for deploying Sethu to production environments.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    End Users (Mobile)                       │
│              iOS / Android / Web Browser                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Vercel CDN    │
                    │  (Web Export)  │
                    └───────┬────────┘
                            │
        ┌───────────────────┴────────────────────┐
        │                                        │
   ┌────▼──────────────┐         ┌──────────────▼─────┐
   │  Render Backend   │         │  MongoDB Atlas     │
   │  (Node.js/Exp)    │◄───────►│  (Cloud DB)        │
   │  Socket.IO Server │         │  SSL/TLS Encrypted │
   └───────────────────┘         └────────────────────┘
        
        All traffic: HTTPS/TLS
        Real-time: WebSocket (Socket.IO)
        Database: Geo-indexed for area matching
```

---

## Pre-Deployment Checklist

- [ ] Backend builds without errors (`npm run build:backend`)
- [ ] Mobile builds without errors (`npm run build:mobile:web`)
- [ ] All tests pass (`npm run lint`)
- [ ] Seed data created locally (`npm run seed`)
- [ ] `.env.example` committed (without secrets)
- [ ] `render.yaml` committed
- [ ] Code pushed to GitHub (main branch)

---

## Step 1: Prepare MongoDB (Cloud)

### MongoDB Atlas Setup (Recommended)

1. **Create Account**
   - Go to [mongodb.com/cloud](https://www.mongodb.com/cloud)
   - Sign up with email/GitHub
   - Create organization

2. **Create Project**
   - New Project → Name: "Sethu Production"
   - Continue

3. **Create Cluster**
   - Select **M5 (free tier)** for MVP
   - Cloud Provider: AWS
   - Region: **ap-south-1** (Mumbai, closest to Hyderabad)
   - Create Cluster → Wait 5-10 min

4. **Configure Security**
   - Go to Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows any IP)
   - Alternatively, add only Render IP (more secure)

5. **Create Database User**
   - Database Access → Add Database User
   - Username: `sethu_prod`
   - Password: **Generate strong password** (save it!)
   - Built-in Role: `readWriteAnyDatabase`
   - Create User

6. **Get Connection String**
   - Cluster → Connect → Connect Your Application
   - Copy string, replace `<password>` with your password
   - Example: `mongodb+srv://sethu_prod:PASSWORD@cluster0.abc123.mongodb.net/sethu?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend (Render)

### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial Sethu MVP - Ready for production"
git remote add origin https://github.com/YOUR_USERNAME/sethu.git
git push -u origin main
```

### 2. Create Render Service

1. **Go to Render Dashboard**
   - [dashboard.render.com](https://dashboard.render.com)
   - Sign up/login with GitHub

2. **Create New Blueprint**
   - Click "New" → Blueprint
   - Select GitHub repo (sethu)
   - Click "Connect"
   - Render auto-detects `render.yaml`
   - Review blueprint
   - Click "Deploy"

### 3. Set Environment Variables

In Render Dashboard → Environment:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://sethu_prod:PASSWORD@cluster0.abc123.mongodb.net/sethu?retryWrites=true&w=majority
JWT_SECRET=generate-strong-secret-here
CLIENT_URL=https://sethu-web-xxxx.vercel.app
RAZORPAY_KEY_ID=(optional)
RAZORPAY_KEY_SECRET=(optional)
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Wait for Deployment

- Render deploys automatically (3-5 min)
- Check logs for `🚀 Sethu backend running`
- Test: `curl https://sethu-backend-xxxx.onrender.com/health`

**Note:** Save backend URL: `https://sethu-backend-xxxx.onrender.com`

---

## Step 3: Deploy Mobile Web (Vercel)

### 1. Build Web Export

```bash
npm run build:mobile:web
```

Creates `mobile/dist/` folder (ready for deployment).

### 2. Deploy to Vercel

**Option A: Vercel CLI**
```bash
npm install -g vercel
cd mobile
vercel deploy dist/
```

Follow prompts:
- Create team (or use personal)
- Set project name
- Set framework (Other)
- Vercel provides URL: `https://sethu-xxxx.vercel.app`

**Option B: Vercel Web Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Import Project → Select GitHub repo
3. Framework: Other
4. Build Command: (leave empty, using pre-built dist)
5. Output Directory: `mobile/dist`
6. Deploy

### 3. Set Environment Variables (Vercel)

- Project Settings → Environment Variables
- Add: `EXPO_PUBLIC_API_URL=https://sethu-backend-xxxx.onrender.com/api`
- Redeploy

### 4. Verify

- Visit `https://sethu-xxxx.vercel.app`
- Should load landing page
- Try login (uses your production backend)

---

## Step 4: Update Backend with Frontend URL

Once Vercel URL is ready:

1. **Go back to Render Dashboard**
2. **Environment → CLIENT_URL**
3. Set to: `https://sethu-xxxx.vercel.app`
4. **Redeploy** (click Deploy)

This enables CORS for the frontend domain.

---

## Step 5: Run Production Seed (Optional)

To seed production database with demo data:

```bash
# From your computer (not Render terminal)
MONGODB_URI="mongodb+srv://sethu_prod:PASSWORD@..." npm run seed
```

---

## Monitoring & Maintenance

### View Logs

**Render Logs:**
- Dashboard → Services → sethu-backend → Logs
- Search for errors, monitor requests

**Vercel Analytics:**
- Dashboard → Analytics
- Monitor web traffic

**MongoDB Metrics:**
- Atlas Dashboard → Cluster → Metrics
- Monitor queries, storage, connections

### Scale Up

- **Render**: Upgrade plan if needed (M5 → M20 tier)
- **MongoDB**: Upgrade cluster tier
- **Vercel**: Automatically scales on free plan

### Backup Database

```bash
# Download MongoDB backup
mongodump --uri "mongodb+srv://sethu_prod:PASSWORD@..." --out ./backup

# Restore if needed
mongorestore ./backup
```

---

## Custom Domain (Optional)

### Add Domain to Vercel

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Vercel Dashboard → Settings → Domains
3. Add domain → Update DNS records with registrar
4. SSL auto-enabled

### Add Domain to Render

1. Render Dashboard → Custom Domain
2. Add `api.yourdomain.com`
3. Update DNS CNAME records
4. Verify

---

## Security Best Practices

✅ **Implemented:**
- JWT tokens (expire in 7 days)
- Password hashing (bcryptjs)
- CORS configured
- Environment variables (secrets not in code)

⚠️ **TODO for Production:**
- [ ] Enable 2FA for admin accounts
- [ ] Add rate limiting (prevent brute force)
- [ ] Enable MongoDB encryption at rest
- [ ] Set up monitoring & alerting
- [ ] Regular security audits
- [ ] VPN for sensitive data
- [ ] IP whitelisting (restrict admin endpoints)

---

## Troubleshooting Production

### Backend won't start
```
Check Render logs for:
- MONGODB_URI invalid
- JWT_SECRET missing
- PORT already in use
```

### Mobile can't connect to backend
- Verify `EXPO_PUBLIC_API_URL` in Vercel
- Check Render logs for CORS errors
- Ensure `CLIENT_URL` matches Vercel domain

### Database connection slow
- Check MongoDB connection pool settings
- Verify network connectivity
- Consider upgrading MongoDB tier

### Out of memory
- Render M5: 512 MB (limit)
- Monitor with: `ps aux` in Render shell

---

## Cost Estimates (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| Render Backend | Starter | $0 (free tier; $7/mo for paid) |
| Vercel Web | Hobby | $0 (free tier) |
| MongoDB Atlas | M5 (Free) | $0 |
| **Total** | | **$0–$10/mo** |

Costs scale with usage. Free tiers sufficient for MVP.

---

## Rollback

If deployment fails:

```bash
# Render: Manual rollback
- Dashboard → Deployments → Select previous → Click Deploy

# Vercel: Manual rollback
- Dashboard → Deployments → Select previous → Promote to Production
```

---

## Success Criteria

✅ Production ready when:
- [ ] Backend URL accessible & returns `/health`
- [ ] Mobile loads landing page
- [ ] Can login with demo credentials
- [ ] Can browse & apply to jobs
- [ ] Admin can see stats
- [ ] Chat sends messages
- [ ] No errors in logs (past 5 min)
- [ ] HTTPS/SSL working
- [ ] Average response time < 500ms

---

## Feedback & Iteration

Post-launch feedback loop:

1. **Collect feedback** from factories & workers
2. **Fix bugs** (deploy via `git push` → auto-redeploy)
3. **Add features** (geomaps, notifications, video ID)
4. **Monitor analytics** (Vercel, Render logs, MongoDB)
5. **Repeat**

---

You're now production-ready! 🚀
