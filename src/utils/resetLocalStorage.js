import customLocalStorage from 'utils/customLocalStorage';

export default () => {
  try {
    localStorage.removeItem('persist:root');
  } catch (e) {
    const localStorage = new customLocalStorage();

    localStorage.removeItem('persist:root');
  }
};
