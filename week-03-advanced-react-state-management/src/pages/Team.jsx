import { useTeam } from "../api/tasksApi";

export default function Team() {
  const { data: team, isLoading, error } = useTeam();

  if (isLoading) return <p style={{ padding: "20px" }}>Loading team...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error loading team.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team</h1>
      {team.map((member) => (
        <div key={member.id} style={{ padding: "8px", borderBottom: "1px solid #444" }}>
          {member.name}
        </div>
      ))}
    </div>
  );
}
