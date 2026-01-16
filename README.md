# Dating App — Frontend

Frontend part of a web application for dating and social interaction between users.

## Tech Stack

* **TypeScript** — type-safe development
* **Next.js** — React framework with SSR/SSG support
* **Redux Toolkit** — global state management
* **SCSS** — component styling

## Project Goal

Provide a convenient and secure platform for interaction between users of a dating service.

Features:

* user registration and authentication;
* profile creation and editing;
* searching and browsing other users;
* real-time messaging (chat);
* public and private meetings;
* displaying meetings and activities on a map using geo-markers.

The project is designed with future scalability and feature expansion in mind.

## Architecture

The project follows the **Feature-Sliced Design (FSD)** methodology, which allows:

* scalable application growth;
* clear separation of responsibilities;
* easier maintenance and testing.

### Main layers:

* **root/** — application initialization, providers (my variant for NextJS)
* **app/** — Next.js routing (basic for NextJS)
* **processes** - long-running cross-feature flows that represent business processes
* **widgets/** — large UI blocks (e.g. profile, chat list)
* **features/** — user interaction scenarios (login, like, create meeting)
* **entities/** — business entities (User, Chat, Meeting)
* **shared/** — reusable components, UI kit, utilities, API layer

## State Management

Global state is handled with **Redux Toolkit**:

* slices for individual features;
* async thunks for API communication (+ RTK query);
* centralized store configuration.

## Styling

* SCSS with a modular approach;
* shared variables and mixins;
* responsive and adaptive layout;
* MUI

## Project Setup

```bash
npm install
npm run dev
```

The application will be available at: `http://localhost:3000`

## ℹ️ Additional Information — Prerequisites

> This section is provided for reference. Experienced developers may skip it.

Before running the project, make sure you have the following installed:

* **Node.js** version **18.x or higher**
* **npm**, **yarn**, or **pnpm** package manager

You can download Node.js from the official website:

* [https://nodejs.org/](https://nodejs.org/)

To verify the installation:

```bash
node -v
npm -v
```

## Notes

* The project is prepared for backend integration (REST).
* The architecture makes it easy to add new features without breaking existing logic.
