import { Route } from '@/router/types';

export interface AuthFlow {
  route: Route;
  step?: number;
}
