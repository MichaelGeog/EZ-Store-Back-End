# ⚙️ EZ Store – Back End (Express + MongoDB)

EZ Store Back End is a Node.js and Express-based RESTful API that powers the EZ Store Repair Management System. It handles authentication, customer data, repair tracking, sales management, and inventory through a secure connection to MongoDB.

---

## 🧩 Features

- 🔐 User Authentication — Secure JWT-based login and registration
- 📱 Device Management — Track repairs, sales, and inventory of smartphones and accessories
- 💳 POS Integration — Manage and record transactions in real time
- 📦 Accessory Management — Organize and maintain accessory products
- 🧰 Repair Tracking — Track device repair progress and update statuses
- 🌐 API Integration — Communicates seamlessly with the React Front End

---

## ⚙️ Tech Stack

- Node.js – JavaScript runtime for server-side logic
- Express.js – Web framework for creating APIs
- MongoDB + Mongoose – Database and ORM for data modeling
- JWT (jsonwebtoken) – Secure authentication and session handling
- bcryptjs – Password hashing
- dotenv – Environment variable management
- CORS – Enables cross-origin requests
- Nodemon – Hot-reloading during development


## Folder Structure
```
Back End
├─ README.md
├─ config
│  └─ db.js
├─ controllers
│  ├─ accessoryController.js
│  ├─ accessoryProductController.js
│  ├─ authControllers.js
│  ├─ customerController.js
│  ├─ deviceController.js
│  ├─ repairDeviceController.js
│  ├─ sellingDeviceController.js
│  └─ storeController.js
├─ middleware
│  └─ authMiddleware.js
├─ models
│  ├─ accessory.js
│  ├─ accessoryProduct.js
│  ├─ admins.js
│  ├─ customer.js
│  ├─ device.js
│  ├─ repairDevice.js
│  ├─ sellingDevice.js
│  └─ store.js
├─ package-lock.json
├─ package.json
├─ routes
│  ├─ accessoryProductRoutes.js
│  ├─ accessoryRoutes.js
│  ├─ authRoutes.js
│  ├─ customerRoutes.js
│  ├─ deviceRoutes.js
│  ├─ repairDeviceRoutes.js
│  ├─ sellingDeviceRoutes.js
│  └─ storeRoutes.js
└─ server.js

```

---

## 📡 EZ Store API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|:-------|:---------|-------------|
|POST| /api/auth/register| Register a new user (admin, employee, or technician)|
|POST| /api/auth/login | Log in a user and receive a JWT token |
|GET| /api/auth/user | Get currently authenticated user info |
|POST| /api/auth/logout | Log out and clear authentication cookies|

### 🏪 Store

| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/store | Fetch store information |
|PUT| /api/store/update	| Update store settings or profile |

### 📱 Device Management

| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/devices | Get all available devices |
|POST| /api/devices | Add a new device model |
|GET| /api/devices/:id | Retrieve details for a single device |
|PUT| /api/devices/:id | Update device details |
|DELETE| /api/devices/:id | Delete a device record |

### 💸 Selling Devices

| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/selling-devices | Get all devices listed for sale |
|POST| /api/selling-devices | Add a new device to sell |
|GET| /api/selling-devices/:id | Get details of a single listed device |
|PUT| /api/selling-devices/:id | Update sale information |
|DELETE| /api/selling-devices/:id | Remove a sold or inactive device listing |

### 🧰 Repair Devices
| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/repairs | Get all repair tickets |
|POST| /api/repairs | Create a new repair request/ticket |
|GET| /api/repairs/:id | View details of a repair |
|PUT| /api/repairs/:id | Update repair status or technician notes |
|DELETE| /api/repairs/:id | Delete a repair record |

### 🎧 Accessories
| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/accessories | Get all accessories |
|POST| /api/accessories | Add a new accessory category |
|GET| /api/accessories/:id | Get a single accessory by ID |
|PUT| /api/accessories/:id | Update accessory details |
|DELETE| /api/accessories/:id | Delete an accessory |

### 🧩 Accessory Products
| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/accessory-products | Get all accessory products |
|POST| /api/accessory-products | Add a new accessory product |
|GET| /api/accessory-products/:id | Get details of a specific accessory product |
|PUT| /api/accessory-products/:id | Update accessory product details |
|DELETE| /api/accessory-products/:id | Delete an accessory product |

### 👥 Customers
| Method | Endpoint | Description |
|:-------|:---------|-------------|
|GET| /api/customers | Get all customers |
|POST| /api/customers | Add a new customer |
|GET| /api/customers/:id | Get a specific customer by ID |
|PUT| /api/customers/:id | Update customer information |
|DELETE| /api/customers/:id | Remove a customer record |

---

## 🧠 Notes

Ensure MongoDB is running or connected to a cloud instance (e.g., MongoDB Atlas).