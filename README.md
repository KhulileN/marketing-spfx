# S&S - SharePoint Framework (SPFx) Project

This is a SharePoint Framework (SPFx) client-side solution containing web parts and/or extensions designed for deployment to Microsoft 365 and SharePoint Online environments.

---

## 🛠 Environment Requirements

This project relies on a specific version of the Microsoft SharePoint Build Rig, which has strict dependency requirements.

| Requirement | Version |
|------------|---------|
| Node.js | **v18.17.1 (LTS)** |
| Package Manager | **npm** (included with Node.js) |
| Build Tool | **Gulp CLI** |

> **Important:** Node.js v22+ is not compatible with this SPFx version and will result in errors such as `MODULE_NOT_FOUND` or stream-related `TypeError` exceptions.

---

## 🚀 Getting Started

If you are setting up this project on a new machine or resolving a version mismatch, follow the steps below.

### 1. Verify Node.js Version

Check your installed Node.js version:

```bash
node -v
```

If you are running Node.js v22 or later, downgrade to **v18.17.1** using Node Version Manager (NVM) or install the standalone Node.js v18.17.1 package.

---

### 2. Install Dependencies

If switching Node.js versions, remove existing dependencies and lock files before reinstalling.

#### PowerShell

```powershell
# Remove existing modules and lock file
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Install dependencies
npm install
```

#### Command Prompt

```cmd
rmdir /s /q node_modules
del package-lock.json

npm install
```

---

### 3. Trust the Development Certificate (First Time Only)

To allow your browser to load local SPFx assets from `https://localhost`, run:

```bash
gulp trust-dev-cert
```

---

### 4. Run the Project Locally

Start the local development server and build pipeline:

```bash
gulp serve
```

This will:

- Build the SPFx solution
- Start the local development server
- Launch the SharePoint Workbench
- Serve assets from `https://localhost:4321`

---

## 🔧 Useful Commands

### Build the Solution

```bash
gulp build
```

### Bundle for Production

```bash
gulp bundle --ship
```

### Create Deployment Package

```bash
gulp package-solution --ship
```

---

## 🐞 Troubleshooting

### Port 4321 Already in Use

If `gulp serve` fails because port **4321** is occupied, identify and terminate the process using the port.

#### Find the Process

```cmd
netstat -ano | findstr :4321
```

#### Kill the Process

Replace `12345` with the Process ID (PID) returned from the previous command.

```cmd
taskkill /PID 12345 /F
```

---

## 📦 Deployment

To create a deployment package:

```bash
gulp bundle --ship
gulp package-solution --ship
```

The generated `.sppkg` file can be found in:

```text
sharepoint/solution/
```

Upload the package to the SharePoint App Catalog and deploy it to the target tenant.

---

## 📄 Notes

- Use **Node.js v18.17.1** for all development work on this project.
- Delete `node_modules` and reinstall packages whenever switching Node.js versions.
- Ensure the development certificate is trusted before running `gulp serve`.
- SPFx build tooling is version-sensitive; upgrading Node.js without upgrading SPFx may cause build failures.
