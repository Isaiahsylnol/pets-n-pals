import React from "react";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import Link from "next/link";

const ProductCard = (props) => {
  const { item } = props;
  return (
    <Link
      href={{
        pathname: "/products/[sku]",
        query: {
          sku: item?.sku,
          name: item?.name,
          price: item?.price,
          thumbnail: item?.thumbnail,
          description: item?.description,
          rating: item?.rating,
        },
      }}
      as={`/product/${item?.sku}`}
      key={item?.sku}
    >
      <div className="text-center sm:text-left w-full grid grid-cols-2 sm:flex sm:flex-col space-x-3">
        {item ? (
          <Image
            className="object-cover object-center mx-auto"
            src={item?.thumbnail}
            alt="Product thumbnail"
            width={280}
            height={280}
          />
        ) : null}

        <div className="mt-3 flex flex-col items-start text-[14px]">
          <h2 className="text-gray-900 text-start">{item?.name}</h2>
          <div className="mb-1">
            <StarRatings
              rating={item?.rating}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="0px"
              name="rating"
            />
          </div>
          <p className="mt-2 font-bold">${item?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
