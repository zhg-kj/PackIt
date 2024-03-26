import React, { useState } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Alert, AlertTitle, Button, Checkbox, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const items = [
  {
    item: "Red T-Shirt",
    weight: 0.3
  },
  {
    item: "Black T-Shirt",
    weight: 0.3
  },
  {
    item: "Grey T-Shirt",
    weight: 0.3
  },
  {
    item: "Black Underwear",
    weight: 0.1
  },
  {
    item: "Blue Underwear",
    weight: 0.1
  },
  {
    item: "Sunscreen",
    weight: 0.2
  },
  {
    item: "Toothbrush",
    weight: 0.1
  },
  {
    item: "Toothpaste 150mL",
    weight: 0.1
  },
  {
    item: "Toothpaste 100mL",
    weight: 0.1
  },
  {
    item: "Winter Jacket",
    weight: 2
  },
  {
    item: "Thin Hoodie",
    weight: 1
  },
  {
    item: "Thick Hoodie",
    weight: 2
  },
  {
    item: "Grey Socks",
    weight: 0.3
  },
  {
    item: "Black Socks",
    weight: 0.3
  },
  {
    item: "Cigarettes",
    weight: 0.1
  },
  {
    item: "Butcher Knife",
    weight: 0.6
  },
]

function HomePage({handlePlan, handleExisting} : {handlePlan: any, handleExisting: any}) {
  return (
    <>
      <h2 style={{marginBottom: 2}}>Welcome back!</h2>
      <p style={{marginTop: 0}}>Ready to start packing for your next destination?</p>
      <div className="image-container">
        <img src="/images/suitcase.png" alt="Suitcase" className="rounded-image"/>
      </div>
      <Stack spacing={2} direction="column">
        <Button variant="contained" onClick={handlePlan}>Plan a New Trip</Button>
        <Button variant="text" onClick={handleExisting}>Pack for an Existing Trip</Button>
      </Stack>

      <h3 style={{marginBottom: 2}}>Your suitcase is with you.</h3>
      <p style={{marginTop: 0}}>Last located 1 minute ago.</p>
      <div className="image-container">
        <img src="/images/gps.png" alt="GPS" className="rounded-image" />
      </div>
    </>
  )
}

function TripsPage() {
  return (
    <>
      
    </>
  )
}

