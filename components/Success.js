import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import toast, { Toaster } from "react-hot-toast";
const Success = () => {
  const [cartItems, setCartItems] = useState([]);
  const itemPrice = cartItems?.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemPrice * 0.15;
  const shippingPrice = itemPrice > 2000 ? 0 : 20;
  const totalPrice = itemPrice + taxPrice + shippingPrice;

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  useEffect(async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();
  }, []);

  return (
    <div className={styles.main}>
      <div className="block w-full lg:w-1/2 bg-orange-400 p-12">
        <Toaster />
        <div className="mb-4">
          <h1>Your Purchase</h1>
        </div>

        <Link href="/shop">
          <div>
            {cartItems?.length ? (
              <button className="text-black  float-right focus:outline-none hover:text-white rounded">
                Add More Items
              </button>
            ) : null}
          </div>
        </Link>
        {cartItems?.map((item) => (
          <div key={item.sku} className="bg-slate-300 p-5 m-1 mt-12">
            <div>
              <div className="row flex flex-row p-1">
                <div className="pr-5">
                  <Image
                    className="object-cover object-center"
                    src={`${item.thumbnail}`}
                    alt="ecommerce thumbnail"
                    width={133}
                    height={133}
                  />
                </div>
                <div className="basis-3/4">
                  <h2>{item.name}</h2>
                  <div className="row p-1">Quantity: {item.qty}</div>
                </div>
                <div className="text-right font-bold">${item.price}</div>
              </div>
            </div>
          </div>
        ))}
        {cartItems?.length !== 0 && (
          <>
            <div className="row mt-11">
              <div>Items Price</div>
              <div className="text-right">
                {itemPrice ? `$${itemPrice.toFixed(2)}` : null}
              </div>
            </div>
            <div className="row">
              <div className="">Tax Price</div>
              <div className="text-right">
                {itemPrice ? `$${taxPrice.toFixed(2)}` : null}
              </div>
            </div>
            <div className="row">
              <div>Shipping Price</div>
              <div className="text-right">
                {itemPrice ? `$${shippingPrice.toFixed(2)}` : null}
              </div>
            </div>
            <div className="row">
              <div>Total Price</div>
              <div className="text-right font-bold">
                {totalPrice ? `$${totalPrice.toFixed(2)}` : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;
