import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChartPie, faBoxOpen, faShoppingCart, faUsers, faTags, faStar, faPercent, faTruck, faCreditCard, faCashRegister, faMoneyBillWave, faGift, faUserTie, faFileInvoiceDollar, faCogs, faShieldAlt, faHistory, faBell } from "@fortawesome/free-solid-svg-icons";

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
      { labelKey: "Shipping & Delivery", href: "/dashboard/shipping", icon: faTruck },
      { labelKey: "Payments & Transactions", href: "/dashboard/payments", icon: faCreditCard },
    ],
  },
  {
    labelKey: "POS",
    icon: faCashRegister,
    children: [
      { labelKey: "Products", href: "/dashboard/pos/products", icon: faBoxOpen },
      { labelKey: "Sales", href: "/dashboard/sales", icon: faMoneyBillWave },
      { labelKey: "Discounts", href: "/dashboard/pos/discounts", icon: faPercent },
      { labelKey: "Packages", href: "/dashboard/packages", icon: faGift },
      { labelKey: "Offers", href: "/dashboard/offers", icon: faTags },
      { labelKey: "Cashiers / Staff", href: "/dashboard/cashiers", icon: faUserTie },
      { labelKey: "Reports", href: "/dashboard/reports", icon: faFileInvoiceDollar },
    ],
  },
  { labelKey: "Roles & Permissions", href: "/dashboard/roles", icon: faShieldAlt },
  { labelKey: "Settings", href: "/dashboard/settings", icon: faCogs },
  { labelKey: "Audit Logs", href: "/dashboard/audit-logs", icon: faHistory },
  { labelKey: "Notifications", href: "/dashboard/notifications", icon: faBell },
];

export const ecommerceAdminMenu: MenuItem[] = [
  { labelKey: "Overview", href: "/dashboard/ecommerce", icon: faChartPie },
  { labelKey: "Products", href: "/dashboard/products", icon: faBoxOpen },
  { labelKey: "Orders", href: "/dashboard/orders", icon: faShoppingCart },
  { labelKey: "Users / Customers", href: "/dashboard/users", icon: faUsers },
  { labelKey: "Categories", href: "/dashboard/categories", icon: faTags },
  { labelKey: "Reviews & Ratings", href: "/dashboard/reviews", icon: faStar },
  { labelKey: "Coupons & Discounts", href: "/dashboard/coupons", icon: faPercent },
  { labelKey: "Shipping & Delivery", href: "/dashboard/shipping", icon: faTruck },
  { labelKey: "Payments & Transactions", href: "/dashboard/payments", icon: faCreditCard },
];

export const posAdminMenu: MenuItem[] = [
  { labelKey: "Overview", href: "/dashboard/pos", icon: faChartPie },
  { labelKey: "Products", href: "/dashboard/pos/products", icon: faBoxOpen },
  { labelKey: "Sales", href: "/dashboard/sales", icon: faMoneyBillWave },
  { labelKey: "Discounts", href: "/dashboard/pos/discounts", icon: faPercent },
  { labelKey: "Packages", href: "/dashboard/packages", icon: faGift },
  { labelKey: "Offers", href: "/dashboard/offers", icon: faTags },
  { labelKey: "Cashiers / Staff", href: "/dashboard/cashiers", icon: faUserTie },
  { labelKey: "Reports", href: "/dashboard/reports", icon: faFileInvoiceDollar },
];

export const getMenuItemsByRole = (role?: string): MenuItem[] => {
  switch (role) {
    case 'super_admin':
      return superAdminMenu;
    case 'ecommerce_admin':
      return ecommerceAdminMenu;
    case 'pos_admin':
      return posAdminMenu;
    default:
      return [];
  }
};
