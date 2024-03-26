import React, { useState } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
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

function TripsPage({trips, handleSelectTrip} : {trips: any, handleSelectTrip: any}) {
  return (
    <>
      <h2>All Your Trips</h2>
      {trips.map((trip: any, index: any) => {
        return (
          <Card style={{marginBottom: 20}}>
            <CardMedia
              sx={{ height: 140 }}
              image="/images/jfk.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {trip.departing_airport + " to " + trip.arriving_airport}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Flight {trip.flight_number}. Gone for {trip.trip_length} days.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                * Edit trip details is unimplemented for this prototype.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" onClick={() => {handleSelectTrip(index)}}>Pack</Button>
              <Button size="small">Edit Trip Details</Button>
            </CardActions>
          </Card>
        )
      })}
    </>
  )
}

function CreateTripPage({handleCreate}: {handleCreate: any}) {
  const [departingAirport, setDepartingAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [tripLength, setTripLength] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleSubmit = () => {
    if (departingAirport !== 'YYZ') {
      setOpen3(true);
      return;
    }

    if (destinationAirport !== 'CUN') {
      setOpen2(true);
      return;
    }

    if (flightNumber !== 'AC888') {
      setOpen1(true);
      return;
    }

    handleCreate({
      departing_airport: departingAirport, 
      arriving_airport: destinationAirport,
      flight_number: flightNumber,
      trip_length: parseInt(tripLength),
      checked: [],
      items: [
        {
          ai: true,
          item: "Sunscreen"
        },
        {
          ai: true,
          item: "Sunglasses"
        },
        {
          ai: true,
          item: "Hat"
        },
        {
          ai: true,
          item: "Swimming Suit"
        },
      ]
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
      <Collapse in={open1}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen1(false);
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
      <Collapse in={open2}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen2(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Invalid Destination Airport Entered.
        </Alert>
      </Collapse>
      <Collapse in={open3}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen3(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Invalid Departing Airport Entered.
        </Alert>
      </Collapse>
      <Button variant="contained" onClick={handleSubmit} disabled={!allFieldsFilled}>Submit</Button>
    </>
  )
}

function PackPage({weight, trips, selectedTrip, setTrips} : {weight: number, trips: any, selectedTrip: any, setTrips: any}) {
  const [newItem, setNewItem] = useState('');

  const handleToggle = (index: number) => () => {
    const newChecked = [...trips[selectedTrip].checked];
  
    const currentIndex = newChecked.indexOf(index);
    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
  
    setTrips((prevTrips: any) => {
      const updatedTrips = [...prevTrips];
      updatedTrips[selectedTrip] = {
        ...updatedTrips[selectedTrip],
        checked: newChecked
      };
      return updatedTrips;
    });
  };

  const handleDelete = (index: number) => {
    setTrips((prevTrips: any) => {
      const updatedTrips = [...prevTrips];
      const updatedTrip = {...updatedTrips[selectedTrip]};
      updatedTrip.items.splice(index, 1);
      const newChecked = updatedTrip.checked.reduce((acc: number[], curr: number) => {
        if (curr < index) {
          acc.push(curr);
        } else if (curr > index) {
          acc.push(curr - 1);
        }
        return acc;
      }, []);
      updatedTrip.checked = newChecked;
      updatedTrips[selectedTrip] = updatedTrip;
  
      return updatedTrips;
    });  
  };

  const handleAdd = () => {
    if (newItem.trim() !== '') {
      setTrips((prevTrips: any) => {
        const updatedTrips = [...prevTrips];
        updatedTrips[selectedTrip].items.push({ ai: false, item: newItem.trim() });
        return updatedTrips;
      });
      setNewItem('');
    }
  }

  return (
    <>
      <h2 style={{ marginBottom: 2 }}>Your Trip to {trips[selectedTrip].arriving_airport}</h2>
      <h3>Luggage Details</h3>
      <div> 
        <div className="image-container">
          <img src="/images/suitcase.png" alt="Suitcase" className="rounded-image"/>
        </div>
      </div>
      {weight <= 23 ? <Alert severity="success" style={{ marginBottom: 10 }}><AlertTitle>Your suitcase weighs {weight} KG</AlertTitle>You are currently within the weight limit of 5 KG by {5 - weight} KG.</Alert> : <Alert severity="error" style={{ marginBottom: 10 }}><AlertTitle>Your suitcase weighs {weight} KG</AlertTitle>You are currently over the weight limit of 5 KG by {weight - 5} KG.</Alert>}
      <Alert style={{ marginBottom: 20 }} severity="warning">Note that liquids over 100 mL are not permitted on this flight.</Alert>
      <h3 style={{marginBottom: 2}}>Packing Cheklist</h3>
      <p style={{marginTop: 0}}>Check this list off as you pack! AI suggested items are highlighted in purple.</p>
      <List>
        {trips[selectedTrip].items.map((item: any, index: any) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem 
              key={item.item} 
              style={{padding: 0, color: item.ai ? '#9d4edd' : 'black'}}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={trips[selectedTrip].checked && trips[selectedTrip].checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    style={{color: item.ai ? '#9d4edd' : 'black'}}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={item.item} primary={`${item.item}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          required
          label="Add Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} disabled={newItem === ''}>Add</Button>
      </Stack>
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
  const [checked, setChecked] = useState<number[]>([]);
  const [navbar, setNavbar] = useState(1);
  const [page, setPage] = useState(1);
  const [trips, setTrips] = useState<any[]>([{
    departing_airport: "YYZ", 
    arriving_airport: "JFK",
    flight_number: "AC666",
    trip_length: 4,
    checked: [],
    items: [
      {
        ai: true,
        item: "Winter Jacket"
      },
      {
        ai: false,
        item: "T-Shirt"
      }
    ]
  }])
  const [selectedTrip, setSelectedTrip] = useState(0);

  const handlePlan = () => {
    setNavbar(0);
    setPage(3);
  }

  const handleExisting = () => {
    setNavbar(0);
    setPage(0);
  }

  const handleCreate = (trip: any) => {
    setTrips(prevTrips => [trip, ...prevTrips])
    setNavbar(0);
    setSelectedTrip(0);
    setPage(4);
  }

  const handleSelectTrip = (index: any) => {
    setNavbar(0);
    setSelectedTrip(index);
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
            <div className="no-bar" style={{background: "white", overflow: "auto", color: "black", width: "100%", height: "100%"}}>
              <h1 style={{margin: 20}}>Tasks</h1>
              <h3 style={{margin: 20, marginBottom: 2}}>Task 1: Pack a Trip to Cancun</h3>
              <p style={{margin: 20, marginTop: 0}}>Your first task is to pack a trip to Cancun. You are leaving from Toronto YYZ and arriving in Cancun CUN. You will be gone for 4 days and will be on flight AC888. Use the app and suitcase to help you pack for your trip.</p>
              <h3 style={{margin: 20, marginBottom: 2}}>Task 2: Luggage Restrictions</h3>
              <p style={{margin: 20, marginTop: 0}}>In this task you are given a packed suitcase. You need to use the app to identify and remove any items that are restricted from your luggage. You should replace items that can be replaced accordingly.</p>
              <p style={{margin: 20, marginTop: 0, marginBottom: 0}}>Click the button below to initialize the simulator for this task. Note that is will overwrite any inputs you have entered so far.</p>
              <Button variant="contained" style={{margin: 20}}>Initialize Task 2</Button>
              <h3 style={{margin: 20}}>Task 3: Overweight</h3>
              <p style={{margin: 20, marginTop: 0}}>In this task you are given a packed suitcase that exceeds the weight limit. Use the app and suitcase to remove/replace items so you satisfy the weight limit and have all the items you need for your trip.</p>
              <p style={{margin: 20, marginTop: 0, marginBottom: 0}}>Click the button below to initialize the simulator for this task. Note that is will overwrite any inputs you have entered so far.</p>
              <Button variant="contained" style={{margin: 20}}>Initialize Task 3</Button>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle/>
        <Panel minSize={20}>
          <div className="panel">
            <div className="no-bar" style={{background: "white", overflow: "auto", color: "black", width: "100%"}}>
              <h1 style={{margin: 20}}>Your Items</h1>
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
        <Panel minSize={40}>
          <div className="panel">
            <div className="phone">
              <div className="phone-content no-bar">
                {
                  page === 0 ? <TripsPage trips={trips} handleSelectTrip={handleSelectTrip} /> :
                  page === 1 ? <HomePage handlePlan={handlePlan} handleExisting={handleExisting} /> :
                  page === 2 ? <AccountPage /> :
                  page === 3 ? <CreateTripPage handleCreate={handleCreate} /> :
                  page === 4 ? <PackPage setTrips={setTrips} weight={calculateWeight()} trips={trips} selectedTrip={selectedTrip} /> :
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
