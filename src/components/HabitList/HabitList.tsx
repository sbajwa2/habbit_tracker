import type { Habit } from "../../types/Habit";
import "./HabitList.css";

interface Props {
  habits: Habit[];
  toggleHabit: (id: string) => void;
  removeHabit: (id: string) => void;
}

function HabitList({ habits, toggleHabit, removeHabit }: Props) {
  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li key={habit.id} className="habit-item">

          <input
            type="checkbox"
            checked={habit.completed}
            onChange={() => toggleHabit(habit.id)}
          />

          <span className={habit.completed ? "completed" : ""}>
            {habit.name}
          </span>

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