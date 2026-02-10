let locked = false
let timeoutId: ReturnType<typeof setTimeout> | null = null

export const isLocked = () => locked

export const lock = () => {
  locked = true

  if (timeoutId !== null) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    console.warn('Transition lock held too long, auto-unlocking')
    locked = false
    timeoutId = null
  }, 2000)
}

export const unlock = () => {
  locked = false

  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}
