import { purchaseEpic } from "epics/store";
import { RootState } from "reducers/root-reducer";
import { RootAction } from "reducers/root-reducer";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics<RootAction, RootAction, RootState>(
  purchaseEpic,
);
