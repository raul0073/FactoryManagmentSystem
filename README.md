# Factory Management System

A full-stack management system for factory operations — covering employee records, shift assignments, and department structure. Built with Vanilla JavaScript on the frontend and a C# .NET REST API backed by SQL.

**[Live](http://dotnetfinal.s3-website.eu-central-1.amazonaws.com/)**

---

## Highlights

- Employee management with full CRUD
- Shift scheduling and assignment across departments
- Department hierarchy and structure management
- Clean REST API with .NET controllers and SQL persistence
- No frontend framework — pure DOM manipulation demonstrating JavaScript fundamentals

## Tech

**Frontend** — Vanilla JavaScript, Sass  
**Backend** — C#, .NET  
**Database** — SQL Server  
**Hosting** — AWS S3

Built without any frontend framework intentionally — all UI state, DOM updates, and API communication handled in raw JavaScript. The .NET backend exposes a RESTful API consumed by the client via fetch.

## Run locally

**Server**
```bash
cd server
dotnet restore
# Set your SQL connection string in appsettings.json
dotnet run
```

**Client**
```bash
cd client
# Point the API base URL at your running server
npx serve .
```

```json
// server/appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  }
}
```
