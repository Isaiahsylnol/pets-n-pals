import axios from "axios";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

async function fetchData(sku) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/product/${sku}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

export default function DynamicPage({ data }) {
  let user = {};

  const [rating, setRating] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, []);
  function changeRating(newRating, name) {
    setRating(newRating);
  }

  function onAdd(product) {
    let newCartItems;
    const exist = cartItems.find((x) => x.sku === product.sku);
    if (exist) {
      newCartItems = cartItems.map((x) =>
        x.sku === product.sku ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      newCartItems = [...cartItems, { ...product, qty: 1 }];
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  }

  return (
    <div>
      <Header countCartItems={cartItems.length} />
      <section className="text-gray-600 body-font flex justify-center w-full">
        <div className="py-16">
          <div className="flex justify-center mx-auto items-center">
            <Image
              src={`${data.thumbnail}`}
              alt="Product thumbnail"
              width={502}
              height={500}
            />
          </div>
          <div className="max-w-3xl mt-6 p-8">
            <h2 className="text-sm text-gray-500 tracking-widest">
              Brand Name
            </h2>
            <h1 className="text-gray-900 text-lg title-font font-medium mb-1 inline-flex">
              {data.name}
            </h1>
            <button className="w-7 h-7 text-gray-500 hover:text-red-600 ml-2">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
            <br />
            <StarRatings
              rating={parseInt(data.rating)}
              starRatedColor="orange"
              changeRating={changeRating}
              numberOfStars={5}
              starDimension="20px"
              starSpacing="0px"
              name="rating"
            />
            <p className="leading-relaxed text-sm mt-5 max-w-lg">
              {data.description}
            </p>
            <hr className="flex items-center border-b-2 border-gray-100 mt-5 mb-5" />
            <div className="flex">
              <span className="font-medium text-2xl text-gray-900">
                ${data.price}
              </span>
              <button
                onClick={() => onAdd(data)}
                className="ml-auto text-white font-medium text-sm bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded-3xl"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const data = await fetchData(slug);

  return {
    props: {
      data,
    },
  };
}
