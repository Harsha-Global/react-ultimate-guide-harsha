import { releaseLabel } from './release';
export type FailureLocation = 'react-render' | 'booking-request';
export function reportFailure(location: FailureLocation) {
  console.error({ event: 'studio-failure', location, release: releaseLabel });
}
