import { ChangeEvent, FC, useState } from "react";
import Ingredient, { Material } from "./Ingredient";
import style from "../../styles/userProfile/recipeForm.module.scss";
import instance from "../../api/instance";
import { uploadRecipeImg } from "../../actions/imageStorage";
import { alertMassage } from "../../actions/alerts";
import { Link, useParams } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  material: Material[];
  desc: string;
  category: string[];
  time: string;
}

const categories: string[] = [
  "Sonstiges",
  "Asiatisch",
  "Italienisch",
  "Oriental",
  "Burger",
  "Griechisch",
  "Spanisch",
  "Meeresfrüchte",
  "Vegan",
  "Sushi",
  "BBQ/Grill",
  "Snacks",
];

const AddRecipeForm: FC = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [anotherIngredientInstance, setAnotherIngredientInstance] =
    useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    material: [],
    desc: "",
    category: [],
    time: "",
  });
  const [image, setImg] = useState<string[]>([]);

  function addIngredientToMaterial(ingredient: Material) {
    setFormData((prevData) => ({
      ...prevData,
      material: [...prevData.material, ingredient],
    }));
  }

  function removeIngredientFromMaterial(indexToRemove: number) {
    setFormData((prevData) => ({
      ...prevData,
      material: prevData.material.filter((_, index) => index !== indexToRemove),
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

  const userId = id;

  function handleSubmit(event: any) {
    event.preventDefault();
    instance
      .post(`/recipe/create/${userId}`, { ...formData, image })
      .then(() => alertMassage("Rezept gespeichert"))
      .catch(() => alertMassage("Fehler beim Speichern", "error"));
  }

  const getUrl = (e: ChangeEvent) => {
    uploadRecipeImg(e, Date.now())
      .then((res) => res && setImg([...image, res]))
      .catch((err) => console.log(err));
  };

  function handleRemoveImages() {
    setImg([]);
  }

  return (
    <form onSubmit={handleSubmit} className={style.recipeForm}>
      <h1>Rezept erstellen</h1>
      <Link to={`/user-profile/${userId}`} className={style.backToProfile}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2>Titel</h2>
      <input
        type="text"
        id="title"
        placeholder="Gib deinem Rezept einen Namen."
        value={formData.title}
        onChange={handleInputChange}
        className={style.titleInput}
      />
      <h2>Zutaten</h2>
      {[...Array(anotherIngredientInstance)].map((_, index) => {
        return (
          <Ingredient
            key={index}
            addAnotherIngredientInstance={setAnotherIngredientInstance}
            removeIngredientInstance={setAnotherIngredientInstance}
            addToMaterial={addIngredientToMaterial}
            removeFromMaterial={removeIngredientFromMaterial}
            instanceCount={anotherIngredientInstance}
            identifier={index}
          />
        );
      })}
      <h2>Beschreibung</h2>
      <textarea
        id="desc"
        placeholder="Beschreibe hier, wie man dein Gericht zubereitet."
        value={formData.desc}
        onChange={handleInputChange}
        className={style.descArea}
      ></textarea>
      <h2>Zubereitungsdauer</h2>
      <input
        type="text"
        id="time"
        placeholder="Minuten"
        value={formData.time}
        onChange={handleInputChange}
        className={style.timeInput}
      />
      <h3>Wähle Kategorien für dein Rezept aus</h3>
      <section className={style.categorySection}>
        {categories.map((category) => (
          <>
            <input
              type="checkbox"
              value={category}
              onChange={handleCategoryChange}
              className={style.categoryCheckbox}
              id={category}
            />
            <label
              htmlFor={category}
              key={category}
              className={style.categoryLabel}
            >
              {category}
            </label>
          </>
        ))}
      </section>
      <h3>Lade bis zu 4 Bilder von deinem Gericht hoch</h3>
      <section className={style.fileInputSection}>
        {image.length < 4 && (
          <label htmlFor="image">
            <i
              className={`fa-solid fa-arrow-up-from-bracket ${style.fileInputBtn}`}
            ></i>
          </label>
        )}

        <input
          type="file"
          id="image"
          multiple
          accept="image/*"
          onChange={getUrl}
          className={style.fileInput}
        />

        {image.map((img, index) => {
          return <img src={img} key={index} className={style.fileInputImg} />;
        })}
        {image.length > 0 && (
          <i
            className={`fa-solid fa-trash-can ${style.fileInputImgDelete}`}
            onClick={handleRemoveImages}
          ></i>
        )}
      </section>
      {image.length === 4 && (
        <p className={style.fileInputMaximum}>
          Maximale Anzahl an Bildern erreicht
        </p>
      )}
      <button type="submit" className={style.saveBtn}>
        Speichern
      </button>
    </form>
  );
};

export default AddRecipeForm;
