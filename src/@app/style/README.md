## `src/@app/style`

This folder is an include path of all SASS files.

This is defined in the Webpack configuration under:

```js
  /**
   * Sass
   * Reference: https://github.com/jtangelder/sass-loader
   * Transforms .scss files to .css
   */
  config.sassLoader = {
    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
    includePaths: [path.resolve(__dirname, "src/@app/style")]
  };
```
