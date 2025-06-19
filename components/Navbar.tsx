import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useThemeMode } from './ThemeProvider';
import Link from 'next/link';

interface NavbarProps {
  sections: { id: string; title: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleColorMode } = useThemeMode();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {sections.map((section) => (
        <ListItem
          button
          key={section.id}
          component={Link}
          href={`#${section.id}`}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={section.title} />
        </ListItem>
      ))}
      <ListItem button onClick={toggleColorMode}>
        <ListItemText primary={`Toggle ${mode === 'light' ? 'Dark' : 'Light'} Mode`} />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Hackathon
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {sections.map((section) => (
              <Button
                key={section.id}
                component={Link}
                href={`#${section.id}`}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {section.title}
              </Button>
            ))}
            <IconButton
              color="inherit"
              onClick={toggleColorMode}
              sx={{ ml: 1 }}
            >
              {mode === 'light' ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
