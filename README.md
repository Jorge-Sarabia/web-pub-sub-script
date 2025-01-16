# Azure Web PubSub Subscriber

This project implements a WebSocket subscriber client that connects to the Azure Web PubSub service. It allows users to subscribe to specific groups and receive messages in real-time.

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- nvm (Node Version Manager)
- An Azure Web PubSub service instance
- Connection string from your Azure Web PubSub service

## Installation

1. Clone this repository or download the source code.

2. Navigate to the project directory.

3. Set up the correct Node.js version using nvm:

   ```bash
   nvm use
   ```

   If you don't have the required version installed, nvm will prompt you to install it with:

   ```bash
   nvm install
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory.
2. Add your Azure Web PubSub connection string:

   ```env
   AZURE_WEBPUBSUB_CONNECTION_STRING=your_connection_string_here
   ```

## Dependencies

The project uses the following main dependencies:

- `@azure/web-pubsub`: Azure Web PubSub client library
- `ws`: WebSocket client
- `dotenv`: Environment variables management

## Usage

The project includes one main script:

### 1. Group-based Subscriber (index.js)

To run the group-based subscriber from the root directory:

```bash
node src/index.js
```

- You will be prompted to enter a `userId` and a `group name`.
- You can specify any `userId` of your choice.
- The `group name` refers to the group you wish to subscribe to. As of January 16, 2025, the default group name is `admins`. This may be updated in the future to include additional groups as needed.
