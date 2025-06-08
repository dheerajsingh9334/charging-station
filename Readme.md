# Node modules
node_modules/
frontend/node_modules/
backend/node_modules/

# Build output
dist/
frontend/dist/
backend/dist/
build/
frontend/build/
backend/build/

# Environment variables
.env
.env.*
frontend/.env
frontend/.env.*
backend/.env
backend/.env.*

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
logs/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Misc
coverage/
*.local# EV Charging Station Management

A full-stack web application for managing electric vehicle charging stations.  
This project provides a modern admin dashboard, user authentication, and CRUD operations for charging stations.

---

## Features

- **User Authentication:** Register, login, JWT-based session, role support (admin/user)
- **Admin Dashboard:** View stats, recent activity, and manage all stations
- **Charging Station Management:** Add, edit, delete, and view stations
- **Map Integration:** Visualize charger locations on a map (Leaflet)
- **Responsive UI:** Built with Vue 3, Tailwind CSS, and Vite
- **Notifications:** Toast feedback for user actions
- **Protected API:** All charger APIs require authentication

---

## Tech Stack

- **Frontend:** Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Axios, Leaflet
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)

---

## Folder Structure

```
Charger-station/
│
├── backend/         # Express API
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/        # Vue 3 + Vite client
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── store/
    │   ├── views/
    │   ├── router/
    │   ├── services/
    │   ├── types/
    │   ├── style.css
    │   └── App.vue
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── index.html
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

### 1. Clone the repository

```sh
git clone https://github.com/your-username/your-repo.git
cd Charger-station
```

---

### 2. Setup the Backend

```sh
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:

  ```
  MONGO_URI=your_mongodb_connection_string
  ACCESS_TOKEN_SECRET=your_jwt_secret
  PORT=5000
  ```

- Start the backend server:

  ```sh
  npm run dev
  ```

---

### 3. Setup the Frontend

```sh
cd ../frontend
npm install
```

- (Optional) Create a `.env` file in the `frontend` folder:

  ```
  VITE_API_URL=http://localhost:5000/api/
  ```

- Start the frontend dev server:

  ```sh
  npm run dev
  ```

---

### 4. Open the App

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

- **Frontend:** Deploy the `frontend` folder to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- **Backend:** Deploy the `backend` folder to [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://heroku.com/).

---

## API Endpoints (Backend)

- `POST   /api/user/signup` — Register a new user
- `POST   /api/user/login` — Login and get JWT
- `POST   /api/user/logout` — Logout (clears cookie)
- `GET    /api/charger/allCharger` — List all chargers (auth required)
- `POST   /api/charger/addCharger` — Add a charger (auth required)
- `PUT    /api/charger/updateCharger/:id` — Update charger (auth required)
- `PUT    /api/charger/deleteCharger/:id` — Delete charger (auth required)
- `GET    /api/charger/getCharger/:id` — Get charger by ID (auth required)

---

## Environment Variables

**Backend (`backend/.env`):**
- `MONGO_URI` — MongoDB connection string
- `ACCESS_TOKEN_SECRET` — JWT secret
- `PORT` — Server port (default: 5000)

**Frontend (`frontend/.env`):**
- `VITE_API_URL` — API base URL (default: `http://localhost:5000/api/`)

---

## Potential & Extensibility

- **Role-based Access:** Easily extend to support more roles (admin, user, operator)
- **Charger Analytics:** Add charts and usage stats to the dashboard
- **Booking System:** Allow users to reserve charging slots
- **Payment Integration:** Add payment gateway for paid charging
- **Notifications:** Email/SMS alerts for users/admins
- **Mobile App:** Build a mobile client using the same API

---

## License

MIT

---

## Credits

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)

---

**Feel free to contribute or open issues!**