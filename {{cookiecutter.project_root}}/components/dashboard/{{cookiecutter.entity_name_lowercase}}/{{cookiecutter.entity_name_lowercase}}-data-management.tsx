import type { FC } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

export const {{cookiecutter.entity_name}}DataManagement: FC = (props) => (
  <Card {...props}>
    <CardHeader title="Data Management" />
    <Divider />
    <CardContent>
      <Button
        color="error"
        variant="outlined"
      >
        Delete Account
      </Button>
                      {% raw %}

      <Box sx={{ mt: 1 }}>
                        {% endraw %}

        <Typography
          color="textSecondary"
          variant="body2"
        >
          Remove this {{cookiecutter.entity_name_lowercase}}’s chart if he requested that, if not
          please be aware that what has been deleted can never brought
          back
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
