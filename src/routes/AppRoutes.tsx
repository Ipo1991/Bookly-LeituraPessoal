import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import NovoLivro from '../screens/NovoLivro';
import Favoritos from '../screens/Favoritos';
import Busca from '../screens/Busca';
import Configuracoes from '../screens/Configuracoes';

export type AppTabParamList = {
  Home: undefined;
  NovoLivro: undefined;
  Favoritos: undefined;
  Busca: undefined;
  Configuracoes: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NovoLivro"
        component={NovoLivro}
        options={{
          tabBarLabel: 'Novo Livro',
          title: 'Novo Livro',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Busca"
        component={Busca}
        options={{
          tabBarLabel: 'Buscar',
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          tabBarLabel: 'Configurações',
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}