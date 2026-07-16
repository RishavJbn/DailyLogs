# DailyLogs

> A single-page website where I write one short log per day and see my past logs.

[![Repo](https://img.shields.io/badge/GitHub-RishavJbn%2FDailyLogs-181717?logo=github)](https://github.com/RishavJbn/DailyLogs)
[![Language: JavaScript](https://img.shields.io/badge/JavaScript-90.5%25-F7DF1E?logo=javascript&logoColor=000)](https://github.com/RishavJbn/DailyLogs)
[![Language: CSS](https://img.shields.io/badge/CSS-8.9%25-1572B6?logo=css3&logoColor=fff)](https://github.com/RishavJbn/DailyLogs)
[![Language: HTML](https://img.shields.io/badge/HTML-0.6%25-E34F26?logo=html5&logoColor=fff)](https://github.com/RishavJbn/DailyLogs)
![License](https://img.shields.io/badge/license-Not%20specified-lightgrey)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Build](https://img.shields.io/badge/build-not%20configured-lightgrey)
![Issues](https://img.shields.io/github/issues/RishavJbn/DailyLogs)
![Stars](https://img.shields.io/github/stars/RishavJbn/DailyLogs)

<!-- Optional: Replace with real image -->
<!-- ![DailyLogs Screenshot](./docs/assets/screenshot.png) -->

**Quick Links:** [Live Demo](#-deployment) · [Documentation](#table-of-contents) · [Report Bug](https://github.com/RishavJbn/DailyLogs/issues) · [Request Feature](https://github.com/RishavJbn/DailyLogs/issues)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Installation (Step-by-Step)](#local-installation-step-by-step)
- [Project Structure](#project-structure)
- [Core Logic / How It Works](#core-logic--how-it-works)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables Reference](#environment-variables-reference)
- [Scripts Reference](#scripts-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Folder-Level Configuration (Docker, if applicable)](#folder-level-configuration-docker-if-applicable)
- [Contributing Guidelines](#contributing-guidelines)
- [Roadmap](#roadmap)
- [FAQ / Troubleshooting](#faq--troubleshooting)
- [License](#license)
- [Contact / Acknowledgements](#contact--acknowledgements)

---

## About the Project

DailyLogs is a lightweight, single-page journaling app designed for writing one short note per day and reviewing previous entries in a clean timeline-like experience.

### Motivation

Many journaling apps are either too complex or require account setup and heavy workflows. DailyLogs focuses on speed and consistency: open the app, write your log, and keep going.

### Key Features

- ✍️ Write one short daily log
- 📅 View historical logs
- ⚡ Simple single-page UX
- 🧠 Minimal friction and focused design

### Screenshots / GIFs

> Add real visuals once available.

- `docs/assets/home.png` — main dashboard
- `docs/assets/new-log.gif` — quick create flow
- `docs/assets/history.png` — previous logs view

### Architecture Overview

```mermaid
flowchart LR
    U[User] --> UI[Single Page UI]
    UI --> ST[Client State]
    ST --> LS[Local Storage / Persistence Layer]
    LS --> ST
    ST --> UI
