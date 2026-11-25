import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "./store";
import { members } from "./sampleData";
import type { Expense } from "./types";

function App() {
  const dispatch = useDispatch();

  const expenses = useSelector(
    (state: { expenses: Expense[] }) => state.expenses
  );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("m1");

  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const balances = members.map((member) => {
    let balance = 0;

    expenses.forEach((expense) => {
      // This balance calculation currently handles equal splits only.
      if (expense.split.type !== "equal") return;

      const participants = expense.split.memberIds ?? [];
      if (participants.length === 0) return;

      const share = expense.amount / participants.length;

      if (expense.paidBy === member.id) {
        balance += expense.amount;
      }

      if (participants.includes(member.id)) {
        balance -= share;
      }
    });

    return { ...member, balance };
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!description.trim() || Number(amount) <= 0) {
      alert("Enter a description and a valid amount.");
      return;
    }

    dispatch(
      addExpense({
        id: Date.now().toString(),
        description: description.trim(),
        amount: Math.round(Number(amount) * 100),
        paidBy,
        date: new Date().toISOString().slice(0, 10),
        category: "Other",
        split: {
          type: "equal",
          memberIds: members.map((member) => member.id),
        },
      })
    );

    setDescription("");
    setAmount("");
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-tag">✈ TRIP PLANNER</div>
        <h1>Trip Splitter</h1>
        <p>Your trip, expenses, all in one place.</p>
        <div className="trip-caption">Weekend Getaway · {members.length} members</div>
      </header>

      <section className="summary-grid">
        <div className="summary-card">
          <span className="summary-label">Total Spent</span>
          <strong>₹{(totalSpent / 100).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</strong>
          <span className="summary-icon">₹</span>
        </div>

        <div className="summary-card">
          <span className="summary-label">Expenses</span>
          <strong>{expenses.length}</strong>
          <span className="summary-icon">↗</span>
        </div>

        <div className="summary-card">
          <span className="summary-label">Trip Members</span>
          <strong>{members.length}</strong>
          <span className="summary-icon">♧</span>
        </div>
      </section>

      <section>
        <h2>Add Expense</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Expense description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Amount in rupees"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <select
            value={paidBy}
            onChange={(event) => setPaidBy(event.target.value)}
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          <button type="submit">+ Add Expense</button>
        </form>
      </section>

      <section>
        <div className="section-heading">
          <h2>Expenses</h2>
          <span className="section-count">{expenses.length} entries</span>
        </div>

        {expenses.map((expense) => {
          const payer = members.find(
            (member) => member.id === expense.paidBy
          );

          return (
            <div className="expense" key={expense.id}>
              <div className="expense-top">
                <div>
                  <h3>{expense.description}</h3>
                  <p>Paid by {payer?.name ?? "Unknown member"}</p>
                </div>
                <strong>
                  ₹{(expense.amount / 100).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>
              <span className="expense-category">{expense.category}</span>
            </div>
          );
        })}
      </section>

      <section>
        <div className="section-heading">
          <h2>Net Balances</h2>
          <span className="section-count">Equal splits</span>
        </div>

        <div className="balance-grid">
          {balances.map((member) => (
            <div className="balance-card" key={member.id}>
              <div className="balance-member">{member.name}</div>
              <div
                className={
                  member.balance > 0
                    ? "balance-amount positive"
                    : member.balance < 0
                    ? "balance-amount negative"
                    : "balance-amount neutral"
                }
              >
                {member.balance > 0
                  ? `Gets back ₹${(member.balance / 100).toFixed(2)}`
                  : member.balance < 0
                  ? `Owes ₹${(Math.abs(member.balance) / 100).toFixed(2)}`
                  : "Settled"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;