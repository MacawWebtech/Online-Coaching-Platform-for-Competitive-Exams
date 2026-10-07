# Examora — frontend-only design project

Open `index.html` locally or serve the folder using `python -m http.server 8000`. The site uses HTML, CSS, JavaScript, and local assets. `vercel.json` is provided for optional future static hosting; **nothing was deployed**.

## UI demonstration boundaries
- Login and registration validate form fields and display a frontend-only status; they do not create accounts or transmit credentials.
- Google and Apple buttons show a demo status; they are not connected to OAuth.
- Dashboards and notifications contain illustrative UI data, not live account data.
- Student portraits and achievements are illustrative unless independently verified.

## UI checks
Test Classic and Premium homepages, course search/category/price sort, separate login and signup, dashboard sidebar, light/dark theme, RTL, and mobile navigation.
