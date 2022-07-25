import { useState, useEffect, useCallback, FormEvent, useRef } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { {{cookiecutter.entity_name}}ListTable } from "../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-list-table";
import { useMounted } from "../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../icons/download";
import { Plus as PlusIcon } from "../../../icons/plus";
import { Search as SearchIcon } from "../../../icons/search";
import { Upload as UploadIcon } from "../../../icons/upload";
import { gtm } from "../../../lib/gtm";
import type { {{cookiecutter.entity_name}} } from "../../../types/{{cookiecutter.entity_name_lowercase}}";

interface Filters {
  query?: string;
  hasAcceptedMarketing?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
}

type SortField = "updatedAt" | "totalOrders";

type SortDir = "asc" | "desc";

type Sort =
  | "updatedAt|desc"
  | "updatedAt|asc"
  | "totalOrders|desc"
  | "totalOrders|asc";

interface SortOption {
  label: string;
  value: Sort;
}

type TabValue = "all" | "hasAcceptedMarketing" | "isProspect" | "isReturning";

interface Tab {
  label: string;
  value: TabValue;
}

const tabs: Tab[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Accepts Marketing",
    value: "hasAcceptedMarketing",
  },
  {
    label: "Prospect",
    value: "isProspect",
  },
  {
    label: "Returning",
    value: "isReturning",
  },
];

const sortOptions: SortOption[] = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Total orders (highest)",
    value: "totalOrders|desc",
  },
  {
    label: "Total orders (lowest)",
    value: "totalOrders|asc",
  },
];

const applyFilters = ({{cookiecutter.entity_name_lowercase}}s: {{cookiecutter.entity_name}}[], filters: Filters): {{cookiecutter.entity_name}}[] =>
  {{cookiecutter.entity_name_lowercase}}s.filter(({{cookiecutter.entity_name_lowercase}}) => {
    if (filters.query) {
      let queryMatched = false;
      const properties: ("email" | "name")[] = ["email", "name"];

      properties.forEach((property) => {
        if (
          {{cookiecutter.entity_name_lowercase}}[property]
            .toLowerCase()
            .includes(filters.query!.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !{{cookiecutter.entity_name_lowercase}}.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !{{cookiecutter.entity_name_lowercase}}.isProspect) {
      return false;
    }

    if (filters.isReturning && !{{cookiecutter.entity_name_lowercase}}.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (
  a: {{cookiecutter.entity_name}},
  b: {{cookiecutter.entity_name}},
  sortBy: SortField
): number => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy]! < a[sortBy]!) {
    return -1;
  }

  if (b[sortBy]! > a[sortBy]!) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir: SortDir, sortBy: SortField) =>
  sortDir === "desc"
    ? (a: {{cookiecutter.entity_name}}, b: {{cookiecutter.entity_name}}) => descendingComparator(a, b, sortBy)
    : (a: {{cookiecutter.entity_name}}, b: {{cookiecutter.entity_name}}) => -descendingComparator(a, b, sortBy);

const applySort = ({{cookiecutter.entity_name_lowercase}}s: {{cookiecutter.entity_name}}[], sort: Sort): {{cookiecutter.entity_name}}[] => {
  const [sortBy, sortDir] = sort.split("|") as [SortField, SortDir];
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = {{cookiecutter.entity_name_lowercase}}s.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // @ts-ignore
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    // @ts-ignore
    return a[1] - b[1];
  });

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (
  {{cookiecutter.entity_name_lowercase}}s: {{cookiecutter.entity_name}}[],
  page: number,
  rowsPerPage: number
): {{cookiecutter.entity_name}}[] =>
  {{cookiecutter.entity_name_lowercase}}s.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const {{cookiecutter.entity_name}}List: NextPage = () => {
  const isMounted = useMounted();
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [{{cookiecutter.entity_name_lowercase}}s, set{{cookiecutter.entity_name}}s] = useState<{{cookiecutter.entity_name}}[]>([]);
  const [currentTab, setCurrentTab] = useState<TabValue>("all");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);
  const [filters, setFilters] = useState<Filters>({
    query: "",
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const get{{cookiecutter.entity_name}}s = useCallback(async () => {
    try {
      const data = await {{cookiecutter.entity_name_lowercase}}Api.get{{cookiecutter.entity_name}}s();

      if (isMounted()) {
        set{{cookiecutter.entity_name}}s(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      get{{cookiecutter.entity_name}}s();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    const updatedFilters: Filters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    };

    if (value !== "all") {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSort(event.target.value as Sort);
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filtered{{cookiecutter.entity_name}}s = applyFilters({{cookiecutter.entity_name_lowercase}}s, filters);
  const sorted{{cookiecutter.entity_name}}s = applySort(filtered{{cookiecutter.entity_name}}s, sort);
  const paginated{{cookiecutter.entity_name}}s = applyPagination(
    sorted{{cookiecutter.entity_name}}s,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard: {{cookiecutter.entity_name}} List | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        {% raw %}
        sx={{
          flexGrow: 1,
          py: 8,
        }}
        {% endraw %}
      >
        <Container maxWidth="xl">
          {% raw %}
          <Box sx={{ mb: 4 }}>
            {% endraw %}
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{{cookiecutter.entity_name}}s</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
           {% raw %}
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
                {% endraw %}

              >
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"          
              {% raw %}
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  {% endraw %}
                  placeholder="Search {{cookiecutter.entity_name_lowercase}}s"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                {% raw %}
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                {% endraw %}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <{{cookiecutter.entity_name}}ListTable
              {{cookiecutter.entity_name_lowercase}}s={paginated{{cookiecutter.entity_name}}s}
              {{cookiecutter.entity_name_lowercase}}sCount={filtered{{cookiecutter.entity_name}}s.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

{{cookiecutter.entity_name}}List.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default {{cookiecutter.entity_name}}List;
