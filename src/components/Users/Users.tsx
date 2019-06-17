import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Link from '@material-ui/core/Link';

interface UsersProps {
  data:
    | {
        id: number;
        name: string;
        username: string;
        email: string;
        address: { street: string; city: string };
        phone: string;
        website: string;
        company: {
          name: string;
          catchPhrase: string;
        };
      }[]
    | null;
}

const Users: FC<UsersProps> = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Website</TableCell>
          <TableCell>Company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>
                <Link href={`mailto:${row.email}`}>{row.email}</Link>
              </TableCell>
              <TableCell>
                <Typography>Street: {row.address.street}</Typography>
                <Typography>City: {row.address.city}</Typography>
              </TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <Link href={`//${row.website}`}>{row.website}</Link>
              </TableCell>
              <TableCell>
                <Typography>Name: {row.company.name}</Typography>
                <Typography>Catch phrase: {row.company.catchPhrase}</Typography>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default Users;
