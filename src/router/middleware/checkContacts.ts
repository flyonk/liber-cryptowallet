import { RouteLocation } from 'vue-router';
import { useRecepientsStore } from '@/stores/recipients';
import { Route } from '@/router/types';

function checkContactsLoaded(
  to: RouteLocation,
  from: RouteLocation,
  next: any
) {
  const store = useRecepientsStore();
  if (to.params?.next === 'true') {
    next();
  } else if (store.getContacts.length) {
    next();
  } else {
    next({
      name: Route.LoadContacts,
      params: {
        back: to.name,
      },
    });
  }
}

export default checkContactsLoaded;
