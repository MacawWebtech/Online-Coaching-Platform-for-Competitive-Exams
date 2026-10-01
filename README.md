# Examora — Competitive Exam Coaching HTML Template

Responsive static HTML/CSS/JS template for a competitive-exam coaching / LMS platform.

## Project structure (GitHub-ready)

```
examora/                          ← repository root
├── .github/workflows/
│   └── deploy-pages.yml          ← GitHub Actions → GitHub Pages
├── .nojekyll
├── index.html                    ← Home 1
├── home-2.html                   ← Home 2
├── about.html, blog.html, ...
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── backgrounds/          ← PAGE HEADER backgrounds (JPG)
│       │   ├── index.jpg
│       │   ├── home-2.jpg
│       │   ├── courses.jpg
│       │   └── ...
│       ├── courses/              ← course thumbnails
│       ├── instructors/
│       ├── students/
│       ├── blog/
│       ├── about/
│       ├── hero/
│       └── resources/
├── dashboard/                    ← student dashboard pages
├── instructor/                   ← instructor dashboard pages
└── admin/                        ← admin pages
```

## Deploy with GitHub Actions (GitHub Pages)

1. Create a **new GitHub repository**.
2. Upload **everything inside this folder** so that `index.html` is at the **root** of the repo
   (do not nest an extra `examora/` folder).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to the `main` branch (or run the workflow manually).
6. The workflow `.github/workflows/deploy-pages.yml` will publish the site.

No build step, Node, PHP, or database required.

## Local preview

```bash
python -m http.server 8000
```

Open http://localhost:8000

## Replace page header background images

Every page uses a background image from:

`assets/images/backgrounds/`

| Page | File to replace |
|------|-----------------|
| Home 1 | `index.jpg` |
| Home 2 | `home-2.jpg` |
| Courses | `courses.jpg` |
| Course details | `course-details.jpg` |
| Instructors | `instructors.jpg` |
| Instructor details | `instructor-details.jpg` |
| Pricing | `pricing.jpg` |
| Blog | `blog.jpg` |
| Blog details | `blog-details.jpg` |
| Contact | `contact.jpg` |
| Resources | `resources.jpg` |
| Results | `results.jpg` |
| Mock tests | `mock-tests.jpg` |
| About | `about.jpg` |
| Login / Register | `login.jpg` / `register.jpg` |
| 404 / Coming soon | `404.jpg` / `coming-soon.jpg` |
| Student dashboard | `dashboard-student-*.jpg` |
| Admin | `admin-admin-*.jpg` |
| Instructor panel | `instructor-instructor-*.jpg` |

**How to replace with your own image:**
1. Export your image as **JPG** (recommended size **1920×1080** or larger).
2. Overwrite the matching file in `assets/images/backgrounds/` (keep the same filename).
3. No HTML change needed if you keep the same name and `.jpg` extension.

If you change the filename or extension, update that page’s `<body>` tag:

```html
<body class="page-background" style="--page-bg-image:url('assets/images/backgrounds/YOUR-FILE.jpg');">
```

## Replace other images

| Type | Folder | Suggested size |
|------|--------|----------------|
| Course / blog thumbnails | `assets/images/courses/`, `blog/` | 1200×750 |
| Instructor / student photos | `assets/images/instructors/`, `students/` | 900×1100 |
| Hero / about images | `assets/images/hero/`, `about/` | 1600×1000 |
| Resources | `assets/images/resources/` | flexible |

Keep the same filenames, or update the `<img src="...">` paths in the HTML.

## Notes

- Static demo only — forms, login, payments need a backend for production.
- Dark/light mode and RTL toggle are included.
- Color system: Black, White, and primary orange `#FF5A1F`.
