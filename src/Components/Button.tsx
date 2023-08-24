import { useAppContext } from "../context";
import { SelectedState } from "../types";

interface ButtonProps {
  type: SelectedState; // Assuming SelectedState is an enum or a type you have defined
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ type, label }) => {
  const { selected, setSelected } = useAppContext();

  const getSelectorClassName = (state: SelectedState | "") =>
    `selector ${selected === state ? "active" : ""}`;

  return (
    <button
      type="button"
      aria-selected={selected === type}
      className={getSelectorClassName(type)}
      onClick={() => setSelected(type)}
    >
      {label}
    </button>
  );
};
