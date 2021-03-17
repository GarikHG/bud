import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  useInput,
  useState,
  Box,
} from '@roots/bud-support'
import type {Framework} from '@roots/bud-typings'

import {useStyle} from '@roots/ink-use-style'
import {useDisk} from '../../hooks/useDisk'
import {usePackageJson} from '../../hooks/usePackageJson'
import {useCompilation} from '../../hooks/useCompilation'

import {Body} from './Body'
import {Footer} from './Footer'
import {Main, Screen} from '../../components'
import {Progress} from '../../components/Progress'
import {Module} from '../../components/Module'

export const Reporter: FunctionComponent<{
  bud: Framework
}> = ({bud}) => {
  const {
    stats,
    progress,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  } = useCompilation(bud)

  const {bounds, col, colors} = useStyle(bud.store.get('theme'))
  const [disk] = useDisk(bud)
  const [themeLoaded, setThemeLoaded] = useState(false)
  const pkg = usePackageJson(disk)

  /**
   * Ink app
   */
  const app = useApp()

  useInput(input => {
    if (input == 'q') {
      console.clear()
      app.exit()
      process.exit()
    }
  })

  useEffect(() => {
    if (!bud.isProduction) return

    const isComplete = progress?.decimal >= 1

    ;(isComplete || hasErrors) &&
      setTimeout(() => {
        app.exit()
      }, 100)
  }, [stats, progress, errors])

  /**
   * Ink theme
   */
  useEffect(() => {
    bounds && col && colors && setThemeLoaded(true)
  }, [bounds, col, colors])

  return (
    <Screen paddingX={1} paddingBottom={1}>
      <Main>
        <Body
          bud={bud}
          col={col}
          colors={colors}
          stats={stats}
          progress={progress}
          errors={errors}
          hasErrors={hasErrors}
          warnings={warnings}
          hasWarnings={hasWarnings}
        />

        {themeLoaded && (
          <>
            {bud.isDevelopment && (
              <Module label="Information">
                <Footer
                  hasErrors={hasErrors}
                  bud={bud}
                  bounds={bounds}
                  col={col}
                  pkg={pkg}
                  colors={colors}
                  progress={progress}
                  stats={stats}
                />
              </Module>
            )}

            <Box paddingX={1}>
              <Progress
                progress={progress}
                bounds={bounds}
                col={col}
                colors={colors}
                hasErrors={hasErrors}
              />
            </Box>
          </>
        )}
      </Main>
    </Screen>
  )
}
