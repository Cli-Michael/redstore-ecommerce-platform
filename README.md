# 🛍️ Redstore E-Commerce App

A full-stack e-commerce platform featuring 🔐 user authentication, 🛒 cart, ❤️ wishlist, 📦 orders, 🧾 payments, and 📊 admin analytics — built with 🧰 Node.js + Express backend and 🎨 Bootstrap frontend.

## 📁 Project Structure

redstore-ecommerce-app/
├── frontend/      # 🎨 Bootstrap-based UI (HTML, CSS, JS)
├── backend/       # 🧰 Node.js + Express REST API
└── README.md

## 🚀 Features

👥 User  
✅ Register / Login (JWT-based)  
🔁 Forgot/reset password via OTP  
🧑‍💼 Update profile details  

🛒 Cart & Orders  
➕ Add/update/remove cart items  
🧾 Checkout and create orders  
🕓 Track order status and history  

❤️ Wishlist  
➕ Add/remove items  
🔁 Move wishlist items to cart  

📦 Products & Offers  
🔍 View all or single product  
📂 Filter by category or type  
🧠 Related product suggestions  
🌟 Featured products & special offers  

📊 Admin Analytics  
👤 Total users  
📦 Total orders  
💰 Total sales  
👁️ Page views  

📬 Contact  
✉️ Authenticated contact form  

## 🛠️ Tech Stack

🎨 Frontend  
- HTML5, CSS3, JavaScript  
- Bootstrap 5  
- Axios for API communication  

🧰 Backend  
- Node.js + Express.js  
- MongoDB (or MySQL)  
- JWT for secure authentication  
- RESTful API architecture  

## 🔧 Setup Instructions

1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/redstore-ecommerce-platform.git
cd redstore-ecommerce-app

2️⃣ Install Backend Dependencies & Start Server

cd backend
npm install
npm start

📝 Create a .env file inside the backend/ folder with the following content:

PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string

3️⃣ Serve the Frontend

cd ../frontend
# If using live-server:
npx live-server

# Or simply open index.html in your browser

🔗 Key API Endpoints

🔐 Auth
POST /initiate-registration  
POST /complete-registration  
POST /login  
POST /resend-otp  
POST /password/forgot  
POST /password/reset  
POST /check-email  
POST /check-username  

🛍️ Products  
GET /products  
GET /:id  
GET /category/:slug  
GET /:type/:id/related  
GET /offer-show  
GET /:userId/history  
GET /:orderId/status  

🛒 Cart  
GET /:userId  
POST /:userId  
PUT /:userId/:productId/quantity  
PUT /:userId/:productId/size  
DELETE /:userId  
DELETE /:userId/:productId  
POST /:userId/checkout  
POST /:userId/cart/featured  

❤️ Wishlist  
POST /:userId  
DELETE /:userId/:itemId/:itemType  
POST /:userId/check  
GET /:userId  
POST /:userId/cart  

💳 Orders & Payments  
POST /create-order  
POST /verify-payment  
POST /verify-direct-payment  

📊 Admin Stats  
GET /page-views  
GET /total-users  
GET /total-orders  
GET /total-sales  

📬 Contact  
POST /contact  

📌 Scripts

Backend package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

🙌 Contribution
Pull requests are welcome! For major changes, open an issue first to discuss your ideas.

📝 License
This project is licensed under the MIT License.
