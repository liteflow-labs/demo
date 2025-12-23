import type { ImageLoaderProps } from 'next/image'

function getUrl(src: string) {
  try {
    return new URL(src)
  } catch {
    return null
  }
}

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  console.log('custom image loader', { src, width, quality })
  const q = quality ?? 75

  if (src.startsWith('http://') || src.startsWith('https://')) {
    const url = getUrl(src)
    if (url) {
      if (url.hostname.includes('mypinata.cloud')) {
        url.searchParams.append('img-width', width.toString())
        url.searchParams.append('img-quality', q.toString())
        console.log('pinata url', url.toString())
        return url.toString()
      }
    }
  }

  console.log(
    'next image url',
    `/_next/image` +
      `?url=${encodeURIComponent(src)}` +
      `&w=${width}` +
      `&q=${q}`,
  )
  return (
    `/_next/image` +
    `?url=${encodeURIComponent(src)}` +
    `&w=${width}` +
    `&q=${q}`
  )
}
