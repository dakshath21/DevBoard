/* =====================================================
   DEVBOARD
   JAVASCRIPT
===================================================== */


/* =====================================================
   EVENT DATA
===================================================== */

const events = [

    {
        id: 1,

        name: "AI Innovation Hackathon",

        date: "2026-10-20",

        category: "Hackathon",

        location: "Bengaluru",

        mode: "Offline",

        description:
            "Build innovative AI-powered solutions for real-world problems and compete with developers from across the community.",

        organizer: "DevTech Community",

        duration: "24 Hours"
    },


    {
        id: 2,

        name: "Full Stack Web Development Workshop",

        date: "2026-10-24",

        category: "Workshop",

        location: "Online",

        mode: "Online",

        description:
            "Learn modern frontend and backend development by building a complete web application from scratch.",

        organizer: "CodeCampus",

        duration: "4 Hours"
    },


    {
        id: 3,

        name: "Future of Cloud Computing",

        date: "2026-10-29",

        category: "Tech Talk",

        location: "Bengaluru",

        mode: "Offline",

        description:
            "Explore cloud computing trends, scalable architectures and the technologies shaping modern software.",

        organizer: "CloudTech",

        duration: "2 Hours"
    },


    {
        id: 4,

        name: "Cybersecurity Capture The Flag",

        date: "2026-11-03",

        category: "Hackathon",

        location: "Online",

        mode: "Online",

        description:
            "Test your cybersecurity skills through an exciting collection of challenges covering multiple security domains.",

        organizer: "SecureNet",

        duration: "12 Hours"
    },


    {
        id: 5,

        name: "Google Technologies Conference",

        date: "2026-11-10",

        category: "Conference",

        location: "Bengaluru",

        mode: "Offline",

        description:
            "Connect with developers, engineers and technology enthusiasts and explore the latest developer technologies.",

        organizer: "TechConnect",

        duration: "1 Day"
    },


    {
        id: 6,

        name: "React & JavaScript Masterclass",

        date: "2026-11-15",

        category: "Workshop",

        location: "Online",

        mode: "Online",

        description:
            "Strengthen your JavaScript fundamentals and learn how to build scalable interfaces using React.",

        organizer: "Frontend Academy",

        duration: "5 Hours"
    },


    {
        id: 7,

        name: "Startup & Innovation Summit",

        date: "2026-11-22",

        category: "Conference",

        location: "Mysuru",

        mode: "Offline",

        description:
            "Meet founders, developers and innovators and discover opportunities in India's growing technology ecosystem.",

        organizer: "Startup India Club",

        duration: "1 Day"
    },


    {
        id: 8,

        name: "Generative AI Tech Talk",

        date: "2026-12-02",

        category: "Tech Talk",

        location: "Online",

        mode: "Online",

        description:
            "Understand generative AI, large language models and how developers can build applications using modern AI.",

        organizer: "AI Builders",

        duration: "90 Minutes"
    }

];


/* =====================================================
   APPLICATION STATE
===================================================== */

let currentCategory = "All";

let searchTerm = "";

let favorites =
    JSON.parse(
        localStorage.getItem("devboardFavorites")
    ) || [];


/* =====================================================
   DOM ELEMENTS
===================================================== */

const eventsGrid =
    document.getElementById("eventsGrid");

const favoritesGrid =
    document.getElementById("favoritesGrid");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const loadingState =
    document.getElementById("loadingState");

const noResults =
    document.getElementById("noResults");

const emptyFavorites =
    document.getElementById("emptyFavorites");

const eventCount =
    document.getElementById("eventCount");

const favoriteCount =
    document.getElementById("favoriteCount");

const clearSearchButton =
    document.getElementById("clearSearch");


/* =====================================================
   INITIALIZE APPLICATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateFavoriteCount();

    loadTheme();

    /*
       Small timeout gives the application
       a realistic loading state.
    */

    setTimeout(() => {

        loadingState.classList.add("hidden");

        renderEvents();

    }, 700);

});


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   CHECK FAVORITE
===================================================== */

function isFavorite(id) {

    return favorites.includes(id);

}


/* =====================================================
   CREATE EVENT CARD
===================================================== */

