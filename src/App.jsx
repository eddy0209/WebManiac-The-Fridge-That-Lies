import AddItemForm from "./components/AddItemForm";
import StatCard from "./components/StatCard";
import InventoryItem from "./components/InventoryItem";
import HealthCard from "./components/HealthCard";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";
import RestockModal from "./components/RestockModal";
import ActivityFeed from "./components/ActivityFeed";
import HouseholdMembers from "./components/HouseholdMembers";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [items, setItems] = useLocalStorage("fridge-items", []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activities, setActivities] = useLocalStorage("activities", []);
  const [session, setSession] = useState(null);

  /* ── Sync to Supabase ── */
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function upsertItem(item) {
    const { error } = await supabase
      .from("inventory")
      .upsert(item);

    if (error) {
      console.error("Error upserting:", error);
    }
  }

  /* ── Sync Inventory to Supabase ── */
  useEffect(() => {
    if (!session?.user?.id) return;

    async function syncInventory() {

      items.forEach(upsertItem);

      const localIds = items.map(i => i.id);

      const { data: remoteItems } = await supabase
        .from("inventory")
        .select("id")
        .eq("user_id", session.user.id);

      if (!remoteItems) return;

      const remoteIds = remoteItems.map(r => r.id);

      const toDelete =
        remoteIds.filter(
          id => !localIds.includes(id)
        );

      for (const id of toDelete) {
        await supabase
          .from("inventory")
          .delete()
          .eq("id", id);
      }
    }

    syncInventory();

  }, [items, session]);

  const addActivity = (message) => {
    const activity = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setActivities((prev) => [
      activity,
      ...prev,
    ].slice(0, 15));
  };

  /* ── Business Logic (unchanged) ── */
  const addItem = (name, quantity) => {
    const newItem = { id: Date.now(), name, quantity };
    setItems([...items, newItem]);
    addActivity(
      `🛒 Added ${name} (${quantity})`
    );
  };

  const consumeItem = (id) => {
    const currentItem = items.find(i => i.id === id);
    const updatedItems = items.map((item) => {
      if (item.id === id && item.quantity > 0) {
        if (item.quantity === 1) {
          addActivity(
            `🚫 ${currentItem.name} became empty`
          );
        }
        if (item.quantity === 2) {
          addActivity(
            `⚠ ${currentItem.name} is low stock`
          );
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const openRestockModal = (id) => {
    const item = items.find(
      (i) => i.id === id
    );

    setSelectedItem(item);
  };
  const confirmRestock = (id, quantity) => {
    const currentItem = items.find(i => i.id === id);
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        addActivity(
          `🔄 Restocked ${currentItem.name} (${quantity})`
        );
        return { ...item, quantity };
      }
      return item;
    });

    setItems(updatedItems);
    setSelectedItem(null);
  };

  /* ── Derived stats ── */
  const lowStock = items.filter((item) => item.quantity === 1).length;
  const emptyItems = items.filter((item) => item.quantity === 0).length;

  /* ── Grouped inventory ── */
  const healthyList = items.filter((item) => item.quantity > 1);
  const lowList = items.filter((item) => item.quantity === 1);
  const emptyList = items.filter((item) => item.quantity === 0);

  /* ── Inventory Health (same logic as HealthCard) ── */
  const healthPct = items.length === 0
    ? 100
    : Math.round((healthyList.length / items.length) * 100);

  /* ── System Status (derived purely for display) ── */
  let sysClass = "sys-status--healthy";
  let sysLabel = "🟢 Inventory Healthy";
  let heroDot = "#34d399";
  let heroLabel = "All good · " + healthPct + "% healthy";

  if (items.length > 0 && healthPct < 75) {
    sysClass = "sys-status--warning";
    sysLabel = "🟡 Attention Needed";
    heroDot = "#fbbf24";
    heroLabel = "Some items low · " + healthPct + "% healthy";
  }
  if (items.length > 0 && healthPct < 40) {
    sysClass = "sys-status--critical";
    sysLabel = "🔴 Critical Restock Required";
    heroDot = "#f87171";
    heroLabel = "Restock needed · " + healthPct + "% healthy";
  }
  if (!session) {
    return <Login />;
  }
  return (
    <div className="app-root">

      {/* ════ FLOATING SYSTEM STATUS ════ */}
      <div className={`sys-status ${sysClass}`} role="status" aria-live="polite">
        <span className="sys-status__indicator" />
        <div className="sys-status__text">
          <span className="sys-status__label">System Status</span>
          <span className="sys-status__value">{sysLabel}</span>
        </div>
      </div>

      {/* ════ HERO ════ */}
      <header className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
        <div className="hero__orb hero__orb--3" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__chip">
            <span className="hero__chip-dot" />
            Smart Pantry Management
          </div>

          <h1 className="hero__title">
            🧊 <span className="hero__wordmark">ShelfSense</span>
          </h1>

          <p className="hero__sub">Track what's really left.</p>
          <p className="hero__desc">
            A real-time pantry dashboard that keeps you one step ahead
            of running out — always.
          </p>
          {session && (
            <div className="hero__user">
              Welcome, {session.user.email}
            </div>
          )}
          {session && (
            <button
              className="hero__logout"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </button>
          )}

          {items.length > 0 && (
            <div className="hero__health-pill">
              <span
                className="hero__health-pill-dot"
                style={{ background: heroDot, boxShadow: `0 0 8px ${heroDot}` }}
              />
              {heroLabel}
            </div>
          )}
        </div>
      </header>

      {/* ════ MAIN CONTENT ════ */}
      <main className="main">

        {/* ── Stats ── */}
        <section className="stats-grid" aria-label="Inventory statistics">
          <StatCard title="Total Items" value={items.length} icon="📦" variant="total" />
          <StatCard title="Low Stock" value={lowStock} icon="⚠️" variant="low" />
          <StatCard title="Empty Items" value={emptyItems} icon="🚫" variant="empty" />
        </section>

        {/* ── Dashboard 2-col ── */}
        <div className="dashboard-grid">

          {/* LEFT: Add Form + Inventory panels */}
          <div className="dashboard-main">

            {/* Add Item */}
            <AddItemForm onAdd={addItem} />

            {/* No items at all */}
            {items.length === 0 && (
              <div className="empty-state glass">
                <div className="empty-state__emoji">🫙</div>
                <h3 className="empty-state__title">Your pantry is empty</h3>
                <p className="empty-state__desc">
                  Add your first grocery item above to start tracking.
                </p>
              </div>
            )}

            {/* ── ✅ Healthy Inventory ── */}
            {items.length > 0 && (
              <div className="section">
                <div className="section-head">
                  <span className="section-title">
                    <span className="section-icon">✅</span>
                    Healthy Inventory
                  </span>
                  <span className="badge badge-green">{healthyList.length} items</span>
                </div>
                <div className="section-divider" />
                <div className="inv-panel inv-panel--healthy">
                  <div className="inv-panel__body">
                    {healthyList.length === 0 ? (
                      <p className="inv-panel__empty">No healthy items yet</p>
                    ) : (
                      healthyList.map((item) => (
                        <div className="inv-panel__item" key={item.id}>
                          <InventoryItem
                            item={item}
                            onConsume={consumeItem}
                            onRestock={openRestockModal}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── ⚠ Low Stock ── */}
            {items.length > 0 && (
              <div className="section">
                <div className="section-head">
                  <span className="section-title">
                    <span className="section-icon">⚠️</span>
                    Low Stock Inventory
                  </span>
                  <span className="badge badge-amber">{lowList.length} items</span>
                </div>
                <div className="section-divider" />
                <div className="inv-panel inv-panel--low">
                  <div className="inv-panel__body">
                    {lowList.length === 0 ? (
                      <p className="inv-panel__empty">No low-stock items 👍</p>
                    ) : (
                      lowList.map((item) => (
                        <div className="inv-panel__item" key={item.id}>
                          <InventoryItem
                            item={item}
                            onConsume={consumeItem}
                            onRestock={openRestockModal}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── 🚫 Empty ── */}
            {items.length > 0 && (
              <div className="section">
                <div className="section-head">
                  <span className="section-title">
                    <span className="section-icon">🚫</span>
                    Empty Inventory
                  </span>
                  <span className="badge badge-red">{emptyList.length} items</span>
                </div>
                <div className="section-divider" />
                <div className="inv-panel inv-panel--empty">
                  <div className="inv-panel__body">
                    {emptyList.length === 0 ? (
                      <p className="inv-panel__empty">No empty items 🎉</p>
                    ) : (
                      emptyList.map((item) => (
                        <div className="inv-panel__item" key={item.id}>
                          <InventoryItem
                            item={item}
                            onConsume={consumeItem}
                            onRestock={openRestockModal}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Health Card (sticky aside) */}
          <div className="dashboard-aside">
            <HealthCard items={items} />
            <ActivityFeed activities={activities} />
            <HouseholdMembers />
          </div>
        </div>
      </main>
      {selectedItem && (
        <RestockModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={confirmRestock}
        />
      )}

      <footer className="footer">
        <p>ShelfSense · Smart pantry management · Built for real kitchens</p>
      </footer>
    </div>
  );
}

export default App;