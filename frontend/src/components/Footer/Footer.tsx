import "./Footer.css";

interface FooterProps {
  members: string[];
}

export default function Footer({ members }: FooterProps) {
  return (
    <footer className="app-footer">
      <p>Team Members:</p>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </footer>
  );
}