function CreateTripPage({ handleCreate }: { handleCreate: any }) {
  const [departingAirport, setDepartingAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [tripLength, setTripLength] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = () => {
    if (flightNumber !== 'AC888') {
      setOpen(true);
      return;
    }

    handleCreate({
      departingAirport,
      destinationAirport,
      flightNumber,
      tripLength,
      numPeople
    });
  }

  const allFieldsFilled = departingAirport && destinationAirport && flightNumber && tripLength;

  return (
    <>
      <h2 style={{ marginBottom: 2 }}>Going somewhere new?</h2>
      <p style={{ marginTop: 0 }}>Enter in some details and we'll help you start packing.</p>
      <h3 style={{ marginBottom: 2 }}>Flight Details</h3>
      <p style={{ marginTop: 0 }}>This information helps us tell you luggage restrictions for your flight.</p>
      <TextField
        required
        label="Departing Airport"
        value={departingAirport}
        onChange={(e) => setDepartingAirport(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <TextField
        required
        label="Destination Airport"
        value={destinationAirport}
        onChange={(e) => setDestinationAirport(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <TextField
        required
        label="Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        placeholder="e.g. AC666"
        style={{ marginBottom: 10, width: "100%" }}
      />
      <h3 style={{ marginBottom: 2 }}>Trip Details</h3>
      <p style={{ marginTop: 0 }}>This information helps our AI generate suggestions on things to pack.</p>
      <TextField
        required
        label="Trip Length (Days)"
        value={tripLength}
        onChange={(e) => setTripLength(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <TextField
        label="Number of People Going"
        value={numPeople}
        onChange={(e) => setNumPeople(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Invalid Flight Number Entered.
        </Alert>
      </Collapse>
      <Button variant="contained" onClick={handleSubmit} disabled={!allFieldsFilled}>Submit</Button>
    </>
  )
}

function PackPage({weight} : {weight: number}) {
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <h2 style={{ marginBottom: 2 }}>Your Trip to Cancun</h2>
      <h3>Luggage Details</h3>
      <div> 
        <div className="image-container">
          <img src="/images/suitcase.png" alt="Suitcase" className="rounded-image"/>
        </div>
      </div>
      {weight <= 23 ? <Alert severity="success" style={{ marginBottom: 10 }}><AlertTitle>Your suitcase weighs {weight} KG</AlertTitle>You are currently within the weight limit of 23 KG by {23 - weight} KG.</Alert> : <Alert severity="error" style={{ marginBottom: 10 }}><AlertTitle>Your suitcase weighs {weight} KG</AlertTitle>You are currently over the weight limit of 23 KG by {weight - 23} KG.</Alert>}
      <Alert style={{ marginBottom: 20 }} severity="warning">Note that liquids over 100 mL are not permitted on this flight.</Alert>
      <h3 style={{marginBottom: 2}}>Packing Cheklist</h3>
      <p style={{marginTop: 0}}>Check this list off as you pack! AI suggested items are highlighted in purple.</p>
      <List>
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem 
              key={item.item} 
              style={{padding: 0}}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => {}}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={item.item} primary={`${item.item}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

function AccountPage() {
  return (
    <>
      Account
    </>
  )
}

function App() {
  const [checked, setChecked] = React.useState<number[]>([]);
  const [navbar, setNavbar] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const handlePlan = () => {
    setNavbar(0);
    setPage(3);
  }

  const handleExisting = () => {
    setNavbar(0);
    setPage(0);
  }

  const handleCreate = () => {
    setNavbar(0);
    setPage(4);
  }

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const calculateWeight = () => {
    let totalWeight = 0;

    checked.forEach(index => {
      if (items[index] && items[index].weight) {
        totalWeight += items[index].weight;
      }
    });

    return totalWeight;
  }

  return (
    <div className="App">
      <PanelGroup direction="horizontal" style={{gap: 2.5}}>
        <Panel minSize={20}>
          <div className="panel">
            <div className="no-bar" style={{background: "white", overflow: "auto", color: "black", width: "100%"}}>
              <h1>Your Items</h1>
              <p style={{margin: 20, textAlign: "left"}}>This is a part of the suitcase simulation. It is meant to represent the physical items you would add to the suitcase. Checking one off represents adding the item to the suitcase. Unchecking an item represents removing it from the suitcase. Note that this intentionally does not alter the checklist of the paired app, but, it will affect the measured weight of the suitcase in the app.</p>
              <List style={{margin: 20}}>
                {items.map((item, index) => {
                  const labelId = `checkbox-list-label-${index}`;

                  return (
                    <ListItem 
                      key={item.item} 
                      style={{padding: 0}}
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(index) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={item.item} primary={`${item.item}`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle/>
        <Panel minSize={30}>
          <div className="panel">
            
          </div>
        </Panel>
        <PanelResizeHandle/>
        <Panel minSize={30}>
          <div className="panel">
            <div className="phone">
              <div className="phone-content no-bar">
                {
                  page === 0 ? <TripsPage /> :
                  page === 1 ? <HomePage handlePlan={handlePlan} handleExisting={handleExisting} /> :
                  page === 2 ? <AccountPage /> :
                  page === 3 ? <CreateTripPage handleCreate={handleCreate} /> :
                  page === 4 ? <PackPage weight={calculateWeight()} /> :
                  null
                }
              </div>
              <BottomNavigation
                showLabels
                value={navbar}
                onChange={(event, newValue) => {
                  setNavbar(newValue);
                  setPage(newValue);
                }}
              >
                <BottomNavigationAction label="Trips" icon={<AirplaneTicketIcon />} />
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
              </BottomNavigation>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
