import { useOutletContext } from "react-router-dom";
import type { Habit } from ".././layout/Layout";

function HomePage() {
  const { habits } = useOutletContext<{ habits: Habit[] }>();

  return (
    <section>
      <h2>Welcome to Habit Tracker</h2>
      <p>You are currently tracking {habits.length} habits.</p>
    </section>
  );
}

export default HomePage;
