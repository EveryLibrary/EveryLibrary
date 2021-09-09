export interface Libro {
  id: string;
  isbn: string;
  titolo: string;
  trama: string;
  dataPubblicazione: string;
  genere: string;
  autore: string;
  editore: string;
  numero_copie: string;
  posizione_corsia: string;
}
export interface LibroPreferito {
  userId: string;
  libroId: string;
}
export interface LibroPrestato {
  idUtente: string;
  idLibro: string;
  idBiblioteca: string;
  dataRitiro: string;
  dataPrenotazione: string;
}
