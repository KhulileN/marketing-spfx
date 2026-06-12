# S&S - SharePoint Framework (SPFx) Project

This is a SharePoint Framework (SPFx) client-side solution. It contains web parts or extensions built for deployment into Microsoft 365 / SharePoint Online environments.

---

## 🛠 Environment Requirements

This project relies on a specific version of the Microsoft SharePoint Build Rig, which is strict about environmental dependencies. 

* **Node.js:** `v18.17.1` (LTS) *(Required)* * *Note: Node v22+ is incompatible with this project's current SPFx version and will throw `MODULE_NOT_FOUND` or stream `TypeError` errors.*
* **Package Manager:** npm (comes bundled with Node)
* **Build Tool:** Gulp CLI

---

## 🚀 Getting Started

If you are setting up this project on a new machine or fixing a version mismatch, follow these steps in order:

### 1. Align Node.js Version
Ensure you are using Node v18. You can check your version by running:
```bash
node -v

If you are running Node 22, you must downgrade to v18.17.1 using Node Version Manager (NVM) or by reinstalling the standalone v18.17.1 installer.

2. Clean and Install Dependencies
Clear out old build artifacts and download the package tree:

# Remove existing modules if switching Node versions
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Install dependencies
npm install

3. Trust the Dev Certificate (First time only)
To allow your local browser to load the web part scripts from localhost:
gulp trust-dev-cert

4. Run Locally
Start the local development server and build pipeline:
gulp serve

This will spin up the local server on port 4321 and open the SharePoint Workbench in your browser.

🔧 Useful Commands & Troubleshooting
Port 4321 Already in Use
If gulp serve throws an error indicating port 4321 is blocked, look for the blocking Process ID (PID) and terminate it:

# Find what's on port 4321
netstat -ano | findstr :4321

# Kill the process (replace 12345 with the PID from the command above)
taskkill /PID 12345 /F
