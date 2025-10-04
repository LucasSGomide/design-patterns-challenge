# 🧩 Strategy Pattern – Findings

---

## 🎯 1. What problem does this pattern solve?

This pattern mainly addresses the **Open/Closed Principle** from **SOLID**, by removing concrete implementation knowledge from the *context* and allowing it to execute one action in multiple different ways.  
It also helps achieve a level of **Dependency Inversion**, since the context depends only on abstractions (interfaces) rather than concrete implementations.  
When the strategy is set dynamically by the client, it also encourages the use of **Dependency Injection** to improve flexibility and testability.

---

## 🧠 2. When should it be used?

It should be used when you’re dealing with a **single problem that can be handled by multiple strategies**.  
For example, when different algorithms or behaviors can be swapped at runtime without changing the context’s logic.

---

## 🚫 3. When should it be avoided?

It should be avoided if the problem **does not require multiple strategies** or if the behavior is unlikely to change.  
In such cases, the additional abstraction only adds unnecessary complexity.

---

## 🔍 4. What did I learn by implementing it?

This pattern moves the *if-clauses* from the context to the client.  
If implemented alone, this often shifts the **Single Responsibility** and **Open/Closed** violations upward — to the client layer.

In my implementation, for example, the controller is currently responsible for both validating the incoming request and setting the correct processor for each payment method.  
That gives it more than one responsibility, and it also means that for every new processor I add, I’ll need to update the controller — making it not closed for modification.

I also found that when each strategy requires different parameters, **type safety becomes trickier**.  
Some validation or casting must be handled inside the strategy itself to keep things safe and flexible.

Overall, the pattern is simple but highly effective.  
Its biggest benefit, in my opinion, is how it **moves business logic from the context to the concrete strategy implementations**, isolating rules from orchestration and making the system easier to extend and reason about.

