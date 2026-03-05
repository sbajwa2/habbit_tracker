import { useState } from "react";
import "./HabitForm.css";

interface Props {
  addHabit: (name: string) => void;
}

function HabitForm({ addHabit }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addHabit(input.trim());
    setInput("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
  className="habit-input"
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

<button type="submit" className="add-btn">
  Add
</button>
    </form>
  );
}

export default HabitForm;