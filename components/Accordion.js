import React from "react";
import Image from "next/image";

export default function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-400 p-1">
      <button
        onClick={onClick}
        className="w-full text-left flex justify-between items-center p-4 hover:bg-gray-200 focus:outline-none"
      >
        <span className="text-base">{title}</span>
        {isOpen ? (
          <Image
            src={require("../assets/up-arrow.png")}
            height={15}
            width={15}
            alt="Up arrow"
          />
        ) : (
          <div className="w-5 h-5">
            <Image
              src={require("../assets/down-arrow.png")}
              height={15}
              width={15}
              alt="Down arrow"
            />
          </div>
        )}
      </button>
      {isOpen && (
        <div className="bg-orange-100 p-4">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
