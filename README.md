# ⚡ Pollofeed ⚡ 🐔😂

**Bitcoin Lightning-powered remote chicken feeder on Raspberry Pi**  
Real BTC micropayments → chickens get fed in <3 seconds. 100% automated, zero disputes ever.

### Live Demos & Community Videos (2019 production run + coverage)

- **[Bitcoin Magazine Official Demo](https://www.youtube.com/watch?v=a0_dqDxx7Oo)** (1.1k+ views) – Created by Joe Chimienti
- **[User Feeding Demo (LNBIG Project)](https://www.youtube.com/watch?v=jXC39uCSrfA)**
- **[Short Demo (Bitcoin Club Malta)](https://www.youtube.com/shorts/tVc0IcKlEYs)**
- **[Additional Community Demo](https://www.youtube.com/watch?v=_ShlvGfa788)**

[![Bitcoin Magazine Demo](https://img.youtube.com/vi/a0_dqDxx7Oo/0.jpg)](https://www.youtube.com/watch?v=a0_dqDxx7Oo)

### Production Architecture (Async + Real-Time Broadcast)

```mermaid
graph TD
    A[Lightning Invoice Paid] --> B[order_new queue]
    B --> C[Worker picks up]
    C --> D[order_processing queue]
    D --> E[Servo drops feed + ffmpeg records]
    E --> F[order_complete queue]
    F --> G[WebSocket broadcast → every viewer sees chickens go nuts]
    style A fill:#f9f,stroke:#333
    style G fill:#bbf,stroke:#333

```

Queues: order_new → order_processing → order_complete
Tech Stack

Core: Node.js / JavaScript (original public version)
Payments: Bitcoin Lightning Network (invoices + webhooks via BTCPay Server)
Real-Time: WebSockets + ffmpeg for low-latency streaming
Messaging: RabbitMQ (async workflows)
Hardware: Raspberry Pi + Arduino/servo control + Python scripts
Infra: Docker, Cloudflare, SendGrid
Evolution: Later rebuilt core concurrency logic in Scala for better type-safety and performance (code available on request – showcases my professional Scala expertise in high-volume systems)

Key Challenges Solved

Real-time live camera for multiple concurrent viewers: Optimized ffmpeg + WebSockets for low-latency streaming over variable internet – supported simultaneous watchers without drops (similar to real-time frontends handling 40–50k daily transactions at Event Dynamic).
Reliable feeder mechanism: Calibrated servo control via Raspberry Pi API – ensured consistent food dispense on every successful payment.
Animal-proofing & hardware durability: Chickens and squirrels destroyed early prototypes (chewed plastic, damaged motors) – iterated with chicken-wire enclosures and metal reinforcements for long-term reliability.
Lightning payment status & failures: Handled webhook race conditions, expired invoices, and network failures with retries and user notifications – achieved 100% reliability in production (zero disputes).

Traction & Impact

Featured in Bitcoinist.com and Bitcoin community
Real-world micropayments processed reliably across timezones

Running Locally (<5 min)

```
cp example.env .env
npm install
npm run start:dev
```
