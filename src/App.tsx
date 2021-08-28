import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './page/Home';
import { NewRoom } from './page/NewRoom';
import { Room } from './page/Room';
import { AdminRoom } from './page/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContexts';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
       <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' exact component={NewRoom} />
        <Route path='/rooms/:id' component={Room} />

        <Route path='/admin/rooms/:id' component={AdminRoom} />
       </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
