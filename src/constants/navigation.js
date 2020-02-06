/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'profile',
    icon: '/img/people.svg',
    label: 'navBar.profile',
    to: '/profile'
  },
  {
    id: 'friendlist',
    icon: '/img/people.svg',
    label: 'Friends',
    to: '/friendlist'
  },
  {
    id: 'fileExplorer',
    icon: '/img/people.svg',
    label: 'MyFiles',
    to: '/fileexplorer'
  }


];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }

];
