import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import DateFnsUtils from "@date-io/moment";

// const customTheme = createMuiTheme({
//   overrides: {
//     MuiPickersToolbar: {
//       toolbar: {
//         backgroundColor: '#282c34',
//       },
//     },
//     MuiPickersCalendarHeader: {
//       switchHeader: {
//         // backgroundColor: lightBlue.A200,
//         // color: "white",
//       },
//     },
//     MuiPickersDay: {
//       daySelected: {
//         backgroundColor: '#7fc6a4',
//       },
//       current: {
//         color: '#fff',
//       },
//     },
//     MuiPickersModal: {
//       dialogAction: {
//         color: '#fff',
//       },
//     },
//     MuiInput: {
//       underlineBefore: {
//
//       }
//     },
//     MuiInputBase: {
//       input: {
//         color: '#fff'
//       }
//     },
//     MuiFormLabel: {
//       root: {
//         color: '#ccc'
//       }
//     },
//     MuiButton: {
//       label: {
//         color: '#282c34'
//       }
//     }
//   }
// })

function BasicDatePicker(props) {
  var moment = require("moment");
  const [selectedDate, handleDateChange] = useState("2019-08-18");

  const dateChange = val => {
    handleDateChange(val);
    // console.log([val,selectedDate],'val,selectedDate')
    if (moment(val).format("L") !== moment(selectedDate).format("L"))
      props.handleDateChange(val);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Select date"
        value={selectedDate}
        onChange={dateChange}
        minDate='2019-07-15'
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDatePicker;
