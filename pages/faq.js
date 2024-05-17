import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import AccordionItem from "../components/Accordion.js";

export default function Faq() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const countCartItems = cartItems?.length ?? 0;

  const toggleAccordion = (index) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }))
    );
  };

  const [accordionItems, setAccordionItems] = useState([
    {
      title: "What is your return policy?",
      content:
        "Laboris voluptate eu mollit anim consectetur. Ut commodo exercitation adipisicing ea sint reprehenderit. Nostrud consectetur voluptate excepteur tempor aliquip aliqua ea proident labore eu cillum commodo.",
      isOpen: false,
    },
    {
      title: "How do I track my order?",
      content:
        "Elit eu eu anim labore qui eu. Pariatur nulla irure aliquip duis elit aliquip. Incididunt est occaecat eu sunt adipisicing anim sunt ullamco adipisicing excepteur. Voluptate Lorem aliqua ut aute eu culpa deserunt elit.",
      isOpen: false,
    },
    {
      title: "Can I purchase items again?",
      content:
        "Lorem duis nisi consequat ad culpa velit magna qui nulla minim. Aliquip qui ex ullamco consectetur cupidatat dolor amet. Enim dolor ipsum ullamco est do. Cillum mollit anim nisi aute sunt veniam. Duis consectetur excepteur esse anim enim minim proident. Ipsum amet fugiat et ipsum exercitation.",
      isOpen: false,
    },
    {
      title: "Manage your Premium membership",
      content:
        "Anim adipisicing anim voluptate laboris sunt dolore. Qui sunt sint nisi dolore velit adipisicing aute quis consequat. Nulla ullamco deserunt proident sunt consequat adipisicing tempor veniam.",
      isOpen: false,
    },
    {
      title: "Privacy and safety",
      content:
        "Exercitation quis labore culpa tempor dolore ipsum irure aliqua amet anim aliquip. Commodo occaecat eiusmod aute esse ea laboris id minim. Ea ad commodo sit enim duis dolor dolore velit minim. Dolor dolore cillum enim deserunt duis aute deserunt. Sint dolore pariatur incididunt voluptate. In veniam aliqua commodo do aute nulla est Lorem aliquip nostrud eu pariatur ex irure.",
      isOpen: false,
    },
    {
      title: "Paid Partnerships policy",
      content:
        "Culpa consequat voluptate eiusmod velit quis occaecat irure enim cupidatat aliquip. Anim adipisicing labore duis exercitation est consectetur cupidatat reprehenderit sunt do labore anim minim deserunt. Tempor minim esse magna veniam est sint velit reprehenderit. Exercitation esse aute aliqua et.",
      isOpen: false,
    },
    {
      title: "Additional information about data processing",
      content:
        "Nisi ad do incididunt veniam et deserunt exercitation amet. Proident nisi qui sit et do qui do consequat nisi sint et. Magna fugiat reprehenderit in aute esse eu exercitation do consequat et occaecat officia. Mollit incididunt veniam Lorem eu.",
      isOpen: false,
    },
  ]);

  return (
    <>
      <Head>
        <title>Help Center</title>
        <meta name="description" content="Help Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={countCartItems} />
      <main className="min-h-screen w-full p-12">
        <h1 className="text-3xl text-center font-bold pb-16">
          How can we help you?
        </h1>
        <div className="text-lg sm:p-7 sm:max-w-3xl mx-auto">
          <p>Browse help topics</p>
          <div className="mt-4 border border-gray-400 rounded-md">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isOpen={item.isOpen}
                onClick={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
