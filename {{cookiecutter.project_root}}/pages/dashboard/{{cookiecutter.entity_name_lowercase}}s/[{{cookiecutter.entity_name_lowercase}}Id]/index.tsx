import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { {{cookiecutter.entity_name}}BasicDetails } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-basic-details";
import { {{cookiecutter.entity_name}}DataManagement } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-data-management";
import { {{cookiecutter.entity_name}}EmailsSummary } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-emails-summary";
import { {{cookiecutter.entity_name}}Invoices } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-invoices";
import { {{cookiecutter.entity_name}}Payment } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-payment";
import { {{cookiecutter.entity_name}}Logs } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-logs";
import { useMounted } from "../../../../hooks/use-mounted";
import { ChevronDown as ChevronDownIcon } from "../../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../../icons/pencil-alt";
import { gtm } from "../../../../lib/gtm";
import type { {{cookiecutter.entity_name}} } from "../../../../types/{{cookiecutter.entity_name_lowercase}}";
import { getInitials } from "../../../../utils/get-initials";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Invoices", value: "invoices" },
  { label: "Logs", value: "logs" },
];

const {{cookiecutter.entity_name}}Details: NextPage = () => {
  const isMounted = useMounted();
  const [{{cookiecutter.entity_name_lowercase}}, set{{cookiecutter.entity_name}}] = useState<{{cookiecutter.entity_name}} | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("details");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const get{{cookiecutter.entity_name}} = useCallback(async () => {
    try {
      const data = await {{cookiecutter.entity_name_lowercase}}Api.get{{cookiecutter.entity_name}}();

      if (isMounted()) {
        set{{cookiecutter.entity_name}}(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      get{{cookiecutter.entity_name}}();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  if (!{{cookiecutter.entity_name_lowercase}}) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: {{cookiecutter.entity_name}} Details | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
            {% raw %}
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/{{cookiecutter.entity_name_lowercase}}s" passHref>
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  {% endraw %}
                  <Typography variant="subtitle2">{{cookiecutter.entity_name}}s</Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  src={{{cookiecutter.entity_name_lowercase}}.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials({{cookiecutter.entity_name_lowercase}}.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{{{cookiecutter.entity_name_lowercase}}.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                >
                  {% raw %}
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>user_id:</Typography>
                  {% endraw %}
                    <Chip label={{{cookiecutter.entity_name_lowercase}}.id} size="small" />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href="/dashboard/{{cookiecutter.entity_name_lowercase}}s/1/edit" passHref>
                  <Button
                  component="a"
                  {% raw %}
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={<ChevronDownIcon fontSize="small" />}
                sx={{ m: 1 }}
                
                  variant="contained"
                >
                  Actions
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "details" && (
              <Grid container spacing={3}>
              <Grid item xs={12}>
                {% endraw %}
                  <{{cookiecutter.entity_name}}BasicDetails
                    address1={{{cookiecutter.entity_name_lowercase}}.address1}
                    address2={{{cookiecutter.entity_name_lowercase}}.address2}
                    country={{{cookiecutter.entity_name_lowercase}}.country}
                    email={{{cookiecutter.entity_name_lowercase}}.email}
                    isVerified={!!{{cookiecutter.entity_name_lowercase}}.isVerified}
                    phone={{{cookiecutter.entity_name_lowercase}}.phone}
                    state={{{cookiecutter.entity_name_lowercase}}.state}
                  />
                </Grid>
                <Grid item xs={12}>
                  <{{cookiecutter.entity_name}}Payment />
                </Grid>
                <Grid item xs={12}>
                  <{{cookiecutter.entity_name}}EmailsSummary />
                </Grid>
                <Grid item xs={12}>
                  <{{cookiecutter.entity_name}}DataManagement />
                </Grid>
              </Grid>
            )}
            {currentTab === "invoices" && <{{cookiecutter.entity_name}}Invoices />}
            {currentTab === "logs" && <{{cookiecutter.entity_name}}Logs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

{{cookiecutter.entity_name}}Details.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default {{cookiecutter.entity_name}}Details;
