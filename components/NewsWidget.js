import React from "react";
import Image from "next/image";

function NewsWidget({ item }) {
  return (
    <div key={item.id} className="w-full scale-95 cursor-pointer max-w-sm">
      <div className="text-left overflow-hidden max-w-sm">
        <Image
          src={item.thumbnail}
          alt="News thumbnail"
          width={500}
          height={300}
          className="object-cover w-full h-48 rounded-lg"
        />
        <div className="mt-3">
          <h2 className="text-lg font-semibold title-font text-gray-900">
            {item?.title}
          </h2>
          <p className="leading-relaxed mt-1 text-gray-600 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            ipsum nec pulvinar finibus. Proin non ipsum eu dui tempor iaculis
            ultrices id velit. Donec eget accumsan ipsum. Sed ipsum dui, porta
            sit amet gravida id
          </p>
          <p className="text-indigo-500 inline-flex items-center mt-3">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsWidget;
