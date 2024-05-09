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
      <div className="text-center sm:text-left">
        {item ? (
          <Image
            className="object-cover object-center mx-auto"
            src={item?.thumbnail}
            alt="Product thumbnail"
            width={280}
            height={280}
          />
        ) : null}

        <div className="m-4">
          <div className="mb-1">
            <StarRatings
              rating={item?.rating}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="5px"
              name="rating"
            />
          </div>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {item?.name}
          </h2>
          <p className="mt-1">${item?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
