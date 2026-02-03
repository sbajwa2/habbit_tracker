import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import HabitPage from "./pages/HabitsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="habits" element={<HabitPage />} />
      </Route>
    </Routes>
  );
}

export default App;
