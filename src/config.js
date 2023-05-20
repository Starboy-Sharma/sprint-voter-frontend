const BASE_URL =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const TEAM_MANAGER = 'team-manager';
const TEAM_MEMBER = 'team-member';

export { BASE_URL, SOCKET_URL, TEAM_MANAGER, TEAM_MEMBER };
