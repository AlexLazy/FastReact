import React from "react";

import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Link from "@material-ui/core/Link";

function Capsules({ data }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Capsule_serial</TableCell>
          <TableCell>Capsule_id</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Original_launch</TableCell>
          <TableCell>Original_launch_unix</TableCell>
          <TableCell>Missions</TableCell>
          <TableCell>Landings</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Reuse_count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map(
            ({
              capsule_serial,
              capsule_id,
              status,
              original_launch,
              original_launch_unix,
              missions,
              landings,
              type,
              details,
              reuse_count
            }) => (
              <TableRow key={capsule_serial}>
                <TableCell>{capsule_serial || "—"}</TableCell>
                <TableCell>{capsule_id || "—"}</TableCell>
                <TableCell>{status || "—"}</TableCell>
                <TableCell>{original_launch || "—"}</TableCell>
                <TableCell>{original_launch_unix || "—"}</TableCell>
                <TableCell>
                  {missions.length > 0
                    ? missions.map(({ name, flight }, i) => (
                        <React.Fragment key={i}>
                          <Typography>Name: {name}</Typography>
                          <Typography>Flight: {flight}</Typography>
                        </React.Fragment>
                      ))
                    : "—"}
                </TableCell>
                <TableCell>{landings}</TableCell>
                <TableCell>{type || "—"}</TableCell>
                <TableCell>{details || "—"}</TableCell>
                <TableCell>{reuse_count}</TableCell>
              </TableRow>
            )
          )}
      </TableBody>
    </Table>
  );
}

export default Capsules;
