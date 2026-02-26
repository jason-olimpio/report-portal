import RNFS from 'react-native-fs'

const REPORTS_DIR = `${RNFS.DocumentDirectoryPath}/reports`

const persistImageUris = async (uris: string[]) => {
  await ensureDirectory()

  const saved: string[] = []

  for (const uri of uris) {
    const extension = getFileExtensionFromUri(uri)
    const fileName = `img-${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`
    const from = toReadableSource(uri)
    const toPath = `${REPORTS_DIR}/${fileName}`

    try {
      await RNFS.copyFile(from, toPath)

      const ok = await RNFS.exists(toPath)

      if (!ok)
        throw new Error('Copy succeeded but file not found at destination')

      saved.push(`file://${toPath}`)
    } catch (exception) {
      console.error('persistImageUris: copy failed', {
        uri,
        from,
        toPath,
        error: String(exception),
      })
    }
  }

  return saved
}

const ensureDirectory = async () => {
  const exists = await RNFS.exists(REPORTS_DIR)

  if (!exists) await RNFS.mkdir(REPORTS_DIR)
}

const getFileExtensionFromUri = (uri: string) => {
  const uriWithoutQuery = uri.split('?')[0]
  const extensionMatch = uriWithoutQuery.match(/\.([a-zA-Z0-9]+)$/)
  const extension = (extensionMatch?.[1] ?? 'jpg').toLowerCase()

  return extension
}

const toReadableSource = (uri: string) =>
  uri.startsWith('file://') ? uri.replace(/^file:\/\//, '') : uri

export default persistImageUris
