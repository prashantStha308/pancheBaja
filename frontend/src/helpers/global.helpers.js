const useGlobalHelpers = () => {
    const normalizeTimeFromMS = (timeInMs) => {
        let duration = "";
        if ( timeInMs && typeof timeInMs === 'number' && !isNaN(timeInMs)) {
            const durationInMs = timeInMs * 1000;
            const isoTime = new Date(durationInMs).toISOString();
            duration = timeInMs < 3600 
            ? isoTime.substring(14, 19) 
            : isoTime.substring(11, 16);
        }

        return duration;
    }

    return {
        normalizeTimeFromMS,
    }
}

export default useGlobalHelpers;