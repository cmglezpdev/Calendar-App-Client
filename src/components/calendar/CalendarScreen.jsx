import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Navbar } from "../ui/Navbar"

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Traduccion de la aplicaicon al español
import 'moment/locale/es';
import { messages_es } from '../../helpers/calendar-messages-es'
import { uiOpenModal } from "../../actions/ui";
moment.locale('es');


const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'Boss Brithday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'A big day for boss',
    user: {
      _id: '5c9d8f8f8f8f8f8f8f8f8f8',
      name: 'Carlos'
    }
  }
]


export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )
  }

  const onSelectEvent = (e) => {
    // TODO:
    console.log(e);
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  const eventStyleEvent = (  event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: '#fff',
    }

    return { style }
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages_es}
        eventPropGetter={eventStyleEvent}
        components={{
          event: CalendarEvent,
        }}
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />

      <CalendarModal />
    </div>
  )
}
