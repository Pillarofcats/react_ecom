export default function ProductImage({ src, alt }: { src: string, alt: string} ) {
  return <img className="w-[25rem] self-center" src={ src } alt={ alt } />
}
