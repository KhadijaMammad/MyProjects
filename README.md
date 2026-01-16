# AI-Powered Personal Workspace 🤖

[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A comprehensive productivity platform powered by AI models, designed to enhance individual efficiency. The platform combines calendar, notes, tasks, and news features, and stands out with its unique AI Discussion module (**GemTalks**).

---

## Table of Contents 📚
- [Core Modules and Features](#core-modules-and-features-)
  - [GemTalks (AI Discussion Hub)](#gemtalks-ai-discussion-hub-)
  - [Advanced Calendar System](#advanced-calendar-system-)
  - [Smart Notes (Tiptap Rich-Text)](#smart-notes-tiptap-rich-text-)
  - [Task Management](#task-management-)
  - [Dynamic News Feed](#dynamic-news-feed-)
- [Technical Stack](#technical-stack-)
  - [Frontend](#frontend-)
  - [Backend](#backend-)
- [Trash System Logic](#trash-system-logic-)
- [AI Integration](#ai-integration-)
- [Setup](#setup-)

---

## Core Modules and Features 🌟

### GemTalks (AI Discussion Hub) 💬
Enables real-time discussions among multiple AI models around a single topic:

- **Multi-AI Collaboration**: Four specialized AI agents coordinated by one Moderator AI.  
- **Custom Rounds**: Users can define how many discussion rounds the conversation will have.  
- **AI Summary**: At the end, the moderator provides a concise final summary.  

### Advanced Calendar System 📅
Supports both local and global scheduling:

- **Google Calendar Sync**: OAuth2-based integration with any Google account.  
- **Bidirectional Sync**: Events created on the platform are synced to Google Calendar, and existing Google events are synced back.  
- **FullCalendar Integration**: Fast and interactive calendar visualization.  

### Smart Notes (Tiptap Rich-Text) 📝
Structured and visual note management:

- **Rich Text Editing**: Headings, lists, bold, italic, and more.  
- **Media Support**: Image uploads and inline media embedding.  
- **Export to PDF**: Notes can be exported directly using jspdf and html2canvas.  

### Task Management ✅

- **AI Task Generation**: Automatic task creation from user input using AI.  
- **Priority & Deadline**: Task prioritization and deadline management.  
- **Auto-Cleanup**: Automatic handling of expired tasks.  

### Dynamic News Feed 📰

- **Multi-language Support**: News adapts to the user’s selected language.  
- **Infinite Scroll**: Initial load of 30 articles with a “Load More” feature.  
- **Smart Categorization**: Automatic categorization of news content.  

---

## Technical Stack 🛠

### Frontend ⚛️
- **Vite + React + TypeScript**: High-performance development with type safety.  
- **Redux Toolkit & RTK Query**: Efficient management of complex state and API requests.  
- **Tailwind CSS & Framer Motion**: Modern UI design with smooth animations.  
- **Lucide React**: Minimalistic and modern icon set.  

### Backend 🖥️
- **Node.js (Express.js)**: Scalable server architecture.  
- **PostgreSQL & Sequelize ORM**: Relational database structure managed via pgAdmin4.  
- **JWT & Bcrypt**: Secure authentication and password hashing.  
- **Multer**: File and image upload management.  
- **Node-cron**: Scheduled jobs including 30-day soft delete (trash system).  
- **Google APIs & OAuth2**: Full integration with Google services.  

---

## Trash System Logic 🗑️
Deleted data is not removed immediately. A node-cron–based system retains deleted data for 30 days, after which it is permanently removed from the database automatically.  

---

## AI Integration 🤖
Approximately 50% of the project is built around integrating AI models into the backend. This includes text analysis, behavior-based task generation, and multi-agent AI discussions.  

---

## Setup ⚡
1. Clone the repository.  
2. Run `npm install` in both `client` and `server` directories.  
3. Configure Google OAuth and PostgreSQL credentials in the `.env` file.  
4. Start the project:  
   - `npm run dev` (frontend)  
   - `npm start` (backend)  
