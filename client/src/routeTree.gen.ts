/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as landingPageHomeImport } from './routes/(landing-page)/home'
import { Route as landingPageHomeServiceImport } from './routes/(landing-page)/home.service'
import { Route as landingPageHomeMainImport } from './routes/(landing-page)/home.main'
import { Route as landingPageHomeAboutImport } from './routes/(landing-page)/home.about'
import { Route as authenticateddashboardDashboardImport } from './routes/(authenticated)/(dashboard)/dashboard'
import { Route as authenticateddashboardDashboardIndexImport } from './routes/(authenticated)/(dashboard)/dashboard.index'
import { Route as authenticateddashboardDashboardSettingsprivacyImport } from './routes/(authenticated)/(dashboard)/dashboard.settings_privacy'
import { Route as authenticateddashboardDashboardSettingsinfoImport } from './routes/(authenticated)/(dashboard)/dashboard.settings_info'
import { Route as authenticateddashboardDashboardSettingsImport } from './routes/(authenticated)/(dashboard)/dashboard.settings'
import { Route as authenticateddashboardDashboardProfileImport } from './routes/(authenticated)/(dashboard)/dashboard.profile'
import { Route as authenticateddashboardDashboardPetsImport } from './routes/(authenticated)/(dashboard)/dashboard.pets'
import { Route as authenticateddashboardDashboardMedicinesImport } from './routes/(authenticated)/(dashboard)/dashboard.medicines'
import { Route as authenticateddashboardDashboardAppointmentsImport } from './routes/(authenticated)/(dashboard)/dashboard.appointments'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const landingPageHomeRoute = landingPageHomeImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const landingPageHomeServiceRoute = landingPageHomeServiceImport.update({
  path: '/service',
  getParentRoute: () => landingPageHomeRoute,
} as any)

const landingPageHomeMainRoute = landingPageHomeMainImport.update({
  path: '/main',
  getParentRoute: () => landingPageHomeRoute,
} as any)

const landingPageHomeAboutRoute = landingPageHomeAboutImport.update({
  path: '/about',
  getParentRoute: () => landingPageHomeRoute,
} as any)

const authenticateddashboardDashboardRoute =
  authenticateddashboardDashboardImport
    .update({
      path: '/dashboard',
      getParentRoute: () => rootRoute,
    } as any)
    .lazy(() =>
      import('./routes/(authenticated)/(dashboard)/dashboard.lazy').then(
        (d) => d.Route,
      ),
    )

