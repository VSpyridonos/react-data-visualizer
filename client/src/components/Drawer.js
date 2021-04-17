import { React, useState, useReducer } from 'react';
import { scaleBand, scaleLinear, max } from 'd3';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import { List, ListItem } from '@material-ui/core';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



function ResponsiveDrawer({ window }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [data, setData] = useState([]);



    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            dataset: "",
            graph: ""
        }
    );


    // *********************** D3 ******************************
    const width = 700;
    const height = 350;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const yScale = scaleBand()
        .domain(data.map(d => d.country))
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain([0, max(data, d => parseFloat(d.money))])
        .range([0, innerWidth]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        let { dataset, graph } = formInput;

        const result = await axios.get(
            'http://localhost:3001/testresponse',
        );
        console.log(result.data)
        setData(result.data);
        console.log(dataset, graph);
    };

    const handleInput = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [name]: newValue });
    };


    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <br />
            <br />

            <form onSubmit={handleSubmit} style={{ 'marginLeft': '15px' }}>

                <FormControl className={classes.formControl}>
                    <InputLabel id="dataset-select-label">Dataset</InputLabel>

                    <Select
                        name="dataset"
                        labelId="dataset-select-label"
                        id="dataset-select"
                        native
                        value={formInput.dataset ?? ''}
                        onChange={handleInput}
                    >
                        <option aria-label="None" value="" />
                        <option value="Data set 1">Data set 1</option>
                        <option value="Data set 2">Data set 2</option>
                        <option value="Data set 3">Data set 3</option>


                    </Select>

                    <FormHelperText>Select the data set</FormHelperText>

                </FormControl>

                <br />

                <FormControl className={classes.formControl}>
                    <InputLabel id="graph-select-label">Graph</InputLabel>
                    <Select
                        name="graph"
                        labelId="graph-select-label"
                        id="graph-select"
                        native
                        value={formInput.graph ?? ''}
                        onChange={handleInput}
                    >
                        <option aria-label="None" value="" />
                        <option value="Timeline / Trendline">Timeline / Trendline</option>
                        <option value="Bar Chart">Bar Chart</option>
                        <option value="Scatter Plot">Scatter Plot</option>

                    </Select>

                    <FormHelperText>Select the graph type</FormHelperText>

                </FormControl>
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                    DISPLAY
                    </Button>


            </form>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <span style={{ fontSize: '36px' }}><EqualizerIcon className="material-icons" style={{ fontSize: '30px' }} /> Data Visualizer</span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />


                <br />

                <div>
                    <svg width={width} height={height}>
                        <g transform={`translate(${margin.left},${margin.top})`}>
                            {data.map(d => (
                                <rect
                                    key={d.id}
                                    x={0}
                                    y={yScale(d.country)}
                                    width={xScale(parseFloat(d.money))}
                                    height={yScale.bandwidth()}
                                />
                            ))}
                        </g>
                    </svg>
                </div>

                <Typography paragraph>
                    <List>
                        {data.map(row => <ListItem key={row.id}>Country: {row.country}, Money: {row.money}</ListItem>)}
                    </List>
                </Typography>



            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;