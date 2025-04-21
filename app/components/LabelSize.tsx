import { Dropdown, DropdownItem, HelperText } from "flowbite-react";
import useStore from "~/store";

const sizes = ["4x6", "5x7", "6x8", "8x10"];
export default function LabelSize() {
  const { labelSize, updateLabelSize } = useStore();
  return (
    <>
      <Dropdown
        label="Label Dimensions"
        dismissOnClick={false}
        className="!bg-black text-white  focus:!ring-none font-special"
      >
        {sizes.map((size) => (
          <DropdownItem
            key={size}
            className="text-white hover:!bg-gray-700"
            onClick={() => updateLabelSize(size)}
          >
            {size}
          </DropdownItem>
        ))}
      </Dropdown>
    </>
  );
}
