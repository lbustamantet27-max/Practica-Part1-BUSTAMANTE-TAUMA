import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return mounted ? client : server;
}
