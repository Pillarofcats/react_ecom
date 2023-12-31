import { tPurchase } from "../../types/types";
import ProductStars from "../Product/ProductStars";
import { useState } from "react";

export default function UserAccountProductPurchases({
  purchases,
}: {
  purchases: tPurchase[];
}) {
  const [toggleView, setToggleView] = useState<boolean>(false);

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 items-center">
      <h1 className="text-center text-3xl font-semibold">User Purchases</h1>
      <button
        className="formButton"
        onClick={() => setToggleView((state) => !state)}>
        View
      </button>

      <div
        className={`flex flex-col gap-2 items-center lg:h-[27rem] ${
          toggleView && purchases.length > 0 ? "overflow-y-scroll" : ""
        }`}>
        {toggleView
          ? purchases.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex-col xl:flex-row flex border p-2 gap-2 w-[90%] shadow-md rounded-sm">
                  <div className="self-center flex flex-col items-center">
                    <img
                      className="w-[15rem]"
                      src={`/products/${item?.p_id}.jpg`}
                      alt="product image"
                    />
                    <label>{item.title}</label>
                  </div>

                  <div className="userAccountContainer p-2 w-full">
                    <p>Stars:</p>
                    <ProductStars stars={item?.stars} />
                    <p>Price:</p>
                    <p>$ {(item?.price_cent * 0.01).toFixed(2)}</p>
                    <p>Date:</p>
                    <p>{`${item?.purchase_date}`.slice(0, 10)}</p>
                    <p>Qty:</p>
                    <p className="breakWord">{`${item?.qty_purchased}`}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
