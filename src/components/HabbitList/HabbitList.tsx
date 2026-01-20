import "./HabbitList.css";

function HabitList() {
  const habits = [
    { id: 1, name: "Drink Water" },
    { id: 2, name: "Exercise" },
    { id: 3, name: "Read 10 Pages" },
  ];

  return (
    <section className="habit-list">
      <h2>My Habits</h2>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            <span>{habit.name}</span>
            <button className="remove-btn" type="button">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="add-habit">
        <button className="add-btn" type="button">
          Add Habit
        </button>
      </div>
    </section>
  );
}

export default HabitList;
