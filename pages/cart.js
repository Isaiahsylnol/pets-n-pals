import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import { createCart } from "../slices/cart";
import Image from "next/image";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const itemPrice = cartItems?.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemPrice * 0.13;
  const shippingPrice = itemPrice > 2000 ? 0 : 20;
  const totalPrice = itemPrice + taxPrice + shippingPrice;

  useEffect(() => {
    setLoading(true);
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    // Dispatch event to create cart object in DB
    if (totalPrice > 20) {
      dispatch(
        createCart({
          userId: currentUser?.id,
          status: true,
          total: totalPrice,
          products: cartItems,
        })
      );
    }
  }, [totalPrice]);

  async function handleCheckout() {
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
    toast.loading("Redirecting");
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  function onAdd(product) {
    const exist = cartItems.find((x) => x.sku === product.sku);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.sku === product.sku ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  }

  function onRemove(product) {
    const exist = cartItems.find((x) => x.sku === product.sku);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.sku !== product.sku);
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.sku === product.sku ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  }

  function onDelete(product) {
    const newCartItems = cartItems.filter(
      (item) => !(item.sku === product.sku)
    );
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  return loading ? (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Shopping cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={cartItems?.length} />
      {cartItems?.length ? (
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 w-full flex text-lg uppercase p-8">
            Shopping Cart
          </h1>
          {/* Layout Container */}
          <div className="h-fit flex flex-col">
            <div className="max-w-8xl lg:p-12 sm:grid md:grid-cols-2 gap-x-8 h-screen">
              {/* Left Grid item - Cart products */}
              <section>
                <Link href="/shop">
                  {cartItems?.length ? (
                    <button className="text-gray-500 text-sm focus:outline-none underline rounded uppercas ml-12 mt-6 sm:mt-0 pb-3">
                      Add More Items
                    </button>
                  ) : null}
                </Link>
                <Toaster />
                {/* Displayed cart items */}
                {cartItems?.map((item) => (
                  <div key={item.sku} className="p-3">
                    <div className="flex flex-row p-1">
                      {/* Remove product from cart button */}
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="pr-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <Image
                        className="object-cover"
                        src={`${item.thumbnail}`}
                        alt="ecommerce thumbnail"
                        width={196}
                        height={196}
                      />
                      <div className="basis-3/4 ml-5">
                        <h2>{item.name}</h2>
                        <div className="p-1">Quantity: {item.qty}</div>
                        <div className="p-1">
                          <button
                            onClick={() => onRemove(item)}
                            className="p-1 text-lg font-extrabold"
                          >
                            -
                          </button>
                          <button
                            onClick={() => onAdd(item)}
                            className="add p-1 w-12 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">${item.price}</div>
                    </div>
                  </div>
                ))}
              </section>
              {/* Right Grid Item - Transaction summary */}
              <section>
                {/* Transaction details */}
                <div className="w-full md:w-4/6 max-w-lg mx-auto md:float-right top-28 sticky">
                  {/* Card header  */}
                  {cartItems?.length !== 0 && (
                    <div className="p-4">
                      <div className="border-b-2 w-full border-gray-300 pb-2">
                        <h1 className="text-lg font-semibold mb-3">Summary</h1>
                      </div>
                      <div className="flex p-1">
                        <span className="w-full">Items Price</span>
                        <span className="text-right w-full">
                          {itemPrice ? `$${itemPrice.toFixed(2)}` : null}
                        </span>
                      </div>
                      <div className="flex p-1">
                        <span className="w-full">Tax Price</span>
                        <span className="text-right w-full">
                          {itemPrice ? `$${taxPrice.toFixed(2)}` : null}
                        </span>
                      </div>

                      <div className="flex p-1">
                        <span className="w-full">Shipping</span>
                        <span>
                          {itemPrice ? `$${shippingPrice.toFixed(2)}` : null}
                        </span>
                      </div>

                      <div className="flex p-1">
                        <span className="w-full text-base font-semibold">
                          Order Total
                        </span>
                        <span className="text-right w-full text-base font-semibold">
                          {totalPrice ? `$${totalPrice.toFixed(2)}` : null}
                        </span>
                      </div>
                      {cartItems ? (
                        <button
                          type="submit"
                          onClick={handleCheckout}
                          className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg"
                        >
                          Checkout
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl text-center uppercase font-bold h-screen mt-64">
          YOUR BAG IS CURRENTLY EMPTY.
          <Link href="/shop">
            <button className="flex mx-auto py-2 px-6 mt-8 text-white text-base bg-orange-700 hover:bg-[#1F1F1F] focus:outline-none rounded">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className="text-2xl text-center uppercase font-bold h-screen mt-64">
      Loading...
    </div>
  );
}
