export const determinarGanador = (puntosJugadores) => {
	const [puntosMinimos, puntosComputadora] = puntosJugadores;

	setTimeout(() => {
		if (puntosComputadora === puntosMinimos) {
			alert('Empate, srry chatito');
		} else if ((puntosMinimos < puntosComputadora && puntosComputadora <= 21) || puntosMinimos > 21) {
			alert('La PC te gano chatito , hahahaha 😂');
		} else if ((puntosMinimos > puntosComputadora && puntosMinimos <= 21) || puntosComputadora > 21) {
			alert('Le ganaste a la PC chatito 😨');
		}
	}, 300);
};
