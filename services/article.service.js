import axios from "axios";

// const fetchArticles = () => {
//   return axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/article/all`);
// };

const fetchArticlesByBreed = (breeds) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/article/all`, {
    breed: breeds,
  });
};
const ArticleService = {
  // fetchArticles,
  fetchArticlesByBreed,
};

export default ArticleService;
