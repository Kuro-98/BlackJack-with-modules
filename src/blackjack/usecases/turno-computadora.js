import { pedirCarta, crearCarta, acumularPuntos, determinarGanador } from './';

/**
 *
 * @param {Number} puntosMinimos
 * @param {Array<String>} deck
 */
//turno PC
export const turnoPc = (puntosMinimos, deck, puntosJugadores, puntajesText, divCartasJugadores) => {
	let puntosComputadora = 0;
	do {
		const carta = pedirCarta(deck);
		puntosComputadora = acumularPuntos(carta, puntosJugadores, puntajesText, puntosJugadores.length - 1);
		crearCarta(carta, divCartasJugadores, puntosJugadores.length - 1);
	} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

	determinarGanador(puntosJugadores);
};