function createEventCard(event) {

    const saved =
        isFavorite(event.id);

    return `

        <article class="event-card">

            <div class="card-top">

                <span class="category-tag">
                    ${event.category}
                </span>

                <button
                    class="favorite-btn ${saved ? "saved" : ""}"
                    onclick="toggleFavorite(${event.id})"
                    aria-label="${
                        saved
                        ? "Remove from favorites"
                        : "Save event"
                    }">

                    ${saved ? "♥" : "♡"}

                </button>

            </div>


            <h3>
                ${event.name}
            </h3>


            <p class="event-description">
                ${event.description}
            </p>


            <div class="event-meta">

                <div class="meta-item">
                    📅
                    <span>
                        ${formatDate(event.date)}
                    </span>
                </div>

                <div class="meta-item">
                    📍
                    <span>
                        ${event.location}
                    </span>
                </div>

                <div class="meta-item">
                    💻
                    <span>
                        ${event.mode}
                    </span>
                </div>

            </div>


            <button
                class="view-btn"
                onclick="showDetails(${event.id})">

                View Details →

            </button>

        </article>

    `;
}


/* =====================================================
   FILTER EVENTS
===================================================== */

function getFilteredEvents() {

    let filtered =
        [...events];


    /*
       SEARCH
       Case-insensitive search
    */

    if (searchTerm.trim() !== "") {

        const query =
            searchTerm
                .toLowerCase()
                .trim();

        filtered =
            filtered.filter(event => {

                return (

                    event.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    event.category
                        .toLowerCase()
                        .includes(query)

                    ||

                    event.description
                        .toLowerCase()
                        .includes(query)

                    ||

                    event.location
                        .toLowerCase()
                        .includes(query)

                );

            });

    }


    /*
       CATEGORY FILTER
    */

    if (currentCategory !== "All") {

        filtered =
            filtered.filter(event =>

                event.category ===
                currentCategory

            );

    }


    /*
       SORTING
    */

    const sort =
        sortSelect.value;


    if (sort === "date-asc") {

        filtered.sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );

    }


    else if (sort === "date-desc") {

        filtered.sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    }


    else if (sort === "category") {

        filtered.sort(
            (a, b) =>
                a.category.localeCompare(
                    b.category
                )
        );

    }


    return filtered;

}


/* =====================================================
   RENDER EVENTS
===================================================== */

function renderEvents() {

    const filtered =
        getFilteredEvents();


    eventsGrid.innerHTML = "";


    /*
       No results
    */

    if (filtered.length === 0) {

        noResults.classList.remove(
            "hidden"
        );

        eventCount.textContent =
            "0 events found";

        return;

    }


    noResults.classList.add(
        "hidden"
    );


    eventCount.textContent =
        `${filtered.length} event${
            filtered.length !== 1
            ? "s"
            : ""
        } found`;


    filtered.forEach(event => {

        eventsGrid.insertAdjacentHTML(
            "beforeend",
            createEventCard(event)
        );

    });

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

document
    .querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                /*
                   Remove active state
                   from every button
                */

                document
                    .querySelectorAll(
                        ".category-btn"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                /*
                   Activate clicked button
                */

                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                renderEvents();

            }
        );

    });


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value;


        clearSearchButton.style.display =
            searchTerm
                ? "block"
                : "none";


        renderEvents();

    }
);


/* =====================================================
   SORT
===================================================== */

sortSelect.addEventListener(
    "change",
    renderEvents
);


/* =====================================================
   CLEAR SEARCH
===================================================== */

function clearSearch() {

    searchInput.value = "";

    searchTerm = "";

    clearSearchButton.style.display =
        "none";

    renderEvents();

}


/* =====================================================
   RESET FILTERS
===================================================== */

function resetFilters() {

    searchTerm = "";

    searchInput.value = "";

    clearSearchButton.style.display =
        "none";


    currentCategory = "All";


    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

            if (
                button.dataset.category ===
                "All"
            ) {

                button.classList.add(
                    "active"
                );

            }

        });


    sortSelect.value =
        "date-asc";


    renderEvents();

}


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        /*
           Remove favorite
        */

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

    }

    else {

        /*
           Add favorite

           includes() prevents duplicates.
        */

        if (!favorites.includes(id)) {

            favorites.push(id);

        }

    }


    /*
       Save to browser
    */

    localStorage.setItem(
        "devboardFavorites",
        JSON.stringify(favorites)
    );


    updateFavoriteCount();

    renderEvents();

}


/* =====================================================
   FAVORITE COUNT
===================================================== */

