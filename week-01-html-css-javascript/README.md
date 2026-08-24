# Week 1 — HTML, CSS & JavaScript Fundamentals

**Phase 1 · Frontend Foundations**

A **Fake Store** product listing page built with vanilla HTML, CSS and JavaScript — no frameworks or libraries. Products are fetched live from the [FakeStore API](https://fakestoreapi.com) and rendered dynamically.

## Features

- **Fetch products from an API** — `async/await` with `try/catch` error handling; shows a friendly error message if the request fails
- **Category filtering** — All, Men's Clothing, Women's Clothing, Electronics, Jewellery (`.filter()` on the cached product list)
- **Add to Cart** — adds the selected product to a cart array and updates the live cart counter in the header
- **Dynamic rendering** — products displayed as cards via template literals and DOM manipulation

## Concepts Applied

- Semantic HTML (`header`, `nav`, `main`, `section`) with accessibility attributes (`aria-label`, `alt`)
- Modern JavaScript: ES6+, template literals, array methods (`map` / `filter` / `find`), async/await
- DOM selection & event handling
- Flexbox layout, card grid design, hover states

## Project Structure

```
week-01-html-css-javascript/
├── index.html          # Page markup
├── style.css           # Styling
├── script.js           # Fetching, filtering & cart logic
└── assets/
    └── cart.gif        # Cart icon
```

## How to Run

Open `index.html` directly in any browser — no build step needed.

> An internet connection is required since products come from the FakeStore API.
