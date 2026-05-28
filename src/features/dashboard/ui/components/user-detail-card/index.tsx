import { Icon } from "@iconify/react";
import Tab from "@/shared/ui/tab";
import "./user-detail-card.scss";

const userDetailTabs = [
  {
    label: "General Details",
    value: "general-details",
  },
  {
    label: "Documents",
    value: "documents",
  },
  {
    label: "Bank Details",
    value: "bank-details",
  },
  {
    label: "Loans",
    value: "loans",
  },
  {
    label: "Savings",
    value: "savings",
  },
  {
    label: "App and System",
    value: "app-and-system",
  },
];

type UserDetailCardProps = {
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  fullName: string;
  tier: number;
  userCode: string;
};

export default function UserDetailCard({
  accountBalance,
  accountNumber,
  bankName,
  fullName,
  tier,
  userCode,
}: UserDetailCardProps) {
  return (
    <section className="user-detail-card">
      <div className="user-detail-card-summary">
        <div className="user-detail-avatar">
          <Icon
            icon="tabler:user"
            aria-hidden="true"
          />
        </div>
        <div className="user-detail-identity">
          <h2>{fullName}</h2>
          <p>{userCode}</p>
        </div>
        <div className="user-detail-tier">
          <p>User's Tier</p>
          <div aria-label={`${tier} user tier`}>
            {Array.from({ length: 3 }, (_, index) => (
              <Icon
                icon={index < tier ? "tabler:star-filled" : "tabler:star"}
                aria-hidden="true"
                key={`user-tier-star-${index}`}
              />
            ))}
          </div>
        </div>
        <div className="user-detail-bank">
          <strong>{accountBalance}</strong>
          <p>
            {accountNumber}
            /
            {bankName}
          </p>
        </div>
      </div>
      <Tab tabs={userDetailTabs} />
    </section>
  );
}
