const {exec} = require('child_process')

module.exports = {
  variables: [
    { name: "dialogname"
    , description: 'Snakecase dialog filename. Examples: delete-item, edit-item, react-item etc' },
    { name: "DialogName"
    , default: ({dialogname}) => capitallize(dialogname)
    },
  ],
  outDir: "./src/@app/routes/lobby/dialogs",
  onComplete: (vars, renderedfiles) => {
    // renderedfiles: { baseDir: string, filename: string, contents: string }[]
    const s = vars["dialogname"]
    const c = vars.DialogName

    console.log(`
THIS IS NOT UP TO DATE.
Import:
    import { ${c}DialogComponent } from './${s}/${s}.dialog';

Add to parent module:
    @NgModule({
      imports: [ ... ],
      declarations: [ ${c}DialogComponent ]
    })
    class ParentModule {}

OR, for shared modules add to both declarations and exports:
    @NgModule({
      imports: [ ... ],
      declarations: [ ${c}DialogComponent, ],
      exports: [ ${c}DialogComponent, ]
    })
    class SharedModule {}

Now use this component by including its tag in your template files:
    <pw-dialog-${s}></pw-dialog-${s}>
`)
  }
}

function capitallize(str) {
  return String(str)
    .split('-')
    .map(a => a[0].toUpperCase() + a.slice(1))
    .join('')
}
