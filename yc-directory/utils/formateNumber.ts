export function formateNumber(n: number, str: string) {
  if (n >= 2 && n <= 10) {
    return `${n} ${str}s`;
  }
  return `${n} ${str}`;
}
