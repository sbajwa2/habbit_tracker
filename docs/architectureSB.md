# Architecture – NK

## Hook: useHabits

**What does it do?**  
`useHabits` exposes the current list of habits, a list of the top two habits, and actions to add, toggle, and remove habits. It is used by `HomePage` and `HabitPage` to connect UI components to the habit domain.

**How is logic separated?**  
The hook only manages UI-facing state and calls into `HabitService` for business rules. It does not read or write data directly; that concern is delegated to the service and repository.

**Where is it used?**  
- `HabitPage` uses `useHabits` to show and modify the full list and top two habits.  
- `HomePage` uses `useHabits` to display how many habits are being tracked.

---

## Service: HabitService

**What does it do?**  
`HabitService` encapsulates business rules around habits, such as validating names when creating a habit, toggling completion, and selecting the top two habits from the repository.

**How is logic separated?**  
It receives a `HabitRepository` in its constructor and delegates all data access to it. This keeps persistence concerns out of the service and leaves presentation concerns to the React components and hooks.

**Where is it used?**  
`HabitService` is used inside `useHabits`. When components call `addHabit`, `toggleHabit`, or `removeHabit` from the hook, those calls are implemented by the service.

---

## Repository: HabitRepository

**What does it do?**  
`HabitRepository` provides CRUD operations (`getAll`, `add`, `update`, `delete`) over the `Habit` resource. Currently it uses in-memory test data defined in `habitTestData`.

**How is logic separated?**  
It is responsible only for data persistence, not for business rules or UI. It does not know about React or any habit-specific rules; it simply stores, updates, and returns `Habit` objects.

**Where is it used?**  
`HabitRepository` is injected into `HabitService`, which uses it for all habit data access. No component or hook talks directly to the repository.
