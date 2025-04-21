import { HelperText, Label, Textarea, TextInput } from "flowbite-react";
import useStore from "~/store";

export default function FromDetails() {
  const { updateFromDetails, fromDetails } = useStore();
  return (
    <div className="flex flex-col gap-4">
      <HelperText className="mt-1">
        This is the sender information at the bottom of your label and is
        usually the official name you use for your business and your office
        address for the package to be returned to.
      </HelperText>

      <div className="">
        <Textarea
          id="comment"
          placeholder="Your business name and address"
          required
          rows={4}
          onChange={(e) => {
            updateFromDetails(e.target.value.replace(/\r?\n/g, "\n"));
          }}
          value={fromDetails}
        />
      </div>
    </div>
  );
}
