## API Report File for "@roots/bud-compiler"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Compiler as Compiler_2 } from '@roots/bud-framework';
import { Compiler as Compiler_3 } from 'webpack';
import { Service } from '@roots/bud-framework';
import { StatsCompilation } from 'webpack';

// @public
export class Compiler extends Service implements Compiler_2 {
    before(): Promise<any[]>;
    callback(...args: any[]): void;
    compile(): Promise<Compiler_3>;
    // (undocumented)
    config: any;
    instance: Compiler_2.Instance;
    // (undocumented)
    invoke(config: any): Promise<Compiler_3>;
    isCompiled: boolean;
    progress: Compiler_2.Progress;
    register(): Promise<void>;
    stats: StatsCompilation;
}

```
