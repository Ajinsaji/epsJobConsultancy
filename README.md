# EPS Job Consultancy Platform (MERN)

## Project Overview
Employment Placement Services (EPS) Job Consultancy Platform connecting **Candidates**, **EPS Staff**, **Companies**, and **Super Admin** through a role-based workflow.

## Business Workflow
**Company** → **EPS** → **Platform** → **Candidate** → **EPS** → **Company**

### Candidate Workflow
1. Register
2. Complete Profile
3. Upload Resume
4. Search Job
5. Apply
6. Track Application

### EPS Workflow
1. Create Job
2. Review Applications
3. Shortlist Candidates
4. Forward Profiles
5. Schedule Interview

### Company Workflow
1. Receive Candidate
2. Review Resume
3. Interview
4. Accept or Reject

## User Roles
- **Candidate**
- **EPS Staff**
- **Company**
- **Super Admin**

## Features
### Authentication & Security
- Register, Login, Logout
- Forgot Password, Reset Password
- JWT Authentication
- Role Based Authorization
- Helmet, CORS, Rate Limiter
- Password Hashing (bcryptjs)

### Jobs
- Create, Update, Delete
- View, Search, Filter

### Applications
- Apply Job
- Withdraw Application
- Track Status

Status pipeline:
- Applied
- Under Review
- Shortlisted
- Interview Scheduled
- Selected
- Rejected

### EPS Staff
- View Candidates
- Review Resumes
- Shortlist Candidates
- Forward Profiles
- Schedule Interviews
- Update Status

### Companies
- Receive Candidate Profiles
- Accept / Reject
- Provide Feedback

### Notifications (future-ready)
- Database notifications now
- Email/SMS/WhatsApp later (architecture prepared)

### Future Ready (prepared)
- AI Resume Analyzer
- Subscription System
- Payment Gateway
- WhatsApp Integration
- Mobile App support

## Tech Stack
### Frontend
- React
- Vite
- React Router DOM
- Axios
- Redux Toolkit
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Framer Motion

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### File Upload
- Multer

### Email
- Nodemailer

### Validation
- Express Validator

### Security
- Helmet
- CORS
- Rate Limiter

### Environment
- dotenv

## Folder Structure
```txt
EPS/
  client/
    src/
      assets/
      components/
      layouts/
      pages/
      services/
      redux/
      hooks/
      utils/
      routes/
      context/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    uploads/
  docs/
  README.md
```

## Database Design
Planned Mongoose models:
- User
- Candidate
- Company
- Job
- Application
- Interview
- Notification

## API Structure
Backend will expose REST endpoints grouped by:
- `/api/auth`
- `/api/candidates`
- `/api/companies`
- `/api/jobs`
- `/api/applications`
- `/api/interviews`
- `/api/notifications`
- `/api/admin`

## Installation Guide
1. Create environment variables (see below).
2. Install and run backend:
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. Install and run frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Environment Variables
### Backend: `server/.env`
Required:
- `PORT=`
- `MONGO_URI=`
- `JWT_SECRET=`
- `EMAIL_USER=`
- `EMAIL_PASSWORD=`

Example file:
- `server/.env.example`

## Running Frontend
From `client/`:
```bash
npm run dev
```

## Running Backend
From `server/`:
```bash
npm run dev
```

## Future Enhancements
- AI Resume Analyzer integration
- Subscription + Payments
- WhatsApp integration
- Mobile app-ready API

## Deployment Guide
- Build frontend: `npm run build` (Vite)
- Serve via Nginx/Node
- Use production MongoDB
- Set `NODE_ENV=production`

## Security Features
- JWT auth
- RBAC middleware
- Helmet headers
- CORS restrictions
- Rate limiting
- Password hashing (bcryptjs)

## License
MIT

## Developer Notes
This repository is structured with MVC and role-based modules to support future AI/Payment/WhatsApp additions.

