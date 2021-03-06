import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import {unitOfTime} from 'moment';
import {
  ViewState, AppointmentModel,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const makeQueryString = (currentDate: Date, currentViewName: string) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase() as unitOfTime.StartOf);
  const end = start.clone().endOf(currentViewName.toLowerCase() as unitOfTime.StartOf);
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};

const getParameterByName = (name:string) => {
  const URL = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(URL);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const URL = getParameterByName('url');

const styles:any = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  container: {
    paddingTop: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1400px',
  },
};

const mapAppointmentData = (appointment: AppointmentModel) => ({
  ...appointment,
  startDate: appointment.StartDate,
  endDate: appointment.EndDate,
  title: appointment.Text,
});

interface State {
  loading: boolean,
  currentDate: Date,
  currentViewName: string,
  data: any,
}

const CustomAppointment: React.ComponentType<Appointments.AppointmentProps> = (props) => {
  if (props.data.EventType && props.data.EventType == 'AdBreak') {
    return <Appointments.Appointment {...props} style={{ backgroundColor: '#3f51b5' }} />;
  } else if (props.data.EventType && props.data.EventType == 'Personalized') {
    return <Appointments.Appointment {...props} style={{ backgroundColor: '#d32f2f' }} />;
  }
  return <Appointments.Appointment {...props} style={{ backgroundColor: '#009688' }} />;
};

export default class GoofyScheduler extends React.Component<{}, State> implements JSX.ElementClass {
  lastQuery:string = '';

  constructor(p: {}) {
    super(p);
    this.state = {
      loading: true,
      currentDate: new Date('2017-05-23'),
      currentViewName: 'Week',
      data: null,
    };

    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = this.currentViewNameChange.bind(this);
    this.currentDateChange = this.currentDateChange.bind(this);
  }

  currentViewNameChange(currentViewName:string) {
    this.setState({ currentViewName, loading: true });
  }

  currentDateChange(currentDate:Date) {
    this.setState({ currentDate, loading: true });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    if (queryString === this.lastQuery) {
      return;
    }
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
          });
          this.lastQuery = queryString;
        }, 600);
      })
      .catch(() => this.setState({ loading: false }));
  }

  render():JSX.Element {
    const {
      data, loading,
      currentDate, currentViewName,
    } = this.state;

    const formattedData = data ? data.map(mapAppointmentData) : [];

    return (
      <div style={styles.container}>
        <Paper elevation={2}>
          <Scheduler
            data={formattedData}
            height={1000}
          >
            <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
              onCurrentDateChange={this.currentDateChange}
            />
            <DayView
              startDayHour={9}
              endDayHour={18}
            />
            <WeekView
              startDayHour={9}
              endDayHour={18}
            />
            <Appointments appointmentComponent={CustomAppointment} />
            <Toolbar />
            <LinearProgress 
              style={{display: loading ? 'block' : 'none' }}
            />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AppointmentTooltip
              showOpenButton
              showCloseButton
            />
            <AppointmentForm readOnly />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
