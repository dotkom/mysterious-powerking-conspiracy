import { purchase } from "actions/store";
import { RootAction, RootState } from "reducers/root-reducer";
import { Epic, StateObservable } from "redux-observable";
import { isActionOf } from "typesafe-actions";

import {
  from,
  Observable,
  of,
  pipe,
} from "rxjs";

import {
  catchError,
  filter,
  map,
  switchMap,
} from "rxjs/operators";

export const purchaseEpic: Epic<RootAction, RootAction, RootState> = (
  action$: Observable<RootAction>, store: StateObservable<RootState>,
): Observable<RootAction> => (
    action$.pipe(
      filter(isActionOf(purchase.request)),
      switchMap((action) => (
        from(fetch("https://github.com/fredrikaugust/nibble2", { mode: "no-cors" })).pipe(
          map(purchase.success),
          catchError(pipe(purchase.failure, of)),
        )
      )),
    ) as Observable<RootAction>
  );
