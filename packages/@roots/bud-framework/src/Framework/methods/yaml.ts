import {readFile, writeFile} from 'fs-extra'
import yaml from 'js-yaml'

export const read = async (file: string): Promise<any> => {
  const source = await readFile(file, 'utf8')
  return yaml.load(source)
}

export const write = async (
  file: string,
  data: any,
): Promise<void> => {
  const source = yaml.dump(data)
  await writeFile(file, source)
}