const authenticateddashboardDashboardIndexRoute =
  authenticateddashboardDashboardIndexImport.update({
    path: '/',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardSettingsprivacyRoute =
  authenticateddashboardDashboardSettingsprivacyImport.update({
    path: '/settings_privacy',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardSettingsinfoRoute =
  authenticateddashboardDashboardSettingsinfoImport.update({
    path: '/settings_info',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardSettingsRoute =
  authenticateddashboardDashboardSettingsImport.update({
    path: '/settings',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardProfileRoute =
  authenticateddashboardDashboardProfileImport.update({
    path: '/profile',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardPetsRoute =
  authenticateddashboardDashboardPetsImport.update({
    path: '/pets',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardMedicinesRoute =
  authenticateddashboardDashboardMedicinesImport.update({
    path: '/medicines',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

const authenticateddashboardDashboardAppointmentsRoute =
  authenticateddashboardDashboardAppointmentsImport.update({
    path: '/appointments',
    getParentRoute: () => authenticateddashboardDashboardRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(landing-page)/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof landingPageHomeImport
      parentRoute: typeof rootRoute
    }
    '/(authenticated)/(dashboard)/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof authenticateddashboardDashboardImport
      parentRoute: typeof rootRoute
    }
    '/(landing-page)/home/about': {
      id: '/home/about'
      path: '/about'
      fullPath: '/home/about'
      preLoaderRoute: typeof landingPageHomeAboutImport
      parentRoute: typeof landingPageHomeImport
    }
    '/(landing-page)/home/main': {
      id: '/home/main'
      path: '/main'
      fullPath: '/home/main'
      preLoaderRoute: typeof landingPageHomeMainImport
      parentRoute: typeof landingPageHomeImport
    }
    '/(landing-page)/home/service': {
      id: '/home/service'
      path: '/service'
      fullPath: '/home/service'
      preLoaderRoute: typeof landingPageHomeServiceImport
      parentRoute: typeof landingPageHomeImport
    }
    '/(authenticated)/(dashboard)/dashboard/appointments': {
      id: '/dashboard/appointments'
      path: '/appointments'
      fullPath: '/dashboard/appointments'
      preLoaderRoute: typeof authenticateddashboardDashboardAppointmentsImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/medicines': {
      id: '/dashboard/medicines'
      path: '/medicines'
      fullPath: '/dashboard/medicines'
      preLoaderRoute: typeof authenticateddashboardDashboardMedicinesImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/pets': {
      id: '/dashboard/pets'
      path: '/pets'
      fullPath: '/dashboard/pets'
      preLoaderRoute: typeof authenticateddashboardDashboardPetsImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/profile': {
      id: '/dashboard/profile'
      path: '/profile'
      fullPath: '/dashboard/profile'
      preLoaderRoute: typeof authenticateddashboardDashboardProfileImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/settings': {
      id: '/dashboard/settings'
      path: '/settings'
      fullPath: '/dashboard/settings'
      preLoaderRoute: typeof authenticateddashboardDashboardSettingsImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/settings_info': {
      id: '/dashboard/settings_info'
      path: '/settings_info'
      fullPath: '/dashboard/settings_info'
      preLoaderRoute: typeof authenticateddashboardDashboardSettingsinfoImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/settings_privacy': {
      id: '/dashboard/settings_privacy'
      path: '/settings_privacy'
      fullPath: '/dashboard/settings_privacy'
      preLoaderRoute: typeof authenticateddashboardDashboardSettingsprivacyImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
    '/(authenticated)/(dashboard)/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof authenticateddashboardDashboardIndexImport
      parentRoute: typeof authenticateddashboardDashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  landingPageHomeRoute: landingPageHomeRoute.addChildren({
    landingPageHomeAboutRoute,
    landingPageHomeMainRoute,
    landingPageHomeServiceRoute,
  }),
  authenticateddashboardDashboardRoute:
    authenticateddashboardDashboardRoute.addChildren({
      authenticateddashboardDashboardAppointmentsRoute,
      authenticateddashboardDashboardMedicinesRoute,
      authenticateddashboardDashboardPetsRoute,
      authenticateddashboardDashboardProfileRoute,
      authenticateddashboardDashboardSettingsRoute,
      authenticateddashboardDashboardSettingsinfoRoute,
      authenticateddashboardDashboardSettingsprivacyRoute,
      authenticateddashboardDashboardIndexRoute,
    }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/home",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/home": {
      "filePath": "(landing-page)/home.tsx",
      "children": [
        "/home/about",
        "/home/main",
        "/home/service"
      ]
    },
    "/dashboard": {
      "filePath": "(authenticated)/(dashboard)/dashboard.tsx",
      "children": [
        "/dashboard/appointments",
        "/dashboard/medicines",
        "/dashboard/pets",
        "/dashboard/profile",
        "/dashboard/settings",
        "/dashboard/settings_info",
        "/dashboard/settings_privacy",
        "/dashboard/"
      ]
    },
    "/home/about": {
      "filePath": "(landing-page)/home.about.tsx",
      "parent": "/home"
    },
    "/home/main": {
      "filePath": "(landing-page)/home.main.tsx",
      "parent": "/home"
    },
    "/home/service": {
      "filePath": "(landing-page)/home.service.tsx",
      "parent": "/home"
    },
    "/dashboard/appointments": {
      "filePath": "(authenticated)/(dashboard)/dashboard.appointments.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/medicines": {
      "filePath": "(authenticated)/(dashboard)/dashboard.medicines.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/pets": {
      "filePath": "(authenticated)/(dashboard)/dashboard.pets.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/profile": {
      "filePath": "(authenticated)/(dashboard)/dashboard.profile.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings": {
      "filePath": "(authenticated)/(dashboard)/dashboard.settings.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings_info": {
      "filePath": "(authenticated)/(dashboard)/dashboard.settings_info.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings_privacy": {
      "filePath": "(authenticated)/(dashboard)/dashboard.settings_privacy.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/": {
      "filePath": "(authenticated)/(dashboard)/dashboard.index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
