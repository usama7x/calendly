//generate dynamic sequence based on params
export const range = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );

export const getCandidateSlots = (slots) => {
    const candidateSlots = [];
    const [firstSlot, lastSlot] = slots;
    const maxSlotsPerDay = 24;
    for (let i = firstSlot; i <= maxSlotsPerDay; i++) {
        candidateSlots.push(i);
        if (i === 12) i = 0;
        if (candidateSlots.at(-1) === lastSlot) break;
    }
    return candidateSlots;
} 