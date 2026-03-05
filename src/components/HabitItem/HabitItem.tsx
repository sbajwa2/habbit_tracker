import type { Habit } from "../../types/Habit";
import "./HabitItem.css";

/*
HabitItem Component

This component represents a single habit item in the list.

It uses the toggleHabit function provided by the useHabits hook
to update the completion status of a habit.

The checkbox allows users to mark habits as completed or not completed.
*/

interface Props {
  habit: Habit;
  toggleHabit: (id: string) => void;
  removeHabit: (id: string) => void;
}

function HabitItem({ habit, toggleHabit, removeHabit }: Props) {
  return (
    <li className="habit-item">
      <input
        type="checkbox"
        checked={habit.completed}
        onChange={() => toggleHabit(habit.id)}
      />

      <span className={habit.completed ? "completed" : ""}>
        {habit.name}
      </span>

      <button onClick={() => removeHabit(habit.id)}>
        Remove
      </button>
    </li>
  );
}

export default HabitItem;