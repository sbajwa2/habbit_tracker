import "./HabitList.css";

function HabitList() {
  const habits = [
    { id: 1, name: "Drink 5 glasses of Water" },
    { id: 2, name: "Read 10 pages of a book a day" },
    { id: 3, name: "Walk atleast 10k steps a day" },
    { id: 4, name: "reduce screentime on phone" },
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
