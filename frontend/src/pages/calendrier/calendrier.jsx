import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import React, { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function MyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleSelectDate = (day) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6">
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    );
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <Grid
            item
            key={currentDate}
            xs={1.714} // Ajustement pour 7 jours
            sx={{
              textAlign: "center",
              py: 1,
              cursor: "pointer",
              border: "1px solid #eee",
              backgroundColor: isSameDay(currentDate, selectedDate)
                ? theme.palette.primary.light
                : "transparent",
              color: isSameMonth(currentDate, currentMonth)
                ? "inherit"
                : "#aaa",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
            onClick={() => handleSelectDate(currentDate)}
          >
            <Typography>
              {format(currentDate, dateFormat, { locale: fr })}
            </Typography>
          </Grid>
        );
        currentDate = addDays(currentDate, 1);
      }
      rows.push(
        <Grid container key={currentDate}>
          {days}
        </Grid>
      );
      days = [];
    }
    return rows;
  };

  const renderCalendar = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item key={i} xs={1.714} style={{ textAlign: "center" }}>
          <Typography>
            {format(addDays(startDate, i), dateFormat, { locale: fr })}
          </Typography>
        </Grid>
      );
    }
    return (
      <Grid container sx={{ mb: 2 }}>
        {days}
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 400, mx: "auto" }}>
        {" "}
        {/* Ajuster la largeur */}
        {renderHeader()}
        {renderCalendar()}
        {renderDays()}
      </Box>
    </ThemeProvider>
  );
}

export default MyCalendar;
