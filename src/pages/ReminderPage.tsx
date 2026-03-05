import ReminderForm from "../components/ReminderForm/ReminderForm";
import ReminderList from "../components/ReminderList/ReminderList";
import { useReminders } from "../hooks/useReminders";

export default function ReminderPage() {
  const { reminders, addReminder, removeReminder } = useReminders();

  return (
    <main>
      <h1>Reminders</h1>
      <ReminderForm onAdd={addReminder} />
      <ReminderList reminders={reminders} onRemove={removeReminder} />
    </main>
  );
}