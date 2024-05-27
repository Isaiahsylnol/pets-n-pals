import axios from "axios";

const fetchArticlesByBreed = (breeds) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/article/all`, {
    breed: breeds,
  });
};
const ArticleService = {
  fetchArticlesByBreed,
};

export default ArticleService;
