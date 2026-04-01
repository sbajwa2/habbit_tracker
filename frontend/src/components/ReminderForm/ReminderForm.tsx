import { useState } from "react";
import "./ReminderForm.css";

type ReminderFormProps = {
  onAdd: (title: string, time: string) => Promise<void>;
};

export default function ReminderForm({ onAdd }: ReminderFormProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Reminder text cannot be empty.");
      return;
    }

    await onAdd(cleanTitle, time);

    setTitle("");
    setTime("");
    setError("");
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="reminder-form-row">
        <input
          className="reminder-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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