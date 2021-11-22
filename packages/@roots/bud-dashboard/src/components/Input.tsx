import {useInput} from 'ink'

import {isEqual} from '../services/lodash'

/**
 * KBD input handler
 *
 * @public
 */
export const Input = ({bud}) => {
  useInput(input => {
    isEqual(input, 'q') && bud.close()
  })

  return null
}
