import { React, useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft({ data }) {
    const classes = useStyles();

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            dataset: "",
            graph: ""
        }
    );

    const handleSubmit = e => {
        e.preventDefault();

        let { dataset, graph } = formInput;

        // fetch("https://pointy-gauge.glitch.me/api/form", {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(response => console.log("Success:", JSON.stringify(response)))
        //     .catch(error => console.error("Error:", error));
        console.log(dataset, graph);
    };

    const handleInput = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [name]: newValue });
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Data Visualizer
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />

                <form onSubmit={handleSubmit}>
                    <InputLabel id="data-set-select-label">Choose the data set</InputLabel>
                    <Select name="dataset" labelId="data-set-select-label" id="data-set-select" onChange={handleInput} value={formInput.dataset ? formInput.dataset : ''}>
                        <MenuItem value="Data set 1">Data set 1</MenuItem>
                        <MenuItem value="Data set 2">Data set 2</MenuItem>
                        <MenuItem value="Data set 3">Data set 3</MenuItem>
                    </Select>
                    <br />
                    <br />
                    <InputLabel id="graph-select-label">Choose the graph type</InputLabel>
                    <Select name="graph" labelId="graph-select-label" id="graph-select" onChange={handleInput} value={formInput.graph ? formInput.graph : ''}>
                        <MenuItem value="Timeline / Trendline">Timeline / Trendline</MenuItem>
                        <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                        <MenuItem value="Scatter Plot">Scatter Plot</MenuItem>
                    </Select>
                    <br />
                    <br />
                    <Button variant="contained" color="secondary" type="submit">
                        Display
                    </Button>
                </form>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {data.map(row => <li key={row.id}>Country: {row.country}, Money: {row.money}</li>)}


            </main>
        </div>
    );
}




{/* <FormControl>
                <InputLabel id="label">Data Set</InputLabel>
                <Select labelId="label" id="select" value="20">
                    <MenuItem value="10">Data Set #1</MenuItem>
                    <MenuItem value="20">Data Set #2</MenuItem>
                    <MenuItem value="20">Data Set #3</MenuItem>
                </Select>
            </FormControl>

<Typography>
                    {data.map(row => <li key={row.id}>Country: {row.country}, Money: {row.money}</li>)}
                </Typography> */}













// <div className={classes.root}>
//     <CssBaseline />
//     <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//             [classes.appBarShift]: open,
//         })}
//     >
//         <Toolbar>
//             <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={handleDrawerOpen}
//                 edge="start"
//                 className={clsx(classes.menuButton, open && classes.hide)}
//             >
//                 <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap>
//                 Data Visualizer
//           </Typography>
//         </Toolbar>
//     </AppBar>
//     <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="left"
//         open={open}
//         classes={{
//             paper: classes.drawerPaper,
//         }}
//     >
//         <div className={classes.drawerHeader}>
//             <IconButton onClick={handleDrawerClose}>
//                 {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//             </IconButton>
//         </div>
//         <Divider />
//         <FormControl>
//             <InputLabel id="label">Data Set</InputLabel>
//             <Select labelId="label" id="select" value="20">
//                 <MenuItem value="10">Data Set #1</MenuItem>
//                 <MenuItem value="20">Data Set #2</MenuItem>
//                 <MenuItem value="20">Data Set #3</MenuItem>
//             </Select>
//         </FormControl>
//         <Divider />
//     </Drawer>
//     <main
//         className={clsx(classes.content, {
//             [classes.contentShift]: open,
//         })}
//     >
//         <div className={classes.drawerHeader} />
//         <Typography>
//             {data.map(row => <li key={row.id}>Country: {row.country}, Money: {row.money}</li>)}
//         </Typography>
//     </main>
// </div>
