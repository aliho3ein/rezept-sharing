import { Dispatch, FC, SetStateAction, useState } from "react";
import style from "../../styles/userProfile/recipeForm.module.scss";

export interface Material {
  name: string;
  count: string;
  unit: string;
}
type IngredientProps = {
  addAnotherIngredientInstance: Dispatch<SetStateAction<number>>;
  addToMaterial: Function;
};

const Ingredient: FC<IngredientProps> = ({
  addAnotherIngredientInstance,
  addToMaterial,
}) => {
  const [material, setMaterial] = useState<Material>({
    name: "",
    count: "",
    unit: "",
  });

  function handleInputChange(event: any) {
    const { id, value } = event.target;
    setMaterial({ ...material, [id]: value });
  }

  function handleConfirmIngredient() {
    addToMaterial(material);
  }

  return (
    <section>
      <input
        type="text"
        placeholder="Zutat"
        id="name"
        value={material.name}
        onChange={handleInputChange}
        className={style.ingredientInput}
      />
      <input
        type="number"
        id="count"
        min="1"
        value={material.count}
        onChange={handleInputChange}
        className={style.countInput}
      />
      <select
        id="unit"
        value={material.unit}
        onChange={handleInputChange}
        className={style.unitSelect}
      >
        <option value="Stück">Stück</option>
        <option value="Gramm">Gramm</option>
        <option value="Milliliter">Milliliter</option>
        <option value="Tasse">Tasse</option>
        <option value="Teelöffel">Teelöffel</option>
        <option value="Esslöffel">Esslöffel</option>
      </select>
      <button
        type="button"
        onClick={() =>
          addAnotherIngredientInstance((prevIngredients) => prevIngredients + 1)
        }
        className={style.addInstanceBtn}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <button type="button" onClick={handleConfirmIngredient}>
        Confirm Ingredient
      </button>
    </section>
  );
};

export default Ingredient;

// Tasks to do on this component

// - button to delete an instance
// - button to confirm inputs of an instance
// - a tooltip indicating users that their inputs are complete
// - a button which closes the form
// - a popup which asks the user whether to stay on the recipe form
// - on UserProfilePage -> popup for the recipe form on button click
// - RecipeForm && Ingredient -> apply styling
// - RecipeForm -> send formData to backend -> test if data is sent correctly
