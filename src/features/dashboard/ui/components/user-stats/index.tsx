import statActiveUserIcon from "../../../assets/stat-active-user.svg";
import statUserWithSavingsIcon from "../../../assets/stat-user-with-savings.svg";
import statUserIcon from "../../../assets/stat-user.svg";
import statUsersWithLoansIcon from "../../../assets/stat-users-with-loans.svg";
import "./user-stats.scss";

const userStats = [
  {
    icon: statUserIcon,
    label: "Users",
    value: "2,453",
    tone: "pink",
  },
  {
    icon: statActiveUserIcon,
    label: "Active Users",
    value: "2,453",
    tone: "purple",
  },
  {
    icon: statUsersWithLoansIcon,
    label: "Users with Loans",
    value: "12,453",
    tone: "orange",
  },
  {
    icon: statUserWithSavingsIcon,
    label: "Users with Savings",
    value: "102,453",
    tone: "rose",
  },
];

export default function UserStats() {
  return (
    <section
      className="user-stats"
      aria-label="User statistics"
    >
      {userStats.map(stat => (
        <article
          className="user-stat-card"
          key={stat.label}
        >
          <span className={`user-stat-icon user-stat-icon--${stat.tone}`}>
            <img
              src={stat.icon}
              alt={stat.label}
              aria-hidden="true"
            />
          </span>
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
        </article>
      ))}
    </section>
  );
}
