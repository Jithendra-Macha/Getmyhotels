# Quick Fix for PowerShell Script Execution Error

## The Error You're Seeing:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Solution: Bypass Execution Policy for This Session

Run this command in PowerShell (as Administrator):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**OR** if you don't want to change the policy, use this workaround:

```powershell
# Navigate to frontend folder
cd "C:/Users/diny3/OneDrive/Documents/New folder/frontend"

# Run npm using node directly
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

## Alternative: Use the Full Path with .cmd

```powershell
cd "C:/Users/diny3/OneDrive/Documents/New folder/frontend"
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## After Running One of These Commands:

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Then open your browser to: **http://localhost:5173**

## If You Still Have Issues:

Try running PowerShell as Administrator:
1. Right-click PowerShell icon
2. Select "Run as Administrator"
3. Then run the commands above

---

**Quick Copy-Paste Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
cd "C:/Users/diny3/OneDrive/Documents/New folder/frontend"
npm run dev
```
