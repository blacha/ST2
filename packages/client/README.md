# @cncta/client

Game client for CNC:TA

## Setup

```typescript
import { TaClient } from '@cncta/client'

const client = new TaClient(username, password);
/** Login and open a world instance *//
const world = await client.open(410);
```

If you already have a sessionId

```typescript
import { TaClient } from '@cncta/client';

const client = TaClient.fromSessionId('some-session-id');
// Open a game world instance
const world = await client.open(410);
```

## Send Mail

```typescript
// Send mail to a player
await world.mail('shockr', 'Hello World', `This is a test message`);
```
