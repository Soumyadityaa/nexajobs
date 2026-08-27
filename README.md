# NexaJobs - Advanced Frontend Job Portal

**NexaJobs** is a premium, highly interactive frontend job board template built entirely with HTML5, CSS3, and Vanilla JavaScript. 

Designed to demonstrate advanced client-side architecture without the reliance on frameworks like React or external backend databases, this project showcases mastery over DOM manipulation, browser APIs, state management via Local Storage, and modern UI/UX principles.

---

## The Showstoppers (Key Highlights)

This project goes beyond standard static templates by integrating cutting-edge frontend mechanics:

*   **Interactive Kanban Application Tracker:** A fully functional drag-and-drop Kanban board built from scratch using the native **HTML5 Drag and Drop API**. Users can save jobs, drag them across status columns (Saved ➔ Applied ➔ Interviewing), and even add external applications. State persists seamlessly using `localStorage`.
*   **Simulated "AI Match Score" Engine:** A client-side algorithm that simulates a machine learning recommendation engine. Users paste their skills, and a custom JavaScript tokenization function compares it against the DOM data, generating dynamic, color-coded match-percentage progress bars.
*   **Voice-Enabled Search:** Integrates the experimental **Web Speech API** (`window.SpeechRecognition`), allowing users to search for job roles using their device's microphone.
*   **Progressive Web App (PWA) Ready:** Configured with a `manifest.json` and a registered Service Worker (`sw.js`). The application caches critical assets for offline capability and can be installed natively on desktop and mobile devices.

---

## Comprehensive Feature Breakdown

### 1. Data & Search Mechanics
*   **Dynamic Data Rendering:** Handles 30+ job listings dynamically mapped via JavaScript objects.
*   **Custom Pagination Engine:** A fully custom JavaScript pagination system slicing data into sets of 10 items per page with dynamic page number generation and ellipses.
*   **Multi-Criteria Filtering Engine:** Real-time array filtering that simultaneously cross-references user text input, minimum salary sliders, employment type checkboxes, and experience level radio buttons.

### 2. User Experience (UI/UX)
*   **Glassmorphism Aesthetics:** Utilizes CSS `backdrop-filter: blur()` for premium, Apple-like frosted glass navigation and filter panels.
*   **Dark Mode Toggle:** A smooth theme switcher that alters CSS variables dynamically, with user preference remembered via `localStorage`.
*   **Intersection Observer Animations:** CSS-driven scroll reveals triggered purely by the `IntersectionObserver` API, ensuring elements fade and slide into view only when scrolled into the viewport.
*   **Live Toast Notifications:** A self-clearing, timed JavaScript interval that pushes simulated live platform activity (e.g., *"Someone applied for Administrative Clerk"*) to create a bustling, live-platform feel.

### 3. Advanced Sidebar Widgets
*   **Dynamic Salary Estimator:** An interactive tool that calculates market salary based on role and experience. It features a custom `setInterval` function that generates a smooth, 60fps counting animation up to the final calculated value.

### 4. Accessibility & Native Integrations
*   **Native OS Sharing:** Utilizes the `navigator.share()` Web Share API, allowing mobile users to share job links directly through native apps like WhatsApp, SMS, or Email.
*   **Pro-Level Accessibility (a11y):** Includes an invisible "Skip to Main Content" link for screen readers and crisp `:focus-visible` styling for seamless keyboard-only navigation.

---

## Tech Stack
*   **Markup:** HTML5 (Semantic & Accessible)
*   **Styling:** CSS3 (Custom Properties/Variables, Flexbox, CSS Grid, Keyframe Animations)
*   **Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, Array Methods)
*   **Storage:** Browser Local Storage
*   **APIs:** Intersection Observer, Web Speech API, Web Share API, Service Workers

---

## Installation & Usage

Because this project utilizes a Service Worker (PWA), testing it requires a local server.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/NexaJobs.git](https://github.com/yourusername/NexaJobs.git)
