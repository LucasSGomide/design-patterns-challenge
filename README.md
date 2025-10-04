# 🏗️ Software Design & Architecture Challenges

## 🎯 Goal
This repository contains small, weekend-sized coding challenges to **practice design patterns and architectural concepts** in a hands-on way.  

Each challenge should take **one weekend or less (4–6h)** and result in:
- A minimal runnable codebase
- A `README.md` for reflections:
  1. What problem does this pattern solve?
  2. When should it be used?
  3. When should it be avoided?
  4. What did I learn by implementing it?

The goal is **understanding trade-offs**, not building production systems.

---

## 📅 Challenge Roadmap

### Milestone 1 – Core Design Patterns

#### Week 1 – Strategy Pattern
- **Challenge:** Implement a mini “payment processor” with interchangeable strategies (credit card and crypto).
- **Extra:** Add a new payment type without modifying existing code.
- **Learning:** Decoupling behavior from context, open/closed principle.

---

#### Week 2 – Observer Pattern
- **Challenge:** Build a “stock price tracker.”  
  - A `Stock` notifies observers (EmailNotifier, SMSNotifier, Logger) when price changes.  
- **Extra:** Allow observers to unsubscribe dynamically.  
- **Learning:** Event-driven thinking, decoupled notifications.

---

#### Week 3 – Factory Method / Abstract Factory
- **Challenge:** Create a “UI component factory” that generates light vs. dark theme widgets (Button, Input, Modal).  
- **Extra:** Add a `MobileFactory` without changing client code.  
- **Learning:** Encapsulated object creation, interface-based design.

---

#### Week 4 – Adapter Pattern
- **Challenge:** Build a “social media poster” with a unified `.post(message)` API.  
  - Under the hood, adapt to Twitter, Facebook, Discord (mock APIs).  
- **Extra:** Plug in a new adapter without changing client code.  
- **Learning:** Integrating external systems without leaking complexity.

---

## Milestone 2 – Architecture-Level Patterns

#### Week 5 – CQRS (Command Query Responsibility Segregation)
- **Challenge:** Create a mini “bank account” app.  
  - Write side: `deposit()`, `withdraw()` emit events.  
  - Read side: query balance rebuilt from events.  
- **Learning:** Benefits and trade-offs of separating reads and writes.

---

#### Week 6 – Event Sourcing
- **Challenge:** Extend Week 5 by making *events the source of truth*.  
  - Store all actions (`Deposited $100`, `Withdrew $50`).  
  - Rebuild state by replaying events.  
- **Learning:** Traceability, auditability, and added complexity of event sourcing.

---

## Milestone 3 – Resilience & System Design Basics

#### Week 7 – Message Queue Basics
- **Challenge:** Simulate an order system with:  
  - Producer (order placed)  
  - Consumers (billing, shipping)  
  - Use a simple in-memory queue or RabbitMQ.  
- **Learning:** Decoupling services, eventual consistency, async workflows.

---

#### Week 8 – Circuit Breaker Pattern
- **Challenge:** Mock a service call that sometimes fails.  
  - Implement a circuit breaker wrapper that:  
    - Opens after N failures  
    - Closes after cooldown  
    - Falls back to a default response  
- **Learning:** Resilience, graceful degradation, fault tolerance.

---

## ✅ Deliverables
Each challenge goes in its own folder:

```
src
└── challenges
    ├── 01-strategy
    ├── 02-observer
    ├── 03-factory
    ├── 04-adapter
    ├── 05-cqrs
    ├── 06-event-sourcing
    ├── 07-message-queue
    └── 08-circuit-breaker
```

Each folder contains:
- Code (TypeScript)
- `README.md` with reflections (use the 4 questions above)

---

## 🚀 Progress Tracking
- [X] Week 1 – Strategy  
- [ ] Week 2 – Observer  
- [ ] Week 3 – Factory  
- [ ] Week 4 – Adapter  
- [ ] Week 5 – CQRS  
- [ ] Week 6 – Event Sourcing  
- [ ] Week 7 – Message Queue  
- [ ] Week 8 – Circuit Breaker

## ⚙️ Run the Code
On the root folder run the following scripts:

``` bash
make run-01-strategy

```

---

## 📌 Notes
- Keep it **simple and runnable**.  
- Each challenge = max one weekend.  
- Focus on **why** the pattern exists and **when not to use it**.  
- Sharing your reflections online (LinkedIn/blog) will reinforce your learning and build visibility as you move toward architect roles.
