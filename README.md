# 🏠 Roommate Finder

A web application that helps individuals find compatible roommates based on location, budget, lifestyle preferences, and interests. Users can create and manage listings, explore other listings, and connect with potential roommates — all through a secure and responsive interface.

---

## 🌐 Live Website

- **Client:** [https://findroommate-nirob.netlify.app]
- **Server/API:** [https://roommate-finder-server-neon.vercel.app]

---

## ✨ Key Features

- 🔐 **User Authentication**
  - Email/password & Google login
  - Protected routes for user-specific features
- 📝 **CRUD Functionality**
  - Users can add, view, update, and delete their roommate listings
- 📥 **Like & Reveal Contact**
  - Liking a post reveals the contact number (cannot like own post)
- 🌙 **Dark/Light Theme Toggle**
  - Seamless theme switching on the homepage
- 📱 **Responsive Design**
  - Optimized for mobile, tablet, and desktop
- 💬 **Live Feedback**
  - SweetAlert2 and toast notifications for all actions

---

## 🧩 Pages & Routing

| Page             | Path                   | Protected | Description                                   |
|------------------|------------------------|-----------|-----------------------------------------------|
| Home             | `/`                    | ❌        | Banner, featured listings, extra sections     |
| Login            | `/login`               | ❌        | Login with email/password or Google           |
| Register         | `/signup`              | ❌        | Create an account with form validation        |
| Add Listing      | `/add-listing`         | ✅        | Submit a new roommate post                    |
| Browse Listings  | `/browse-listings`     | ❌        | View all listings in a table                  |
| My Listings      | `/my-listings`         | ✅        | Manage your own roommate posts                |
| Details          | `/listing/:id`         | ✅        | View full details and like the post           |
| Update Listing   | `/update/:id`          | ✅        | Edit an existing listing                      |
| Not Found        | `*`                    | ❌        | Custom 404 page for invalid routes            |

---

## 💻 Tech Stack

### Client
- React
- React Router
- Firebase Authentication
- Tailwind CSS
- Axios
- Lottie React
- React Tooltip
- React Awesome Reveal
- React Simple Typewriter

### Server
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT)

---

## ✅ Functionality Highlights

- 🧭 Navigation Bar updates dynamically based on login status
- 🎯 Featured posts section displays 6 available posts using MongoDB’s `.limit()`
- 🛑 Users cannot like their own posts
- 📞 Contact number is hidden until a user likes the post
- 🔄 Real-time updates after CRUD operations
- 🧠 Custom 404 page for invalid routes
- ⏳ Loading spinners during data fetch
- 🎨 Extra homepage sections for visual richness

---

## 📂 Folder Structure

RoommateFinder/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── context/
│ │ └── hooks/
├── server/
│ ├── controllers/
│ ├── models/
│ └── routes/

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- UI inspiration from platforms like ThemeForest
- Firebase for Authentication
- MongoDB Atlas for remote database hosting
- Vercel for backend deployment
- Netlify for frontend deployment

---

## 👨‍💻 Developed By

**Your Name**  
[GitHub](https://github.com/nirob-debnath) • [Email](mailto:nirobdebnath01@gmail.com)