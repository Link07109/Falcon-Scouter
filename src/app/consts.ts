export let currentEvent = '2018gal'
// 2019NCWAK, 2019NCASH, 2019NCCMP

export const primaryMenuPages = [
  { icon: 'home', title: 'Intro', link: '/intro' },
  { icon: 'bookmarks', title: 'Dashboard', link: '/dash' },
  { icon: 'filing', title: 'Teams', link: '/teams' },
  { icon: 'create', title: 'Scouting Forms', link: '/form_editor' },
  { icon: 'list', title: 'Picks', link: '/picks' },
]

export const secondaryMenuPages = [
  { icon: 'settings', title: 'Settings', link: '/settings' },
  { icon: 'help-circle', title: 'Help', link: '/help' },
]

export const themes = {
  dusk: {
    primary: '#2b2a2a',
    secondary: '#5DD39E',
    tertiary: '#348AA7',
    dark: '#ffffff',
    medium: '#513B56',
    light: '#222222'
  },
  nether: {
    primary: '#8f6593',
    secondary: '#aea4bf',
    tertiary: '#cdcdcd',
    dark: '#e3e4db',
    medium: '#BCE784',
    light: '#6e4552'
  },
  // peach: {
  //   primary: '#F78154',
  //   secondary: '#FE5F55',
  //   tertiary: '#4D9078',
  //   light: '#FCD0A2',
  //   medium: '#B89876',
  //   dark: '#5d5e60' // #FDE8DF
  // },
  twilight: {
    primary: '#95b8d1',
    secondary: '#8CBA80',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#464a4f' // #495867
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
