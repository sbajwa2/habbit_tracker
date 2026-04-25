# Habit Tracker Project

## Team Name
Team 2

## Team Members
- Member 1: Smilepreet Kaur Bajwa   
- Member 2: Navpreet Kaur 

## Project Description
This project is a Habit Tracker application designed to help users build and maintain habbits. It will help the user be consistant and productive while living a balanced lifestyle.

### User Stories
- As a user, I want to add new habits so that I can keep track of the things I want to do regularly.  
- As a user, I want to see a statistical data of my progress.  
- As a user, I want to receive reminders for my habits so that I don't forget to complete them.

## Local Setup

### 1. Install dependencies
From the project root:

npm install

### 2. Configure environment variables
Create these files:

- frontend/.env
- backend/.env

Use the following variables.

frontend/.env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:3001

backend/.env
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL=your_postgres_connection_string
FRONTEND_ORIGINS=http://localhost:5173,http://localhost:5174

Note:
- Run commands normally after .env files are set.
- Do not use temporary terminal overrides for DATABASE_URL.

### 3. Apply database migrations
From the backend workspace:

npm run -w backend prisma:migrate:dev

Optional checks:

npm run -w backend prisma:migrate:status
npm run -w backend prisma:studio

### 4. Start the applications
From the project root, in separate terminals:

npm run dev
npm run dev:backend

Frontend runs on http://localhost:5173 and backend runs on http://localhost:3001.

## Reminder Auth Test Checklist

Use this checklist to verify the Individual Requirement for user-associated reminder data and session management.

1. Open the app while logged out.
2. Navigate to Reminders.
3. Confirm a sign-in prompt is shown and reminder form/list actions are not available.
4. Sign in with Clerk.
5. Add a new reminder and confirm it appears in your list.
6. Refresh the page and confirm reminders still load for the signed-in user.
7. Sign out and confirm reminders are no longer shown.
8. Sign in with a different account and confirm the first account's reminders are not displayed.

### API Checks (Token + User Scope)

Use these API checks to verify session-token auth and user-scoped reminder access.

1. Get a valid Clerk session token after signing in.
2. Request reminders with token:

curl -H "Authorization: Bearer <SESSION_TOKEN>" http://localhost:3001/api/reminders

3. Create reminder with token:

curl -X POST http://localhost:3001/api/reminders -H "Authorization: Bearer <SESSION_TOKEN>" -H "Content-Type: application/json" -d "{\"title\":\"API reminder\",\"time\":\"Anytime\"}"

4. Request reminders without token and confirm unauthorized response:

curl http://localhost:3001/api/reminders

5. Sign in as a second user and repeat step 2.
6. Confirm first user's reminder created in step 3 is not returned for the second user.