function updateFavoriteCount() {

    favoriteCount.textContent =
        favorites.length;

}


/* =====================================================
   SHOW FAVORITES
===================================================== */

function showFavorites() {

    document
        .getElementById("homePage")
        .classList.add("hidden");

    document
        .getElementById("detailsPage")
        .classList.add("hidden");

    document
        .getElementById("favoritesPage")
        .classList.remove("hidden");


    document
        .getElementById("eventsNav")
        .classList.remove("active");

    document
        .getElementById("favoritesNav")
        .classList.add("active");


    renderFavorites();

    window.scrollTo(0, 0);

}


/* =====================================================
   RENDER FAVORITES
===================================================== */

function renderFavorites() {

    favoritesGrid.innerHTML = "";


    const favoriteEvents =
        events.filter(event =>
            favorites.includes(event.id)
        );


    if (favoriteEvents.length === 0) {

        emptyFavorites.classList.remove(
            "hidden"
        );

        favoritesGrid.classList.add(
            "hidden"
        );

        return;

    }


    emptyFavorites.classList.add(
        "hidden"
    );

    favoritesGrid.classList.remove(
        "hidden"
    );


    favoriteEvents.forEach(event => {

        favoritesGrid.insertAdjacentHTML(
            "beforeend",
            createEventCard(event)
        );

    });

}


/* =====================================================
   SHOW HOME
===================================================== */

function showHome() {

    document
        .getElementById("homePage")
        .classList.remove("hidden");

    document
        .getElementById("favoritesPage")
        .classList.add("hidden");

    document
        .getElementById("detailsPage")
        .classList.add("hidden");


    document
        .getElementById("eventsNav")
        .classList.add("active");

    document
        .getElementById("favoritesNav")
        .classList.remove("active");


    window.scrollTo(0, 0);

}


/* =====================================================
   EVENT DETAILS
===================================================== */

function showDetails(id) {

    const event =
        events.find(
            event => event.id === id
        );


    if (!event) return;


    document
        .getElementById("homePage")
        .classList.add("hidden");

    document
        .getElementById("favoritesPage")
        .classList.add("hidden");

    document
        .getElementById("detailsPage")
        .classList.remove("hidden");


    const saved =
        isFavorite(event.id);


    document.getElementById(
        "eventDetails"
    ).innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showHome()">

                ← Back to events

            </button>

        </div>


        <div class="details-container">

            <article class="details-card">

                <div class="details-header">

                    <div>

                        <span class="category-tag">
                            ${event.category}
                        </span>

                        <h1>
                            ${event.name}
                        </h1>

                    </div>


                    <button
                        class="favorite-btn ${
                            saved
                            ? "saved"
                            : ""
                        }"
                        onclick="toggleFavorite(${
                            event.id
                        }); showDetails(${
                            event.id
                        })">

                        ${saved ? "♥" : "♡"}

                    </button>

                </div>


                <p class="details-description">

                    ${event.description}

                </p>


                <div class="details-meta">

                    <div class="detail-box">

                        <span>Date</span>

                        <strong>
                            ${formatDate(event.date)}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>Location</span>

                        <strong>
                            ${event.location}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>Mode</span>

                        <strong>
                            ${event.mode}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>Organizer</span>

                        <strong>
                            ${event.organizer}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>Duration</span>

                        <strong>
                            ${event.duration}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>Category</span>

                        <strong>
                            ${event.category}
                        </strong>

                    </div>

                </div>


                <button
                    class="primary-btn"
                    onclick="toggleFavorite(
                        ${event.id}
                    ); showDetails(
                        ${event.id}
                    )">

                    ${
                        saved
                        ? "♥ Remove from saved"
                        : "♡ Save this event"
                    }

                </button>

            </article>

        </div>

    `;


    window.scrollTo(0, 0);

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const darkMode =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "devboardTheme",
        darkMode
            ? "dark"
            : "light"
    );


    updateThemeButton();

}


/* =====================================================
   LOAD THEME
===================================================== */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "devboardTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeButton();

}


/* =====================================================
   UPDATE THEME BUTTON
===================================================== */

function updateThemeButton() {

    const darkMode =
        document.body.classList.contains(
            "dark"
        );


    document.getElementById(
        "themeToggle"
    ).textContent =
        darkMode
            ? "☀️"
            : "🌙";

}