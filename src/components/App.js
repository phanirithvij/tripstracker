import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import { Nav } from './Nav';
import { TripsCount } from './trips/TripsCount';
import { AddTrip } from './trips/AddTrip';
import { TripsList } from './trips/TripsList';
import { Error404 } from './Error404';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrips: [
                {
                    place: "Manali",
                    date: "2019-01-01",
                    type: "Trek"
                },
                {
                    place: "Mumbai",
                    date: "2019-04-05",
                    type: "Club"
                },
                {
                    place: "Marina",
                    date: "2019-02-09",
                    type: "Tropic"
                }
            ]
        }
        this.addTrip = this.addTrip.bind(this);
    }

    addTrip(newTrip) {
        this.setState((prevState) => {
            return {
                allTrips: [
                ...prevState.allTrips,
                newTrip
                ]
            }
        });
    }

    countDays(filter) {
        const { allTrips } = this.state;
        return allTrips.filter(trip => filter ? trip.type === filter : trip).length;
    }

    componentDidMount() {
        if (localStorage['data'] === undefined){
            localStorage['data'] = JSON.stringify(this.state.allTrips);
        } else {
            this.setState({ allTrips: JSON.parse(localStorage['data']) });
        }
    }

    componentDidUpdate(_) {
        localStorage['data'] = JSON.stringify(this.state.allTrips);
    }

    // Switch goes to first matching route
    render () {
        return (
            <div className="app">                
                <Router basename="/tripstracker/">
                    <div className="route-container">
                        <Nav />
                        <Switch>
                            <Route exact path="/" render={(props) => (
                                <TripsCount
                                    {...props}
                                    total={this.countDays()}
                                    trek={this.countDays('Trek')}
                                    tropic={this.countDays('Tropic')}
                                    club={this.countDays('Club')}
                                />
                            )}>
                            </Route>
                            <Route path="/list/:filter" render={(props) => (
                                <TripsList 
                                    {...props} 
                                    days={this.state.allTrips}
                                /> 
                            )}/>
                            <Route path="/list" render={(props) => (
                                <TripsList
                                    {...props}
                                    days={this.state.allTrips}
                                />
                            )} />
                            <Route path="/add" render={(props) => (
                                <AddTrip
                                    {...props}
                                    newTrip={this.addTrip}
                                />
                            )} />
                            <Route component={Error404} />
                        </Switch>
                    </div>                    
                </Router>                
            </div>
        )
    }
}