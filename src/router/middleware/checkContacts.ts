import { RouteLocation } from 'vue-router';
import { useRecepientsStore } from '@/stores/recipients';
import { Route } from '@/router/types';

function checkContactsLoaded(
  to: RouteLocation,
  from: RouteLocation,
  next: any
) {
  const store = useRecepientsStore();
  if (store.getContacts.length) {
    next();
  } else {
    next({
      name: Route.PushNotifications,
    });
  }
}

export default checkContactsLoaded;
