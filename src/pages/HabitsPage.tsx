import { useOutletContext } from "react-router-dom";
import type { Habit } from ".././layout/Layout";
import HabitForm from "../components/HabitForm/HabitForm";
import HabitList from "../components/HabitList/HabitList";

function HabitPage() {
  const { habits, setHabits } =
    useOutletContext<{ habits: Habit[]; setHabits: Function }>();

  return (
    <section>
      <h2>My Habits</h2>
      <HabitForm habits={habits} setHabits={setHabits} />
      <HabitList habits={habits} setHabits={setHabits} />
    </section>
  );
}

export default HabitPage;
