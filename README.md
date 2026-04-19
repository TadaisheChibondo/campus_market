# 🛒 Campus Market

[![Live Demo](https://img.shields.io/badge/Live_Site-Vercel-black?style=for-the-badge&logo=vercel)](https://campus-market-psi.vercel.app/)
[![Backend](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render)](https://campus-market-psi.vercel.app/)

> A full-stack, centralized marketplace platform designed specifically for university students to securely buy and sell essentials.

![Project Banner](screenshots/banner.png)
_(Note: Replace with a screenshot of the home page)_

## 📖 Overview

Finding affordable essentials or selling unused dorm items can be difficult within a university ecosystem. **Campus Market** solves this by providing a dedicated, secure platform for students to list and discover items like textbooks, electronics, and groceries.

Built with a **React** frontend and a **Django REST Framework** backend, the application features secure JWT authentication, dynamic image hosting via ImageKit, and a robust admin dashboard for content moderation.

## ✨ Key Features

- **Authentication System:** Secure JWT-based registration and login (powered by Djoser).
- **Dynamic Product Listings:** Browse, search, and filter items tailored to campus living.
- **Media Management:** Custom storage adapter integrating **ImageKit** for fast, optimized, and reliable cloud image hosting.
- **Seller Dashboard:** Authenticated users can quickly publish listings with auto-uploaded images and descriptions.
- **Responsive UI:** Fully optimized for both mobile and desktop experiences.
- **Admin Moderation:** Powerful built-in Django Admin panel to manage users and inventory.

## 🛠️ Technology Stack

### Frontend

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Custom CSS / Responsive Design

### Backend

- **Framework:** Django 5.0+
- **API:** Django REST Framework (DRF)
- **Auth:** Djoser (Token/JWT)
- **Storage:** ImageKit (via Custom Django Storage Adapter)
- **Static Files:** WhiteNoise

### Infrastructure

- **Database:** PostgreSQL (Production) / SQLite (Development)
- **Hosting:** Vercel (Frontend) & Render (Backend)

## 🚀 Local Development Setup

Follow these steps to run a local copy of the application.

### Prerequisites

- Node.js (v18+)
- Python (3.10+)
- Git

### 1. Clone the Repository

```
    git clone [https://github.com/yourusername/campus-market.git](https://github.com/yourusername/campus-market.git)
    cd campus-market
```

2. Backend Setup
   Open a terminal and navigate to the backend directory:

```

    cd backend
    python -m venv venv

    # Activate Virtual Environment
    # Windows:
    venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate

```

Install the Python dependencies:

```

    pip install -r requirements.txt

```

Set up your Environment Variables. Create a .env file in the backend directory:

```

    SECRET_KEY=your_django_sec
    ret_key
    DEBUG=True
    IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

```

Run database migrations and start the server:

```

    python manage.py migrate
    python manage.py runserver

```

3. Frontend Setup
   Open a new terminal window and navigate to the frontend directory:

```

    cd frontend
    npm install

```

Start the Vite development server:

```
    npm run dev
```

The application will be available at http://localhost:5173

👤 Author
Tadaishe Chibondo

Role: Full-Stack Developer

Institution: National University of Science and Technology (NUST)

📄 License
This project is open-source and available under the MIT License.
