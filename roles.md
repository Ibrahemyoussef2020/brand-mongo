# Roles & Access Control Architecture Plan (3-Tier Model)

This document outlines the architecture, permissions matrix, database schema, route protection, and UI navigation for the streamlined **3-Role System** in the application.

---

## 1. The 3 System Roles

| Role | Database Value | Scope & Description | Dashboard Access |
| :--- | :--- | :--- | :---: |
| **1. Admin / Super Admin** | `'admin'` / `'super_admin'` | Full system administrative privileges, system configuration, user role management, system audit logs, payments telemetry, global catalogs. | **Full Access** |
| **2. Seller** | `'seller'` | Merchant store management: manage store products, fulfillment orders, coupons, promotions, store reviews, subscription plans, notifications. | **Scoped Access** |
| **3. User (Customer)** | `'user'` | Consumer storefront experience: browsing catalog, cart, checkout, tracking personal orders, managing user profile. | **No Access** |

---

## 2. Granular Permissions & Route Matrix

| Route / Module | Admin / Super Admin | Seller | User (Customer) |
| :--- | :---: | :---: | :---: |
| **Storefront (`/`, `/products`, `/cart`, `/checkout`)** | Access | Access | Access |
| **Customer Profile (`/profile`, `/orders`)** | Access | Access | Access |
| **Dashboard Overview (`/dashboard`)** | Global Platform Overview | Store Sales Overview | Denied (Redirect to `/`) |
| **Product Management (`/dashboard/products`)** | All Products (Full CRUD) | Seller's Products (CRUD) | Denied |
| **Orders & Sales (`/dashboard/orders`)** | All Platform Orders | Store Orders Fulfillment | Denied |
| **Coupons & Discounts (`/dashboard/coupons`)** | Global & Store Coupons | Store Coupons | Denied |
| **Promotions & Offers (`/dashboard/offers`)** | Global Campaigns | Store Deals & Campaigns | Denied |
| **Customer Reviews (`/dashboard/reviews`)** | Moderate All Reviews | Store Product Reviews | Denied |
| **Subscription Packages (`/dashboard/packages`)** | Manage Merchant Tiers | View / Upgrade Plan | Denied |
| **Broadcast Notifications (`/dashboard/notifications`)** | Platform Broadcasts | Store Alerts & Notices | Denied |
| **Categories Management (`/dashboard/categories`)** | Full Management | View Only / Scoped | Denied |
| **Shipping Logistics (`/dashboard/shipping`)** | Global Carriers & Rules | Scoped Shipments | Denied |
| **Payment Telemetry (`/dashboard/payments`)** | Full Financials & Refunds | Store Earnings Overview | Denied |
| **Roles & Permissions (`/dashboard/roles`)** | **Exclusive Access** | **Blocked** | Denied |
| **System Settings (`/dashboard/settings`)** | **Exclusive Access** | **Blocked** | Denied |
| **Audit Logs (`/dashboard/audit-logs`)** | **Exclusive Access** | **Blocked** | Denied |
| **User Directory (`/dashboard/users`)** | **Exclusive Access** | **Blocked** | Denied |

---

## 3. Technical Implementation Plan

### Step 1: Database Model Simplification (`lib/models/UserModel.ts`)
- Restrict `role` enum strictly to: `['super_admin', 'admin', 'seller', 'user']`.
- Set default role to `'user'`.
- Deprecate ad-hoc legacy boolean flags (`isCashier`, `isSeller`, `isAdmin`) in favor of the single source of truth `role` string.

### Step 2: Role Helper Utilities (`lib/utils/roles.ts`)
- Provide unambiguous helper functions:
  ```typescript
  export const isAdmin = (role?: string) => role === 'admin' || role === 'super_admin';
  export const isSeller = (role?: string) => role === 'seller';
  export const isCustomer = (role?: string) => !role || role === 'user';
  export const canAccessDashboard = (role?: string) => isAdmin(role) || isSeller(role);
  export const canManageSystem = (role?: string) => isAdmin(role);
  ```

### Step 3: NextAuth & JWT Propagation (`lib/auth.ts`)
- Ensure `jwt` callback loads `role` directly from `UserModel`.
- Attach `role` to `session.user.role` so client and server components can inspect authorization synchronously.

### Step 4: Edge Middleware Protection (`middleware.ts`)
- **Unauthenticated Users**: Attempting to access `/dashboard/*` redirects to `/${locale}/login`.
- **User Role (`user`)**: Attempting to access `/dashboard/*` redirects to `/${locale}` (Home).
- **Seller Role (`seller`)**:
  - Allowed on: `/dashboard`, `/dashboard/products`, `/dashboard/orders`, `/dashboard/coupons`, `/dashboard/offers`, `/dashboard/reviews`, `/dashboard/packages`, `/dashboard/notifications`.
  - Blocked on admin-only routes: `/dashboard/roles`, `/dashboard/settings`, `/dashboard/audit-logs`, `/dashboard/users`. Redirects to `/dashboard`.
