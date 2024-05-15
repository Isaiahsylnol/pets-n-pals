import axios from "axios";

const fetchArticles = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/article/all`);
};

const ArticleService = {
  fetchArticles,
};

export default ArticleService;
