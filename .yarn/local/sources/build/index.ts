import {Command} from '../Command'
import {Option} from 'clipanion'

export class BuildCommand extends Command {
  static paths = [[`repo`, `build`]]

  public cjs = Option.Boolean(`-c,--cjs`, false)
  public esm = Option.Boolean(`-e,--esm`, false)
  public clean = Option.Boolean(`--clean`, false)
  public force = Option.Boolean(`--force`, false)
  public verbose = Option.Boolean(`--verbose`, true)

  async execute() {
    const all = !this.cjs && !this.esm

    if (this.clean && this.force) {
      console.error('--clean and --force are mutually exclusive')
    }

    if (this.clean) {
      this.verbose = false
    }

    if (this.cjs || all) {
      await this.$(
        `yarn tsc -b tsconfig.json${
          this.verbose ? ` --verbose` : ``
        }${this.clean ? ` --clean` : ``}${
          this.force ? ` --force` : ``
        }`,
      )
    }

    if (this.esm || all) {
      await this.$(
        `yarn tsc -b tsconfig.esm.json${
          this.verbose ? ` --verbose` : ``
        }${this.clean ? ` --clean` : ``}${
          this.force ? ` --force` : ``
        }`,
      )
    }

    await this.$(`yarn repo compile @roots/container`)
    await this.$(`yarn repo compile @roots/filesystem`)
    await this.$(`yarn repo compile @roots/bud-dashboard`)
    await this.$(`yarn repo compile @roots/container`)
    await this.$(`yarn repo compile @roots/bud-support`)

    if (this.clean) return
  }
}
