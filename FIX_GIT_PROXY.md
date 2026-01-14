# Fix Git Proxy Authentication Error (407)

The error `CONNECT tunnel failed, response 407` means your company proxy requires authentication.

## Solution: Configure Git with Proxy Credentials

### Step 1: Get Your Proxy Details

You need to know:
- Proxy server address (e.g., `proxy.company.com` or `10.0.0.1`)
- Proxy port (e.g., `8080`, `3128`, `80`)
- Your username (usually your company email or network username)
- Your password (your network/domain password)

**How to find proxy settings:**
- Windows: Settings → Network & Internet → Proxy
- Or ask your IT department
- Or check: `netsh winhttp show proxy` in PowerShell

### Step 2: Configure Git with Authenticated Proxy

Open PowerShell or Command Prompt and run:

```bash
git config --global http.proxy http://username:password@proxy.company.com:port
git config --global https.proxy http://username:password@proxy.company.com:port
```

**Example:**
```bash
git config --global http.proxy http://john.doe:mypassword@proxy.company.com:8080
git config --global https.proxy http://john.doe:mypassword@proxy.company.com:8080
```

### Step 3: Handle Special Characters in Password

If your password contains special characters, you need to URL-encode them:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| # | %23 |
| $ | %24 |
| % | %25 |
| & | %26 |
| + | %2B |
| = | %3D |
| ? | %3F |
| / | %2F |
| \ | %5C |
| space | %20 |

**Example:**
If password is `P@ssw0rd#123`, use `P%40ssw0rd%23123`

### Step 4: Test the Connection

```bash
git ls-remote https://github.com/Chanon-Trai/pmdwebagain.git
```

If this works, you can now push!

### Step 5: Push Your Code

```bash
git push origin main
```
(or `git push origin master` if your branch is master)

## Alternative: Use Git Credential Helper (More Secure)

This stores credentials securely instead of in plain text:

### Step 1: Configure Credential Helper
```bash
git config --global credential.helper wincred
```

### Step 2: Set Proxy Without Password
```bash
git config --global http.proxy http://proxy.company.com:port
git config --global https.proxy http://proxy.company.com:port
```

### Step 3: Set Proxy Authentication
```bash
git config --global http.proxyAuthMethod basic
```

### Step 4: When You Push, Git Will Prompt for Credentials
Git will ask for username/password the first time, then save it securely.

## Alternative: Use SSH Instead (Bypasses Proxy Issues)

SSH often works better with corporate proxies:

### Step 1: Generate SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
Press Enter to accept default location, set a passphrase if desired.

### Step 2: Add SSH Key to GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   (Or on Windows: `type %USERPROFILE%\.ssh\id_ed25519.pub`)

2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste the key and save

### Step 3: Change Remote URL to SSH
```bash
git remote set-url origin git@github.com:Chanon-Trai/pmdwebagain.git
```

### Step 4: Test SSH Connection
```bash
ssh -T git@github.com
```

### Step 5: Push
```bash
git push origin main
```

## Quick Commands Reference

### Check Current Proxy Settings
```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

### Remove Proxy Settings (if needed)
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### View All Git Config
```bash
git config --global --list
```

## Troubleshooting

### If 407 Error Persists:
1. **Double-check credentials** - username and password must be correct
2. **URL-encode special characters** in password
3. **Try without domain** - sometimes just username works: `username:password@proxy`
4. **Check if proxy needs domain** - sometimes: `domain\username:password@proxy`

### If Connection Still Fails:
1. **Verify proxy address and port** are correct
2. **Check if proxy allows GitHub** - some companies block GitHub
3. **Try SSH method** instead (often works better)
4. **Contact IT** - they may need to whitelist GitHub

### Test Proxy Connection
```bash
curl -v --proxy http://username:password@proxy.company.com:port https://github.com
```

## Recommended Approach

1. **First try:** SSH method (often bypasses proxy issues)
2. **If SSH doesn't work:** Use authenticated proxy with credential helper
3. **Last resort:** Use Vercel CLI direct deployment (no GitHub needed)

## Security Note

Storing passwords in Git config is not ideal. Consider:
- Using credential helper (wincred on Windows)
- Using SSH keys
- Or just use Vercel CLI for deployment (no GitHub needed)

