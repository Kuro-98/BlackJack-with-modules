import { valorCarta } from './';

export const acumularPuntos = (carta, puntosJugadores, puntajesText, turno) => {
	puntosJugadores[turno] += valorCarta(carta);
	puntajesText[turno].textContent = puntosJugadores[turno];
	return puntosJugadores[turno];
};
