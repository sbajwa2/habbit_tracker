import "./ReminderList.css";
import type { Reminder } from "./../../pages/ReminderPage";

type ReminderListProps = {
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
};

export default function ReminderList({ reminders, setReminders }: ReminderListProps) {
  const handleRemove = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="reminder-list">
      <h2>Reminders</h2>

      {reminders.length === 0 ? (
        <p>No reminders left</p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item">
              <div>
                <span className="reminder-text">{reminder.text}</span>
                <span className="reminder-time">{reminder.time}</span>
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemove(reminder.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
