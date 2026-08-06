# 🎬 Movie Guessing Game

An interactive, retro 8-bit web application built with pure Vanilla JavaScript, HTML5, and CSS3. Features dynamic data fetching, progressive game logic, and responsive UI design.

🔗 **Live Demo:** [Play Guess The Movie!](https://omar-aldin.github.io/Movie/)  
💻 **Repository:** [GitHub Source Code]([https://github.com/Omar-AlDin/Movie](https://github.com/Omar-AlDin/Movie.git))

---

## 🚀 Key Features

* **🌐 Live TMDB API Integration:** Replaced hardcoded data with dynamic API calls to fetch movie backdrops, posters, release dates, and localized titles on the fly.
* **💡 Progressive 3-Stage Hint Mechanics:** Tactical assistance system with cost penalties:
  * **Stage 1 (-1 pt):** Unlocks the release year.
  * **Stage 2 (-1 pt):** Unlocks the first character of the movie title.
  * **Stage 3 (-2 pts):** Unlocks the second character of the movie title.
* **⏱️ Dynamic Assistance Tooltips:** Automatically triggers a temporary "Stuck? Click for a hint!" tooltip above the hint box after 2 consecutive incorrect guesses, auto-dismissing after 3.5 seconds (`setTimeout` handling).
* **🌍 Internationalization & Bilingual Handling:** Custom regex normalization and string-splitting logic to seamlessly match both LTR English and RTL Arabic script titles.
* **🎉 Dynamic Performance Overlays:** Custom conditional end-game states based on player accuracy—ranging from celebratory victory animations for high scores to comedic meme triggers (e.g., Gordon Ramsay "idiot sandwich") for skip streaks.
* **📱 Cross-Hardware Accessibility:** Optimized viewports tested across physical mobile and desktop hardware with `:focus-visible` CRT neon glows, full touch controls, and standard `Enter` key form submissions.
* **⚡ Zero External Frameworks:** Built 100% with vanilla ES6+ JavaScript, custom CSS properties, and native DOM manipulation.

---

## 🛠️ Tech Stack

* **Language:** JavaScript (ES6+ Async/Await, DOM API)
* **Structure:** HTML5 (Semantic Markup)
* **Styling:** CSS3 (Flexbox/Grid, Custom CRT Retro Animations, `:focus-visible` states)
* **Data Source:** TMDB REST API
* **Deployment:** GitHub Pages

---

## 🎮 Game Rules & Scoring

* **Correct Guess:** `+3 Points`
* **Hint Stage 1:** `-1 Point` *(Release Year)*
* **Hint Stage 2:** `-1 Point` *(1st Letter Reveal)*
* **Hint Stage 3:** `-2 Points` *(2nd Letter Reveal)*
* **Skip Movie:** `-2 Point`

---

## 🕹️ Controls

* **Submit Answer:** Click the **Check!** button or press **`Enter`** ↵
* **Navigation:** Native mouse, touch screen, or full **`Tab`** keyboard accessibility.
