import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useStore from "~/store";

export function OrdersTable() {
  const { ordersData } = useStore();

  const headers = ordersData.length > 0 ? Object.keys(ordersData[0]) : [];

  const rows = ordersData.map((order) => Object.values(order));

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableRow>
            {/* <TableHeadCell className="p-4">
              <Checkbox />
            </TableHeadCell> */}
            {headers.map((header) => (
              <TableHeadCell
                key={header}
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                {header}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {rows.map((row, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {/* <TableCell className="p-4">
                <Checkbox />
              </TableCell> */}

              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
