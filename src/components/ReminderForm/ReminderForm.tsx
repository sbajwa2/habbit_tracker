import { useState } from "react";
import type { Reminder } from "./../../pages/ReminderPage";
import "./ReminderForm.css";

type ReminderFormProps = {
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
};

export default function ReminderForm({ reminders, setReminders }: ReminderFormProps) {
  const [text, setText] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanText = text.trim();
    if (!cleanText) {
      setError("Reminder text cannot be empty.");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      text: cleanText,
      time: time.trim() || "Anytime",
    };

    setReminders([...reminders, newReminder]);
    setText("");
    setTime("");
    setError("");
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="reminder-form-row">
        <input
          className="reminder-input"
          type="text"
          placeholder="Enter reminder..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
        />

        <input
          className="reminder-input"
          type="text"
          placeholder="Time (e.g. 9:30 AM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="add-btn" type="submit">
          Add
        </button>
      </div>

      {error && <p className="reminder-error">{error}</p>}
    </form>
  );
}
