export function fakeAsyncOperation(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
