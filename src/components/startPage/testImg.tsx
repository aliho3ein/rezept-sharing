import { ChangeEvent } from "react";
import { uploadRecipeImg } from "../../actions/imageStorage";

const TestImg = () => {
  /** start */
  const getUrl = (e: ChangeEvent) => {
    uploadRecipeImg(e, "userid", 2)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  /** end */

  return (
    <div>
      TestImg
      <input type="file" name="" id="" onChange={getUrl} />
    </div>
  );
};

export default TestImg;
