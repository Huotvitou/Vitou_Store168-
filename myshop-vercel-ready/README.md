
# MyShop – Vercel Ready (Next.js Full‑Stack)

**Features**
- Products (>10) with USD price (auto‑seed)
- Cart & Checkout with ABA Static QR + Slip upload (Cloudinary optional)
- Auth (Register/Login), Khmer UI
- Admin Dashboard: orders list, slip thumbnail, status change (Pending → Verified → Complete)
- Dark/Light mode toggle in Navbar
- MongoDB Atlas via `.env.local`
- Serverless API in `/pages/api/*` – Deploys on Vercel

**Default Admin**
- Email: `pituhout98@gmail.com`
- Password: `123456` (auto-created at first login call)

**Environment (.env.local)**
```
MONGODB_URI=...
JWT_SECRET=mysupersecretkey
ADMIN_EMAIL=pituhout98@gmail.com
ADMIN_PASSWORD=123456
CLOUDINARY_UPLOAD_URL=
CLOUDINARY_UPLOAD_PRESET=
```

**Run locally**
```
npm install
npm run dev
```

**Deploy**
- Push to GitHub → Import on Vercel → set env from `.env.local`.
