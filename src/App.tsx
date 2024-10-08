import React from 'react';
import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { dataProvider, liveProvider } from '@refinedev/supabase';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { CarOutlined, SettingOutlined, VideoCameraFilled, CalendarOutlined } from '@ant-design/icons'; // Added CalendarOutlined
import authProvider from './authProvider';
import { AppIcon } from './components/app-icon';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import {
  PlatesList,
  PlatesCreate,
  PlatesEdit,
  PlatesShow,
} from './pages/plates';
import { LogList } from './pages/logs';
import { Analytics } from './pages/analytics'; 
import { supabaseClient } from './utility/supabaseClient';
import {
  SchedulesList,
  SchedulesCreate,
  SchedulesEdit,
  SchedulesShow,
} from './pages/schedules'; // Import schedules components

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider()}
                resources={[
                  {
                    name: 'logs',
                    list: '/logs',
                    meta: {
                      canDelete: true,
                    },
                    options: {
                      label: 'Vehicle Access Log',
                      icon: <CarOutlined />,
                    },
                  },
                  {
                    name: 'plates',
                    list: '/plates',
                    create: '/plates/create',
                    edit: '/plates/edit/:id',
                    show: '/plates/show/:id',
                    meta: {
                      canDelete: true,
                    },
                    options: {
                      label: 'Manage Vehicles',
                      icon: <SettingOutlined />,
                    },
                  },
                  {
                    name: 'access_schedule',
                    list: '/schedules',
                    create: '/schedules/create',
                    edit: '/schedules/edit/:id',
                    show: '/schedules/show/:id',
                    meta: {
                      canDelete: true,
                    },
                    options: {
                      label: 'Manage Schedules',
                      icon: <CalendarOutlined />,
                    },
                  },
                  {
                    name: 'analytics',
                    list: '/analytics',
                    meta: {
                      canDelete: true,
                    },
                    options: {
                      label: 'Analytics',
                      icon: <VideoCameraFilled />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'oYbwst-haDFHI-E0Zwsi',
                  title: { text: 'Gate Access Manager', icon: <VideoCameraFilled /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key='authenticated-inner'
                        fallback={<CatchAllNavigate to='/login' />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource='logs' />}
                    />
                    <Route path='/plates'>
                      <Route index element={<PlatesList />} />
                      <Route path='create' element={<PlatesCreate />} />
                      <Route path='edit/:id' element={<PlatesEdit />} />
                      <Route path='show/:id' element={<PlatesShow />} />
                    </Route>
                    <Route path='/logs'>
                      <Route index element={<LogList />} />
                    </Route>
                    <Route path='/schedules'>
                      <Route index element={<SchedulesList />} />
                      <Route path='create' element={<SchedulesCreate />} />
                      <Route path='edit/:id' element={<SchedulesEdit />} />
                      <Route path='show/:id' element={<SchedulesShow />} />
                    </Route>
                    <Route path='/analytics'>
                      <Route index element={<Analytics />} />
                    </Route>
                    <Route path='*' element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key='authenticated-outer'
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path='/login'
                      element={
                        <AuthPage
                          type='login'
                          formProps={{
                            initialValues: {
                              email: 'info@refine.dev',
                              password: 'refine-supabase',
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path='/register'
                      element={<AuthPage type='register' />}
                    />
                    <Route
                      path='/forgot-password'
                      element={<AuthPage type='forgotPassword' />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;