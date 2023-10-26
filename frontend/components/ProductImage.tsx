export default function ProductImage({ src, alt }: { src: string, alt: string} ) {
  return <img className="w-[30rem]" src={ src } alt={ alt } />
}
//self-center