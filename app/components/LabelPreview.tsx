import useStore from "~/store";
import { forwardRef, useEffect, useRef } from "react";
import { Button, HelperText } from "flowbite-react";
import * as ReactToPrint from "react-to-print";
import LabelSize from "./LabelSize";
const useReactToPrint = ReactToPrint.useReactToPrint;

const LabelPreview = () => {
  const { brandLogoURL, ordersData, details, fromDetails, labelSize } =
    useStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
  });

  useEffect(() => {
    const [width, height] = labelSize.split("x"); // Assuming labelSize is in the format "4in x 6in"
    document.documentElement.style.setProperty("--label-width", width.trim());
    document.documentElement.style.setProperty("--label-height", height.trim());

    // Dynamically adjust font size and gaps based on label size
    const baseWidth = 4; // Base width in inches
    const baseHeight = 6; // Base height in inches
    const scaleFactorWidth = parseFloat(width.trim()) / baseWidth;
    const scaleFactorHeight = parseFloat(height.trim()) / baseHeight;
    const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight);

    const printDivs = contentRef.current?.querySelectorAll(
      ".print-container > div"
    );
    printDivs?.forEach((div) => {
      const element = div as HTMLElement;
      element.style.fontSize = `${0.8 * scaleFactor}rem`; // Adjust font size
      element.style.gap = `${8 * scaleFactor}px`; // Adjust gaps
      element.style.padding = `${8 * scaleFactor}px`; // Adjust padding
      element.style.width = `${width.trim()}in`; // Set width
      element.style.height = `${height.trim()}in`; // Set height

      // Add page break styles
      element.style.pageBreakInside = "avoid";
      element.style.pageBreakAfter = "always";
    });

    // Scale the image inside the print div accordingly
    const images = contentRef.current?.querySelectorAll(".print-container img");
    images?.forEach((img) => {
      const element = img as HTMLImageElement;
      element.style.maxWidth = `${parseFloat(width.trim()) * 0.5}in`; // Scale image width
      element.style.maxHeight = `${parseFloat(height.trim()) * 0.5}in`; // Scale image height
      element.style.objectFit = "contain"; // Ensure the image fits within the container
    });
  }, [labelSize]);

  return (
    <>
      <style>
        {`
        @media print {
      
          .print-container {
   
    margin: 0 !important;
    padding: 0 !important;
 height: initial !important;
    overflow: initial !important;
          }
    
        }
      `}
      </style>
      <div className="flex flex-col gap-4    ">
        <div className="place-items-end flex flex-col gap-2">
          <LabelSize />

          <Button
            className="!bg-black text-white hover:!bg-gray-700 focus:!ring-none font-special"
            onClick={() => handlePrint()}
          >
            Print Labels
          </Button>
        </div>
        <div className="mx-auto ">
          <HelperText className="">
            Labels will be printed in dimensions of {labelSize} inches
          </HelperText>
          <div ref={contentRef} className="print-container ">
            {ordersData.map((order, index) => (
              <div
                key={index}
                className="flex flex-col  bg-white shadow-xl border border-gray-200 mb-4 p-2"
              >
                {brandLogoURL && (
                  <img
                    src={brandLogoURL}
                    alt="Brand Logo"
                    className="mx-auto"
                  />
                )}
                <h3 className="font-semibold">{order["Name"]}</h3>

                <h4 className="font-semibold">TO</h4>
                <div className=" border p-2">
                  {details.map((detail) => {
                    if (detail.includeInReceiver) {
                      return <div className="">{order[detail.detail]}</div>;
                    }
                    return null;
                  })}
                </div>

                <h4 className=" font-semibold">FROM</h4>
                <div className="border p-2">
                  {fromDetails &&
                    (fromDetails?.split("\n") ?? []).map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                </div>

                {details.find((detail) => detail.includeInAdditional) && (
                  <div className="border p-2">
                    {details.map((detail) => {
                      if (detail.includeInAdditional) {
                        return (
                          <div key={detail.detail} className="flex flex-col">
                            <span className=" font-semibold">
                              {detail.detail}
                            </span>
                            <span className="">{order[detail.detail]}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LabelPreview;
