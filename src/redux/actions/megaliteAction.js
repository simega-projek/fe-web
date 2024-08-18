import { getAllArticles } from "../../services/artikel.service";
import { setMegalitData, setIsLoading } from "../slices/megalitSlice";

export const fecthMegalitData = () => async (dispatch) => {
  try {
    const data = await getAllArticles();

    dispatch(setMegalitData(data));
  } catch (err) {
    throw new Error(err.message);
  } finally {
    setIsLoading(false);
  }
};
