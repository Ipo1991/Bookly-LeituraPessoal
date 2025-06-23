import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '../routes/AppRoutes';

export default function BottomTabs() {
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();
  const route = useRoute();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'Home', title: 'Início', icon: 'home' },
    { key: 'Favoritos', title: 'Favoritos', icon: 'star' },
  ];

  React.useEffect(() => {
    if (route.name === 'Home') setIndex(0);
    else if (route.name === 'Favoritos') setIndex(1);
  }, [route.name]);

  const handleIndexChange = (idx: number) => {
    setIndex(idx);
    if (idx === 0) navigation.navigate('Home');
    if (idx === 1) navigation.navigate('Favoritos');
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
      shifting={false}
      barStyle={{ backgroundColor: '#000' }}
      labeled={true}
      sceneAnimationEnabled={false}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    />
  );
}