# Development Environment

> To take full advantage of TypeScript with autocomplete you would have to use an editor with the correct TypeScript plugins.

## Use a TypeScript-aware editor

I highly recommend [Visual Studio Code](https://code.visualstudio.com/) over Atom, or Sublime Text.

Even being a developer of a couple Atom packages and a contributor to Atom, and purchasing Sublime Text 3.
I recommend VS Code, because we are working with TypeScript, and VS Code is nearly an IDE for TypeScript.

For Visual Studio Code, I recommend using the following plugins:
* Color Picker - anseki
* EditorConfig for VS Code - EditorConfig
* TSLint - egamma
* CodeMetrics - Kiss Tamas
* Subword Navigation - ow
* Modified Seti Theme - Tarique Naseem
* Git Blame - Wade Anderson


## VS Code Configuration

### Fira Code Fontface

I highly recommend FiraCode-Retina as your choice fontface, since it has some pretty cool ligatures.

### Editor Preferences

Just a suggestion, modify at your own will.

```json
// Place your settings in this file to overwrite the default settings
{
  "editor.tabSize": 2,
  "editor.fontFamily": "Fira Code Retina, Operator Mono, 'Courier New', monospace",
  "guides.active.color.light": "rgba(100, 100, 100, 0.75)",
  "editor.renderIndentGuides": true,
  "editor.fontLigatures": true,
  "workbench.quickOpen.closeOnFocusLost": false,
  // Enable word based suggestions.
  "editor.wordBasedSuggestions": true,
  // Controls the font size in pixels.
  "editor.fontSize": 15,
  // Controls the line height. Use 0 to compute the lineHeight from the fontSize.
  "editor.lineHeight": 18,
  "files.associations": {
      "*.fbs": "C"
  },
  "typescript.check.tscVersion": false
}
```

### Keyboard shortcuts for `subwordNavigation`

```json
// Place your key bindings in this file to overwrite the defaults
[
  {
    "key": "alt+left",
    "command": "subwordNavigation.cursorSubwordLeft",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+right",
    "command": "subwordNavigation.cursorSubwordRight",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+shift+left",
    "command": "subwordNavigation.cursorSubwordLeftSelect",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+shift+right",
    "command": "subwordNavigation.cursorSubwordRightSelect",
    "when": "editorTextFocus"
  }
]
```
