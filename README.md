# Full Stack Web Developer — CV & Portfolio

A clean, modern single-page CV and portfolio website built to showcase skills, projects, and experience in a professional way for recruiters and clients.

---

## Features

- Single-page responsive layout
- Clean and modern UI
- Tailwind CSS (CDN) for fast setup
- Smooth scroll-based animations using Intersection Observer  
  (animations replay every time sections re-enter the viewport)
- Optimized structure for GitHub Pages deployment

---

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript (ES6+)
- Tailwind CSS
- Bootstrap

**Backend (Projects Experience)**
- PHP
- MySQL
- Apache (XAMPP local server)

**Tools**
- Git & GitHub
- Visual Studio Code

---

## Project Structure

FullStack_CV_Portfolio/
│
├── index.html # Main single-page CV & portfolio
├── assets/
│ └── main.js # Animations & helpers
├── images/ # Images (profile, projects, certificates)
├── .gitignore
└── README.md



## Usage

1. Replace the placeholder images with your own images.
   - Recommended: copy your images into the `images/` folder.
   - Update the `src` paths in `index.html` accordingly.
2. Open `index.html` directly in your browser to view locally.
3. Push the project to GitHub.
4. Enable **GitHub Pages** from the repository settings (main branch / root).

---

## Notes

- Tailwind CSS is loaded via CDN for simplicity and fast deployment.
- The project does not require a build step.
- Contact section is UI-only; you can later connect it to:
  - A backend service
  - Email (`mailto:`)
  - Or a form service like Formspree

---

## Future Improvements

- Convert Tailwind CDN to a full Tailwind CLI build
- Add multi-language support (Arabic / English)
- Add Dark Mode toggle
- Connect contact form to backend
