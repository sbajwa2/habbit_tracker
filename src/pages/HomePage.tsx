import { useHabits } from "../hooks/useHabits";

function HomePage() {
  const { habits } = useHabits();

  return (
    <section>
      <h2>Welcome to Habit Tracker</h2>
      <p>You are currently tracking {habits.length} habits.</p>
    </section>
  );
}

export default HomePage;
