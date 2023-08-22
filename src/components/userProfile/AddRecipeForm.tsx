import { ChangeEvent, FC, useState } from "react";
import Ingredient, { Material } from "./Ingredient";
import style from "../../styles/userProfile/recipeForm.module.scss";
import instance from "../../api/instance";
import { uploadRecipeImg } from "../../actions/imageStorage";
// import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  material: Material[];
  desc: string;
  category: string[];
  time: string | number;
  image: string[];
}

const AddRecipeForm: FC = () => {
  // const navigate = useNavigate();
  const [anotherIngredientInstance, setAnotherIngredientInstance] =
    useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    material: [],
    desc: "",
    category: [],
    time: 0,
    image: [],
  });

  function addIngredientToMaterial(ingredient: Material) {
    setFormData((prevData) => ({
      ...prevData,
      material: [...prevData.material, ingredient],
    }));
  }

  function handleInputChange(event: any) {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  function handleCategoryChange(event: any) {
    const { checked, value } = event.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...prevData.category, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        category: prevData.category.filter((category) => category !== value),
      }));
    }
  }

  const userId = "64b19a04a6306177a70fa74c";

  // if (!userId) {
  //   navigate("/signin");
  // }

  function handleSubmit(event: any) {
    event.preventDefault();
    instance
      .post(`/recipe/create/${userId}`, formData)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
    // console.log(formData);
  }

  const getUrl = (e: ChangeEvent) => {
    uploadRecipeImg(e, Date.now())
      .then((res) =>
        setFormData({ ...formData, image: [...formData.image, res] })
      )
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className={style.recipeForm}>
      <h1>Rezept erstellen</h1>
      <input
        type="text"
        id="title"
        placeholder="Gib deinem Rezept einen Namen."
        value={formData.title}
        onChange={handleInputChange}
        className={style.titleInput}
      />
      {[...Array(anotherIngredientInstance)].map((_, index) => {
        return (
          <Ingredient
            key={index}
            addAnotherIngredientInstance={setAnotherIngredientInstance}
            addToMaterial={addIngredientToMaterial}
          />
        );
      })}
      <textarea
        id="desc"
        placeholder="Zubereitung..."
        value={formData.desc}
        onChange={handleInputChange}
        className={style.descArea}
      ></textarea>
      <p>Wähle Kategorien für dein Rezept aus</p>
      <section>
        <label>
          <input
            type="checkbox"
            value="Sonstige"
            onChange={handleCategoryChange}
          />
          Sonstige
        </label>
        <label>
          <input
            type="checkbox"
            value="Asiatisch"
            onChange={handleCategoryChange}
          />
          Asiatisch
        </label>
        <label>
          <input
            type="checkbox"
            value="Italienisch"
            onChange={handleCategoryChange}
          />
          Italienisch
        </label>
        <label>
          <input
            type="checkbox"
            value="Oriental"
            onChange={handleCategoryChange}
          />
          Oriental
        </label>
        <label>
          <input
            type="checkbox"
            value="Burger"
            onChange={handleCategoryChange}
          />
          Burger
        </label>
        <label>
          <input
            type="checkbox"
            value="Griechisch"
            onChange={handleCategoryChange}
          />
          Griechisch
        </label>
        <label>
          <input
            type="checkbox"
            value="Spanisch"
            onChange={handleCategoryChange}
          />
          Spanisch
        </label>
        <label>
          <input
            type="checkbox"
            value="Meeresfrüchte"
            onChange={handleCategoryChange}
          />
          Meeresfrüchte
        </label>
        <label>
          <input
            type="checkbox"
            value="Vegan"
            onChange={handleCategoryChange}
          />
          Vegan
        </label>
        <label>
          <input
            type="checkbox"
            value="Sushi"
            onChange={handleCategoryChange}
          />
          Sushi
        </label>
        <label>
          <input
            type="checkbox"
            value="BBQ/Grill"
            onChange={handleCategoryChange}
          />
          BBQ/Grill
        </label>
        <label>
          <input
            type="checkbox"
            value="Snacks"
            onChange={handleCategoryChange}
          />
          Snacks
        </label>
      </section>
      <input
        type="number"
        id="time"
        min="1"
        value={formData.time}
        onChange={handleInputChange}
      />
      <span>Zubereitungszeit in min.</span>
      <input
        type="file"
        id="image"
        multiple
        value={formData.image}
        onChange={getUrl}
      />
      <button type="submit">Rezept erstellen</button>
    </form>
  );
};

export default AddRecipeForm;
