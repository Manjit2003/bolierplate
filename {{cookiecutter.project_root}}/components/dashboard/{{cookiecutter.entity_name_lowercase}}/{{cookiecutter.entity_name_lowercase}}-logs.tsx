import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { useMounted } from "../../../hooks/use-mounted";
import type { {{cookiecutter.entity_name}}Log } from "../../../types/{{cookiecutter.entity_name_lowercase}}";
import { MoreMenu } from "../../more-menu";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "../../severity-pill";

export const {{cookiecutter.entity_name}}Logs: FC = (props) => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState<{{cookiecutter.entity_name}}Log[]>([]);

  const getLogs = useCallback(async () => {
    try {
      const data = await {{cookiecutter.entity_name_lowercase}}Api.get{{cookiecutter.entity_name}}Logs();

      if (isMounted()) {
        setLogs(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  return (
    <Card {...props}>
      <CardHeader action={<MoreMenu />} title="Recent Logs" />
      <Divider />
      <Scrollbar>
                                    {% raw %}

        <Table sx={{ minWidth: 700 }}>
                                      {% endraw %}

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell width="100">
                  <Typography color="textSecondary" variant="caption">
                    {log.method}
                  </Typography>
                </TableCell>
                <TableCell width="64">
                  <SeverityPill
                    color={
                      log.status >= 200 && log.status < 300
                        ? "success"
                        : "error"
                    }
                  >
                    {log.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>{log.route}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>
                  {format(log.createdAt, "yyyy/MM/dd HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};
