import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import LoginContainer from '../../components/LoginContainer/LoginContainer';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen >
        <LoginContainer />        
      </IonContent>
    </IonPage>
  );
};

export default Login;
