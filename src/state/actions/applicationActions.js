export const INITIALIZE_APPLICATION = "INITIALIZE_APPLICATION";
export const initializeApplication = payload => {
  return {
    type: INITIALIZE_APPLICATION,
    payload: Promise.resolve(payload)
  };
};
