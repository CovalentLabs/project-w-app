module.exports = {
  variables: [
    { name: "routesDir" },
    { name: "routename", description: "filename and foldername in snakecase, example: 'configure-search', 'about'" },
    { name: "RouteName"
    , default: ({routename}) => capitallize(routename)
    },
  ],
  outDir: "./src/app",
  onComplete: (vars) => {
    const s = vars["routename"]
    const c = vars.RouteName
    console.log(
    `
    Add to parent module (app.module.ts)

/* Feature Modules */
import { ${c}Module } from './${s}/${s}.module';

@NgModule({
  imports: [
    // Feature Routes
    ${c}Module,
    `)
  }
}

function capitallize(str) {
  return String(str)
    .split('-')
    .map(a => a[0].toUpperCase() + a.slice(1))
    .join('')
}
