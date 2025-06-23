import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoasVindas from '../screens/BoasVindas';
import AppRoutes from './AppRoutes';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const [entrou, setEntrou] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!entrou ? (
        <Stack.Screen name="BoasVindas">
          {props => <BoasVindas {...props} onEntrar={() => setEntrou(true)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="App" component={AppRoutes} />
      )}
    </Stack.Navigator>
  );
}