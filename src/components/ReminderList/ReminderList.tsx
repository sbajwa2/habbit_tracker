import "./ReminderList.css";
 
function ReminderList() {
  const reminders = [
    { id: 1, text: "Send mail to manager", time: "9:30 AM" },
    { id: 1, text: "Pick up Gurshan from school", time: "3:45 PM" },
    { id: 2, text: "Buy eggs from walmart", time: "6:00 PM" },
    { id: 1, text: "Submit Comp-4002 Assignemnt", time: "11:30 PM" },
  ];
 
  return (
<section className="reminder-list">
<h2>Reminders</h2>
 
      <ul>
        {reminders.map((reminder) => (
<li key={reminder.id} className="reminder-item">
<div>
<span className="reminder-text">{reminder.text}</span>
<span className="reminder-time">{reminder.time}</span>
</div>
 
            <button type="button" className="remove-btn">
              Remove
</button>
</li>
        ))}
</ul>
</section>
  );
}
 
export default ReminderList;