// pins workspace root so the stray lockfile in C:\Users\abdallah doesn't confuse Turbopack
export default {
  turbopack: { root: import.meta.dirname },
}
