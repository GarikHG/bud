import {Command} from '../Command'
import {Option} from 'clipanion'

export class MakeCommand extends Command {
  static paths = [[`repo`, `make`]]

  public dfx = Option.Boolean(`-d,--dfx`, false)

  async execute() {
    await this.$(`yarn install --immutable`)

    await this.$(`yarn repo build`)

    await this.$(`yarn repo lint --eslint --skypack`)

    await this.$(`yarn repo test`)
  }
}
