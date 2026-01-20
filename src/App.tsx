import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HabitList from "./components/HabbitList/HabbitList";

function App() {
  return (
    <>
      <Header title="Habit Tracker" />

      <main>
        <div className="app-container">
          <HabitList />
        </div>
      </main>

      <Footer members={["Smile", "Navpreet Kaur"]} />
    </>
  );
}

export default App;


