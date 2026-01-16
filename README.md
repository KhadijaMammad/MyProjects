AI-Powered Personal Workspace 🤖

A comprehensive productivity platform powered by artificial intelligence (AI) models, designed to enhance individual efficiency. The platform brings together calendar, notes, tasks, and news features, and stands out with its unique AI Discussion module (GemTalks).

Core Modules and Features 🌟
GemTalks (AI Discussion Hub) 💬

GemTalks is the most innovative part of the project, enabling real-time discussions among multiple AI models around a single topic:

Multi-AI Collaboration: Four specialized AI agents coordinated by one Moderator AI.

Custom Rounds: Users can define how many discussion rounds the conversation will have.

AI Summary: At the end of the discussion, the moderator provides a concise final summary.

Advanced Calendar System 📅

Supports both local and global scheduling:

Google Calendar Sync: OAuth2-based integration with any Google account.

Bidirectional Sync: Events created on the platform are synced to Google Calendar, and existing Google events are synced back to the platform.

FullCalendar Integration: Fast and interactive calendar visualization.

Smart Notes (Tiptap Rich-Text) 📝

Structured and visual note management:

Rich Text Editing: Headings, lists, bold, italic, and more.

Media Support: Image uploads and inline media embedding.

Export to PDF: Notes can be exported directly to PDF using jspdf and html2canvas.

Task Management ✅

AI Task Generation: Automatic task creation from user input using AI.

Priority & Deadline: Task prioritization and deadline management.

Auto-Cleanup: Automatic handling of expired tasks.

Dynamic News Feed 📰

Multi-language Support: News content adapts to the user’s selected language.

Infinite Scroll: Initial load of 30 articles with a “Load More” feature.

Smart Categorization: Automatic categorization of news content.

Technical Stack 🛠
Frontend ⚛️

Vite + React + TypeScript: High-performance development with type safety.

Redux Toolkit & RTK Query: Efficient management of complex state and API requests.

Tailwind CSS & Framer Motion: Modern UI design with smooth animations.

Lucide React: Minimalistic and modern icon set.

Backend 🖥️

Node.js (Express.js): Scalable server architecture.

PostgreSQL & Sequelize ORM: Relational database structure managed via pgAdmin4.

JWT & Bcrypt: Secure authentication and password hashing.

Multer: File and image upload management.

Node-cron: Scheduled jobs including a 30-day soft delete (trash system).

Google APIs & OAuth2: Full integration with Google services.

Trash System Logic 🗑️

Deleted data is not removed immediately. A node-cron–based system retains deleted data for 30 days, after which it is permanently removed from the database automatically.

AI Integration 🤖

Approximately 50% of the project is built around integrating AI models into the backend. This includes not only text analysis, but also behavior-based task generation and multi-agent AI discussions.

Setup ⚡

Clone the repository.

Run npm install in both the client and server directories.

Configure Google OAuth and PostgreSQL credentials in the .env file.

Start the project using:

npm run dev (frontend)

npm start (backend)
