/** Starts drawing squircle corners on Arco surfaces (client only). Returns a stop function. */
export function startCorners(): () => void;
/** Disconnects the observers and clears every corner drawn. */
export function stopCorners(): void;
export const arcoCorners: { apply(): void; clear(): void };
