import _ from 'underscore';
import { crearDeck, pedirCarta, acumularPuntos, crearCarta, turnoPc } from './usecases';
const miModulo = (() => {
	'use strict';

	let deck = [];
	const tipos = ['C', 'D', 'H', 'S'];
	const especiales = ['A', 'J', 'Q', 'K'];

	let puntosJugadores = [];

	//Referencias del HTML
	const btnPedir = document.querySelector('#btnPedir');
	const btnDetener = document.querySelector('#btnDetener');
	const btnNuevo = document.querySelector('#btnNuevo');
	const divCartasJugadores = document.querySelectorAll('.divCartas');
	const puntajesText = document.querySelectorAll('small');

	const inicializarJuego = (numJugadores = 2) => {
		deck = [];
		deck = crearDeck(tipos, especiales);
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
		puntajesText.forEach((elemento) => (elemento.textContent = 0));
		divCartasJugadores.forEach((ContcartasJugador) => {
			while (ContcartasJugador.hasChildNodes()) {
				ContcartasJugador.removeChild(ContcartasJugador.firstChild);
			}
		});
		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};
	//Eventos
	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta(deck);
		const puntosJugador = acumularPuntos(carta, puntosJugadores, puntajesText, 0);
		crearCarta(carta, divCartasJugadores, 0);

		if (puntosJugador > 21) {
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoPc(puntosJugador, deck, puntosJugadores, puntajesText, divCartasJugadores);
		} else if (puntosJugador === 21) {
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoPc(puntosJugador, deck, puntosJugadores, puntajesText, divCartasJugadores);
		}
	});

	btnDetener.addEventListener('click', () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoPc(puntosJugadores[0], deck, puntosJugadores, puntajesText, divCartasJugadores);
	});

	btnNuevo.addEventListener('click', () => {
		inicializarJuego();
	});

	//lo que sea que este en este return se hara publico, lo demas es privado
	return {
		nuevoJuego: inicializarJuego,
	};
})();
