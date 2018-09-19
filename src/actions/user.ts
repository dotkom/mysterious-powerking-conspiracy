import { ActionType, createAction } from "typesafe-actions";

export const subtractFromBalance = createAction("user/SUBTRACT_FROM_BALANCE", (resolve) => (
    (delta: number) => resolve({ delta })
));

/**
 * TODO: Thunk action for adjustBalance. Copy-pasta "purchase" from "actions/store.ts".
 */

export type UserAction = ActionType<
    typeof subtractFromBalance
>;
