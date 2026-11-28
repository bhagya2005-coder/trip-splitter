# Trip Splitter

A partial implementation of the Trip Splitter frontend assignment, built using React, TypeScript, and Redux Toolkit. It allows users to add trip expenses and view spending and equal-split balances.

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## What I Implemented

- Displays sample expenses and newly added expenses.
- Adds an expense using its description, amount, and payer.
- Shows total spending, expense count, and member balances.
- Calculates balances using equal splitting.
- Uses Redux Toolkit to manage expense data.

## What Is Not Finished

This is a partial implementation. Exact-amount and percentage splits, the full assignment form and validation, category filtering, deleting expenses, and saving expenses after a page refresh are not implemented. The current balance calculation supports equal splits only.

## Three Decisions and Why

1. **Redux Toolkit for expenses:** I used Redux Toolkit to keep expense data in one shared store.
2. **A simple expense form:** I started with description, amount, and payer fields to keep adding expenses manageable.
3. **Equal-split calculations first:** I implemented equal splitting as a starting point before working on the other split types.

## What I Would Improve With Another Day

I would add exact and percentage splits, complete the required form fields and validation, implement category filtering and deletion, and save expenses using `localStorage`. I would also add tests for the balance calculations.

## AI Tools

I used ChatGPT to understand the assignment question and its requirements.
