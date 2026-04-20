# 🚀 Sethu – 5-Minute Quick Start

Get Sethu running in 5 minutes. Full details in [SETUP.md](SETUP.md).

---

## Prerequisites

- Node.js 20+ 
- MongoDB (local or MongoDB Atlas)

---

## Step 1: Install (1 min)

```bash
cd sethu
npm install
```

## Step 2: Start MongoDB

**Local:**
```bash
mongod
```

**Cloud (MongoDB Atlas):** Set `MONGODB_URI` in `backend/.env`

## Step 3: Seed Demo Data (1 min)

```bash
npm run seed
```

Expected output:
```
✅ Seed complete
Admin: admin@sethu.app / Password@123
Factory: factory@sethu.app / Password@123
Worker: worker@sethu.app / Password@123
```

## Step 4: Start Backend (1 min)

```bash
npm run dev:backend
```

Expected: `🚀 Sethu backend running on http://localhost:5000`

## Step 5: Start Mobile (1 min)

```bash
# In new terminal
npm run dev:mobile
```

Expected: `Press 'w' to open web`

## Step 6: Test (1 min)

1. Press `w` → Opens browser at `http://localhost:8081`
2. Click "Login"
3. Select "Worker" role
4. Email: `worker@sethu.app`
5. Password: `Password@123`
6. See 24 AI-matched jobs!

---

## 🎯 What You'll See

- **Landing:** Overview of Sethu, priority roles, core areas
- **Jobs:** AI-ranked jobs with filter (area, role, shift)
- **Apply:** Click job → See fit score (0–100) → Apply
- **Profile:** Edit skills, experience, areas, shifts
- **Chat:** Real-time messaging with factory
- **Admin:** View stats, area demand, role demand

---

## 📚 Next Steps

- **Local testing:** Done! 🎉
- **Full docs:** See [README.md](README.md), [SETUP.md](SETUP.md)
- **Production:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **API:** See [API_REFERENCE.md](API_REFERENCE.md)

---

## 🆘 Troubleshooting

**MongoDB won't connect?**
```bash
# Verify MongoDB is running:
mongosh
# Or check MongoDB Compass
```

**Backend won't start?**
```bash
# Check port 5000 isn't in use:
lsof -i :5000
# Or change PORT in backend/.env
```

**Mobile won't load?**
```bash
# Ensure backend is running first
# Check http://localhost:5000/health returns OK
```

---

**Ready? Let's go! 🚀**
