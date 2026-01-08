# Vercel Deployment Fix Instructions

We have made changes to fix the "Internal Server Error" and ensure your seeded data appears on the live site.

## What Changed?
1.  **Database Moved**: The seeded SQLite database (`dev.db`) is now in the project root folder.
2.  **Vercel Configuration**: Updated `prisma/schema.prisma` to support Vercel's Linux environment (`binaryTargets`).
3.  **Git Configuration**: Updated `.gitignore` to track the `dev.db` file so it gets uploaded to Vercel.

## Required Actions

### 1. Update Vercel Environment Variables
You **MUST** update the `DATABASE_URL` in your Vercel Project Settings.

1.  Go to your Vercel Dashboard.
2.  Select the **Honey Fabrics** (Cakes by Deejah) project.
3.  Go to **Settings** > **Environment Variables**.
4.  Edit `DATABASE_URL` and set the value to:
    ```
    file:../dev.db
    ```
    *(Note: The `..` is important because Prisma runs from the `prisma/` folder during generation, but the app runs from root. This path ensures it finds the file in both cases.)*

### 2. Deploy Changes
Commit and push the changes to your repository to trigger a new deployment.

```bash
git add .
git commit -m "Fix Vercel deployment: Include seeded DB and update Prisma config"
git push
```

### 3. Verify
Once deployed, the "Internal Server Error" should be gone, and you should see your 50 products and categories.
