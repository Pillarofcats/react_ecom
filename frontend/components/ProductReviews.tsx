export default function ProductReviews({ reviews }: { reviews: { r:string}[] }) {
  return (
    <div className="self-center flex flex-col">
      <label className="text-2xl">Reviews</label>
      {
        reviews.map((r,i) => {
          return <div key={i}>{ r.r }</div>
        })
      }
    </div>
  )
}
