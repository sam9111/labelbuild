import FileUpload from "~/components/FileUpload";
import type { Route } from "./+types/home";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
  HelperText,
  HR,
  Label,
} from "flowbite-react";
import LabelSize from "~/components/LabelSize";
import LabelPreview from "~/components/LabelPreview";
import FileDrop from "~/components/FileDrop";
import { OrdersTable } from "~/components/OrdersTable";
import { LabelDetails } from "~/components/LabelDetails";
import useStore from "~/store";
import FromDetails from "~/components/FromDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LabelBuild" },
    {
      name: "description",
      content: "Bulk generate shipping labels for your Shopify Business",
    },
  ];
}

const accordionInformation = [
  {
    title: "File Uploads",
    content: (
      <div className="flex flex-col gap-4">
        <HelperText className="mt-1">
          Upload the exported CSV file from Shopify. This file contains all the
          orders you want to generate labels for. You can also upload a file
          containing your brand logo. The logo will be used in the label
          preview.
        </HelperText>
        <Label className="text-md  font-medium">
          Your order list from Shopify
        </Label>
        <FileUpload />
        <Label className="text-md  font-medium">Your brand logo</Label>
        <FileDrop />
      </div>
    ),
  },
  {
    title: "Receiver Information",
    content: <FromDetails />,
  },
  {
    title: "Details to include in Label",
    content: (
      <div className="flex flex-col gap-4">
        <HelperText className="mt-1">
          Select the details you want to include in the label. This will be
          printed on the label and will be visible to the receiver.
        </HelperText>
        <LabelDetails />,
      </div>
    ),
  },
  {
    title: "Orders from Shopify",
    content: (
      <div className="flex flex-col gap-4">
        <HelperText className="mt-1">
          This is the list of orders you have uploaded from Shopify.
        </HelperText>
        <OrdersTable />
      </div>
    ),
  },
];

export default function Home() {
  const { ordersData } = useStore();

  return (
    <div className="mx-auto p-20 h-screen gap-4  w-full  grid grid-cols-2 ">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl  font-special ">Label Build</h1>
          <h2 className="text-lg  ">
            Bulk generate shipping labels for your Shopify Business
          </h2>
        </div>

        <Accordion>
          {accordionInformation.map((item, index) => (
            <AccordionPanel key={index}>
              <AccordionTitle className="bg-black text-white hover:bg-gray-700 focus:ring-none font-special">
                <div className="flex gap-4 justify-center">
                  <div className="w-6 h-6 bg-gray-50 rounded-full text-black flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p>{item.title}</p>
                </div>
              </AccordionTitle>
              <AccordionContent className="bg-white">
                {item.content}
              </AccordionContent>
            </AccordionPanel>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col gap-8 bg-gradient-to-r from-[#e0f5ff] to-[#deffeb] p-10 rounded-lg">
        {ordersData && ordersData.length > 0 ? <LabelPreview /> : null}
      </div>
    </div>
  );
}
