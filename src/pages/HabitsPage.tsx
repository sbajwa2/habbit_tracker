import HabitForm from "../components/HabitForm/HabitForm";
import HabitList from "../components/HabitList/HabitList";
import { useHabits } from "../hooks/useHabits";

function HabitPage() {
  const { habits, addHabit, toggleHabit, removeHabit } = useHabits();

  return (
    <section>
      <h2>My Habits</h2>
      <HabitForm addHabit={addHabit} />

      <HabitList
        habits={habits}
        toggleHabit={toggleHabit}
        removeHabit={removeHabit}
      />
    </section>
  );
}

export default HabitPage;