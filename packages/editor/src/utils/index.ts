export const toJS = (val) => {
  try {
    return JSON.parse(JSON.stringify(val))
  } catch (e) {
    return null
  }
}
