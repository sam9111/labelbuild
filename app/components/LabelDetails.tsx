import {
  Avatar,
  Card,
  Checkbox,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useStore from "~/store";

export function LabelDetails() {
  const { ordersData, details, updateDetails } = useStore();

  return (
    <div className="overflow-y-scroll h-96">
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeadCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Detail
            </TableHeadCell>
            <TableHeadCell className=" font-medium text-gray-900 dark:text-white">
              Include in Receiver Section
            </TableHeadCell>
            <TableHeadCell className=" font-medium text-gray-900 dark:text-white">
              Include at the bottom
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {details.map((detail, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {detail.detail}
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={detail.includeInReceiver}
                  onChange={(e) => {
                    const newDetails = [...details];
                    newDetails[index].includeInReceiver = e.target.checked;
                    updateDetails(newDetails);
                  }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={detail.includeInAdditional}
                  onChange={(e) => {
                    const newDetails = [...details];
                    newDetails[index].includeInAdditional = e.target.checked;
                    updateDetails(newDetails);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
