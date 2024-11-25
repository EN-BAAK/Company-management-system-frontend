# Company Management System Dashboard

### Coded and Designed by: [EN-BAAK (GitHub)](https://github.com/EN-BAAK)

The **Company Management System Dashboard** is a mobile-focused Progressive Web App (PWA) developed using modern web technologies, including `TypeScript`, `React`, and `SASS`. It provides a user-friendly interface for managing workers, shifts, and companies efficiently. The system also features role-based access with distinct functionalities for admin and worker users.

---

## Key Features

- **Mobile-First Design**: Optimized for mobile screens.
- **Progressive Web App (PWA)**: Installable and works offline.
- **Role-Based Access**:
  - **Admin**: Full access to manage workers, companies, and shifts.
  - **Worker**: Limited to viewing assigned shifts.
- **Reusable Components**: Clean, modular, and maintainable codebase.
- **Localization Support**: Implemented with `i18next`.
- **Smooth User Experience**: Form validation with `Formik` and `Yup`, responsive design with `Bootstrap` and `React-Bootstrap`.

---

## Technologies Used

- **Frontend Framework**: React (TypeScript)
- **State Management**: React Query
- **Routing**: React Router DOM
- **Form Handling**: Formik & Yup (Validation)
- **UI Framework**: Bootstrap & React-Bootstrap
- **Styling**: SASS
- **PWA Capabilities**: Service Workers
- **ES6 Standards**: For modern JavaScript syntax

---

## Screens and Features

### 1. **Login Page**

- Login using **phone number** and **password**.
- Includes a log for debugging and a clean form UI.

---

### 2. **Shifts Page**

#### Worker Role

- **Shift Cards**: Displays shift information in a concise card format.

  - **Fields**:
    - `Date of Shift`
    - `Worker Name` (if exists)
    - `WhatsApp` and `Telephone` icons (if worker exists)
    - `Company Name`
    - `Location` (if exists)
    - `Start Hour`, `End Hour`, and `Work Hour` (calculated as `endHour - startHour`)
  - **Truncated Fields**: Fields with more than 10 characters display the first 10 followed by `...`. Full details are available via the **Info Icon**.
  - **Interactive Icons**:
    - WhatsApp Icon: Opens a chat with the worker.
    - Telephone Icon: Directly calls the worker.
  - **Info Popup**: Clicking the Info Icon displays a popup with complete details of the shift.

- **Top Bar**: Displays the worker's name and a logout button.

---

#### Admin Role

- **Shift Cards**: Similar to worker role with additional functionality:
  - **Edit Icon**: Opens a form to edit the shift details.
  - **Delete Icon**: Removes a shift after confirmation.
- **Add New Shift**:
  - A popup form with:
    - Title
    - Close Icon
    - Fields for adding a shift (`date`, `workerId`, `companyId`, `location`, etc.)
- **Search Bar**: Search for shifts based on keywords.
- **Filter Option**: Opens a window to apply specific filters.
- **Bottom Navigation**: Navigation to the **Shifts** page and **Settings** page.

---

### 3. **Settings Page (Admin Only)**

- **Logo**: Displays the system logo.
- **Navigation**: Links to:
  - Workers Page
  - Companies Page
  - Admin Settings Page
- **Logout Button**: Allows admin to log out of the system.

---

### 4. **Workers Page**

- **Header**:
  - Title
  - Go Back Button
- **Worker Cards**:
  - Displays:
    - Worker Name
    - Delete Icon
    - Edit Icon
    - Phone Icon: Calls the worker directly.
    - WhatsApp Icon: Opens a chat with the worker.
  - **Add New Worker**: Opens a popup form with:
    - Title
    - Close Icon
    - Form fields for worker details (`fullName`, `phone`, `password`, etc.)

---

### 5. **Companies Page**

- Similar to **Workers Page**, but:
  - Does not include the WhatsApp icon.

---

### 6. **Admin Settings Page**

- **Header**: Title and Go Back Button.
- **Forms**:
  1. Edit Full Name
  2. Edit Password
  3. Edit Phone Number

---

### Common Features

1. **Delete Confirmation**:
   - Clicking a delete icon displays a warning box to confirm or cancel the action.
2. **Toasts**:
   - **Success**: Green toast for successful operations.
   - **Error**: Red toast for failed operations.
3. **Clean Code**:
   - Reusable components for consistency and maintainability.

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/EN-BAAK/company-management-system-dashboard.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the .env file for database and environment settings:

- VITE_API_BASE_URL

4. Backend Integration:
   The dashboard communicates with the [Company Management System Server](https://github.com/EN-BAAK/company-management-system-server). Ensure the backend is set up and running before using the dashboard.
