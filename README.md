# Simple Funding Site

Why? This repository exists to showcase my Laravel and React skills. I have no intention of making a product out of this.

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

## Routes

- GET Home: /
- GET About: /about
- GET Pricing: /pricing
- GROUP Dashboard: /dashboard
    - GROUP Funding Pages: /my-funding-pages
        - GET /
        - GET /create
        - POST /
        - GET {fundingPage}/edit
        - PUT /{fundingPage}
        - GET /{fundingPage}
        - GROUP My Updates: /my-updates
            - POST /
            - DELETE /{fundingPageUpdate}
    - GROUP Updates: /my-updates
        - GET /
        - DELETE /{fundingPageUpdate}
    - GROUP Donations: /my-donations
        - GET /
- GROUP Settings: /settings
    - GET profile: /profile
    - GET password: /password
    - GET appearance: /appearance

## TODO

- [x] Static pages
- [x] Use Dynamic Data
- [ ] Dashboard
    - [x] My Funding Pages
        - [x] Add pagination to funding pages
    - [x] Funding Page Show
        - [x] Add pagination to funding page updates
        - [x] Add pagination to funding page donations
    - [x] My Updates
    - [ ] My Donations
- [ ] REST API
- [ ] Export donation CSV
- [ ] Visiting users (guests)
    - [ ] Show Public Funding Pages on Home
    - [ ] Allow donations for both authenticated and guest users
    - [ ] Authenticated users have their name and email filled in by default but can still enter custom
    - [ ] User has the option of having their donation be public or anonymous
    - [ ] User can leave a message with their donation
- [ ] When clicking "Get Started" button, and authenticated, should go to the dashboard instead of home page
