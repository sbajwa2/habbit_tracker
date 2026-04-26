import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import HabitPage from "./pages/HabitsPage";
import ReminderPage from "./pages/ReminderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="habits"
          element={
            <>
              <SignedIn>
                <HabitPage />
              </SignedIn>
              <SignedOut>
                <SignIn routing="hash" />
              </SignedOut>
            </>
          }
        />
        <Route path="reminders" element={<ReminderPage />} />
      </Route>
    </Routes>
  );
}

export default App;