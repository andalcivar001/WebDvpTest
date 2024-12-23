export interface Persona {
  id: number;
  numeroIdentificacion: string;
  tipoIdentificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  fechaCreacion?: Date;
  nombreCompleto?: string;
}

export interface ResponsePersona {
  status: number;
  message: string;
  data?: Persona;
  success: boolean;
}
