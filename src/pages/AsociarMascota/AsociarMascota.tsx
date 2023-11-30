import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter } from '@ionic/react';
import './AsociarMascota.css';
import { useState } from 'react';
import { MASCOTAS, postRequest } from '../../services/ApiConnect';


const AsociarMascota: React.FC = () => {

    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const router = useIonRouter()
    const [id, setId] = useState("")

    const clickAsociar = async () => {
        mostrarCargando()
        const registroRes = await postRequest({}, MASCOTAS + 'asociar/'+ id)
        ocultarCargando()
        if (registroRes.success) {
            mostrarAlert({
                message: registroRes.message, onDidDismiss: () => {
                    router.goBack()
                }
            })
        }
        else {
            mostrarAlert({ message: registroRes.error })
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Asociar Mascota</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='registro'>
                <IonImg src='imgs/logo.png' className='logo' />
                <p className='width-90'>Debes ingresar el id de la mascota que deseas asociar</p>
                <IonList>
                    <IonItem>
                        <IonInput type='text' label="Id Mascota" labelPlacement="floating" value={id} onIonInput={(e: any) => setId(e.target.value)} />
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter>
                <div className='btn-footer-container'>
                    <IonButton className='btn-general' onClick={clickAsociar}>Asociar Mascota</IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default AsociarMascota;
