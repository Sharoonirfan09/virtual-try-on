/** Deep link that opens a specific garment directly in the try-on demo. */
export function tryOnLink(productId: string) {
  return `/?look=${encodeURIComponent(productId)}#try`;
}
