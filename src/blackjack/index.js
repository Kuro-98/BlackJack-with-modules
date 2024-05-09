import _ from 'underscore';
import { crearDeck, pedirCarta, valorCarta } from './usecases';
/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

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

	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] += valorCarta(carta);
		puntajesText[turno].textContent = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	const crearCarta = (carta, turno) => {
		const cartaImg = document.createElement('img');
		cartaImg.src = `assets/cartas/${carta}.png`;
		cartaImg.classList.add('carta');
		divCartasJugadores[turno].append(cartaImg);
	};

	const determinarGanador = () => {
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

	//turno PC
	const turnoPc = (puntosMinimos) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta(deck);
			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			crearCarta(carta, puntosJugadores.length - 1);
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		determinarGanador();
	};

	//Eventos
	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta(deck);
		const puntosJugador = acumularPuntos(carta, 0);
		crearCarta(carta, 0);

		if (puntosJugador > 21) {
			console.warn('perdiste chato');
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoPc(puntosJugador);
		} else if (puntosJugador === 21) {
			console.warn('21, que suerte');
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoPc(puntosJugador);
		}
	});

	btnDetener.addEventListener('click', () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoPc(puntosJugadores[0]);
	});

	btnNuevo.addEventListener('click', () => {
		inicializarJuego();
	});

	//lo que sea que este en este return se hara publico, lo demas es privado
	return {
		nuevoJuego: inicializarJuego,
	};
})();
