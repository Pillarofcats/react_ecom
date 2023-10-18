export default function ProductImage({ src, alt }: { src: string, alt: string} ) {
  return <img className="object-contain" src={ src } alt={ alt } />
}
