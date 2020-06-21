import React from 'react'

import useView from './hooks/useView'
import useWebpack from './hooks/useWebpack'

import Assets from './components/Assets'
import App from './components/App'

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const BudpackCLI = ({compiler, mode}) => {
  const {height, width} = useView()
  const {assets} = useWebpack({compiler, mode})

  return (
    <App
      assets={assets}
      height={height}
      mode={mode}
      width={width}>
      <Assets assets={assets} width={width} />
    </App>
  )
}

export default BudpackCLI
