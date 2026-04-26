import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import ReminderForm from "../components/ReminderForm/ReminderForm";
import ReminderList from "../components/ReminderList/ReminderList";
import { useReminders } from "../hooks/useReminders";

export default function ReminderPage() {
  const { reminders, error, addReminder, removeReminder, isLoaded } =
    useReminders();

  return (
    <main>
      <h1>Reminders</h1>
      {!isLoaded && <p>Loading session...</p>}

      <SignedOut>
        <p>Sign in to manage your personal reminders.</p>
        <SignInButton mode="modal">
          <button type="button">Sign In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      {error && <p>{error}</p>}

      <SignedIn>
        <ReminderForm onAdd={addReminder} />
        <ReminderList reminders={reminders} onRemove={removeReminder} />
      </SignedIn>
    </main>
  );
}