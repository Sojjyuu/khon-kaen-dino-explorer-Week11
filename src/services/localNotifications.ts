// Local notifications only. The package root also evaluates
// DevicePushTokenAutoRegistration.fx, which registers an unsupported push-token
// listener in Android Expo Go. Keep all deep imports in this SDK 57 adapter;
// recheck these internal paths whenever upgrading expo-notifications.
export { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
export {
  DEFAULT_ACTION_IDENTIFIER,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  getLastNotificationResponse,
  clearLastNotificationResponse,
} from 'expo-notifications/build/NotificationsEmitter';
export { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
export { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
export { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
export { getAllScheduledNotificationsAsync } from 'expo-notifications/build/getAllScheduledNotificationsAsync';
export { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
export { cancelScheduledNotificationAsync } from 'expo-notifications/build/cancelScheduledNotificationAsync';
export { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
export type { NotificationRequest, NotificationResponse } from 'expo-notifications/build/Notifications.types';
