# React SVG Pattern Manager

Create, manage, and use SVG patterns in your React components!

[Demo](https://kmck.github.io/react-svg-patterns)

## Install

[yarn][]:

```bash
yarn add react-svg-patterns
```

[npm][]:

```bash
npm install --save react-svg-patterns
```


## Usage

Import `createManagedSvgPatternLibrary` and use it to create a `ManagedSvgPatternLibrary` component
and its accompanying `registerSvgPattern` function.

```jsx
import { createManagedSvgPatternLibrary } from 'react-svg-patterns';

const {
  ManagedSvgPatternLibrary,
  registerSvgPattern,
} = createManagedSvgPatternLibrary();
```

Use `registerSvgPattern` to add SVG patterns to the library. The return value is a string that you
can use to reference the fill in your other SVGs.

```jsx
const linearGradientFill = registerSvgPattern('myGradient', 'linear', {
  angle: 30,
  stops: ['#f00', '#0f0', '#00f',],
});
// linearGradientFill == 'url(#svg-pattern-linear__myGradient)'

const YourSvgIcon = () => (
  <svg
    width={100}
    height={100}
    viewBox="0 0 100 100"
    fill={linearGradientFill}
  >
    <rect x={0} y={0} width={100} height={100} />
  </svg>
);
```

Add `ManagedSvgPatternLibrary` near the top of your component tree. This renders an SVG element
that acts as a container for all of your fill patterns.

```jsx
const YourApp = () => (
  <>
    <div>
      <YourSvgIcon />
    </div>
    <ManagedSvgPatternLibrary />
  </>
);
```

The rendered HTML ends up looking something like this:

```html
<div>
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="url(#svg-pattern-linear__myGradient)"
  >
    <rect x="0" y="0" width="100" height="100" />
  </svg>
</div>
<svg style="bottom: 0px; height: 1px; opacity: 0; pointer-events: none; position: fixed; right: 0px; width: 1px; z-index: -1;">
  <linearGradient id="svg-pattern-linear__myGradient" x1="0.5" x2="0.5" y1="1" y2="0" spreadMethod="pad">
    <stop offset="0%" stop-color="#f00"></stop>
    <stop offset="50%" stop-color="#0f0"></stop>
    <stop offset="100%" stop-color="#00f"></stop>
  </linearGradient>
</svg>
```


## API

### `SvgPatternManager`

#### `add(key, type, params)`

Registers a new pattern fill.

##### Parameters

###### `key`

Unique ID for the pattern you're adding.

###### `type` and `params`

Determines the type of SVG pattern. All patterns types accept a string for `id`, but other
parameters are optional and vary by pattern type.

**`linear`** (`PATTERN_TYPE_LINEAR_GRADIENT`, `LinearGradient`)

* `stops`: array of colors or `{ offset, color }`
* `from` and `to`: shorthand for a gradient with two stops
* `angle`: gradient angle in degrees (default: `0`, top-to-bottom)
* [`spreadMethod`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod)
* `scale`: enlarge the gradient within the pattern

**`radial`** (`PATTERN_TYPE_RADIAL_GRADIENT`, `RadialGradient`)

* `stops`: array of colors or `{ offset, color }`
* `from` and `to`: shorthand for a gradient with two stops
* `r`: gradient radius
* `cx` and `cy`: center of the gradient
* `fx` and `fy`: focus of the gradient
* [`spreadMethod`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod)
* `scale`: enlarge the gradient within the pattern

**`angular`** (`PATTERN_TYPE_ANGULAR_GRADIENT`, `AngularGradient`)

* `stops`: array of colors or `{ offset, color }`
* `from` and `to`: shorthand for a gradient with two stops
* `angle`: gradient start angle in degrees (default: `0`, clockwise from the top)
* `slices`: number of slices in the gradient, lower is chunkier (default: `100`)
* [`spreadMethod`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod)
* `scale`: enlarge the gradient within the pattern

**`image`** (`PATTERN_TYPE_IMAGE`, `BackgroundImage`)

* `src`: URL of the image

**`custom`** (`PATTERN_TYPE_CUSTOM`, `CustomSvgPattern`)

* `children`: SVG content to use in `<pattern>` or a function that creates it

##### Returns

Pattern URL `string` that can be used as a `fill` for other SVGs.


#### `get(key)`

Returns the pattern URL for a given key.

##### Parameters

###### `key`

Unique ID for the pattern.

##### Returns

Pattern URL `string` that can be used as a `fill` for other SVGs.


#### `has(key)`

Check whether a key was registered for a pattern.

##### Parameters

###### `key`

Unique ID for the pattern.

##### Returns

`true` if the `key` was used to register a pattern or `false` otherwise


#### `remove(key)`

Removes the pattern fill for the given key.

##### Parameters

###### `key`

Unique ID for the pattern.


### `SvgPatternLibrary`

Component

##### Props

###### `patterns`

Object mapping keys to SVG pattern definition objects with an `id`, `type`, and `props`.

###### `noSvgWrapper`

If set, this will render the patterns without a wrapping `<svg>` tag.
(default: `false`)


### `createManagedSvgPatternLibrary([idPrefix|patternManager])`

Creates a function to register SVG patterns and a component to render them.

##### Parameters

###### `idPrefix`

A new `SvgPatternManager` instance is created with this `idPrefix`. The prefix is added to the
 beginning each pattern element's `id` attribute.
(`string`, default: `'svg-pattern'`)

###### `patternManager`

You can also supply a `SvgPatternManager` instance directly.

##### Returns

* `ManagedSvgPatternLibrary`: React component that renders the SVG patterns registered to the
  `SvgPatternManager` instance
* `getSvgPattern(key)`: gets the fill URL for the supplied key
* `registerSvgPattern(key, type, params)`: registers an SVG pattern


### createSvgPatternManager([idPrefix])

Creates a singleton `SvgPatternManager` instance with functions to register and retrieve
`url(#...)` strings that can be used as the `fill` for your SVGs.

##### Parameters

###### `idPrefix`

A new `SvgPatternManager` instance is created with this `idPrefix`.
(`string`, default: `'svg-pattern'`)

##### Returns

* `getInstance()`: returns the `SvgPatternManager` instance
* `getSvgPattern(key)`: gets the fill URL for the supplied key
* `registerSvgPattern(key, type, params)`: registers an SVG pattern


## Tips and Tricks

### Sizing and Positioning

These patterns **stretch to fill** the shape when they're applied. Aspect ratio is _not_ preserved!
For multiple shapes or paths in a single SVG, the fill pattern applies to each one individually.
In other words, there is a separate copy of the pattern tht starts at the top-left of the shape and
stretches to the bottom-right. If you want one continous fill, you need to merge the shapes in your
SVG down to a single `<path>` first.

If you want to ensure that the pattern is always oriented to the top-left of your SVG, you may want
to use a mask or a local pattern instead.

```jsx
const YourSvgIcon = ({ fill }) => {
  const localPatternId = useMemo(() => `pattern-${Math.random().toString().substr(2)}`, []);
  return (
    <svg fill={fill}>
      <defs>
        <pattern id={localPatternId} x={0} y={0} width="100%" height="100%" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <rect fill="inherit" x={0} y={0} width="100%" height="100%" />
        </pattern>
      </defs>
      <g fill={`url(#${localPatternId})`}>
        {/* shapes, etc. */}
      </g>
    </svg>
  );
};
```


### Animation

You can animate fill patterns! However, be aware that Safari doesn't handle animations referenced
**across separate SVGs**, as they would be if you created an animation in a custom pattern.

The destination (your SVG) does _not_ update on every frame of the source (SVG pattern library),
meaning that the pattern will not move at all or will update irregularly due to other incidental
repaints, such as from hover events and window resizing.

There are a few work-arounds that may be helpful, depending on your needs:

* Create a static pattern in the library that is referenced by an animated pattern in your SVG
* Create the entire animated pattern in your SVG using this library's pattern components directly
* Include a dummy animation in your SVG to force frequent repaints. This is **very hacky** and
  probably **bad for performance** as well!

  The included `NoopAnimationHack` component will apply the hack for Safari only.

  ```jsx
  import { NoopAnimationHack } from 'react-svg-patterns';

  const YourSvgIcon = () => (
    <svg fill={yourAnimatedFill}>
      <NoopAnimationHack />
      <rect x={0} y={0} width={100} height={100} />
    </svg>
  );
  ```


## Contributing

Thank you for your interest! If you find a bug or want to add a new feature, open an issue or create
a pull request, and we'll figure it out from there.


## License

ISC © [Keith McKnight](https://github.com/kmck)

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install