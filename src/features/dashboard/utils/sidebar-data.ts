import auditLogsIcon from "../assets/audit-logs.svg";
import dashboardIcon from "../assets/dashboard.svg";
import decisionModelIcon from "../assets/decision-model.svg";
import feesAndChargesIcon from "../assets/fees-and-charges.svg";
import feesAndPricingIcon from "../assets/fees-and-pricing.svg";
import guarantorIcon from "../assets/guarantor.svg";
import karmaIcon from "../assets/karma.svg";
import loanRequestsIcon from "../assets/loan-requests.svg";
import loansIcon from "../assets/loans.svg";
import organizationIcon from "../assets/organization.svg";
import preferenceIcon from "../assets/preference.svg";
import reportsIcon from "../assets/reports.svg";
import savingProductIcon from "../assets/saving-product.svg";
import savingsIcon from "../assets/savings.svg";
import serviceAccountIcon from "../assets/service-account.svg";
import servicesIcon from "../assets/services.svg";
import settlementsIcon from "../assets/settlements.svg";
import transactionsIcon from "../assets/transactions.svg";
import usersIcon from "../assets/users.svg";
import whitelistIcon from "../assets/whitelist.svg";

type SidebarDataType = {
  title: string;
  children: {
    label: string;
    icon: string;
    href?: string;
  }[];
};

export const SIDEBAR_DATA: SidebarDataType[] = [
  {
    title: "",
    children: [
      {
        label: "Dashboard",
        icon: dashboardIcon,
      },
    ],
  },
  {
    title: "Customers",
    children: [
      {
        label: "Users",
        icon: usersIcon,
        href: "/users",
      },
      {
        label: "Guarantors",
        icon: guarantorIcon,
      },
      {
        label: "Loans",
        icon: loansIcon,
      },
      {
        label: "Decision Models",
        icon: decisionModelIcon,
      },
      {
        label: "Savings",
        icon: savingsIcon,
      },
      {
        label: "Loan Requests",
        icon: loanRequestsIcon,
      },
      {
        label: "Whitelist",
        icon: whitelistIcon,
      },
      {
        label: "Karma",
        icon: karmaIcon,
      },
    ],
  },
  {
    title: "Businesses",
    children: [
      {
        label: "Organization",
        icon: organizationIcon,
      },
      {
        label: "Loan Products",
        icon: loanRequestsIcon,
      },
      {
        label: "Savings Products",
        icon: savingProductIcon,
      },
      {
        label: "Fees and Charges",
        icon: feesAndChargesIcon,
      },
      {
        label: "Transactions",
        icon: transactionsIcon,
      },
      {
        label: "Services",
        icon: servicesIcon,
      },
      {
        label: "Service Account",
        icon: serviceAccountIcon,
      },
      {
        label: "Settlements",
        icon: settlementsIcon,
      },
      {
        label: "Reports",
        icon: reportsIcon,
      },
    ],
  },
  {
    title: "Settings",
    children: [
      {
        label: "Preferences",
        icon: preferenceIcon,
      },
      {
        label: "Fees and Pricing",
        icon: feesAndPricingIcon,
      },
      {
        label: "Audit Logs",
        icon: auditLogsIcon,
      },
    ],
  },
];
