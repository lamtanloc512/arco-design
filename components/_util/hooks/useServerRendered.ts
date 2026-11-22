import React, { useRef } from 'react';

const subscribe = () => () => {};
const clientSnapshot = () => false;
const serverSnapshot = () => true;

/**
 * Whether this component instance came from server HTML: true when it renders on the server and
 * when it hydrates server markup, false when it first renders on the client. The answer is fixed
 * for the instance's life, so it can keep server-rendered output stable after hydration.
 *
 * Uses useSyncExternalStore, which reads the server snapshot during server rendering and
 * hydration only. Before React 18 it has no way to tell and returns false (client behaviour).
 */
export default function useServerRendered(): boolean {
  const useSyncExternalStore = (React as any).useSyncExternalStore;
  const now: boolean = useSyncExternalStore
    ? useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
    : false;
  const first = useRef(now);
  return first.current;
}
