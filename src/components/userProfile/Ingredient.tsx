import { Dispatch, FC, SetStateAction, useState } from "react";
import style from "../../styles/userProfile/recipeForm.module.scss";

export interface Material {
  name: string;
  count: string;
  unit: string;
}
type IngredientProps = {
  addAnotherIngredientInstance: Dispatch<SetStateAction<number>>;
  removeIngredientInstance: Dispatch<SetStateAction<number>>;
  addToMaterial: Function;
  removeFromMaterial: Function;
  instanceCount: number;
  identifier: number;
};

const Ingredient: FC<IngredientProps> = ({
  addAnotherIngredientInstance,
  addToMaterial,
  removeFromMaterial,
  removeIngredientInstance,
  instanceCount,
  identifier,
}) => {
  const [material, setMaterial] = useState<Material>({
    name: "",
    count: "",
    unit: "Stück",
  });
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  function handleInputChange(event: any) {
    const { id, value } = event.target;
    setMaterial({ ...material, [id]: value });
  }

  function handleConfirmIngredient() {
    addToMaterial(material);
    setIsConfirmed(true);
  }

  function handleUndoIngredient() {
    removeFromMaterial(identifier);
    setIsConfirmed(false);
  }

  return (
    <section
      className={style.ingredientInstance}
      style={{
        paddingLeft: instanceCount > 1 ? "45px" : "90px",
      }}
    >
      {instanceCount > 1 && !isConfirmed && (
        <i
          className={`fa-solid fa-trash-can ${style.closeInstanceBtn}`}
          onClick={() =>
            removeIngredientInstance((prevIngredients) => prevIngredients - 1)
          }
        ></i>
      )}

      <input
        type="text"
        placeholder="Zutat"
        id="name"
        value={material.name}
        onChange={handleInputChange}
        className={style.ingredientInput}
        disabled={isConfirmed}
      />
      <input
        type="text"
        id="count"
        placeholder="0"
        value={material.count}
        onChange={handleInputChange}
        className={style.countInput}
        disabled={isConfirmed}
      />
      <select
        id="unit"
        value={material.unit}
        onChange={handleInputChange}
        className={style.unitSelect}
        disabled={isConfirmed}
      >
        <option value="Stück">Stück</option>
        <option value="Gramm">Gramm</option>
        <option value="Milliliter">Milliliter</option>
        <option value="Tasse">Tasse</option>
        <option value="Teelöffel">Teelöffel</option>
        <option value="Esslöffel">Esslöffel</option>
      </select>
      <i
        className={`fa-solid fa-plus ${style.addInstanceBtn}`}
        onClick={() =>
          addAnotherIngredientInstance((prevIngredients) => prevIngredients + 1)
        }
      ></i>
      {!isConfirmed ? (
        <i
          className={`fa-solid fa-check ${style.confirmIngredientBtn}`}
          onClick={handleConfirmIngredient}
        ></i>
      ) : (
        <i
          className={`fa-solid fa-close ${style.undoIngredientBtn}`}
          onClick={handleUndoIngredient}
        ></i>
      )}
    </section>
  );
};

export default Ingredient;

// Tasks to do on this component
// - a button which closes the form -> functionality
// - on UserProfilePage -> popup for the recipe form on button click
// - RecipeForm -> send formData to backend -> test if data is sent correctly
