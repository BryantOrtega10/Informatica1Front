import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter } from '@ionic/react';
import './Registro.css';
import { useState } from 'react';
import { DUENO, postRequest } from '../../services/ApiConnect';


const Registro: React.FC = () => {

  const [cedula, setCedula] = useState("")
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [rpassword, setRpassword] = useState("")
  const [mostrarCargando, ocultarCargando] = useIonLoading();
  const [mostrarAlert] = useIonAlert();
  const router = useIonRouter()

  const clickRegistro = async () => {
    mostrarCargando()
    const registroRes = await postRequest({
      cedula: cedula,
      nombre: nombre,
      direccion: direccion,
      correo: correo,
      password: password,
      rpassword: rpassword
    }, DUENO)
    ocultarCargando()
    if(registroRes.success){
      mostrarAlert({message: registroRes.message, onDidDismiss : () => {
        router.goBack()
      }})
    }
    else{
      mostrarAlert({message: registroRes.error})
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Registro</IonTitle>
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
        </IonList>
      </IonContent>
      <IonFooter>
        <div className='btn-footer-container'>
          <IonButton className='btn-general' onClick={clickRegistro}>Registrarme</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Registro;
