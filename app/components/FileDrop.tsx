import { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import useStore from "~/store";

export default function FileDrop() {
  const [file, setFile] = useState<File | null>(null);
  const { updateBrandLogoURL } = useStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
      updateBrandLogoURL(URL.createObjectURL(uploadedFile));
    } else {
      alert("Only image files are allowed.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center  p-4">
      {file ? (
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-md">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded file preview"
            className=" "
          />
          <button
            onClick={() => {
              setFile(null);
              updateBrandLogoURL(null);
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only image files are accepted
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange}
          />
        </Label>
      )}
    </div>
  );
}
