# Simple Funding Site

## How It Should Work

- Has a static guest frontend that explains the site and its purpose with a:
  - Home Page
  - About Page
  - Pricing Page
- Has login/register authentication
- When authenticated, a user is given a dashboard where he can create funding pages
his email
  - If the user is already authenticated, the email will already be filled, but he has the option of inputting a custom one
- Should provide a simple REST API where a developer can CRUD a job posting
- Should allow for exporting donation data as CSV via a queued job that is emailed to the user's email

## Tech Stack

- Backend: Laravel
- Frontend: React, Typescript (or modern JavaScript - ES6+)
- Database: MySQL or PostgreSQL

## TODO

- [ ] Static website
- [ ] Dashboard
- [ ] REST API
- [ ] Export