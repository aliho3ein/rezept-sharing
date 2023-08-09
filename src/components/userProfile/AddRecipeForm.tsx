import { FC } from "react";

const AddRecipeForm: FC = () => {
  return (
    <fieldset>
      <form>
        <input type="text" placeholder="Ingredient" />
        <input type="number" id="ingredient-amount" min="1" />
        <select id="ingredient-unit">
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="Tasse">Tasse</option>
          <option value="TL">TL</option>
          <option value="EL">EL</option>
        </select>
        <textarea id="cooking-process" placeholder="Zubereitung..."></textarea>
      </form>
    </fieldset>
  );
};

export default AddRecipeForm;
