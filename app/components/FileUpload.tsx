import { FileInput, HelperText } from "flowbite-react";
import { useState } from "react";
import useStore from "~/store";
import csvToJson from "~/utils";

export default function FileUpload() {
  const { updateOrdersData } = useStore();
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target?.result;
        if (typeof csvText === "string") {
          const data = csvToJson(csvText);
          updateOrdersData(data);
        }
      };

      reader.readAsText(file);

      setFile(file);
    }
  };
  return (
    <>
      <FileInput id="file-upload-helper-text" onInput={handleFileUpload} />
      <HelperText className="mt-1"> Only CSV is accepted</HelperText>
    </>
  );
}
