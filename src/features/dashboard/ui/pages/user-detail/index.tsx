import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Button from "@/shared/ui/button";
import BlacklistUserDialog from "../../components/blacklist-user-dialog";
import UserDetailCard from "../../components/user-detail-card";
import UserDetailSection from "../../components/user-detail-section";
import "./user-detail.scss";

const userDetailSections = [
  {
    id: "personal-information",
    header: "Personal Information",
    entries: [
      {
        title: "Full Name",
        sub: "Grace Effiom",
      },
      {
        title: "Phone Number",
        sub: "07060780922",
      },
      {
        title: "Email Address",
        sub: "grace@gmail.com",
      },
      {
        title: "BVN",
        sub: "07060780922",
      },
      {
        title: "Gender",
        sub: "Female",
      },
      {
        title: "Marital Status",
        sub: "Single",
      },
      {
        title: "Children",
        sub: "None",
      },
      {
        title: "Type of Residence",
        sub: "Parent's Apartment",
      },
    ],
  },
  {
    id: "education-and-employment",
    header: "Education and Employment",
    entries: [
      {
        title: "Level of Education",
        sub: "B.Sc",
      },
      {
        title: "Employment Status",
        sub: "Employed",
      },
      {
        title: "Sector of Employment",
        sub: "FinTech",
      },
      {
        title: "Duration of Employment",
        sub: "2 years",
      },
      {
        title: "Office Email",
        sub: "grace@lendsqr.com",
      },
      {
        title: "Monthly Income",
        sub: "N200,000.00- N400,000.00",
      },
      {
        title: "Loan Repayment",
        sub: "40,000",
      },
    ],
  },
  {
    id: "socials",
    header: "Socials",
    entries: [
      {
        title: "Twitter",
        sub: "@grace_effiom",
      },
      {
        title: "Facebook",
        sub: "Grace Effiom",
      },
      {
        title: "Instagram",
        sub: "@grace_effiom",
      },
    ],
  },
  {
    id: "guarantor-primary",
    header: "Guarantor",
    entries: [
      {
        title: "Full Name",
        sub: "Debby Ogana",
      },
      {
        title: "Phone Number",
        sub: "07060780922",
      },
      {
        title: "Email Address",
        sub: "debby@gmail.com",
      },
      {
        title: "Relationship",
        sub: "Sister",
      },
    ],
  },
];

export default function UserDetail() {
  return (
    <section id="user-detail-page">
      <Link
        className="user-detail-back-link"
        to="/users"
      >
        <Icon
          icon="tabler:arrow-left"
          aria-hidden="true"
        />
        <span>Back to Users</span>
      </Link>
      <div className="user-detail-header">
        <h1>User Details</h1>
        <div className="user-detail-actions">
          <BlacklistUserDialog
            userName="Grace Effiom"
            trigger={<Button variant="danger-outline">Blacklist User</Button>}
          />
          <Button variant="secondary-outline">Activate User</Button>
        </div>
      </div>
      <UserDetailCard
        accountBalance="N200,000.00"
        accountNumber="9912345678"
        bankName="Providus Bank"
        fullName="Grace Effiom"
        tier="1"
        userCode="LSQFf587g90"
      />
      <div className="user-detail-info-card">
        {userDetailSections.map(section => (
          <UserDetailSection
            entries={section.entries}
            header={section.header}
            key={section.id}
          />
        ))}
      </div>
    </section>
  );
}
