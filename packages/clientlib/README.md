# CNC Tiberium alliances ClientLib utilitites

Useful typing and utlities to work with `ClientLib`

## Typings

To expose the types

```typescript
import { ClientLibStatic } from '@cncta/clientlib';

declare const ClientLib: ClientLibStatic;
```

## Utilities

### ClientLibLoader

Wait for ClientLib to be loaded

```typescript
import { ClientLibLoader } from '@cncta/clientlib';

while (!ClientLibLoader.isLoaded) {
    await sleep(100);
}
```

### LocalStorage Cache

World isolated localstorage cache, adds world information to the cache key

```typescript
import { LocalCache, Duration } from '@cncta/clientlib';

LocalCache.set('foo', 'bar'); // Stores "st-<worldId>-foo" => "bar"

const item = LocalCache.get('foo');

// Only get "foo" if it was last set within 5 days
const item = LocalCache.get('foo', Duration.day(5));
```
