HOPE INC. - Customer Management System
This is the official repository for the HOPE INC. Customer Management System. This project was scaffolded using React (Vite), Tailwind CSS v4, and Supabase.

🚀 Developer Setup Instructions
1. Install Dependencies Run this command in the project root to install all required packages:
// I did this in Visual studio code

Bash
npm install
2. Environment Configuration Create a .env file in the root directory and paste these exact credentials:

Plaintext
VITE_SUPABASE_URL=https://urkeyiasmlwmlzykilhq.supabase.co
VITE_SUPABASE_ANON_KEY=sb_secret_ZT4OwdkOtxeUHt-IRgzdNQ_oacY7iEt

3. Start Development Server Launch the app locally:

Bash
npm run dev
Local URL: http://localhost:5173/

Stop Server: Press CTRL + C in the terminal.

🛠️ Tech Stack & Tools
Frontend: React + Vite

Styling: Tailwind CSS v4

Database/Auth: Supabase

Routing: React Router DOM

📂 Project Structure Guide
/src/pages - All page components go here (Dashboard, Customers, etc.).

/src/lib/supabase.js - Contains the database client configuration.

/src/index.css - Global styles and Tailwind imports.

App.jsx - Defines the routing and application structure.

📋 Team Workflow Rules
Git Protocol: Always run git pull before starting your work to ensure you have the latest updates from the Project Lead.

Styling: Use Tailwind utility classes for all UI work to maintain consistency.

Commits: Use clear commit messages (e.g., feat: added customer table or fix: login styling).
