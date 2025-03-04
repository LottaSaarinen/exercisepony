import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Siistitään ympäristö jokaisen testitapauksen jälkeen.
afterEach(() => {
  cleanup()
})
