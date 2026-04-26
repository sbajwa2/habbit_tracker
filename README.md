# Habit Tracker Project

## Team Name  
Team 2  

## Team Members  
- Smilepreet Kaur Bajwa  
- Navpreet Kaur  

---

## Project Description  
This project is a Habit Tracker application designed to help users build and maintain habits. It allows users to stay consistent, track their daily activities, and maintain a productive and balanced lifestyle.  

The application supports user authentication and ensures that each user can manage their own personalized habits.

---

## User Stories  
- As a user, I want to add new habits so that I can keep track of the things I want to do regularly.  
- As a user, I want to view my habits so that I can stay consistent.  
- As a user, I want to receive reminders so that I don’t forget my tasks.  

---

# Local Setup Instructions

## Prerequisites  
Make sure you have the following installed:  

- Node.js  
- npm  
- PostgreSQL  
- Git  

---

## 1. Clone the Repository  

```bash
git clone <your-repository-link>
cd habit_tracker
```

---

## 2. Install Dependencies  

```bash
npm install
```

---

## 3. Environment Variables  

### Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_API_BASE_URL=http://localhost:3001
```

---

### Backend (`backend/.env`)

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/habit_tracker_dev?schema=public"

CLERK_SECRET_KEY=sk_test_xxx
CLERK_PUBLISHABLE_KEY=pk_test_xxx

FRONTEND_ORIGINS=http://localhost:5173,http://localhost:5174
```

---

## 4. Database Setup (Prisma)

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

(Optional reset)

```bash
npx prisma migrate reset
```

---

## 5. Run the Application  

### Frontend  

```bash
npm run dev --workspace frontend
```

---

### Backend  

```bash
npm run dev --workspace backend
```

---

### Prisma Studio (optional)  

```bash
cd backend
npm run prisma:studio
```

---

## pplication URLs  

- Frontend: http://localhost:5173  
- Backend: http://localhost:3001  

---

## Authentication  

This application uses Clerk for authentication and authorization.

- Users can sign up and log in using email or Google  
- Each user has their own data stored in the database  
- Users must be logged in to manage habits  

---

## Notes  

- Data is persistent in PostgreSQL  
- Each habit is linked to a specific user  
- Users cannot see each other's data  
- Backend routes are protected using Clerk  

---

## Summary  

This project demonstrates a full-stack application using:

- React (Frontend)  
- Express + TypeScript (Backend)  
- PostgreSQL + Prisma (Database)  
- Clerk (Authentication)  

---

## Future Improvements  

- Add reminders functionality  
- Add analytics and charts  
- Improve UI design  
- Deploy using Vercel  
