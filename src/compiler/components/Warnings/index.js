const React = require('React')
const {useEffect, useState} = require('react')
const {Box, Text, useFocus} = require('ink')
const PropTypes = require('prop-types')
const {Warning} = require('./Warning')

/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
const Warnings = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({warnings: isFocused})
  }, [isFocused])

  const [display, setDisplay] = useState(null)
  useEffect(() => {
    setDisplay(isFocused)
  }, [isFocused, build?.warnings])

  return (
    <Box
      display={display ? 'flex' : 'none'}
      flexDirection="column">
      {build?.warnings?.length > 0 &&
        build?.warnings?.map((warning, i) => (
          <Warning message={warning} key={i} />
        ))}

      {build?.warnings?.length == 0 && (
        <Text>Nothing to see here.</Text>
      )}
    </Box>
  )
}

Warnings.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
}

module.exports = {Warnings}
