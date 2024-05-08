# TypeScript_Microservices_RabbitMQ

**Repository Owner:** ahmadalsharef994  
**Repository Link:** [ahmadalsharef994/TypeScript_Microservices_RabbitMQ](https://github.com/ahmadalsharef994/TypeScript_Microservices_RabbitMQ)  
**Last Updated:** 2 years ago

## Overview

This repository contains an example of a microservices architecture using TypeScript and RabbitMQ for message brokering. It is designed to demonstrate the interaction between publisher and consumer services in a decoupled system.

## Technology Stack

- **TypeScript**: Used for writing both the consumer and publisher services, providing strong typing and modern JavaScript features.
- **RabbitMQ**: Handles message queuing between services, ensuring reliable communication.
- **Node.js**: The runtime environment for executing the TypeScript code.
- **Microservices Architecture**: The architectural style that structures the application as a collection of loosely coupled services.

## Repository Structure

- **Consumer_Service/**: Contains the consumer microservice that receives messages from the RabbitMQ queue.
- **Publisher_Service/**: Includes the publisher microservice that sends messages to the RabbitMQ queue.

## Getting Started

To run this project locally:

1. Clone the repository to your local machine.
2. Ensure RabbitMQ is installed and running on your system. Installation guides can be found on the [RabbitMQ official website](https://www.rabbitmq.com/download.html).
3. Set up and run the services:
   - Navigate to the `Publisher_Service` directory:
     ```
     cd Publisher_Service
     npm install
     npm run start
     ```
   - In a new terminal, navigate to the `Consumer_Service` directory:
     ```
     cd Consumer_Service
     npm install
     npm run start
     ```

## Contributing

We welcome contributions from the community! If you would like to improve the existing code or add new features, please fork the repository, make your changes, and submit a pull request.

## License

This project is open-source and available under standard licensing terms.

---

For support or to discuss further enhancements, please open an issue in this repository.
