# Simple Funding Site

Why? This repository exists to showcase my Laravel and React skills.

## How It Should Work

- Has a static guest frontend that explains the site and its purpose with a:
    - Home Page
    - About Page
    - Pricing Page
- Has login/register authentication
- When authenticated, a user is given a dashboard where he can create funding pages
- A user should be able to create updates for his funding page, which followers have the option to recieve emails for
- Other users can donate to the funding page
    - If the user is already authenticated, the email will already be filled with his user email, but he has the option of inputting a custom one
- Other users can also follow the funding page for updates
    - The notifications they recieve are via email, and like with donations, they have the option of inputting a custom email (different from their authenticated email)
- Should provide a simple REST API where a developer can CRUD a job posting
- Should allow for exporting donation data as CSV via a queued job that is emailed to the user's email

## Tech Stack

- Backend: Laravel
- Frontend: React, Typescript (or modern JavaScript - ES6+)
- Database: MySQL or PostgreSQL

## TODO

- [x] Static pages
- [ ] Dashboard
- [ ] REST API
- [ ] Export
