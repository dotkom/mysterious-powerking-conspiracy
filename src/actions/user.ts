import { createAction } from "typesafe-actions";

export const subtractFromBalance = createAction("user/SUBTRACT_FROM_BALANCE", (resolve) => (
    (delta: number) => resolve({ delta })
));
