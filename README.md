# FoodCourt Backend Assessment: NestJS Order Processing with Objection.js and Knex

## About
- Develop an order processing system in NestJS that integrates with Objection.js and Knex to handle and manage kitchen orders based on the provided data structure. The system should also include a socket implementation to enable real-time order updates

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:OjerIsaac/fc_backend.git
   cd fc_backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Rename `.env.example` to `.env` and configure your credentials.

4. **Install git pre-hook:**

   ```bash
   npm run prepare
   ```

5. **Serve the application:**

   ```bash
   npm run start:dev
   ```


## Creating migration file

1. **Create a new migration file:**

   ```bash
   npm run migrate:make <name of table/migration>
   ```

2. **Migrate to db:**

   ```bash
   npm run migrate:latest
   ```