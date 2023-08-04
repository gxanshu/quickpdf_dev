import { createSignal, createEffect, Accessor } from 'solid-js';

/**
 * Custom hook to check if the user is an admin.
 * @returns An array with a single boolean value indicating whether the user is an admin.
 */
export const useAdminChecker = (): [Accessor<boolean>] => {
  // State to store the admin status
  const [isAdmin, setIsAdmin] = createSignal<boolean>(false);

  // Get the user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') as string);

  // Check if the user is an admin and update the state accordingly
  if (user?.admin === true) {
    setIsAdmin(true);
  }

  return [isAdmin];
};
