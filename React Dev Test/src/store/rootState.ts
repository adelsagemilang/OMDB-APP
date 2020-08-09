import { RouterState } from 'connected-react-router';

// modules
import { HomeState } from './home/reducer';

// The top-level state object
export interface ApplicationState {
  home: HomeState;
  router: RouterState;
}
