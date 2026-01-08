# Deployment Guide for Cakes by Deejah

## 1. Pre-Deployment Improvements
Before deploying to production, consider implementing the following improvements to enhance user experience, security, and performance.

### User Experience (UX)
- **Loading States**: Create `loading.tsx` files in key directories (e.g., `app/shop/loading.tsx`, `app/product/[id]/loading.tsx`) to show skeletons or spinners while data fetches.
- **Error Boundaries**: Create `error.tsx` in `app/` to gracefully handle runtime errors without crashing the entire app.
- **Favicon**: Ensure you have a `favicon.ico` in the `public/` folder.

### SEO & Performance
- **Metadata**: Update the metadata in `app/layout.tsx` with real descriptions, keywords, and Open Graph (social media) tags.
- **Sitemap**: Add a `sitemap.ts` or `sitemap.xml` to help search engines index your pages.
- **Robots.txt**: Add a `robots.ts` or `robots.txt` file to control crawler access.

### Security
- **Environment Variables**: Ensure `DATABASE_URL` and `JWT_SECRET` (if used) are strong and kept secret.
- **Input Validation**: Continue using Zod or similar libraries to validate all user inputs on API routes (you are already doing this in many places).

---

## 2. Deploying to GitHub

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    ```

2.  **Create a `.gitignore` file**:
    Ensure your `.gitignore` includes:
    ```text
    node_modules
    .next
    .env
    dist
    ```

3.  **Commit your code**:
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

4.  **Push to GitHub**:
    - Create a new repository on [GitHub](https://github.com/new).
    - Follow the instructions to push your local repository:
      ```bash
      git remote add origin https://github.com/YOUR_USERNAME/cakes-by-deejah.git
      git branch -M main
      git push -u origin main
      ```

---

## 3. Deploying to Vercel

Vercel is the best platform for Next.js apps.

1.  **Create a Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up (you can log in with GitHub).
2.  **Import Project**:
    - Click "Add New..." -> "Project".
    - Select your `cakes-by-deejah` repository from the list.
3.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Environment Variables**:
      - Add `DATABASE_URL`. If you are using a local SQLite file (`file:./dev.db`), **it will not work on Vercel** because Vercel is serverless and ephemeral.
      - **CRITICAL**: You need a cloud database (e.g., Vercel Postgres, Neon, PlanetScale, or Supabase).
      - **Migration**:
        1.  Create a database on one of those providers.
        2.  Get the connection string (e.g., `postgres://...`).
        3.  Update your `DATABASE_URL` in Vercel's settings.
        4.  Update your `schema.prisma` provider if switching from SQLite to Postgres (e.g., `provider = "postgresql"`).
        5.  Run `npx prisma migrate deploy` during the build process or manually against the production DB.

4.  **Deploy**: Click "Deploy". Vercel will build your site and give you a live URL.

### Note on SQLite
Since your project currently uses SQLite (`provider = "sqlite"`), it works great locally but **cannot be deployed to Vercel** effectively because the file system is not persistent.
**Action Item**: Switch to Vercel Postgres or another cloud provider before deploying.

1.  Update `prisma/schema.prisma`:
    ```prisma
    datasource db {
      provider = "postgresql" // or "mysql"
      url      = env("DATABASE_URL")
    }
    ```
2.  Delete `migrations` folder and `dev.db`.
3.  Run `npx prisma migrate dev` to create new migrations for Postgres.
