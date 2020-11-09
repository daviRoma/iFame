/**
 * App selectors
 */

const sApp = (state) => state.app;
export const sAppLogged = (state) => sApp(state).logged;
