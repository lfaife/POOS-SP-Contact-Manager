Overview

AzureBase is a multi-user contact manager with secure authentication, full CRUD operations, and per-user state persistence. Each authenticated user maintains their own isolated contact registry, searchable in real time. The project was built collaboratively as part of UCF's software engineering process course, emphasizing the full software development lifecycle from design to deployment.


Features

Authentication: Secure user registration and login with session-based state persistence; contacts remain scoped per user across sessions

Full CRUD: Create, read, update, and delete contacts via a RESTful PHP API layer (GET, POST, PUT, PATCH, DELETE)

Live Search:  Case-insensitive, real-time search bar filters contacts as you type

Modal-based UI: Add and edit contacts through clean Bootstrap 5 modal dialogs with client-side form validation (email format, 10-digit phone enforcement)

Responsive Design:  Mobile-friendly layout built with Bootstrap 5 and external css

------------------

Tech Stack

Frontend: HTML5, CSS3, Vanilla JavaScript

UI Framework: Bootstrap 5

Backend: PHP (REST API via LAMPAPI)

Database: MySQL

Infrastructure: LAMP stack, hosted on DigitalOcean

-------------------

API Endpoints

All endpoints live under /LAMPAPI/ and accept JSON payloads.

------------------

Getting Started

Prerequisites

Apache, MySQL, PHP (LAMP stack) — local or hosted

A web server with PHP 7.4+

------------------
Setup

Clone the repository:

bash   git clone https://github.com/lfaife/POOS-SP-Contact-Manager.git

Import the database schema:

bash   mysql -u root -p < POOS.sql

Configure the database connection in LAMPAPI/ (update host, user, password, database name in the connection file).
Serve from your Apache/web server root and navigate to index.html.



Deployment

Note: The hosted site is no longer active, but the full source code and database schema are available in this repository.
