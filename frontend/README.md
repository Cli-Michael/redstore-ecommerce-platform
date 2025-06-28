🛒 EcomNest – A Complete eCommerce Platform

A sleek and scalable full-stack eCommerce web application built with React, Node.js, and MongoDB, featuring user authentication, product browsing, shopping cart, wishlist, secure Razorpay checkout, and order tracking.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Features

👥 User Side
- 🔐 JWT Authentication (Register/Login)
- 🛍️ Add to Cart and ❤️ Wishlist functionality
- 🔎 Search, Sort, and Filter products by category, price, etc.
- 💳 Secure Checkout via Razorpay integration
- 📦 Order Tracking with real-time updates

⚙️ Admin Side (Optional)
- 📦 Manage Products (CRUD)
- 📊 Dashboard with Sales/Orders overview
- 👥 Manage Users & Orders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧱 Tech Stack

Frontend: React, React Router, Axios  
Backend: Node.js, Express.js, MongoDB  
UI: Bootstrap / Custom CSS  
Authentication: JWT (JSON Web Tokens)  
Payments: Razorpay  
Hosting: Vercel (Frontend), Render (Backend)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗂️ Project Structure

├── 📁 frontend/ (React frontend - Vite)  
│   ├── 📁 src/  
│   │   ├── 📁 api/             # Axios instance & API calls  
│   │   ├── 📁 assets/          # Images, logos, etc.  
│   │   ├── 📁 components/      # Reusable UI components  
│   │   ├── 📁 pages/           # Page views (Home, Cart, etc.)  
│   │   ├── 📁 utils/           # Helper functions and constants  
│   │   ├── App.jsx            # Main App component  
│   │   └── main.jsx           # ReactDOM render  
│   ├── 📁 public/              # Static assets like favicon  
│   ├── index.html             # HTML entry point  
│   ├── vite.config.js         # Vite configuration  
│   └── package.json           # Frontend dependencies and scripts  

├── .gitignore  
├── README.md                  # Project overview  
└── LICENSE (optional)         # License file if applicable  


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/your-username/ecomnest.git  
cd ecomnest  

2. Backend Setup

cd backend  
npm install  

Create a `.env` file inside the `backend/` directory with:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
RAZORPAY_KEY_ID=your_key  
RAZORPAY_KEY_SECRET=your_secret  

Start the backend:

npm run dev  

3. Frontend Setup

cd ../frontend  
npm install  

Make sure `axiosInstance.js` has the correct base URL, like:  
https://ecomnest-backend.onrender.com/api

Run frontend:

npm run dev  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 Test Credentials (Optional)

You can use dummy user credentials or register a new one.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧳 Deployment

Frontend (Vercel)
- Connect repo to Vercel
- Set framework to Vite
- Output directory: dist
- Add any necessary env variables

Backend (Render)
- Create Web Service on Render
- Root directory: backend/
- Build command: npm install
- Start command: npm run dev or node server.js
- Add required environment variables

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧾 License

This project is licensed under the MIT License © 2025.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤝 Contributing

Contributions, issues and feature requests are welcome!  
Check the issues page: https://github.com/your-username/ecomnest/issues

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📬 Contact

Made with ❤️ by Michael Clinton 
Email: michaelclinton084@gmail.com  
GitHub: https://github.com/michael-clinton
