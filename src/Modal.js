import { useState } from "react";
import { LOCATIONS, SLOT_ALREADY_BOOKED } from "./constants";

export const Modal = (props) => {
    const {
        isOpen,
        openModal,
        closeModal,
        locations,
        workingHours,
        bookMeeting,
    } = props;
    const [selectedLocation, setSelectedLocation] = useState("Location A");
    const [selectedStart, setSelectedStart] = useState(workingHours[0]);
    const [selectedEnd, setSelectedEnd] = useState(workingHours.at(-1));
    const [renderError, setRenderError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(SLOT_ALREADY_BOOKED);

    const clearModal = () => {
        setSelectedLocation(LOCATIONS[1]);
        setSelectedStart(workingHours[0]);
        setSelectedEnd(workingHours.at(-1));
    };
    return (
        <div>
            {isOpen && (
                <>
                    <div className="overlay"></div>
                    <div className="modal">
                        <header className="modal__header">
                            <h3>Book Meeting</h3>
                          <button
                              onClick={() => {
                                  closeModal();
                                  clearModal();
                                  setRenderError(false);
                              }}
                              className="close-button"
                          >
                              &times;
                          </button>
                      </header>
                      <main className="modal__main">
                          <label>Location:</label>
                          <select
                              name="location"
                              value={selectedLocation}
                              onChange={(e) => setSelectedLocation(e.target.value)}
                          >
                              {locations.map(
                                  (l) =>
                                      l && (
                                          <option key={l} value={l}>
                                              {l}
                                          </option>
                        )
                )}
                          </select>
                          <hr />

                          <label>Start Time</label>
                          <select
                              name="start"
                              value={selectedStart}
                              onChange={(e) => setSelectedStart(+e.target.value)}
                          >
                              {workingHours.map((workingHour) => (
                                  <option key={workingHour} value={workingHour}>
                                      {workingHour}:00
                                  </option>
                              ))}
                          </select>
                          <hr />
                          <label>End Time</label>
                          <select
                              name="end"
                              value={selectedEnd}
                              onChange={(e) => setSelectedEnd(+e.target.value)}
                          >
                              {workingHours.map((workingHour) => (
                                  <option key={workingHour} value={workingHour}>
                                      {workingHour}:00
                                  </option>
                              ))}
                          </select>
                          <hr />
                          <button
                              onClick={() =>
                                  bookMeeting(
                                      locations.indexOf(selectedLocation),
                                      [selectedStart, selectedEnd],
                                      clearModal,
                      setRenderError,
                      setErrorMessage
                  )
                              }
                              className="button"
                          >
                              Save
                          </button>
                          {renderError && (
                              <span style={{ color: "red" }}>{errorMessage}</span>
                          )}
                      </main>
                  </div>
              </>
          )}
          <button
              style={{ marginLeft: "58rem", marginBottom: "10px" }}
              className="button"
              onClick={openModal}
          >
              Book
          </button>
      </div>
  );
};
