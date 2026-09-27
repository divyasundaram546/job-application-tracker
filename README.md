# Job Application Tracker

A full-stack app to track job applications — company, role, status, CTC discussed, and notes.
Built with Angular, Node.js/Express, MySQL, and Docker.

## Tech Stack
- **Frontend:** Angular (components, services, reactive forms)
- **Backend:** Node.js, Express, REST APIs
- **Database:** MySQL
- **Containerization:** Docker, Docker Compose

## Project Structure
```
job-tracker/
├── backend/          # Express API (complete, ready to run)
├── frontend/          # Angular pieces to drop into a generated Angular project
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### 1. Generate the Angular project (frontend folder currently has only the custom files)
From inside the `frontend/` folder, run:
```bash
npx @angular/cli new job-tracker-frontend --routing=false --style=css --skip-git
```
When prompted, choose defaults. This creates the full Angular scaffold (angular.json, main.ts, etc.)
that isn't included here since it's auto-generated boilerplate.

### 2. Copy the custom files into the generated project
Move these into `job-tracker-frontend/src/app/`:
- `application.service.ts`
- `application-list/` (the whole folder — .ts, .html, .css)

### 3. Wire up the app module
In `src/app/app.module.ts`, add these imports and declarations:
```typescript
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationListComponent } from './application-list/application-list.component';

// add HttpClientModule and ReactiveFormsModule to imports: []
// add ApplicationListComponent to declarations: []
```

In `src/app/app.component.html`, replace the default content with:
```html
<app-application-list></app-application-list>
```

### 4. Run locally (without Docker, for development)
**Backend:**
```bash
cd backend
npm install
npm run dev
```
Make sure you have a local MySQL running, and run `schema.sql` against it first, or set your `.env`
(copy `.env.example` to `.env` and adjust) to point at your MySQL instance.

**Frontend:**
```bash
cd job-tracker-frontend
npm install
ng serve
```
Visit `http://localhost:4200`.

### 5. Run everything with Docker (recommended for the "containerized project" story)
From the `job-tracker/` root folder (with the generated Angular project placed inside `frontend/`):
```bash
docker-compose up --build
```
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- MySQL: localhost:3306

## API Endpoints
| Method | Endpoint              | Description          |
|--------|------------------------|-----------------------|
| GET    | /applications           | List all applications |
| GET    | /applications/:id       | Get one application    |
| POST   | /applications           | Create new application |
| PUT    | /applications/:id       | Update an application   |
| DELETE | /applications/:id       | Delete an application    |

## Why I Built This
Built to track my own job search, and to apply the same request-lifecycle pattern
(submission → status tracking) I use professionally, in a project I could fully own,
containerize, and share.
