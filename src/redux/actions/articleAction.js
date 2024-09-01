import { getAllArticles } from "../../services/artikel.service";
import { setArticleData, setIsLoading } from "../slices/articleSlice";

export const fecthArticleData = () => async (dispatch) => {
  try {
    const data = await getAllArticles();
    console.log("------", data);

    dispatch(setArticleData(data));
  } catch (err) {
    throw new Error(err.message);
  } finally {
    setIsLoading(false);
  }
};
