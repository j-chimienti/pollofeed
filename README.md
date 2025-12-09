# ⚡ Pollofeed ⚡ 🐔😂
**Bitcoin Lightning-powered chicken feeder on Raspberry Pi**  
Real BTC payment → chickens get fed in <3 seconds. 100 % automated, zero disputes ever.

![Pollofeed in action](demo.gif)  

### Live demos
- https://www.youtube.com/watch?v=a0_dqDxx7Oo  
- https://www.youtube.com/watch?v=jXC39uCSrfA  

### Production RabbitMQ flow (async + live broadcast)
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
Tech stack
Scala • WebSockets • RabbitMQ • Bitcoin Lightning • Raspberry Pi • Arduino • Docker • Cloudflare • ffmpeg
Run locally (<5 min)
```
Bashcp example.env .env
npm install
npm run start:dev
```
