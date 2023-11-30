import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter } from '@ionic/react';
import './NuevaMascota.css';
import { useState } from 'react';
import { MASCOTAS, postRequest } from '../../services/ApiConnect';


const NuevaMascota: React.FC = () => {
    
    const [nombre, setNombre] = useState("")
    const [especie, setEspecie] = useState("")
    const [raza, setRaza] = useState("")
    const [edad, setEdad] = useState("")

    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const router = useIonRouter()

    const clickAgregar = async () => {
        mostrarCargando()
        const registroRes = await postRequest({
            nombre: nombre,
            especie: especie,
            raza: raza,
            edad: edad
        }, MASCOTAS)
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
                    <IonTitle>Agregar Mascota</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='registro'>
                <IonImg src='imgs/logo.png' className='logo' />

                <IonList>
                    <IonItem>
                        <IonInput type='text' label="Nombre" labelPlacement="floating" value={nombre} onIonInput={(e: any) => setNombre(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Especie" labelPlacement="floating" value={especie} onIonInput={(e: any) => setEspecie(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Raza" labelPlacement="floating" value={raza} onIonInput={(e: any) => setRaza(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Edad" labelPlacement="floating" value={edad} onIonInput={(e: any) => setEdad(e.target.value)} />
                    </IonItem>

                </IonList>
            </IonContent>
            <IonFooter>
                <div className='btn-footer-container'>
                    <IonButton className='btn-general' onClick={clickAgregar}>Agregar Mascota</IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default NuevaMascota;
