import {
    BOOKED_COLOR,
    BACKGROUND_COLOR,
    SLOT_ALREADY_BOOKED,
    INVALID_START_AND_END_TIME,
} from "./constants";

//generate dynamic sequence based on params
export const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const getCandidateSlots = (slots) => {
    const candidateSlots = [];
    const [firstSlot, lastSlot] = slots;
      const maxSlotsPerDay = 12;
    for (let i = firstSlot; i <= maxSlotsPerDay; i++) {
        candidateSlots.push(i);
        if (i === 12) i = 0;
        if (candidateSlots.at(-1) === lastSlot) break;
    }
    return candidateSlots;
};

export const bookSlots = (
    location,
    slots,
    setErrorMessage,
    setRenderError,
    isAlreadyBooked
) => {
    const candidateSlots = getCandidateSlots(slots);
    const reservedSlots = [];
    try {
        candidateSlots.forEach((slot) => {
            const cell = document.getElementById(slot).children[location];
            if (cell.style.backgroundColor === BOOKED_COLOR) {
                setRenderError(true);
                setErrorMessage(SLOT_ALREADY_BOOKED);
                isAlreadyBooked = true;
                const index = candidateSlots.findIndex((s) => s === slot);
                delete candidateSlots[index];
            } else {
                cell.style.setProperty(BACKGROUND_COLOR, BOOKED_COLOR);
                reservedSlots.push(slot);
            }
            debugger;
        });

        if (isAlreadyBooked) {
            clearSlots(candidateSlots, location);
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        clearSlots(reservedSlots, location);
        setRenderError(true);
        setErrorMessage(INVALID_START_AND_END_TIME);
    }
};

export const clearSlots = (slots, location) => {
    slots.forEach((slot) => {
        const cell = document.getElementById(slot).children[location];
        if (cell.style.backgroundColor === BOOKED_COLOR) {
            cell.style.setProperty(BACKGROUND_COLOR, "white");
      }
    });
};
