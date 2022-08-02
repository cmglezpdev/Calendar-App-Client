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
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
moment.locale('es');


const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )
  }

  const onSelectEvent = ( event ) => {
      dispatch( eventSetActive( event ) );
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

  const onSelectSlot = (e) => {
    // dispatch( uiOpenModal() ) TODO: crear un evento desde aqui

    dispatch( eventClearActiveEvent() );
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
        onSelectSlot={ onSelectSlot }
        selectable={true}
      />
      <AddNewFab />
      { activeEvent && <DeleteEventFab /> } 
      <CalendarModal />
    </div>
  )
}
