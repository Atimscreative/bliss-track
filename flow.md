# BlissTrack - Business Management Web App

## Business Name: Oluwaseyi Bliss Beddings

## Problem Statement

### Original:
"I want to build a web app for my mom to help her small-scale business in order to track her expenses for bedsheet material, packaging material, transportation. Tracking pricing of different sizes, sales, expenses, profit, loss, quantity of bedsheets in stock, quantity of packaging materials left, etc."

### Modified:
"Develop a web application for my small-scale bedsheet business. The application should enable efficient management and tracking of key business operations, including:

- **Expense Tracking:** Recording and categorizing expenses related to bedsheet materials, packaging, and transportation.
- **Inventory Management:** Monitoring the quantity of bedsheets in stock and the remaining packaging materials.
- **Pricing Management:** Managing the pricing of bedsheets based on different sizes.
- **Sales Tracking:** Recording and tracking sales transactions.
- **Financial Analysis:** Calculating profit and loss per production cycle, providing insights into the financial performance of the business."

## Considerations
1. The business owner is not highly tech-savvy and prefers a **warm, cool color theme** for better readability.
2. Needs a **simple and intuitive user interface** for ease of use.

---

## **User Flow Breakdown**

### 1. Authentication & Onboarding
- Simple login (email/password or magic link for ease of use).
- Quick tutorial on how to use the app (optional).

### 2. Dashboard (Home)
- Overview of **total sales, expenses, stock, and profit/loss**.

### 3. Expense Management
- Add new expenses (bedsheet materials, packaging, transportation).
- View categorized expense breakdown.

### 4. Inventory Management
- Add/edit available bedsheets and packaging materials.
- View stock levels with low-stock alerts.

### 5. Pricing Management
- Set/update prices for different sizes of bedsheets.

### 6. Sales Tracking
- Record new sales.
- View past sales with filters (by date, product, etc.).

### 7. Financial Analysis
- Profit/loss report per production cycle.
- Visual charts for financial insights.

---

## **MVP Breakdown**

### **MVP 1 - Core Functionality**
- Authentication (login/logout).
- Dashboard with key stats (**sales, expenses, inventory**).
- Add and view expenses.
- Record and view sales.

### **MVP 2 - Enhanced Management**
- Inventory tracking with alerts.
- Pricing management.
- Basic financial reports.

### **MVP 3 - Refinements**
- UI/UX improvements based on user feedback.
- More detailed financial analysis.
- Possible automation (e.g., auto-price adjustments based on cost).

---

## **UI Layouts (Wireframe Plan)**

### **1. Login/Signup Screen**
- Simple form with large buttons.

### **2. Dashboard**
- Clear, card-based UI showing key stats.
- Quick access buttons for adding **sales, expenses, inventory updates**.

### **3. Expense Page**
- Simple form for adding expenses with categories.
- List of recorded expenses with filters.

### **4. Inventory Page**
- List of available stock with **"Add New" button**.
- Low-stock warnings.

### **5. Sales Page**
- Form to add new sales entry.
- List of sales records.

### **6. Financial Reports**
- Simple **chart-based visualization** for profit/loss.
- Summary of earnings vs. expenses.

---

## **Color Theme Choices**

### **Option 1: Soft & Cozy (Warm Cool Blend)**
- **Primary:** Soft Teal (#5AB1BB) – Cool and calming.
- **Secondary:** Warm Beige (#F4E1D2) – Gentle and inviting.
- **Accent:** Deep Navy (#2A3D66) – Adds contrast and readability.

### **Option 2: Elegant & Modern**
- **Primary:** Muted Lavender (#A89CC8) – Soft and soothing.
- **Secondary:** Warm Cream (#F6E7D8) – Light and easy on the eyes.
- **Accent:** Charcoal Gray (#3A3A3A) – For sharp text readability.

### **Option 3: Natural & Inviting**
- **Primary:** Warm Sage Green (#A7C4A0) – Natural and refreshing.
- **Secondary:** Light Peach (#F8D9C6) – Soft and warm.
- **Accent:** Dark Brown (#4B3B2E) – Adds a grounded contrast.

---

## **Color Theme Application**

### **1. Soft & Cozy (Warm Cool Blend)**
- **Primary (Soft Teal - #5AB1BB):** Used for the header, navigation bar, and main buttons to give a calming, professional look.
- **Secondary (Warm Beige - #F4E1D2):** Applied to the background for a soft, warm feel that is easy on the eyes.
- **Accent (Deep Navy - #2A3D66):** Used for text and icons to provide strong contrast and readability.

**Example:**
- **Dashboard:** Teal header with beige background.
- **Buttons:** Teal with navy text/icons.
- **Alerts (e.g., low stock):** A deeper teal with white text.

### **2. Elegant & Modern**
- **Primary (Muted Lavender - #A89CC8):** Used for the header, sidebar, and call-to-action buttons for a subtle, elegant feel.
- **Secondary (Warm Cream - #F6E7D8):** Background color to create a soft, neutral space that doesn’t strain the eyes.
- **Accent (Charcoal Gray - #3A3A3A):** Text and UI elements for high contrast and readability.

**Example:**
- **Expense Management:** Lavender headers with cream background.
- **Sales Entry Form:** Cream-colored input fields with dark gray labels.
- **Buttons:** Lavender with gray text for contrast.

### **3. Natural & Inviting**
- **Primary (Warm Sage Green - #A7C4A0):** Used for the navigation bar, key sections, and buttons for a natural and relaxing vibe.
- **Secondary (Light Peach - #F8D9C6):** Background color to complement the green, keeping it fresh yet soft.
- **Accent (Dark Brown - #4B3B2E):** Used for text, icons, and section dividers for strong readability and a grounded feel.

**Example:**
- **Inventory Management:** Green section headers with peach background.
- **Sales Tracking:** Green buttons with brown text/icons.
- **Alerts (e.g., low stock warning):** Dark brown text on a soft peach card.

---

This document provides a structured plan for the **BlissTrack** web application, ensuring a simple, intuitive, and visually appealing experience for the business owner. 🚀

Primary Color:
Soft Blue: #4B89DC (This will be the main color used for primary actions like buttons, links, and important elements).

Secondary Color:
Warm Light Beige: #F4D3B3 (This will be used for backgrounds to create a soft, warm atmosphere).

Text Colors:
Primary Text (Dark): #333333 (Dark gray for normal text, providing high contrast and readability).

Secondary Text (Muted): #666666 (A medium gray for secondary text, such as placeholders or less important info).

Background Colors:
Main Background: #FFFFFF (White, for most backgrounds to keep the design clean and bright).

Card Background: #F9F9F9 (Light gray for cards or containers, ensuring they stand out from the main background).

Accent Colors:
Success: #A3E4B3 (A soft green for success messages or confirmations).

Alert/Error: #F7A3A3 (A soft red for warnings or error messages)





// BlissTrack custom colors
				lavender: {
					light: '#E5DEFF',
					DEFAULT: '#9b87f5',
					dark: '#7E69AB'
				},
				bliss: {
					blue: '#D3E4FD',
					cream: '#FEF7CD',
					peach: '#FDE1D3',
					pink: '#FFDEE2',
					green: '#F2FCE2',
				},