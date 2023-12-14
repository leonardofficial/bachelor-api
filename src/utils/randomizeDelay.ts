export function randomizeDelay(delay: number) {
  const random = Math.floor(Math.random() * 10);
  return delay + random;
}
