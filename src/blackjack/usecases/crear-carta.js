/**
 *
 * @param {String} carta
 * @param {Number} turno
 */
export const crearCarta = (carta, divCartasJugadores, turno) => {
	const cartaImg = document.createElement('img');
	cartaImg.src = `assets/cartas/${carta}.png`;
	cartaImg.classList.add('carta');
	divCartasJugadores[turno].append(cartaImg);
};
