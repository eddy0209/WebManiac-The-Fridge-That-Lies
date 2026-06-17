# 🧊 FridgeTruth

<div align="center">

### **Track What's Really Left.**

A smart shared inventory dashboard that keeps grocery tracking honest, transparent, and actionable.

Built for the Mini Hackathon 🚀

</div>

---

## 🌟 The Problem

Most shared grocery tracking apps fail when inventory becomes critical.

Items disappear when they reach zero quantity, stock levels become misleading, and users lose visibility into what actually needs to be purchased.

Imagine finishing the last yogurt in the fridge and the system simply removing it from the list.

The result?

❌ Forgotten purchases
❌ Inaccurate inventory records
❌ Poor visibility for roommates and families

---

## 💡 Our Solution

**FridgeTruth** introduces the concept of **Inventory Honesty**.

Instead of hiding depleted items, FridgeTruth keeps inventory transparent and meaningful.

### Key Principles

* Empty items remain visible
* Low-stock warnings appear exactly at the last remaining item
* Restocking requires explicit user action
* Inventory health is visible at a glance
* Shared inventory stays accurate over time

---

## ✨ Features

### 📦 Smart Inventory Management

Add and manage grocery items with real-time quantity tracking.

### ⚠️ Low Stock Detection

Instant alerts when only one item remains.

### 🚫 Empty Item Visibility

Items stay visible even at zero quantity, ensuring nothing gets forgotten.

### 🔄 Explicit Restocking

Inventory only recovers when users intentionally restock items.

### 📊 Inventory Health Dashboard

Visual representation of overall inventory status.

### 🟢 Dynamic System Status

Real-time inventory monitoring:

* 🟢 Inventory Healthy
* 🟡 Attention Needed
* 🔴 Critical Restock Required

### 💾 Persistent Storage

Powered by LocalStorage to preserve inventory across sessions.

---

## 🎯 Why FridgeTruth?

Traditional inventory systems focus on addition and removal.

FridgeTruth focuses on **inventory awareness**.

By preserving visibility of depleted items and providing actionable insights, users always know:

✔ What they have
✔ What is running low
✔ What needs replenishment

---

## 🏗️ Tech Stack

| Category   | Technology           |
| ---------- | -------------------- |
| Frontend   | React                |
| Language   | JavaScript (ES6+)    |
| Storage    | Browser LocalStorage |
| Build Tool | Vite                 |
| Styling    | CSS                  |

---

## 📂 Project Structure

```text
src/

├── components/
│   ├── AddItemForm.jsx
│   ├── InventoryItem.jsx
│   ├── StatCard.jsx
│   └── HealthCard.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

---

## 🧪 Demo Scenario

### Initial Inventory

```text
Milk 2
Eggs 1
Bread 0
```

### User Actions

1. Consume Milk → Quantity becomes 1
2. Low Stock Warning appears
3. Consume Milk again → Quantity becomes 0
4. Item remains visible
5. Restock Milk → Quantity becomes 5
6. Inventory Health improves automatically

---

## 📈 Future Scope

* Multi-user collaboration
* Shared household synchronization
* Smart grocery recommendations
* Shopping list generation
* Mobile application support
* Notification system

---

## 👨‍💻 Team

Built during the Mini Hackathon.

### Project Name

**FridgeTruth**

### Tagline

**"Track What's Really Left."**

---

<div align="center">

### 🧊 FridgeTruth

Making shared inventory honest, one item at a time.

</div>
