import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChartPie, faBoxOpen, faShoppingCart, faUsers, faTags, faStar, faPercent, faTruck, faCreditCard, faMoneyBillWave, faGift, faUserTie, faFileInvoiceDollar, faCogs, faShieldAlt, faHistory, faBell } from "@fortawesome/free-solid-svg-icons";

export type MenuItem = {
  labelKey: string; // Key for translation, e.g. "dashboard.sidebar.products"
  href?: string; // If href is present, it's a direct link
  icon: IconDefinition;
  children?: MenuItem[]; // If children is present, it's an accordion menu
};

export const superAdminMenu: MenuItem[] = [
  { labelKey: "Global Overview", href: "/dashboard", icon: faChartPie },
  {
    labelKey: "Ecommerce",
    icon: faShoppingCart,
    children: [
      { labelKey: "Products", href: "/dashboard/products", icon: faBoxOpen },
      { labelKey: "Orders", href: "/dashboard/orders", icon: faShoppingCart },
      { labelKey: "Users / Customers", href: "/dashboard/users", icon: faUsers },
      { labelKey: "Categories", href: "/dashboard/categories", icon: faTags },
      { labelKey: "Reviews & Ratings", href: "/dashboard/reviews", icon: faStar },
      { labelKey: "Coupons & Discounts", href: "/dashboard/coupons", icon: faPercent },
      { labelKey: "Promotional Offers", href: "/dashboard/offers", icon: faGift },
      { labelKey: "Merchant Packages", href: "/dashboard/packages", icon: faFileInvoiceDollar },
      { labelKey: "Shipping & Delivery", href: "/dashboard/shipping", icon: faTruck },
      { labelKey: "Payments & Transactions", href: "/dashboard/payments", icon: faCreditCard },
    ],
  },
  { labelKey: "Roles & Permissions", href: "/dashboard/roles", icon: faShieldAlt },
  { labelKey: "Settings", href: "/dashboard/settings", icon: faCogs },
  { labelKey: "Audit Logs", href: "/dashboard/audit-logs", icon: faHistory },
  { labelKey: "Notifications", href: "/dashboard/notifications", icon: faBell },
];

export const sellerMenu: MenuItem[] = [
  { labelKey: "Store Overview", href: "/dashboard", icon: faChartPie },
  { labelKey: "My Products", href: "/dashboard/products", icon: faBoxOpen },
  { labelKey: "Orders & Sales", href: "/dashboard/orders", icon: faShoppingCart },
  { labelKey: "Coupons & Discounts", href: "/dashboard/coupons", icon: faPercent },
  { labelKey: "Promotional Offers", href: "/dashboard/offers", icon: faGift },
  { labelKey: "Customer Reviews", href: "/dashboard/reviews", icon: faStar },
  { labelKey: "Subscription Plan", href: "/dashboard/packages", icon: faFileInvoiceDollar },
  { labelKey: "Notifications", href: "/dashboard/notifications", icon: faBell },
];

export const getMenuItemsByRole = (role?: string): MenuItem[] => {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return superAdminMenu;
    case 'seller':
      return sellerMenu;
    default:
      return [];
  }
};

