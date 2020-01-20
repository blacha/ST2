# @cncta/client

Game client for CNC:TA

## Setup

```typescript
import { TaClient } from '@cncta/client';

const client = new TaClient(username, password);
/** Login and open a world instance */
const world = await client.open(410);
```

If you already have a sessionId

```typescript
import { TaClient } from '@cncta/client';

const client = TaClient.fromSessionId('some-session-id');
// Open a game world instance
const world = await client.open(410);
```

## Commands

### Player info

```typescript
const player = await world.player;
player.Name;
```

### Server info

```typescript
const server = await world.server;
server.ww; // World width
```

### Send Mail

```typescript
await world.mail('shockr', 'Hello World', `This is a test message`);
```

### World Data

```typescript
const data = await world.data;

/** All players */
console.log(data.players);

/** Alliance list */
console.log(data.alliances);
```
