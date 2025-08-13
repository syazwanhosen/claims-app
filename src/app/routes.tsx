import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const ClaimListPage = lazy(() => import('../pages/ClaimListPage'));
const CreateClaimPage = lazy(() => import('../pages/CreateClaimPage'));

export const router = createBrowserRouter([
  { path: '/', element: <ClaimListPage /> },
  { path: '/claims', element: <ClaimListPage /> },
  { path: '/create-claim', element: <CreateClaimPage /> },
]);
