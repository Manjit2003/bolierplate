import { useEffect, useState } from 'react';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import type { {{cookiecutter.entity_name}} } from '../../../types/{{cookiecutter.entity_name_lowercase}}';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';

interface {{cookiecutter.entity_name}}ListTableProps {
  {{cookiecutter.entity_name_lowercase}}s: {{cookiecutter.entity_name}}[];
  {{cookiecutter.entity_name_lowercase}}sCount: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

export const {{cookiecutter.entity_name}}ListTable: FC<{{cookiecutter.entity_name}}ListTableProps> = (props) => {
  const {
    {{cookiecutter.entity_name_lowercase}}s,
    {{cookiecutter.entity_name_lowercase}}sCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selected{{cookiecutter.entity_name}}s, setSelected{{cookiecutter.entity_name}}s] = useState<string[]>([]);

  // Reset selected {{cookiecutter.entity_name_lowercase}}s when {{cookiecutter.entity_name_lowercase}}s change
  useEffect(
    () => {
      if (selected{{cookiecutter.entity_name}}s.length) {
        setSelected{{cookiecutter.entity_name}}s([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [{{cookiecutter.entity_name_lowercase}}s]
  );

  const handleSelectAll{{cookiecutter.entity_name}}s = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelected{{cookiecutter.entity_name}}s(
      event.target.checked
        ? {{cookiecutter.entity_name_lowercase}}s.map(({{cookiecutter.entity_name_lowercase}}) => {{cookiecutter.entity_name_lowercase}}.id)
        : []
    );
  };

  const handleSelectOne{{cookiecutter.entity_name}} = (
    event: ChangeEvent<HTMLInputElement>,
    {{cookiecutter.entity_name_lowercase}}Id: string
  ): void => {
    if (!selected{{cookiecutter.entity_name}}s.includes({{cookiecutter.entity_name_lowercase}}Id)) {
      setSelected{{cookiecutter.entity_name}}s((prevSelected) => [...prevSelected, {{cookiecutter.entity_name_lowercase}}Id]);
    } else {
      setSelected{{cookiecutter.entity_name}}s((prevSelected) => prevSelected.filter((id) => id !== {{cookiecutter.entity_name_lowercase}}Id));
    }
  };

  const enableBulkActions = selected{{cookiecutter.entity_name}}s.length > 0;
  const selectedSome{{cookiecutter.entity_name}}s = selected{{cookiecutter.entity_name}}s.length > 0
    && selected{{cookiecutter.entity_name}}s.length < {{cookiecutter.entity_name_lowercase}}s.length;
  const selectedAll{{cookiecutter.entity_name}}s = selected{{cookiecutter.entity_name}}s.length === {{cookiecutter.entity_name_lowercase}}s.length;

  return (
    <div {...other}>
      <Box
        {% raw %}
        sx={{
          backgroundColor: (theme) => theme.palette.mode == 'dark'
            ? 'neutral.800'
            : 'neutral.100',
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5
        }}
        {% endraw %}
      >
        <Checkbox
          checked={selectedAll{{cookiecutter.entity_name}}s}
          indeterminate={selectedSome{{cookiecutter.entity_name}}s}
          onChange={handleSelectAll{{cookiecutter.entity_name}}s}
        />
                                    {% raw %}

        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
                                          {% endraw %}

              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll{{cookiecutter.entity_name}}s}
                  indeterminate={selectedSome{{cookiecutter.entity_name}}s}
                  onChange={handleSelectAll{{cookiecutter.entity_name}}s}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Orders
              </TableCell>
              <TableCell>
                Spent
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { {{cookiecutter.entity_name_lowercase}}s.map(({{cookiecutter.entity_name_lowercase}}) => {
              const is{{cookiecutter.entity_name}}Selected = selected{{cookiecutter.entity_name}}s.includes({{cookiecutter.entity_name_lowercase}}.id);

              return (
                <TableRow
                  hover
                  key={ {{cookiecutter.entity_name_lowercase}}.id}
                  selected={is{{cookiecutter.entity_name}}Selected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={is{{cookiecutter.entity_name}}Selected}
                      onChange={(event) => handleSelectOne{{cookiecutter.entity_name}}(
                        event,
                        {{cookiecutter.entity_name_lowercase}}.id
                      )}
                      value={is{{cookiecutter.entity_name}}Selected}
                    />
            </TableCell>
            
            <TableCell>
              {% raw %}
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
              >
                {% endraw %}
                      <Avatar
                  src={ {{cookiecutter.entity_name_lowercase}}.avatar}
              {% raw %}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
              {% endraw %}
                        {getInitials({{cookiecutter.entity_name_lowercase}}.name)}
              </Avatar>
                                          {% raw %}

              <Box sx={{ ml: 1 }}>
                                            {% endraw %}

                        <NextLink
                          href="/dashboard/{{cookiecutter.entity_name_lowercase}}s/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {{{cookiecutter.entity_name_lowercase}}.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {{{cookiecutter.entity_name_lowercase}}.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${{{cookiecutter.entity_name_lowercase}}.city}, ${{{cookiecutter.entity_name_lowercase}}.state}, ${{{cookiecutter.entity_name_lowercase}}.country}`}
                  </TableCell>
                  <TableCell>
                    {{{cookiecutter.entity_name_lowercase}}.totalOrders}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {numeral({{cookiecutter.entity_name_lowercase}}.totalAmountSpent).format(`${{{cookiecutter.entity_name_lowercase}}.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/{{cookiecutter.entity_name_lowercase}}s/1/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/{{cookiecutter.entity_name_lowercase}}s/1"
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={{{cookiecutter.entity_name_lowercase}}sCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

{{cookiecutter.entity_name}}ListTable.propTypes = {
  {{cookiecutter.entity_name_lowercase}}s: PropTypes.array.isRequired,
  {{cookiecutter.entity_name_lowercase}}sCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
