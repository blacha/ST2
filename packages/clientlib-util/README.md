# @cncta/util Helpful utils

### Patcher

Add a \$Id to every WorldObjectNPCBase

```typescript
const WorldObjectNPCBase = new ClientLibPatch<PatchedId>('ClientLib.Data.WorldSector.WorldObjectNPCBase');
WorldObjectNPCBase.addGetter('$Id', '$ctor', /\&.*=-1;\}this\.([A-Z]{6})=\(/);
```

### ClientLibLoader

Wait for ClientLib to be loaded

```typescript
import { ClientLibLoader } from '@cncta/util';

while (!ClientLibLoader.isLoaded) {
    await sleep(100);
}
```

### LocalStorage Cache

World isolated localstorage cache, adds world information to the cache key

```typescript
import { LocalCache, Duration } from '@cncta/util';

LocalCache.set('foo', 'bar'); // Stores "st-<worldId>-foo" => "bar"

const item = LocalCache.get('foo');

// Only get "foo" if it was last set within 5 days
const item = LocalCache.get('foo', Duration.day(5));
```
