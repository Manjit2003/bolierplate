import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { useMounted } from "../../../hooks/use-mounted";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import type { {{cookiecutter.entity_name}}Invoice } from "../../../types/{{cookiecutter.entity_name_lowercase}}";
import { MoreMenu } from "../../more-menu";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "../../severity-pill";

export const {{cookiecutter.entity_name}}Invoices: FC = (props) => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState<{{cookiecutter.entity_name}}Invoice[]>([]);

  const getInvoices = useCallback(async () => {
    try {
      const data = await {{cookiecutter.entity_name_lowercase}}Api.get{{cookiecutter.entity_name}}Invoices();

      if (isMounted()) {
        setInvoices(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <Card {...props}>
      <CardHeader action={<MoreMenu />} title="Recent Invoices" />
      <Divider />
      <Scrollbar>
                                    {% raw %}

        <Table sx={{ minWidth: 600 }}>
                                      {% endraw %}

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.id}</TableCell>
                <TableCell>
                  {format(invoice.issueDate, "MMM dd,yyyy")}
                </TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={invoice.status === "paid" ? "success" : "error"}
                  >
                    {invoice.status}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  <NextLink href="/dashboard/invoices/1" passHref>
                    <IconButton component="a">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={invoices.length}
        onPageChange={(): void => {}}
        onRowsPerPageChange={(): void => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
