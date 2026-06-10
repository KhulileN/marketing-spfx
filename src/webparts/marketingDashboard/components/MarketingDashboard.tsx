import * as React from 'react';
import { useEffect, useState } from 'react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Define props interface (passed from web part)
export interface IMarketingDashboardProps {
  context: any; // In real project: import { WebPartContext } from '@microsoft/sp-webpart-base';
}

// Create MUI theme (Material Design 3 inspired – light mode, Google-ish primary)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Classic Google blue
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // M3 rounded corners
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', // subtle elevation
        },
      },
    },
  },
});

const MarketingDashboard: React.FC<IMarketingDashboardProps> = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const sp = spfi().using(SPFx(props.context));

    async function fetchCampaigns() {
      try {
        setLoading(true);
        setError(null);

        const items = await sp.web.lists
          .getByTitle("Campaigns") // Double-check exact title (case-sensitive!)
          .items
          .select("Id", "Title", "CampaignName", "CampaignType", "StartDate", "Status", "Budget", "ActualSpend")
          .top(20)
          .orderBy("StartDate", false)();

        setCampaigns(items);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Failed to load campaigns. Check console.");
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [props.context]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Marketing Dashboard
          </Typography>
          {/* Future: add IconButton for search/filter */}
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2, bgcolor: 'background.paper' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Campaigns" />
          <Tab label="Events" disabled /> {/* Placeholder – implement later */}
          <Tab label="Social Content" disabled />
          <Tab label="Surveys" disabled />
        </Tabs>
      </Box>

      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '300px' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            {tabValue === 0 && (
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom component="div">
                    Campaigns Overview
                  </Typography>

                  {campaigns.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                      No campaigns found. Add one in the SharePoint list!
                    </Typography>
                  ) : (
                    <List>
                      {campaigns.map((item) => (
                        <React.Fragment key={item.Id}>
                          <ListItem>
                            <ListItemText
                              primary={item.CampaignName || item.Title || 'Unnamed Campaign'}
                              secondary={
                                <>
                                  Type: {item.CampaignType || '—'} | Status: {item.Status || '—'}<br />
                                  Budget: {item.Budget ? item.Budget.toLocaleString() : '—'} | 
                                  Actual: {item.ActualSpend ? item.ActualSpend.toLocaleString() : '—'}
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Add similar blocks for other tabs when ready */}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default MarketingDashboard;