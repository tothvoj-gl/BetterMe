import remoteConfig from '@react-native-firebase/remote-config';
import {useEffect} from 'react';

export enum RemoteConfigKey {
  DemoEmail = 'demo_email',
  DemoPassword = 'demo_password',
}

export const useFetchRemoteConfig = () => {
  useEffect(() => {
    remoteConfig()
      .setDefaults({})
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
  }, []);
};

export const getRemoteConfigValue = (key: RemoteConfigKey) => {
  return remoteConfig().getValue(key).asString();
};
