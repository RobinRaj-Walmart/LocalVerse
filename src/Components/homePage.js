import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import WalmartLogo from './walmartLogo.svg'; // Import the logo
import './home.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

const hoverStyle = {
  transform: 'scale(1.1)',
  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomePage() {
  const [uploadedPdf, setUploadedPdf] = React.useState(null);

  // Function to handle PDF file selection and set state
  const handleFileChange = (event) => {
    setUploadedPdf(event.target.files[0]);
  };

  // Function to trigger the file download
  const handleDownloadPdf = () => {
    // Assuming you have a URL to the PDF you want users to be able to download
    const pdfUrl = "URL_TO_YOUR_DOWNLOADABLE_PDF";
    // Create a new link element, set its href, and trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'OptionalPdf.pdf'); // Define the download file name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const styles = {
    display: 'flex',
  }
  const rightSide = {
    backgroundColor: '#ECECEC',
    display: 'flex',
    gap: '100px',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh'
  }
  return (
    <div style={styles}>
      <ThemeProvider theme={defaultTheme}>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
      </ThemeProvider>
      <div style={rightSide}>
        <div style={{position: 'relative', right:'100px', top: '100px'}}>
          <div className="classyContainer">
            <img
              style={{ height: '50px', width: 'auto', position: 'relative', left: '20px' }}
              src={WalmartLogo} 
              alt="Walmart-logo"
            />
            <h2>Bulk Upload</h2>
            <h3>Select Excel and upload</h3>
          </div>
          <div style={{position: 'relative', top: '50px'}}>
            <input style={{display:'none'}} type="file" accept="application/pdf" onChange={handleFileChange} id='excel-file' />
            <label style={buttonStyle} htmlFor="excel-file"
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)} 
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >Choose file</label>
            {uploadedPdf && <p>File uploaded: {uploadedPdf.name}</p>}
            <button style={buttonStyle}
            style={{position: 'relative', left: '20px'}}
            onClick={handleDownloadPdf}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)} 
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >Download Optional PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}