import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { {{cookiecutter.entity_name_lowercase}}Api } from "../../../../api/{{cookiecutter.entity_name_lowercase}}-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { {{cookiecutter.entity_name}}EditForm } from "../../../../components/dashboard/{{cookiecutter.entity_name_lowercase}}/{{cookiecutter.entity_name_lowercase}}-edit-form";
import { useMounted } from "../../../../hooks/use-mounted";
import { gtm } from "../../../../lib/gtm";
import type { {{cookiecutter.entity_name}} } from "../../../../types/{{cookiecutter.entity_name_lowercase}}";
import { getInitials } from "../../../../utils/get-initials";

const {{cookiecutter.entity_name}}Edit: NextPage = () => {
  const isMounted = useMounted();
  const [{{cookiecutter.entity_name_lowercase}}, set{{cookiecutter.entity_name}}] = useState<{{cookiecutter.entity_name}} | null>(null);

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

  if (!{{cookiecutter.entity_name_lowercase}}) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: {{cookiecutter.entity_name}} Edit | Material Kit Pro</title>
      </Head>
      <Box
        {% raw %}
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
        {% endraw %}
      >
                                    {% raw %}

        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            {% endraw %}
            <NextLink href="/dashboard/{{cookiecutter.entity_name_lowercase}}s" passHref>
              {% raw %}
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
          <Box
            {% raw %}
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
            {% endraw %}
          >
            <Avatar
              src={{{cookiecutter.entity_name_lowercase}}.avatar}
          {% raw %}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
            }}
            {% endraw %}
            >
              {getInitials({{cookiecutter.entity_name_lowercase}}.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                { {{cookiecutter.entity_name_lowercase}}.email}
              </Typography>
            <Box
              {% raw %}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
            >
              
              <Typography variant="subtitle2" sx={{ mr: 1 }}>user_id:</Typography>
              {% endraw %}
                <Chip label={{{cookiecutter.entity_name_lowercase}}.id} size="small" />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <{{cookiecutter.entity_name}}EditForm {{cookiecutter.entity_name_lowercase}}={{{cookiecutter.entity_name_lowercase}}} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

{{cookiecutter.entity_name}}Edit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default {{cookiecutter.entity_name}}Edit;
