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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as XLSX from 'xlsx';




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
  position: 'relative', top: '10px',
  padding: '10px 20px',
  border: 'none',
  backgroundColor: '#1975CF',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const buttonStyle2 = {
  padding: '10px 20px',
  border: 'none',
  backgroundColor: '#1975CF',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative', left: '20px'
};

const hoverStyle = {
  transform: 'scale(2)',
  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
};

const hoverStyle2 = {
  transform: 'scale(1.1)',
  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomePage() {
  const [uploadedPdf, setUploadedPdf] = React.useState(null);
  React.useEffect(()=>{
    if(uploadedPdf) {
      console.log("Thank you. It has been sent for linguist approval.");
    }
  }, [uploadedPdf]);
  const [fb, setFb] = React.useState(null);

  // Function to handle PDF file selection and set state
  const handleFileChange = (event) => {
    setUploadedPdf(event.target.files[0]);
  };
  function flagBulk(){
    console.log("button was clicked");
    setFb(1);
  }

  const mainListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Walmart Developer
      </ListSubheader>
      <ListItemButton onClick={flagBulk}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Bulk Upload" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Single Upload" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="View Strings" />
      </ListItemButton>
    </React.Fragment>
  );

  // Function to trigger the file download
  const handleDownloadPdf = () => {
    const ExcelUrl = './SampleExcel.xlsx';
    const link = document.createElement('a');
    link.href = ExcelUrl;
    link.setAttribute('download', 'SampleFile.xlsx');
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

  function validateHeaders(file) {
    console.log("Trying to validate the headers");
    const workbook = XLSX.readFile(file);
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]];

    // get the headers (assuming they are in the first row)
    const headers = XLSX.utils.sheet_to_json(worksheet, {header: 1})[0];

    // define the expected headers
    const expectedHeaders = ['ID', 'Feature Name', 'Team', 'String'];

    // compare the actual headers with the expected ones
    for (let i = 0; i < expectedHeaders.length; i++) {
        if (headers[i] !== expectedHeaders[i]) {
            alert(`Invalid header in cell ${i + 1}: ${headers[i]}`);
            return false;
        }
    }
    return true;
  }

  function onFileSelect(event) {
    setUploadedPdf(event.target.files[0]);
    
    console.log("on file select function was called");
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const bufferArray = e.target.result;
      const workbook = XLSX.read(bufferArray, {type: 'buffer'});

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // console.log(jsonData);
      let len = jsonData.length;
      console.log(len);
      let ele = [];
      for(let i=0;i<len;i++) {
        if(jsonData[i]['ID']==undefined || jsonData[i]['Feature Name']==undefined || jsonData[i]['Team']==undefined || jsonData[i]['String']==undefined) {
          alert("The format is incorrect. Please try again");
          setUploadedPdf(null);
          return;
        }
        let obj1 = {
          id: jsonData[i]['ID'],
          featureName: jsonData[i]['Feature Name'],
          team: jsonData[i]['Team'],
          string: jsonData[i]['String']
        }
        ele.push(obj1);
      }
      console.log(ele);
      const toSend = {
        userUploadedDetails: ele,
        totalCount: len
      }
      console.log(toSend);
    }

    reader.readAsArrayBuffer(file);
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
      {fb && <div style={rightSide}>
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
          <div style={{display: 'flex',position: 'relative', top: '50px'}}>
            <div>
              <input style={{display:'none'}}
              onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)} 
              onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              type="file" 
              onChange={onFileSelect}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              id='excel-file' />
              <label
              style={buttonStyle}
              
              htmlFor="excel-file"
              >File upload</label>
              {uploadedPdf && <p style={{fontSize: '15px', position: 'relative', top: '10px'}}>File uploaded: {uploadedPdf.name}</p>}
            </div>
            <button
            style={buttonStyle2}
            onClick={handleDownloadPdf}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle2)} 
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle2)}
            >Sample Excel file</button>
          </div>
        </div>
      </div>}
    </div>
  );
}