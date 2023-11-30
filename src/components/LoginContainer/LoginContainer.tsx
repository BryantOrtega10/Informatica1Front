import { IonButton, IonImg, IonInput, IonRouterLink, useIonAlert, useIonLoading } from '@ionic/react';
import './LoginContainer.css';
import { useState } from 'react';
import { postRequest, LOGIN } from '../../services/ApiConnect';
import { useHistory } from 'react-router';

const LoginContainer: React.FC = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const history = useHistory();

    const clickLogin = async () => {
        mostrarCargando()
        const loginRes = await postRequest({
          correo: correo,
          password: password
        }, LOGIN)
        ocultarCargando()
        if(loginRes.success){
          mostrarAlert({message: loginRes.message, onDidDismiss : () => {
            localStorage.setItem("api_token",loginRes.token)
            history.replace('/inicio');
          }})
        }
        else{
          mostrarAlert({message: loginRes.error})
        }
      }
    

    return (
        <div id="container">
            <IonImg src='imgs/logo.png' className='logo'/>
            <IonInput type='email' label="Correo" fill="solid" labelPlacement="floating" placeholder="Ingresa tu correo" value={correo} onIonInput={(e: any) => setCorreo(e.target.value)}/>
            <IonInput type='password' label="Contraseña" fill="solid" labelPlacement="floating" placeholder="Ingresa tu contraseña" value={password} onIonInput={(e: any) => setPassword(e.target.value)}/>
            <div className='centrado'>
                <IonButton className='btn-general' onClick={clickLogin}>Iniciar Sesión</IonButton>
                No tienes cuenta <IonRouterLink color={'secondary'} routerLink='registro'>Registrate</IonRouterLink>
            </div>
        </div>
    );
};

export default LoginContainer;
