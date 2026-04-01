import ReminderForm from "../components/ReminderForm/ReminderForm";
import ReminderList from "../components/ReminderList/ReminderList";
import { useReminders } from "../hooks/useReminders";

export default function ReminderPage() {
  const { reminders, error, addReminder, removeReminder } = useReminders();

  return (
    <main>
      <h1>Reminders</h1>
      {error && <p>{error}</p>}
      <ReminderForm onAdd={addReminder} />
      <ReminderList reminders={reminders} onRemove={removeReminder} />
    </main>
  );
}