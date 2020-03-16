import React from "react";
import Paper from "@material-ui/core/Paper";
import { useStyles, Props } from './types';
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Grid, TableContainer } from '@material-ui/core';
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "./data";

const CustomAppointment: React.ComponentType<Appointments.AppointmentProps> = (props) => {
  return <Appointments.Appointment {...props} style={{ backgroundColor: '#388e3c' }} />;
};

const GoofyScheduler = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid justify='center' className={classes.container}>
      <Paper elevation={2} style={{ width: "100%" }}>
        <TableContainer>
          <div className={classes.tableHeader}>
              CBS Sports SideArm
          </div>
        </TableContainer>
        <Scheduler data={appointments}>
          <ViewState currentDate="2018-06-28" />
          <WeekView startDayHour={9} endDayHour={19} />
          <Appointments appointmentComponent={CustomAppointment} />
        </Scheduler>
      </Paper>
    </Grid>
  );
}

export default GoofyScheduler;