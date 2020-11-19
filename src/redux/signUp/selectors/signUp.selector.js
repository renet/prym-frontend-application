import { createSelector } from "reselect";

const getSignUp = (state) => state.signUp;

export const signUpSelector = createSelector([getSignUp], (signUp) => signUp);
