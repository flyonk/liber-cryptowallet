import {
  NavigationGuardNext,
  RouteLocation,
  LocationAsRelativeRaw,
} from 'vue-router';
import { useRecepientsStore } from '@/stores/recipients';
import { Route } from '@/router/types';

function checkContactsLoaded(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) {
  const store = useRecepientsStore();
  if (to.params?.next === 'true') {
    next();
  } else if (store.getContacts.length) {
    next();
  } else {
    const loc: LocationAsRelativeRaw = {
      name: Route.LoadContacts,
      params: {
        back: String(to.name),
      },
    };
    next(loc);
  }
}

export default checkContactsLoaded;
