// src/app/registration/tab-registry.ts
export const TAB_REGISTRY: Record<string, () => Promise<any>> = {
  'Accomodation Details': () => import('../components/tabs/acc.component').then(m => m.AccComponent),
  'Digital Accessories': () => import('../components/tabs/accs.component').then(m => m.AccsComponent),
  'User Management': () => import('../components/admin/users.component').then(m => m.UsersComponent),
  'Grade Entry': () => import('../components/faculty/grades.component').then(m => m.GradesComponent),
};
