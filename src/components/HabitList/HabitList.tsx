import type { Habit } from "../../layout/Layout";
import "./HabitList.css";

interface Props {
  habits: Habit[];
  setHabits: Function;
}

function HabitList({ habits, setHabits }: Props) {
  const removeHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li key={habit.id} className="habit-item">
          {habit.name}
          <button
            className="remove-btn"
            onClick={() => removeHabit(habit.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
