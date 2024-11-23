import React from 'react';
import { Table } from 'react-bootstrap';

const UserTrips = ({ trips }) => {
  if (trips.length === 0) {
    return <p>Vous n'avez pas de trajets en cours.</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Conducteur</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {trips.map(trip => (
          <tr key={trip.id}>
            <td>{trip.id}</td>
            <td>{trip.driver.username}</td>
            <td>{trip.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTrips;