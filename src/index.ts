import { PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { AnyAction, Middleware } from "redux";

export const createMikeEffect = <P, T extends string, TState>(
  actionCreator: PayloadActionCreator<P, T>,
  handler: (action: PayloadAction<P, T>) => Promise<AnyAction | void>): Middleware<{}, TState> => {

  return store => next => (action: PayloadAction<P, T>) => {
    if (actionCreator.match(action)) {
      handler(action).then(outAction => {
        if (outAction) {
          store.dispatch(outAction);
        }
      });
    }

    next(action);
  }
}