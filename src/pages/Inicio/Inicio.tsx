import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import './Inicio.css';
import { pawSharp, createOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';


const Inicio: React.FC = () => {

    const history = useHistory()
    const router = useIonRouter()

    const clickCerrarS = () => {
        localStorage.removeItem('api_token')
        history.replace('/login')
    }
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='inicio'>
                <div className='button-container'>
                    <IonButton className='btn-general' routerLink='mis-mascotas'>
                        <div>
                            <div className='icono-container'><IonIcon icon={pawSharp} ></IonIcon></div>
                            Mis Mascotas
                        </div>
                    </IonButton>
                    <IonButton className='btn-general' routerLink='editarme'>
                        <div>
                            <div className='icono-container'><IonIcon icon={createOutline} ></IonIcon></div>
                            Editar mis datos
                        </div>
                    </IonButton>
                    <IonButton className='btn-general' color='medium' onClick={clickCerrarS}>
                        <IonIcon icon={logOutOutline} size='large' ></IonIcon>Cerrar Sesión
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Inicio;
