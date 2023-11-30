import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import './EditarMisDatos.css';
import { useState } from 'react';
import { DUENO, getRequest, putRequest } from '../../services/ApiConnect';


const EditarMisDatos: React.FC = () => {

  const [cedula, setCedula] = useState("")
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [rpassword, setRpassword] = useState("")
  const [mostrarCargando, ocultarCargando] = useIonLoading();
  const [mostrarAlert] = useIonAlert();
  const router = useIonRouter()

  const clickModificar = async () => {
    mostrarCargando()
    const registroRes = await putRequest({
      cedula: cedula,
      nombre: nombre,
      direccion: direccion,
      correo: correo,
      password: password,
      rpassword: rpassword
    }, DUENO)
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

  const cargarMisDatos = async () => {
    mostrarCargando()
    const duenoRes = await getRequest(DUENO)
    ocultarCargando()
    if (duenoRes.success) {
      const dueno = duenoRes.dueno
      setCedula(dueno.cedula)
      setNombre(dueno.nombre)
      setDireccion(dueno.direccion)
      setCorreo(dueno.correo)
    }
    else {
      mostrarAlert({ message: duenoRes.error })
    }
  }

  useIonViewDidEnter(() => {
    cargarMisDatos()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Editar mis datos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='registro'>
        <IonImg src='imgs/logo.png' className='logo' />
        <IonList>
          <IonItem>
            <IonInput type='number' label="Cedula" labelPlacement="floating" value={cedula} onIonInput={(e: any) => setCedula(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonInput type='text' label="Nombre" labelPlacement="floating" value={nombre} onIonInput={(e: any) => setNombre(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonInput type='text' label="Dirección" labelPlacement="floating" value={direccion} onIonInput={(e: any) => setDireccion(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonInput type='email' label="Correo" labelPlacement="floating" value={correo} onIonInput={(e: any) => setCorreo(e.target.value)} />
          </IonItem>
          
          <IonItem>
            <IonInput type='password' label="Contraseña" labelPlacement="floating" value={password} onIonInput={(e: any) => setPassword(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonInput type='password' label="Repita la Contraseña" labelPlacement="floating" value={rpassword} onIonInput={(e: any) => setRpassword(e.target.value)} />
          </IonItem>
          <IonItemDivider>
            Dejar vacias para no modificar la contraseña
          </IonItemDivider>
        </IonList>
      </IonContent>
      <IonFooter>
        <div className='btn-footer-container'>
          <IonButton className='btn-general' onClick={clickModificar}>Modificar</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default EditarMisDatos;
