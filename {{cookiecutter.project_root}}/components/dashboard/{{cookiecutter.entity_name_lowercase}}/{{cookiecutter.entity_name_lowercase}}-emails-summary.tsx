import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { useMounted } from "../../../hooks/use-mounted";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import type { {{cookiecutter.entity_name}}Email } from "../../../types/{{cookiecutter.entity_name_lowercase}}";

const emailOptions = [
  "Resend last invoice",
  "Send password reset",
  "Send verification",
];

export const {{cookiecutter.entity_name}}EmailsSummary: FC = (props) => {
  const isMounted = useMounted();
  const [emailOption, setEmailOption] = useState<string>(emailOptions[0]);
  const [emails, setEmails] = useState<{{cookiecutter.entity_name}}Email[]>([]);

  const getEmails = useCallback(async () => {
    try {
      const data = await {{cookiecutter.entity_name_lowercase}}Api.get{{cookiecutter.entity_name}}Emails();

      if (isMounted()) {
        setEmails(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  return (
    <Card {...props}>
      <CardHeader title="Emails" />
      <Divider />
      <CardContent>
        <TextField
          name="option"
          onChange={(event): void => setEmailOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{
            width: 320,
            maxWidth: "100%",
          }}
          value={emailOption}
        >
          {emailOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <Box sx={{ mt: 2 }}>
          <Button
            endIcon={<ArrowRightIcon fontSize="small" />}
            variant="contained"
          >
            Send email
          </Button>
        </Box>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mail Type</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => (
            <TableRow
              key={email.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Typography variant="subtitle2">{email.description}</Typography>
              </TableCell>
              <TableCell>
                {format(email.createdAt, "dd/MM/yyyy | HH:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
