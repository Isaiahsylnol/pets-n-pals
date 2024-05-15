import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleService from "../../services/article.service.js";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/article/findById/${id}`
  );
  const article = response.data;

  return {
    props: {
      article, // Pass the article data
    },
  };
}

export async function getStaticPaths() {
  const { data } = await ArticleService.fetchArticles();

  const paths = data.map((article) => {
    return {
      params: { id: article.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default function DynamicArticle({ article }) {
  let user = {};
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, []);

  return (
    <div>
      <Header countCartItems={cartItems.length} />
      <main className={styles.main}>
        <div className="text-gray-600 sm:pb-36">
          <div className="flex flex-col mx-auto mt-8 justify-center items-center">
            <Image
              src={`${article.thumbnail}`}
              alt="Article thumbnail"
              width={902}
              height={500}
            />

            <div className="flex flex-col mx-auto mt-5 max-w-4xl p-8 sm:p-0">
              <h1 className="text-gray-900 text-3xl font-medium mb-6">
                {article.title}
              </h1>
              <p className="leading-relaxed">{article.description}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
