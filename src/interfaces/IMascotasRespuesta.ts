
interface IMascotasRespuesta {
    id: number,
    nombre: string,
    especie: string,
    raza: string,
    edad: number
};
interface IMascotasRespuestaArr {
    mascotas: IMascotasRespuesta[],
    onReload: any
}

