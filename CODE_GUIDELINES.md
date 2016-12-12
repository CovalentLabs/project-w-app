# Code Guidelines

These are some suggestions for naming and formatting that Would be nice-to-haves across the codebase.

## TypeScript

### 1. Semicolons

I lean towards not having semicolons, but I really don't care whether there are semicolons or not.
Just **do not commit changes which simply add or remove semicolons**!

### 2. Component `private` Properties (`_loggedIn` or `loggedIn`)

Rule of thumb: underscores indicate that the property will not be accessed by the template.

### 3. When to inject `DeviceStateService` into a Component

`DeviceStateService` is what we use to subscribe to UI state changes. It is a single source of truth
for the rendering of the entire application!

This allows us to separate write commands and user interface updates into separate UI changes and API calls.
Read [a zine for the modern developer](https://schneide.wordpress.com/2016/09/02/a-zine-for-the-modern-developer/)
for more information, or learn Elm Architecture, Cyclejs, or React-Redux patterns to get a better understanding.

On this thought though, the **only components that should access the** `DeviceStateService` are router level components.

These are the `LoginComponent`, `ConfigureSearchComponent`, `HistoryComponent`, and essentially components that have a
routing module. All other components should receive relevant data through inputs and the parent component.

### 4. Capitallized properties in `R.DeviceState`

The overarching `DeviceState` interface from `./app/shared/read/index.ts` has entirely capitallized properties. This is
a visual que that we can use to understand that we are interacting with a property from the state interface.

Example:
```html
<div *ngIf="loggedIn.OpenHistory != null">
  ...
</div>
```

`loggedIn` is a property on the component, while seeing `OpenHistory`, indicates that the property comes from the raw
`DeviceState` model. This is helpful for when we need to quickly identify the types and properties available on an object.


## SCSS

### 1. `.pw-` prefix for class names

A `.pw-` prefix indicates that the class styles are specified globally, or at least outside of this template.

For example, in a component template file:

```html
<div class="pw-button">Hello</div>
```

`.pw-button` is understood to have been declared and defined outside of this component. This allows us a clear head to
use extremely generic names for our component specific class names.

For example:

```html
<div class="top-left-button">
  <div class="pw-button">Hello</div>
</div>
```
```css
import 'helpers';

.top-left-button {
  @include absolute(top, left);
}
```

By using this convention, we can easily define in our head, where the classes are defined.
If the class begins with `pw-`, then it likely is defined in the `./src/style/app.scss` file.

This follows the convention that all component selectors begin with `<pw-` because we know it is a component declared
elsewhere-not in the provided DOM.
