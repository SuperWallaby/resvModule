export const TICKET_SERVER_URI = `${process.env.REACT_APP_API_TICKET_SERVER_URI}`;
export const SERVER_URI = `${process.env.REACT_APP_API_SERVER_URI}`;

export const TICEKT_URI = (() => TICKET_SERVER_URI)();
export default (() => {
  return SERVER_URI
})();
