import { useState } from "react";
import type { Reminder } from "../../types/reminder";
import "./ReminderForm.css";

type ReminderFormProps = {
  onAdd: (reminder: Reminder) => void;
};

export default function ReminderForm({ onAdd }: ReminderFormProps) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanText = text.trim();
    if (!cleanText) {
      setError("Reminder text cannot be empty.");
      return;
    }

    onAdd({
      id: Date.now(),
      text: cleanText,
      time: time.trim() || "Anytime",
    });

    setText("");
    setTime("");
    setError("");
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="reminder-form-row">
        <input
          className="reminder-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter reminder..."
        />

        <input
          className="reminder-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time (e.g. 9:30 AM)"
        />

        <button className="add-btn" type="submit">
          Add
        </button>
      </div>

      {error && <p className="reminder-error">{error}</p>}
    </form>
  );
}