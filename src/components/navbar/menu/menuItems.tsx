import {
   School,
   CardMembership,
   Favorite,
   Dashboard,
   Notifications,
   Message,
   Settings,
   Payment,
   Subscriptions,
   CreditCard,
   History,
   Language,
   AccountCircle,
   Edit,
   Help,
   Logout,
} from "@mui/icons-material";

interface MenuItemType {
   icon?: React.ReactNode;
   textKey?: string;
   divider?: boolean;
   url?: string;
}

export const menuItems: MenuItemType[] = [
   {
      icon: <School fontSize="small" />,
      textKey: "my_learning",
      url: "/my-learning",
   },
   {
      icon: <CardMembership fontSize="small" />,
      textKey: "my_card",
      url: "/my-card",
   },
   {
      icon: <Favorite fontSize="small" />,
      textKey: "wishlist",
      url: "/wishlist",
   },
   {
      icon: <Dashboard fontSize="small" />,
      textKey: "instruction_dashboard",
      url: "/dashboard",
   },
   { divider: true },
   {
      icon: <Notifications fontSize="small" />,
      textKey: "notifications",
      url: "/notifications",
   },
   {
      icon: <Message fontSize="small" />,
      textKey: "messages",
      url: "/messages",
   },
   { divider: true },
   {
      icon: <Settings fontSize="small" />,
      textKey: "account_settings",
      url: "/user/edit-account/",
   },
   {
      icon: <Payment fontSize="small" />,
      textKey: "payment_methods",
      url: "/user/edit-payment-methods/",
   },
   {
      icon: <Subscriptions fontSize="small" />,
      textKey: "subscriptions",
      url: "/user/manage-subscriptions/",
   },
   {
      icon: <CreditCard fontSize="small" />,
      textKey: "udemy_credits",
      url: "/udemy-credits",
   },
   {
      icon: <History fontSize="small" />,
      textKey: "purchase_history",
      url: "/purchase-history",
   },
   { divider: true },
   {
      icon: <Language fontSize="small" />,
      textKey: "language",
      url: "/language",
   },
   { divider: true },
   {
      icon: <AccountCircle fontSize="small" />,
      textKey: "public_profile",
      url: "/public-profile",
   },
   {
      icon: <Edit fontSize="small" />,
      textKey: "edit_profile",
      url: "/edit-profile",
   },
   { divider: true },
   {
      icon: <Help fontSize="small" />,
      textKey: "help_and_support",
      url: "/help-support",
   },
   {
      icon: <Logout fontSize="small" />,
      textKey: "logout",
   },
];
