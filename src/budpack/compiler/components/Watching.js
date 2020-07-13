import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import PropTypes from 'prop-types'

/**
 * Watch mode indicator
 * @prop {object} options
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
const Watching = ({options, build}) => (
  <Box flexDirection="row">
    {options?.mode == 'development' &&
    build?.errors?.length > 0 ? (
      <Text color="#dc3545">
        <Text>
          <Spinner type="dots" />
        </Text>
        {' Watching for fixes'}
      </Text>
    ) : build?.percentage == 1 ? (
      <Text color="#28a745">
        <Text>
          <Spinner type="dots" />
        </Text>
        {' Watching for changes'}
      </Text>
    ) : (
      []
    )}
  </Box>
)

Watching.propTypes = {
  options: PropTypes.object,
  build: PropTypes.object,
}

export {Watching}
