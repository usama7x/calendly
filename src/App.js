import { useState } from "react";
import "./App.css";
import { Modal } from "./Modal";
import { getCandidateSlots } from "./utils";
import { LOCATIONS, WORKING_HOURS, BOOKED_COLOR, BACKGROUND_COLOR } from './constants';

function App() {
  const [locations] = useState(LOCATIONS);
  const [workingHours] = useState(WORKING_HOURS)
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const bookMeeting = (location, slots, clearModal, setRenderError) => {
    const candidateSlots = getCandidateSlots(slots);
    let isAlreadyBooked = false;

    candidateSlots.forEach(slot => {
      const cell = document.getElementById(slot).children[location];
      if (cell.style.backgroundColor === BOOKED_COLOR) {
        setRenderError(true);
        isAlreadyBooked = true;
      }
      if (isAlreadyBooked) return;
      cell.style.setProperty(BACKGROUND_COLOR, BOOKED_COLOR);
    });

    if (isAlreadyBooked) return;
    closeModal();
    setRenderError(false);
    clearModal();
  } 

  return (
    <div className="App">
      <div className="App-main">
        <Modal
          openModal={openModal}
          isOpen={isOpen}
          closeModal={closeModal}
          locations={locations}
          workingHours={workingHours}
          bookMeeting={bookMeeting}
        />
        <table style={{ padding: 10, width: 1000, border: "2px solid black" }}>
          <thead>
            <tr>
              {locations.map((head, headID) => (
                <th style={{ border: "2px solid black" }} key={headID}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workingHours.map((rowContent, rowID) => (
              <tr id={rowContent} key={rowID}>
                <td>{rowContent + ':00'}</td>
                {locations.map(
                  (block, blockId) =>
                    block && (
                      <td
                        style={{ border: "2px solid black" }}
                        key={blockId}
                      >
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
