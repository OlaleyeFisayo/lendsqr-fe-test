import "./user-detail-section.scss";

export type UserDetailEntry = {
  sub: string;
  title: string;
};

type UserDetailSectionProps = {
  entries: UserDetailEntry[];
  header: string;
};

export default function UserDetailSection({
  entries,
  header,
}: UserDetailSectionProps) {
  return (
    <section className="user-detail-section">
      <h3>{header}</h3>
      <dl>
        {entries.map(entry => (
          <div key={`${header}-${entry.title}-${entry.sub}`}>
            <dt>{entry.title}</dt>
            <dd>{entry.sub}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
