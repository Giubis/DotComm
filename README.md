# DotComm | Community events platform

A platform for small community businesses to share events and for members to sign up to and add events to their Google Calendar.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Setup and installation](#setup-and-installation)
5. [Usage](#usage)
6. [Testing and accessibility](#testing-and-accessibility)
7. [Project links](#project-links)
8. [Notes](#notes)
9. [License](#license)

## Overview

DotComm allows community members to browse and sign up for events, with some being free and others paid. Members can add events to their Google Calendar. Admins can manage events, including creating, editing, and removing users from events.

## Features

**User features:**

- Browse available events
- Register for events
- Add events to Google Calendar
- View personal registered events

**Admin features:**

- Create, edit, and delete events
- Remove users from events
- View all users and their registered events
- Manage platform content

**Other features:**

- Responsive design
- Google Calendar API integration
- One-hour session expiry

**Future features:**

## Tech stack

- **Frontend:** React, JavaScript, HTML, CSS, SweetAlert2
- **Backend:** Node.js, Express, MongoDB
- **Deployment:** Netlify, Render, UptimeRobot

## Setup and installation

**Clone the repo:**

```bash
git clone https://github.com/giubis/DotComm.git
cd DotComm
```

**Install dependencies:**

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

**Environment variables:**

Create a .env file in both client and server folders with the following properties (the actual values will be provided via email):

### Client

VITE_API_URL

### Server

MONGO_URI  
PORT  
JWT_SECRET  
BASE_URL

## Usage

Test admin and user profiles credentials will be provided along with the above said environment variables.

### User Flow

1. Sign up or login
2. Browse events
3. Register for events
4. Add events to Google Calendar

### Admin Flow

1. Login
2. Create, edit, delete events
3. Remove users from events
4. View all users and events

## Testing and accessibility

**Lighthouse:**

- Performance: 97
- Accessibility: 100
- Best Practices: 100
- SEO: 97

**Other:**

- Tested flows: login, registration, event sign up, calendar integration, event removal
- WAVE accessibility tool: no major alerts
- Chrome DevTools: no console errors

## Project links

- GitHub repo: https://github.com/giubis/DotComm
- Live website: https://dotcomm.netlify.app

## Notes

- This project is intended as the minimum viable product for the Launchpad Software Engineering program.
- Future improvements may include:

1. Social and third-party platforms login
2. Email confirmations
3. Payment for paid and PWYW events
4. Events capacity threshold functions
5. Refresh token for enhanced user experience
6. HttpOnly flags for improved security

## License

MIT License - October 2025 | Giuseppe Bisignano
