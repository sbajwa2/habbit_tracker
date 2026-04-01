import "./ReminderList.css";
import type { Reminder } from "../../types/reminder";

export type ReminderListProps = {
  reminders: Reminder[];
  onRemove: (id: number) => void;
};

export default function ReminderList({ reminders, onRemove }: ReminderListProps) {
  return (
    <section className="reminder-list">
      <h2>Reminders</h2>

      {reminders.length === 0 ? (
        <p>No reminders left </p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item">
              <div>
                <span className="reminder-text">{reminder.title}</span>
                <span className="reminder-time">{reminder.time}</span>
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemove(reminder.id)}
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