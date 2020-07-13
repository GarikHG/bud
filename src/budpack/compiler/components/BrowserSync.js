import React, {useState, useEffect} from 'react'
import {Box, Text, useFocus} from 'ink'
import PropTypes from 'prop-types'
import patchConsole from 'patch-console'

/**
 * BrowserSync
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
const BrowserSync = ({actions}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({browserSync: isFocused})
  }, [isFocused])

  const [lastConsole, setLastConsole] = useState(null)
  const [consoleOut, setConsoleOut] = useState('')
  patchConsole((stream, data) => {
    setLastConsole(data)

    const frameOut =
      lastConsole !== data ? consoleOut + data : consoleOut
    setConsoleOut(frameOut)
  })

  return (
    <Box
      display={isFocused ? 'flex' : 'none'}
      flexDirection="column">
      <Text>{consoleOut}</Text>
    </Box>
  )
}

BrowserSync.propTypes = {
  actions: PropTypes.object,
}

export {BrowserSync}
