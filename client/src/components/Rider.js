import React, { useEffect, useState } from  'react';
import {
    Breadcrumb, Card, Col, Row
} from 'react-bootstrap';

import { Redirect } from 'react-router-dom';
import { isRider } from '../services/AuthService';
import { getTrips } from '../services/TripService';
import TripCard from './TripCard';

function Rider (props) {

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const loadTrips = async () => {
            const { response, isError } = await getTrips();

            if(isError) 
            {
                setTrips([]);
            }
            else
            {
                setTrips(response.data);
            }
        }

        loadTrips();
    }, []);




    if(isRider())
    {
        const getCurrentTrips = () => {
            return trips.filter(trip => {
                
                return (
                    trip.driver !== null &&
                    trip.status !== 'REQUESTED' && 
                    trip.status !== 'COMPLETED' 
                );
            });
        };


        const getCompletedTrips = () => {
            return trips.filter(trip => {
                return trip.status === 'COMPLETED';
            });
        };
        
        return (
            <Row>
                <Col lg={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>

                    <TripCard 
                        title='Current Trip'
                        trips={getCurrentTrips()}
                        group='rider'
                        otherGroup='driver'
                    />

                    <TripCard
                        title='Recent Trips'
                        trips={getCompletedTrips()}
                        group='rider'
                        otherGroup='driver'
                    />


                </Col>
            </Row>
        );
    }
    else
    {
        return (<Redirect to='/' />);
    }
}

export default Rider;