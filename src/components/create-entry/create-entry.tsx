import { Button } from "../button/button";
import { DropdownButton } from "../dropdown-button/dropdown-button";
import { InputWithName } from "../input-with-name/input-with-name";
import "./create-entry.css";

export const CreateEntry = () => {
  const handleClick = () => {
    console.log("HERE");
  };
  return (
    <div className="create-new-entry">
    
        <div className="select-type">
          <span className="select">Type:</span>
          <DropdownButton />
        </div>

      <div className="test">
        <InputWithName name="Kcal" placeholder="Enter value" />
        <InputWithName name="Protein" placeholder="Enter value" />
        <InputWithName name="Total Fat" placeholder="Enter value" />
        <InputWithName name="Saturated Fat" placeholder="Enter value" />
        <InputWithName name="Unsaturated Fat" placeholder="Enter value" />
        <InputWithName name="Carbs" placeholder="Enter value" />
        <InputWithName name="Fiber" placeholder="Enter value" />
        <Button onClick={handleClick} children="save" />
      </div>
    </div>
  );
};
