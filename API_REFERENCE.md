# Sethu API Reference

Complete REST API documentation for Sethu backend.

---

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://sethu-backend-xxxx.onrender.com/api`

## Authentication

All endpoints requiring auth use Bearer token format:

```
Authorization: Bearer <JWT_TOKEN>
```

Get token from `/auth/login` or `/auth/register`.

---

## Endpoints

### Auth

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "Vikram Kumar",
  "email": "vikram@example.com",
  "password": "SecurePass123",
  "userType": "worker",
  "roles": ["Production Supervisor"],
  "skills": ["5S", "SOP"],
  "areas": ["Balanagar", "Jeedimetla"],
  "shiftPreference": ["Day"],
  "availability": "Immediate",
  "companyName": "Optional for factories"
}

Response 201:
{
  "token": "eyJhbGc...",
  "user": {
    "_id": "ObjectId",
    "name": "Vikram Kumar",
    "email": "vikram@example.com",
    "userType": "worker",
    ...
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "vikram@example.com",
  "password": "SecurePass123",
  "userType": "worker"  // Optional, defaults to worker
}

Response 200:
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response 200:
{
  "_id": "ObjectId",
  "name": "Vikram Kumar",
  "email": "vikram@example.com",
  ...
}
```

---

### Jobs

#### List Jobs
```
GET /jobs?area=Jeedimetla&role=CNC+Operator&shift=Day&q=supervisor

Query Parameters:
  - area: Filter by industrial area (exact match)
  - role: Filter by job title or preferred role
  - shift: Day, Night, Rotational, General
  - q: Full-text search on title, description, reqSkills, area

Response 200:
[
  {
    "_id": "ObjectId",
    "title": "Production Supervisor",
    "companyName": "AeroFab Components",
    "area": "Jeedimetla",
    "reqSkills": ["5S", "SOP"],
    "shift": "Day",
    "payMin": 28000,
    "payMax": 36000,
    "openings": 3,
    "description": "Lead shop-floor team...",
    "location": {
      "type": "Point",
      "coordinates": [78.453, 17.5398]
    },
    "createdAt": "2024-01-15T10:00:00Z"
  },
  ...
]
```

#### Get Recommended Jobs (Worker)
```
GET /jobs/recommended/me
Authorization: Bearer <token>
// User must be worker type

Response 200:
[
  {
    "_id": "ObjectId",
    "title": "Production Supervisor",
    "fitScore": 92,  // AI match score (0-100)
    "distanceKm": 2.5,  // Distance from worker location
    ...
  },
  ...
]

fitScore calculation:
  - Skills match: 55 pts
  - Role match: 20 pts
  - Area match: 15 pts
  - Shift match: 10 pts
  - Distance bonus: 15 pts (0-15 based on distance)
```

#### Get Job Details
```
GET /jobs/:id

Response 200:
{
  "_id": "ObjectId",
  "title": "Production Supervisor",
  ...
}
```

#### Post Job (Factory/Admin)
```
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json
// User must be factory or admin

{
  "title": "CNC Operator",
  "companyName": "AeroFab Components",
  "area": "Adibatla",
  "areas": ["Adibatla", "Shamshabad"],  // optional
  "reqSkills": ["CNC setup", "Blueprint reading"],
  "preferredRoles": ["CNC Operator"],
  "shift": "Rotational",
  "payMin": 24000,
  "payMax": 34000,
  "openings": 5,
  "description": "Operate CNC/VMC machines...",
  "location": {
    "type": "Point",
    "coordinates": [78.6811, 17.1952]  // optional
  }
}

Response 201:
{
  "_id": "ObjectId",
  "title": "CNC Operator",
  "factoryId": "ObjectId",
  "status": "Open",
  ...
}
```

#### Apply to Job (Worker)
```
POST /jobs/:id/apply
Authorization: Bearer <token>
// User must be worker

Response 201:
{
  "_id": "ObjectId",
  "jobId": "ObjectId",
  "workerId": "ObjectId",
  "status": "Applied",
  "fitScore": 92,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

### Users

#### Search Workers (Factory/Admin)
```
GET /users/workers/search?area=Jeedimetla&skill=5S&role=Production+Supervisor
Authorization: Bearer <token>
// User must be factory or admin

Query Parameters:
  - area: Filter by preferred area
  - skill: Filter by skill
  - role: Filter by preferred role

Response 200:
[
  {
    "_id": "ObjectId",
    "name": "Vikram Kumar",
    "roles": ["Production Supervisor"],
    "skills": ["5S", "SOP"],
    "areas": ["Jeedimetla"],
    "experienceYears": 4,
    "availability": "Immediate",
    // passwordHash omitted for security
  },
  ...
]
```

#### Update Profile (Any Authenticated User)
```
PATCH /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Vikram Kumar",
  "roles": ["Production Supervisor", "Quality Engineer"],
  "skills": ["5S", "SOP", "CAPA"],
  "areas": ["Jeedimetla", "Balanagar"],
  "experienceYears": 5,
  "salaryPreference": {
    "min": 25000,
    "max": 35000
  }
}

Response 200:
{
  "_id": "ObjectId",
  ...updated user
}
```

#### Update Location (Any Authenticated User)
```
POST /users/me/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "coordinates": [78.453, 17.5398]  // [longitude, latitude]
}

Response 200:
{
  "_id": "ObjectId",
  "location": {
    "type": "Point",
    "coordinates": [78.453, 17.5398]
  }
}
```

#### Upload Document (Worker)
```
POST /users/me/document
Authorization: Bearer <token>
Content-Type: multipart/form-data

File: document (certificate, ID, etc.)

Response 201:
{
  "message": "Document uploaded",
  "file": {
    "filename": "...",
    "mimetype": "application/pdf",
    "size": 12345
  }
}
```

#### Get My Applications (Worker)
```
GET /users/me/applications
Authorization: Bearer <token>
// User must be worker

Response 200:
[
  {
    "_id": "ObjectId",
    "jobId": "ObjectId",
    "status": "Applied",  // Applied, Under Review, Shortlisted, Rejected, Hired
    "fitScore": 92,
    "createdAt": "2024-01-15T10:00:00Z",
    "job": {
      "_id": "ObjectId",
      "title": "Production Supervisor",
      "companyName": "AeroFab",
      ...
    }
  },
  ...
]
```

#### Get Matches (Worker)
```
GET /users/me/matches
Authorization: Bearer <token>
// User must be worker

Response 200:
[
  {
    "jobId": "ObjectId",
    "fitScore": 92,
    "distanceKm": 2.5
  },
  ...
]
```

---

### Admin

#### Get Dashboard Stats
```
GET /admin/stats
// No auth required (but recommended for production)

Response 200:
{
  "totalJobs": 48,
  "totalWorkers": 1240,
  "totalFactories": 86,
  "totalApplications": 428,
  "pendingVerifications": 18,
  "areaDemand": [
    { "area": "Jeedimetla", "count": 28 },
    { "area": "Patancheru", "count": 24 },
    ...
  ],
  "roleDemand": [
    { "role": "Production Supervisor", "count": 14 },
    { "role": "CNC Operator", "count": 12 },
    ...
  ]
}
```

#### Verify User (Admin)
```
PATCH /admin/verify/:userId
Authorization: Bearer <token>
// User must be admin

Response 200:
{
  "_id": "ObjectId",
  "name": "Vikram Kumar",
  "verified": true,
  ...
}
```

---

### Chat

#### Get Messages with Peer
```
GET /chat/:peerId
Authorization: Bearer <token>

Response 200:
[
  {
    "_id": "ObjectId",
    "from": "ObjectId",
    "to": "ObjectId",
    "body": "Hi Vikram, your profile looks great!",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  ...
]
```

#### Send Message
```
POST /chat/:peerId
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "Thanks! I'm interested in the Jeedimetla opening."
}

Response 201:
{
  "_id": "ObjectId",
  "from": "ObjectId",
  "to": "ObjectId",
  "body": "Thanks! I'm interested in the Jeedimetla opening.",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### Real-time Chat (Socket.IO)
```javascript
// Client setup
const socket = io('http://localhost:5000', {
  query: { userId: 'worker-user-id' }
});

// Listen for messages
socket.on('receive_message', (message) => {
  console.log('New message:', message);
});

// Send message
socket.emit('send_message', {
  to: 'factory-user-id',
  body: 'Are you available for interview?'
});
```

---

### Payments

#### Create Razorpay Order
```
POST /payments/order
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000  // in INR, required for 1 day temp staffing
}

Response 200:
{
  "id": "order_XYZ123",
  "entity": "order",
  "amount": 100000,  // in paise
  "currency": "INR",
  "receipt": "sethu_1234567890",
  "status": "created",
  "notes": {
    "purpose": "temp_staffing_booking"
  }
  
  // If Razorpay keys not configured (MVP mode):
  OR
  {
    "mock": true,
    "orderId": "mock_...",
    "amount": 1000,
    "currency": "INR",
    "message": "Razorpay keys not configured. Returning mock order for local MVP."
  }
}
```

---

## Error Responses

All errors return appropriate HTTP status + JSON:

```
400 Bad Request
{
  "message": "Validation error or invalid payload"
}

401 Unauthorized
{
  "message": "Unauthorized or invalid token"
}

403 Forbidden
{
  "message": "Forbidden - insufficient permissions"
}

404 Not Found
{
  "message": "Resource not found"
}

409 Conflict
{
  "message": "Email already exists" (on registration)
}

500 Internal Server Error
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **No rate limiting implemented** (TODO for production)
- Recommended: 100 requests/min per IP

## Pagination

- **No pagination implemented** (returns all results)
- Recommended: Add `limit` + `offset` query params

## Caching

- **No caching implemented**
- Recommended: Cache job listings, admin stats

---

## Data Models

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique, lowercase),
  passwordHash: string (bcrypt hashed),
  userType: 'worker' | 'factory' | 'admin',
  companyName?: string,
  roles: string[],
  skills: string[],
  certifications: string[],
  experienceYears: number,
  areas: string[],
  shiftPreference: ('Day' | 'Night' | 'Rotational' | 'General')[],
  salaryPreference?: { min: number, max: number },
  availability: string,
  verified: boolean,
  location: {
    type: 'Point',
    coordinates: [longitude, latitude]  // GeoJSON
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Job
```typescript
{
  _id: ObjectId,
  factoryId: ObjectId (ref to User),
  companyName: string,
  title: string,
  area: string,
  areas: string[],
  reqSkills: string[],
  preferredRoles: string[],
  shift: 'Day' | 'Night' | 'Rotational' | 'General',
  payMin: number,
  payMax: number,
  openings: number,
  description: string,
  status: 'Open' | 'Closed',
  location: {
    type: 'Point',
    coordinates: [longitude, latitude]  // GeoJSON
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Application
```typescript
{
  _id: ObjectId,
  jobId: ObjectId (ref to Job),
  workerId: ObjectId (ref to User),
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Hired',
  fitScore: number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

### Message
```typescript
{
  _id: ObjectId,
  from: ObjectId (ref to User),
  to: ObjectId (ref to User),
  body: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing with cURL

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@sethu.app","password":"Password@123"}'

# Get token from response, then:
TOKEN="eyJhbGc..."

# Get current user
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Get jobs
curl http://localhost:5000/api/jobs

# Get recommended jobs
curl http://localhost:5000/api/jobs/recommended/me \
  -H "Authorization: Bearer $TOKEN"

# Apply to job
curl -X POST http://localhost:5000/api/jobs/JOB_ID/apply \
  -H "Authorization: Bearer $TOKEN"

# Admin stats
curl http://localhost:5000/api/admin/stats
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2024 | Initial MVP |

---

**Last Updated:** Jan 2024
