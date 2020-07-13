import React from 'react'
import {Box, Spacer, Text} from 'ink'
import PropTypes from 'prop-types'

/**
 * List item indicator
 * @prop {boolean} active
 */
const Bullet = ({active}) => (
  <Text>{active ? '◉' : ' '}</Text>
)

Bullet.propTypes = {
  active: PropTypes.bool,
}

/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} config
 */
const Nav = ({build, focused, config}) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    marginBottom={1}>
    <Box>
      <Text color={'#545DD7'}>@roots/bud</Text>
    </Box>
    <Spacer />
    <Spacer />
    <Spacer />
    <Box>
      <Text color={focused?.assets ? 'white' : '#6C758F'}>
        <Bullet active={focused?.assets} /> Assets
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text
        color={
          build?.errors?.length > 0
            ? '#dc3545'
            : focused?.errors
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focused?.errors || false} /> Errors
        {build?.errors?.length > 0
          ? ` [${build?.errors.length}]`
          : `  `}
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text
        color={
          build?.warnings?.length > 0
            ? '#fd7e14'
            : focused?.warnings
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focused?.warnings || false} />{' '}
        Warnings
        {build?.warnings?.length > 0
          ? ` [${build?.warnings.length}]`
          : `  `}
      </Text>
    </Box>

    {!config?.features?.debug &&
      config?.features?.browserSync && (
        <>
          <Spacer />
          <Box>
            <Text
              color={
                focused?.browserSync ? 'white' : '#6C758F'
              }>
              <Bullet active={focused?.browserSync} />{' '}
              BrowserSync
            </Text>
          </Box>
        </>
      )}

    {config?.features?.debug && (
      <>
        <Spacer />
        <Box>
          <Text
            color={focused?.debug ? '#ffc107' : '#ffe598'}>
            <Bullet active={focused?.debug || false} />{' '}
            Debug
          </Text>
        </Box>
      </>
    )}
  </Box>
)

Nav.propTypes = {
  build: PropTypes.object,
  focused: PropTypes.object,
  config: PropTypes.object,
}

export {Nav}
