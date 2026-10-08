# 🚀 DevBoard

A responsive frontend web application that helps students discover upcoming **tech events, workshops, and hackathons**.

## 🌐 Live Demo

**Deployed App:** [Add your deployed link here]

## 📌 GitHub Repository

This repository contains the complete source code for the DevBoard frontend application.

---

## ✨ Features

* 🔍 Search events by name or keyword
* 🏷️ Filter events by category
* 🔄 Search and category filters work together
* ❤️ Add and remove events from favourites
* 🚫 Prevent duplicate favourites
* 💾 Save favourites using browser localStorage
* 📅 Sort events by date and category
* 📖 View detailed information about an event
* ⭐ Dedicated favourites section
* 🌙 Dark mode
* ⏳ Loading state
* 📭 Empty favourites state
* 🔎 No-results state
* 📱 Responsive design for desktop, tablet and mobile
* ♿ Accessibility improvements using ARIA attributes
* ✨ Subtle animations and transitions

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* CSS Grid
* Flexbox
* DOM Manipulation
* Browser localStorage

---

## 📁 Project Structure

```text
DevBoard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure of the application, including:

* Navigation
* Search bar
* Category filters
* Sorting controls
* Event listing section
* Favourites section
* Event details section

### `style.css`

Handles:

* Layout
* Event cards
* Colors and typography
* Responsive design
* Dark mode
* Animations
* Mobile and tablet layouts

### `script.js`

Handles the application's functionality:

* Event data
* Dynamic event-card generation
* Search
* Category filtering
* Sorting
* Favourites
* localStorage
* Event details
* Dark mode
* Navigation
* Loading and empty states

---

## 🔎 How Search Works

The search input listens for user input using JavaScript.

The entered text is converted to lowercase so that the search is **case-insensitive**.

The event list is then filtered according to the search term.

---

## 🏷️ How Filtering Works

Users can select a category such as:

* Workshop
* Hackathon
* Conference
* Competition

The selected category is used to filter the event data.

Search and category filtering can also be used together.

---

## ❤️ Favourite System

Users can add events to their favourites.

Each event has a unique ID, which is used to identify it.

Before adding an event, the application checks whether the event is already present in the favourites list. This prevents duplicate favourites.

Favourites are stored in `localStorage`, so they remain available after refreshing the browser.

---

## 🌙 Dark Mode

The application supports dark mode.

JavaScript toggles a `dark` class on the document body, while CSS variables provide the appropriate colors for the theme.

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile

CSS Grid, Flexbox and media queries are used to adapt the layout to different screen sizes.

---

## 🚀 Running the Project Locally

1. Clone the repository.

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

2. Open the project folder.

3. Open `index.html` in a browser.

No backend or additional installation is required.

---

## 🎯 Project Objective

The objective of DevBoard is to provide students with a simple platform to discover and manage upcoming technology-related events.

The project focuses on reusable UI, responsive design, interactive filtering, favourites management and a clean user experience.

---

## 🔮 Future Improvements

Possible future improvements include:

* Connecting the application to a real events API
* User authentication
* Backend database
* Real-time event updates
* Event registration
* Personalized event recommendations
* Notifications for upcoming events

---

##  Developer

Dakshath S Iyangar

BTech Computer Science and Engineering
NMIT, Bengaluru