- **Admin Role (`admin` / `super_admin`)**: Full clearance across all dashboard routes.

### Step 5: Dynamic Dashboard Navigation (`config/dashboard.ts` & `Sidebar.tsx`)
- Return tailored menus based on `session.user.role`:
  - **Admin Menu**: Global Overview, Ecommerce (Products, Orders, Users, Categories, Reviews, Coupons, Shipping, Payments), Roles & Permissions, Settings, Audit Logs, Notifications.
  - **Seller Menu**: Store Overview, My Products, Orders & Sales, Coupons & Discounts, Promotional Offers, Customer Reviews, Subscription Plan, Notifications.
  - **User**: No sidebar menu rendered; access to dashboard blocked.

### Step 6: User Management UI (`app/[locale]/dashboard/users`)
- Display user role badges (`Admin`, `Seller`, `User`).
- Admin dropdown selector to easily promote or reassign user roles:
  - `User / Customer`
  - `Seller`
  - `Admin`
- Server action `setUserRole(userId, newRole)` updates MongoDB with immediate path revalidation.

---

## 4. Verification & Testing Checklist

- [ ] **Customer Verification**:
  - Log in as a standard user (`role: 'user'`).
  - Verify storefront, cart, checkout, and profile work normally.
  - Attempt navigating to `/en/dashboard` $\rightarrow$ Redirects to `/en`.
- [ ] **Seller Verification**:
  - Assign `role: 'seller'` to a user.
  - Verify "Dashboard" link appears in user menu dropdown.
  - Navigate to `/en/dashboard` $\rightarrow$ Displays Seller Store Overview and Seller Menu.
  - Attempt accessing `/en/dashboard/roles` or `/en/dashboard/settings` $\rightarrow$ Redirects back to `/en/dashboard`.
- [ ] **Admin Verification**:
  - Log in with `role: 'admin'` or `'super_admin'`.
  - Access all dashboard pages and verify complete administrative controls.


-----------------------------------

## 5. Seeders (Admin & Seller Creation)

### 5.1. Admin / Super Admin Seeder (`scripts/seed-admin.ts`)

```typescript
import dbConnect from '../lib/dbConnect';
import UserModel from '../lib/models/UserModel';
import bcrypt from 'bcryptjs';

(async function seed() {
  await dbConnect();
  
  // 1. Create Super Admin (Full System Access)
  const superAdmin = await UserModel.findOneAndUpdate(
    { role: 'super_admin' },
    {
      name: 'Super Admin',
      email: [EMAIL_ADDRESS]',
      password: bcrypt.hashSync('admin1234', 10),
      role: 'super_admin'
    },
    { upsert: true, new: true }
  );
  
  // 2. Create Admin (Standard Admin)
  const admin = await UserModel.findOneAndUpdate(
    { role: 'admin' },
    {
      name: 'Admin',
      email: [EMAIL_ADDRESS]',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin'
    },
    { upsert: true, new: true }
  );
  
  console.log('Super Admin created:', superAdmin);
  console.log('Admin created:', admin);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**How to Run:**
```bash
node --require ts-node/register scripts/seed-admin.ts
```

### 5.2. Seller Seeder (`scripts/seed-seller.ts`)

```typescript
import dbConnect from '../lib/dbConnect';
import UserModel from '../lib/models/UserModel';
import bcrypt from 'bcryptjs';

(async function seed() {
  await dbConnect();
  
  // Create Seller
  const seller = await UserModel.findOneAndUpdate(
    { email: [EMAIL_ADDRESS]' },
    {
      name: 'Seller',
      email: [EMAIL_ADDRESS]',
      password: bcrypt.hashSync('seller123', 10),
      role: 'seller'
    },
    { upsert: true, new: true }
  );
  
  console.log('Seller created:', seller);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**How to Run:**
```bash
node --require ts-node/register scripts/seed-seller.ts
```

### 5.3. Common Credentials

| Role | Email | Password | Type |
| :--- | :--- | :--- | :--- |
| **Super Admin** | [EMAIL_ADDRESS] | `admin1234` | Global Super Admin |
| **Admin** | [EMAIL_ADDRESS] | `admin123` | Standard Admin |
| **Seller** | [EMAIL_ADDRESS] | `seller123` | Merchant Seller |


/////////////////////

emails  

1- superadmin@brand.com password superadmin@brand.com
2- user1@brand.com password superadmin@brand.com
3- seller1@brand.com password seller1@brand.com
4- admin1@brand.com password admin1@brand.com