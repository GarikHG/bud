// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

import type {tailwind} from './tailwind.config'
import {BudTailwindCssExtension} from './tailwind.service'

declare module '@roots/bud-framework' {
  interface Framework {
    tailwind: tailwind
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCssExtension
  }
}

export const {name, api, boot} = BudTailwindCssExtension
