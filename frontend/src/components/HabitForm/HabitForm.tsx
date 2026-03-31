import { useState } from "react";
import "./HabitForm.css";

interface Props {
  addHabit: (name: string) => Promise<void>;
}

function HabitForm({ addHabit }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addHabit(input.trim());
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