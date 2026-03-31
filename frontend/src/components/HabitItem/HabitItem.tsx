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
  toggleHabit: (id: number) => Promise<void>;
  removeHabit: (id: number) => Promise<void>;
}

function HabitItem(props: Props) {
  const { habit, toggleHabit, removeHabit } = props;

  const handleToggle = () => {
    void toggleHabit(habit.id);
  };

  const handleRemove = () => {
    void removeHabit(habit.id);
  };

  return (
    <li className="habit-item">
      <input
        type="checkbox"
        checked={habit.completed}
        onChange={handleToggle}
      />

      <span className={habit.completed ? "completed" : ""}>
        {habit.name}
      </span>

      <button
        onClick={handleRemove}
      >
        Remove
      </button>
    </li>
  );
}

export default HabitItem;