
export let currentEvent = '2018gal'
// 2019NCWAK, 2019NCASH, 2019NCCMP

export const primaryMenuPages = [
  { icon: 'home', title: 'Intro', link: '/intro' },
  { icon: 'bookmarks', title: 'Matches', link: '/dash' },
  { icon: 'people', title: 'Teams', link: '/teams' },
  { icon: 'create', title: 'Scout', link: '/form_editor' },
  // { icon: 'list', title: 'Alliance Picks', link: '/picks' },
]

export const secondaryMenuPages = [
  { icon: 'settings', title: 'Settings', link: '/settings' },
  { icon: 'help-circle-outline', title: 'Help', link: '/help' },
]

export const themes = {
  dark: {
    primary: '#2b2a2a',
    secondary: '#5DD39E',
    tertiary: '#348AA7',
    dark: '#ffffff',
    medium: '#513B56',
    light: '#222222'
  },
  light: {
    primary: '#cdcdcd',
    secondary: '#aea4bf',
    tertiary: '#8f6593',
    dark: '#6e4552',
    medium: '#BCE784',
    light: '#e3e4db'
  },
}

export const statNames = [
  'Match',
  'Scout<br/>Name',
  'Starting<br/>Position',
  'Auto<br/>Run',
  'Auto<br/>Switch',
  'Auto<br/>Switch<br/>Cubes',
  'Auto<br/>Scale',
  'Auto<br/>Scale<br/>Cubes',
  'Switch',
  'Switch<br/>Failed',
  'Scale',
  'Scale<br/>Failed',
  'Exchange',
  'Climb',
  'Cards'
];

export const modifiedStatNames = [
  'Team',
  // 'Starting<br/>Position',
  'Auto<br/>Run',
  'Auto<br/>Switch',
  'Auto<br/>Switch<br/>Cubes',
  'Auto<br/>Scale',
  'Auto<br/>Scale<br/>Cubes',
  'Switch',
  'Switch<br/>Failed',
  'Scale',
  'Scale<br/>Failed',
  'Exchange',
  'Climb',
];
