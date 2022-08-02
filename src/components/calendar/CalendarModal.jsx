import { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";

Modal.setAppElement('#root');
const NOW = moment().minutes(0).second(0).add(1, 'hours').toDate();
const NOW_PLUS_ONE = moment(NOW).add(1, 'hours').toDate();

export const CalendarModal = ({ children }) => {

    const [dateStart, setDateStart] = useState(NOW)
    const [dateEnd, setDateEnd] = useState(NOW_PLUS_ONE)

    const closeModal = () => {
    }

    const hanldeChangeStartDate = ( date ) => {
        setDateStart(date)
    }

    const hanldeChangeEndDate = ( date ) => {
        setDateEnd(date)
    }


    return (
        <Modal
            isOpen={ true }
            onRequestClose={closeModal}
            style={customModalStyles}
            closeTimeoutMS={ 200 }
            className={"modal"}
            overlayClassName={"modal-fondo"}

        >
            <h1 className="text-4xl pb-3"> Nuevo evento </h1>
            <hr  className="pb-4"/>
            <form className="w-full">

                <div className="flex flex-col mb-4">
                    <label className="font-medium text-lg">Fecha y hora inicio</label>
                    <DateTimePicker onChange={hanldeChangeStartDate} value={dateStart} className="p-2 border-gray-700 border-2 rounded outline-none" placeholder="Fecha inicio" />
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
                        className="p-2 border-gray-700 border-2 rounded outline-none"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="mt-2 text-gray-600">Una descripción corta</small>
                </div>

                <div className="flex flex-col mb-2">
                    <textarea 
                        type="text" 
                        className="outline-none border-2 border-gray-600 rounded p-2"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
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