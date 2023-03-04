import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'root', path: '', redirect: 'home' },
      { name: 'home', path: 'home', component: () => import('pages/entry/EntryIndex.vue') },
      { name: 'stats', path: 'stats', component: () => import('pages/entry/EntryStats.vue') },
      { name: 'newEntry', path: 'entry/new', component: () => import('pages/entry/EditEntry.vue') },
      { name: 'editEntry', path: 'entry/:entryUId', component: () => import('pages/entry/EditEntry.vue') },
      { name: 'about', path: 'about', component: () => import('pages/other/AboutPage.vue') },
      { name: 'setting', path: 'setting', component: () => import('pages/other/SettingPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
