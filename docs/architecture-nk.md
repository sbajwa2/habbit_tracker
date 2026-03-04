# Architecture Documentation – Navpreet Kaur

## Overview

For Sprint 3, the reminder feature was refactored using the **hook–service–repository architecture pattern**.  
This structure separates presentation logic, business logic, and data access to improve maintainability and make the code easier to debug and extend in the future.

The reminder system now consists of three main layers:

- **Repository** → handles data access
- **Service** → handles business logic
- **Hook** → handles presentation logic for components

---

# Repository

## ReminderRepository

### What does this repository do?

The ReminderRepository is responsible for handling all data access related to reminders.  
It provides CRUD-style methods for retrieving, adding, and removing reminders.  
For Sprint 3, it uses **test data** stored in an array of reminder objects.

### Why is this logic placed in a repository?

The repository layer separates **data access logic** from the rest of the application.  
Instead of components directly interacting with data sources, they interact with the repository.  
This makes it easier to replace the test data with a real API or database in the future without modifying the components.

### Where is it used?

The ReminderRepository is used inside the **ReminderService**, which calls repository methods to retrieve and modify reminder data.

---

# Service

## ReminderService

### What does this service do?

The ReminderService contains the **business logic** for managing reminders.  
It determines how reminders should be added, removed, or validated before interacting with the repository.

### Why is this logic placed in a service?

Business logic should not exist in UI components because it makes components difficult to maintain.  
The service layer ensures that any rules related to reminders (such as formatting or validation) are centralized and reusable.

### Where is it used?

The ReminderService is used inside the **useReminders custom hook** to perform reminder operations before updating the UI.

---

# Hook

## useReminders

### What does this hook do?

The useReminders hook manages the **presentation logic and state management** for reminders.  
It retrieves reminder data from the ReminderService and provides functions to add and remove reminders.

### Why is this logic placed in a hook?

Hooks allow reusable logic to be shared between components.  
By placing the reminder state logic inside a custom hook, multiple components can access reminder functionality without duplicating code.

### Where is it used?

The useReminders hook is used inside the **ReminderPage component**.  
The ReminderPage then passes reminder data and functions to the ReminderForm and ReminderList components.

---

# Architecture Flow

The flow of data in the reminder feature follows this structure:
