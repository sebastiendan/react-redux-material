export function arrayBufferToBase64(buffer: Buffer) {
  if (!buffer) {
    return
  }

  let binary = ''
  const bytes = Buffer.from(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) {
    return true
  }

  if (a == null || b == null) {
    return false
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
