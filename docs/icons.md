# Icons

This project uses **Iconify** for icons.

Use this installed collection by default:

| Use case | Collection | Prefix |
|----------|------------|--------|
| UI icons, actions, navigation, states | Tabler Icons | `tabler:` |

The project currently keeps only `@iconify-json/tabler` installed for local icon
metadata/autocomplete. Do not use removed collections such as
`@iconify-json/fa6-solid` unless the package is intentionally added back.

## Why Iconify?

- Large icon library across many collections.
- Icons are loaded on demand instead of stored in the app bundle.
- Browser caching reuses icons after the first load.
- New icons can be used without updating app code or adding another icon package.

## Finding Icons

Browse the collection currently used by this project:

- Tabler Icons: https://icones.js.org/collection/tabler

Search by name, then use the collection prefix in code:

```tsx
<Icon icon="tabler:user" />
<Icon icon="tabler:home" />
```

To find another Iconify collection, use:

- Visual browser: https://icon-sets.iconify.design/
- JSON/API collection list: https://api.iconify.design/collections?pretty=1

The collection prefix is the part before the icon name. For example, `tabler:home`
uses the `tabler` collection prefix.

## VS Code Iconify IntelliSense

The workspace can be configured for Anthony Fu's **Iconify IntelliSense**
extension. With the extension installed, VS Code can preview Iconify icons in
code, show annotations for icon names, and provide collection autocomplete.

Recommended settings for `.vscode/settings.json`:

```json
"iconify.inplace": false,
"iconify.annotations": true,
"iconify.customCollectionJsonPaths": [
  "https://cdn.jsdelivr.net/npm/@iconify-json/tabler/icons.json"
]
```

`iconify.inplace: false` keeps source code as readable icon names.
`iconify.annotations: true` enables icon annotations/previews.
`iconify.customCollectionJsonPaths` provides the icon lists used for
autocomplete.

### Adding autocomplete for another collection

1. Find the collection prefix from the Iconify browser or API list above.
2. Install the matching `@iconify-json/{prefix}` package if the collection
   should be supported locally by the project.
3. Add the collection JSON URL to `iconify.customCollectionJsonPaths`:

```json
"https://cdn.jsdelivr.net/npm/@iconify-json/{prefix}/icons.json"
```

For example, to add Material Design Icons autocomplete:

```json
"https://cdn.jsdelivr.net/npm/@iconify-json/mdi/icons.json"
```

Reload the VS Code window if autocomplete does not update immediately.

## Using Icons

```tsx
import { Icon } from "@iconify/react";

function MyComponent() {
  return (
    <div>
      <Icon icon="tabler:user" />
      <Icon icon="tabler:home" className="text-blue-500" />
      <Icon icon="tabler:settings" width={24} height={24} />
    </div>
  );
}
```

Common props:

| Prop | Type | Description |
|------|------|-------------|
| `icon` | string | Icon name, including prefix |
| `width` | number/string | Icon width |
| `height` | number/string | Icon height |
| `className` | string | CSS classes |
| `style` | object | Inline styles |
| `rotate` | number | Rotation, from `0` to `3` |
| `flip` | string | `"horizontal"` or `"vertical"` |

## Styling

Icon color is controlled with text color because Iconify icons use
`currentColor` where supported:

```tsx
<Icon icon="tabler:home" className="text-primary-500" />
```

Tabler icons are stroke-based. This project can set their shared stroke width in
`src/shared/main.scss`:

```scss
.iconify [stroke-width] {
  stroke-width: 1.75;
}
```

Change that value in `src/shared/main.scss` when the app needs thinner or
heavier Tabler icons globally. Use one-off stroke overrides only when a specific
component intentionally needs a different weight.

## Best Practices

Use Iconify instead of importing a separate icon library:

```tsx
import { Icon } from "@iconify/react";

<Icon icon="tabler:user" />;
<Icon icon="tabler:home" />;
```

Do not use `lucide-react`:

```tsx
import { User } from "lucide-react";

<User />;
```

Prefer `tabler:` for app UI icons, actions, navigation, and states.

## Examples

```tsx
import { Icon } from "@iconify/react";

// Button with icon
<button className="flex items-center gap-2">
  <Icon icon="tabler:plus" />
  Add User
</button>;

// Icon-only button
<button className="p-2">
  <Icon icon="tabler:trash" className="text-red-500" />
</button>;

// Loading spinner
<Icon icon="tabler:loader-2" className="animate-spin" />;

// Large decorative icon
<Icon icon="tabler:rocket" width={64} height={64} />;
```

## Performance

Icons are:

- Fetched on first use.
- Cached in browser storage.
- Reused across the app without additional requests.
- Loaded only when they are used.
