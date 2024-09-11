export function shortenAddress(
  address: string,
  startLength = 4,
  endLength = 4,
) {
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}
