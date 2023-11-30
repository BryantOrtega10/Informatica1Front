import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Paginas */
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Inicio from './pages/Inicio/Inicio';
import MisMascotas from './pages/MisMascotas/MisMascotas';
import NuevaMascota from './pages/NuevaMascota/NuevaMascota';
import EditarMascota from './pages/EditarMascota/EditarMascota';
import AsociarMascota from './pages/AsociarMascota/AsociarMascota';
import EditarMisDatos from './pages/EditarMisDatos/EditarMisDatos';

setupIonicReact();

const App: React.FC = () => {
  const renderRedirect = () => {
    if (localStorage.getItem("api_token") === null) {
      return <Redirect to="/login" />
    }
    else {
      return <Redirect to="/inicio" />
    }
  }
  return <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/inicio">
          <Inicio />
        </Route>
        <Route exact path="/mis-mascotas">
          <MisMascotas />
        </Route>
        <Route exact path="/nueva-mascota">
          <NuevaMascota />
        </Route>
        <Route exact path="/asociar-mascota">
          <AsociarMascota />
        </Route>

        <Route exact path="/editarme">
          <EditarMisDatos />
        </Route>
        <Route exact path={`/editar-mascota/:id`} component={EditarMascota} />
        
        <Route exact path="/">
          {renderRedirect()}
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
};

export default App;
