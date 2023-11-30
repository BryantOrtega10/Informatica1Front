import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import './EditarMascota.css';
import { useState } from 'react';
import { MASCOTAS, getRequest, putRequest } from '../../services/ApiConnect';
import { RouteComponentProps } from 'react-router';

interface IMascotasRespuestaProps extends RouteComponentProps<{
    id: string;
  }> {}

const EditarMascota: React.FC<IMascotasRespuestaProps> = ({ match }) => {
    
    const [nombreE, setNombre] = useState("")
    const [especieE, setEspecie] = useState("")
    const [razaE, setRaza] = useState("")
    const [edadE, setEdad] = useState("")

    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const router = useIonRouter()

    const clickEditar = async () => {
        mostrarCargando()
        const registroRes = await putRequest({
            nombre: nombreE,
            especie: especieE,
            raza: razaE,
            edad: edadE
        }, MASCOTAS + match.params.id)
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

    const cargarMascota = async () => {
        mostrarCargando()
        const mascotasRes = await getRequest(MASCOTAS + match.params.id)
        ocultarCargando()
        if (mascotasRes.success) {
            const mascota: IMascotasRespuesta = mascotasRes.mascota
            setNombre(mascota.nombre)
            setEspecie(mascota.especie)
            setRaza(mascota.raza)
            setEdad(mascota.edad.toString())
        }
        else {
            mostrarAlert({ message: mascotasRes.error })
       }
    }

    useIonViewDidEnter(() => {
        cargarMascota()
    })


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Editar Mascota</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='registro'>
                <IonImg src='imgs/logo.png' className='logo' />

                <IonList>
                    <IonItem>
                        <IonInput type='text' label="Nombre" labelPlacement="floating" value={nombreE} onIonInput={(e: any) => setNombre(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Especie" labelPlacement="floating" value={especieE} onIonInput={(e: any) => setEspecie(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Raza" labelPlacement="floating" value={razaE} onIonInput={(e: any) => setRaza(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput type='text' label="Edad" labelPlacement="floating" value={edadE} onIonInput={(e: any) => setEdad(e.target.value)} />
                    </IonItem>

                </IonList>
            </IonContent>
            <IonFooter>
                <div className='btn-footer-container'>
                    <IonButton className='btn-general' onClick={clickEditar}>Editar Mascota</IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default EditarMascota;
