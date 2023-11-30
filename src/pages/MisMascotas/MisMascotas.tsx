import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewDidEnter } from '@ionic/react';
import './MisMascotas.css';
import { addOutline, swapHorizontal, pawSharp } from 'ionicons/icons';
import { MASCOTAS, getRequest } from '../../services/ApiConnect';
import { useState } from 'react';
import ListaMascota from '../../components/ListaMascota/ListaMascota';



const MisMascotas: React.FC = () => {
    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const [mascotas, setMascotas] = useState<IMascotasRespuesta[]>([])


    const cargarMascotas = async () => {
        mostrarCargando()
        const mascotasRes = await getRequest(MASCOTAS)
        ocultarCargando()
        if (mascotasRes.success) {
            const mascotasArr: [IMascotasRespuesta] = mascotasRes.mascotas
            setMascotas(mascotasArr)
        }
        else {
            mostrarAlert({ message: mascotasRes.error })
            setMascotas([])
        }
    }

    useIonViewDidEnter(() => {
        cargarMascotas()
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Mis Mascotas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton>
                        <IonIcon icon={addOutline}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="top">
                        <IonFabButton routerLink='asociar-mascota'>
                            <IonIcon icon={swapHorizontal}></IonIcon>
                        </IonFabButton>
                        <IonFabButton routerLink='nueva-mascota'>
                            <IonIcon icon={pawSharp}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
                <ListaMascota mascotas={mascotas} onReload={cargarMascotas}></ListaMascota>
            </IonContent>
        </IonPage>
    );
};

export default MisMascotas;
