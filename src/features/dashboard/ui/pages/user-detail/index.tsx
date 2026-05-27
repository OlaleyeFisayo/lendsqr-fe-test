import { Icon } from "@iconify/react";
import {
  Link,
  useParams,
} from "react-router";
import Button from "@/shared/ui/button";
import { getDashboardUserById } from "../../../utils/users-data";
import BlacklistUserDialog from "../../components/blacklist-user-dialog";
import UserDetailCard from "../../components/user-detail-card";
import UserDetailSection from "../../components/user-detail-section";
import "./user-detail.scss";

export default function UserDetail() {
  const { id } = useParams();
  const user = getDashboardUserById(id);

  if (!user) {
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
          <h1>User not found</h1>
        </div>
      </section>
    );
  }

  const userDetailSections = [
    {
      id: "personal-information",
      header: "Personal Information",
      entries: [
        {
          title: "Full Name",
          sub: user.personalInformation.fullName,
        },
        {
          title: "Phone Number",
          sub: user.personalInformation.phoneNumber,
        },
        {
          title: "Email Address",
          sub: user.personalInformation.emailAddress,
        },
        {
          title: "BVN",
          sub: user.personalInformation.bvn,
        },
        {
          title: "Gender",
          sub: user.personalInformation.gender,
        },
        {
          title: "Marital Status",
          sub: user.personalInformation.maritalStatus,
        },
        {
          title: "Children",
          sub: user.personalInformation.children,
        },
        {
          title: "Type of Residence",
          sub: user.personalInformation.typeOfResidence,
        },
      ],
    },
    {
      id: "education-and-employment",
      header: "Education and Employment",
      entries: [
        {
          title: "Level of Education",
          sub: user.educationAndEmployment.levelOfEducation,
        },
        {
          title: "Employment Status",
          sub: user.educationAndEmployment.employmentStatus,
        },
        {
          title: "Sector of Employment",
          sub: user.educationAndEmployment.sectorOfEmployment,
        },
        {
          title: "Duration of Employment",
          sub: user.educationAndEmployment.durationOfEmployment,
        },
        {
          title: "Office Email",
          sub: user.educationAndEmployment.officeEmail,
        },
        {
          title: "Monthly Income",
          sub: user.educationAndEmployment.monthlyIncome,
        },
        {
          title: "Loan Repayment",
          sub: user.educationAndEmployment.loanRepayment,
        },
      ],
    },
    {
      id: "socials",
      header: "Socials",
      entries: [
        {
          title: "Twitter",
          sub: user.socials.twitter,
        },
        {
          title: "Facebook",
          sub: user.socials.facebook,
        },
        {
          title: "Instagram",
          sub: user.socials.instagram,
        },
      ],
    },
    {
      id: "guarantor-primary",
      header: "Guarantor",
      entries: [
        {
          title: "Full Name",
          sub: user.guarantor.fullName,
        },
        {
          title: "Phone Number",
          sub: user.guarantor.phoneNumber,
        },
        {
          title: "Email Address",
          sub: user.guarantor.emailAddress,
        },
        {
          title: "Relationship",
          sub: user.guarantor.relationship,
        },
      ],
    },
  ];

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
            userName={user.fullName}
            trigger={<Button variant="danger-outline">Blacklist User</Button>}
          />
          <Button variant="secondary-outline">Activate User</Button>
        </div>
      </div>
      <UserDetailCard
        accountBalance={user.accountBalance}
        accountNumber={user.accountNumber}
        bankName={user.bankName}
        fullName={user.fullName}
        tier={String(user.tier)}
        userCode={user.userCode}
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
