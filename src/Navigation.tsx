import { Home } from '@mui/icons-material';

export const Navigation = {
  search: {
    path: '/home',
    name: 'Home',
    iconComponent: <Home />,
    isInNavigation: true,
  },

  profile: {
    path: '/avatar/:id',
    params: ['id'],
    name: 'Avatar',
    iconComponent: null,
    isInNavigation: false,
  },
};
