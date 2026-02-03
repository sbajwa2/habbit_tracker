import { useState } from "react";
import ReminderForm from "../components/ReminderForm/ReminderForm";
import ReminderList from "../components/ReminderList/ReminderList";
 
export interface Reminder {
  id: number;
  text: string;
  time: string;
}
 
function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
 
  return (
<section>
<h2>Reminders</h2>
 
      <ReminderForm
        reminders={reminders}
        setReminders={setReminders}
      />
 
      <ReminderList
        reminders={reminders}
        setReminders={setReminders}
      />
</section>
  );
}
 
export default RemindersPage;