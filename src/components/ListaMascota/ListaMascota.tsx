import { IonButton, IonIcon, IonImg, IonItem, IonList, useIonAlert, useIonLoading } from '@ionic/react';
import './ListaMascota.css';
import { addOutline, swapHorizontal, pawSharp, createOutline, trashOutline } from 'ionicons/icons';
import { MASCOTAS, deleteRequest } from '../../services/ApiConnect';

const ListaMascota: React.FC<IMascotasRespuestaArr> = ({mascotas, onReload}) => {

    const [mostrarCargando, ocultarCargando] = useIonLoading();
    const [mostrarAlert] = useIonAlert();
    const [mostrarAlert2] = useIonAlert();
    



    const clickEliminarMascota = async (id:number) => {        
        mostrarAlert2({
            message: 'En verdad deseas eliminar esta mascota?',
            buttons: [
            {
              text: 'Cancel',
              role: 'cancel'              
            },
            {
              text: 'Eliminar',
              role: 'confirm',
              handler: async () => {
                mostrarCargando()
                const mascotasRes = await deleteRequest(MASCOTAS + id)
                ocultarCargando()
                if (mascotasRes.success) {
                    mostrarAlert({ message: mascotasRes.message, onDidDismiss: () => {
                        onReload()
                    } })
                }
                else {
                    mostrarAlert({ message: mascotasRes.error })
                }
              },
            },
        ]})
        

        
    }

    if (mascotas.length > 0) {
        return <IonList>
            {mascotas.map((item, index) => {
                return (
                    <IonItem key={`item_m_${index}`} >
                        <div className='mascotas-container'>
                            <span className='font-grande'>{item.nombre}</span><br />
                            <b>Id: </b><span>{item.id}</span><br />
                            <b>Especie: </b><span>{item.especie}</span><br />
                            <b>Raza: </b><span>{item.raza}</span><br />
                            <b>Edad: </b><span>{item.edad}</span>
                        </div>
                        <div className='btn-container'>
                            <IonButton routerLink={`/editar-mascota/${item.id}`}><IonIcon icon={createOutline}></IonIcon></IonButton>
                            <IonButton onClick={() => clickEliminarMascota(item.id)}><IonIcon icon={trashOutline}></IonIcon></IonButton>
                        </div>
                    </IonItem>
                );
            })}
        </IonList>
    }
    else {
        return <div className='container container-lista'>
            <IonImg src='imgs/logo.png' className='logo'/>
            <h3>Aun no cuentas con mascotas relacionadas</h3>
            <p>Has click en el boton <IonIcon icon={addOutline}></IonIcon> para agregarla</p>
            <p>Recuerda que <IonIcon icon={pawSharp}></IonIcon> sirve para agregar una nueva mascota</p>
            y
            <p><IonIcon icon={swapHorizontal}></IonIcon> sirve para agregar una mascota creada previamente </p>
        </div>
    }


    
};

export default ListaMascota;
