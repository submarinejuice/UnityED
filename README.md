# UnityEd — Educational Web Platform

# Overview

UnityEd is a web-based platform designed to host educational Unity games and manage learning-related data.
This project provides an interactive and visually consistent experience for teachers and students.

This repository contains the frontend implementation using Next.js, React (TypeScript), and Tailwind CSS.

# Technologies Used

### Figma – Wireframing and UI design

### Next.js (v16.0.1) – Server-side rendering & routing

### React (TypeScript) – Component library

### Tailwind CSS – Utility-first styling

### Prisma – Database ORM

### MySQL – Relational database

### Vercel – Deployment platform

# How to Run Locally

## 1. Clone the Repository

```
git clone https://github.com/yourusername/unity-ed.git
cd unity-ed
```

## 2. Install Dependencies

`npm install`

## 3. Database Setup

### 3A. Install MySQL Workbench

#### Install MySQL and create a new database.

### 3B. Create Your .env File

#### Create a new file at the project root named:.env Add the following content:

```
DATABASE_URL="mysql://root:password@localhost:3306/database-name"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

#### How to Generate NEXTAUTH_SECRET. Run this command:

`npx nextauth secret`

#### Copy the output and place it inside:

NEXTAUTH_SECRET="PASTE_SECRET_HERE"

## 4. Prisma Setup

### Run Prisma Migration

```
npx prisma migrate dev

npx prisma db push

##Generate Prisma Client
npx prisma generate

##Open Prisma Studio
npx prisma studio
```

## 5. Run the Development Server

`npm run dev`

## 6. Open in your browser:

```
http://localhost:3000
```

# Basic Project Structure

```
unity-ed-frontend/unity-ed/├─ .env  --------- for database connection
                           ├─ prisma/ --------- for database
                           │  ├─ schema.prisma
                           │  └─ migrations/
                           ├─ middleware.js -----------
                           ├─ app/ -------- for all the frontend pages
                           ├─ components/    for the components for pages
                           ├─ public/        all images and icons
                           ├─ styles/        for css
                           ├─ api/ -------------- for the backend
                           ├─ package.json
                   └─ README.md
```
