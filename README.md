# sport-managemnt-scheduler
🏆 Sports Scheduler
A full-stack web application to schedule, manage, and join sports sessions with role-based access for Players and Administrators.
Built with Next.js (frontend), Express.js (backend), and Passport.js (authentication).
👑 Administrator

All capabilities of a player.

Can create and manage sports (e.g., ⚽ Football, 🏏 Cricket, 🏀 Basketball).

Sports created by admins become the only valid options for players when scheduling sessions.

🏃 Player

🔐 Authentication via Passport.js (Sign Up, Sign In, Sign Out).

📊 Dashboard Sections:

Sessions created by the player.

Sessions joined by the player.

Available sessions to explore.

⚙️ Session Management:

Create a new sport session (choose sport, set date/time, venue, players needed).

Edit or delete sessions created by them.

Join available sessions created by others.

Leave sessions they’ve joined.

🛠 Tech Stack

🎨 Frontend: Next.js + CSS

⚡ Backend: Express.js

🔑 Authentication: Passport.js

🗄 Database: MongoDB

📂 Project Structure
Sports-Management/
│── backend/         # Express.js server code (authentication, APIs)
│── sports-explore/  # Next.js frontend (UI and dashboards)
│── README.md        # Project documentation

⚙️ Installation & Setup
1️⃣ Clone the repository
https://github.com/Nagasai-bole/sport-managemnt-scheduler
cd Sports-Management

2️⃣ Backend Setup
cd backend
npm install


Create .env file inside backend/ with variables:

PORT=5000
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_passport_secret


Run the server:

npm run dev   # or node index.js

3️⃣ Frontend Setup
cd ../sports-explore
npm install
npm run dev   # starts Next.js on http://localhost:3000

📸 Screenshots
<img width="1910" height="917" alt="Screenshot 2025-09-20 130956" src="https://github.com/user-attachments/assets/e61660d7-8f64-4c15-ac67-e7164ddb9d3a" />
<img width="1909" height="912" alt="Screenshot 2025-09-20 131024" src="https://github.com/user-attachments/assets/a39b4e15-57ef-4a00-a640-2da0db3f2d5d" />
<img width="1892" height="909" alt="Screenshot 2025-09-20 131110" src="https://github.com/user-attachments/assets/114e71a7-7749-4064-a8e5-d0caf324b69f" />
<img width="1894" height="925" alt="Screenshot 2025-09-20 131124" src="https://github.com/user-attachments/assets/6c6743cb-83e9-4588-8286-62d022db2919" />
<img width="1883" height="912" alt="Screenshot 2025-09-20 131146" src="https://github.com/user-attachments/assets/c83f58ea-f555-4ec6-9b03-e08a4c34a967" />
<img width="1889" height="924" alt="Screenshot 2025-09-20 131209" src="https://github.com/user-attachments/assets/f336e216-7d68-429c-a21e-ec5a43c4a2d7" />
<img width="1857" height="888" alt="Screenshot 2025-09-20 131253" src="https://github.com/user-attachments/assets/54d17857-f409-43e2-b725-40fec9c2613f" />
<img width="1893" height="910" alt="Screenshot 2025-09-20 131315" src="https://github.com/user-attachments/assets/3e4659f5-46a1-4f3b-8b86-aecd64649d1a" />
<img width="1896" height="891" alt="Screenshot 2025-09-20 131338" src="https://github.com/user-attachments/assets/360f9bcb-9a17-49ec-bfc1-fad7eb6519c4" />


🚀 Future Enhancements

📊 Admin reports/analytics for most played sports & total sessions.

⛔ Restrict players from joining multiple sessions at the same time.


📅 Calendar view for scheduled sessions.

👥 Roles

Administrator 👑 → Can create sports + full player privileges.

Player 🏃 → Can create, join, edit, delete, and leave sessions.

🙌 Acknowledgements

Built as a capstone project using Next.js, Express.js, Passport.js, and MongoDB.
Inspired by real-world sports scheduling and team management use-cases.


