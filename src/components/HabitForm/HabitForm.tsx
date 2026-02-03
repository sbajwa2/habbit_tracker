import { useState } from "react";
import type { Habit } from "../../layout/Layout";
import "./HabitForm.css";

interface Props {
  habits: Habit[];
  setHabits: Function;
}

function HabitForm({ habits, setHabits }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setHabits([
      ...habits,
      { id: Date.now(), name: input.trim() },
    ]);

    setInput("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a habit"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}

export default HabitForm;
