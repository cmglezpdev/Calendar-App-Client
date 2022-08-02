import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import Swal from "sweetalert2";

import { uiCloseModal } from '../../actions/ui.js';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from "../../actions/events.js";

Modal.setAppElement('#root');
const NOW = moment().minutes(0).second(0).add(1, 'hours').toDate();
const NOW_PLUS_ONE = moment(NOW).add(1, 'hours').toDate();

const initEvent = {
    title: "",
    notes: '',
    start: NOW,
    end: NOW_PLUS_ONE,
}


export const CalendarModal = () => {
    
    const [titleValid, setTitleValid] = useState(null);
    const [dateStart, setDateStart] = useState(NOW)
    const [dateEnd, setDateEnd] = useState(NOW_PLUS_ONE)
    const [formValues, setFormValues] = useState(initEvent);
    const { notes, title, start, end } = formValues;

    const { modalOpen }  = useSelector(state => state.ui);
    const { activeEvent }  = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    useEffect(() => {

        if( activeEvent ) {
            setFormValues(activeEvent);
        }

    }, [ activeEvent, setFormValues ]);

    const closeModal = () => {
       dispatch( uiCloseModal() );
       dispatch( eventClearActiveEvent() );
       setFormValues(initEvent);
    }

    const hanldeChangeStartDate = ( date ) => {
        setDateStart(date)
        setFormValues({
            ...formValues,
            start: date
        })
    }
    const hanldeChangeEndDate = ( date ) => {
        setDateEnd(date)
        setFormValues({
            ...formValues,
            end: date
        })
    }
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if( momentStart.isSameOrAfter(momentEnd) ) {
            Swal.fire('Error', 'La fecha de inicio debe ser menor a la fecha de fin', 'error');
            return;
        }

        if( title.trim().length < 2 ) {
            setTitleValid(false);
            return;
        } else {
            setTitleValid(true);
        }

        if ( activeEvent ) { // Estoy modificando un evento
            dispatch( eventUpdated( formValues ) );
        } else { // Estoy añadiendo nueva nota
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    id: 12345,
                    name: 'Carlos',
                }
            }));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={closeModal}
            style={customModalStyles}
            closeTimeoutMS={ 200 }
            className={"modal"}
            overlayClassName={"modal-fondo"}
        >
            <h1 className="text-4xl pb-3"> Nuevo evento </h1>
            <hr  className="pb-4"/>
            <form className="w-full" onSubmit={handleSubmitForm}>

                <div className="flex flex-col mb-4">
                    <label className="font-medium text-lg">Fecha y hora inicio</label>
                    <DateTimePicker 
                        onChange={hanldeChangeStartDate} 
                        value={dateStart}
                        className="p-2 border-gray-700 border-2 rounded outline-none" 
                        placeholder="Fecha inicio" 
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="font-medium text-lg">Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={hanldeChangeEndDate} 
                        value={dateEnd} 
                        minDate={dateStart}
                        className="p-2 border-gray-700 border-2 rounded outline-none" 
                        placeholder="Fecha inicio" 
                    />
                </div>

                <hr className="mt-6"/>
                <div className="flex flex-col mb-2">
                    <label className="font-medium text-lg">Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`p-2 border-gray-700 border-2 rounded outline-none
                         ${ titleValid === false  && 'border-red-600 text-red-600' }
                         ${ titleValid === true  && 'border-green-600 text-green-600'}
                         `}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    { titleValid === false && <i className="fas fa-sad-tear absolute right-8 mt-11 text-red-600"></i> }
                    { titleValid === true &&  <i className="fas fa-smile-beam absolute right-8 mt-11 text-green-600"></i> }
                    <small id="emailHelp" className="mt-2 text-gray-600">Una descripción corta</small>
                </div>

                <div className="flex flex-col mb-2">
                    <textarea 
                        type="text" 
                        className="outline-none border-2 border-gray-600 rounded p-2"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className=" text-gray-600">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="p-2 border-2 border-blue-800 w-full text-blue-700 rounded-lg font-medium text-lg hover:text-white hover:bg-blue-800 transition"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}


const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translateX(-50%)',
    },
};