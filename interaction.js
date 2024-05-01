// La création d'un Dnd requiert un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interaction) {

	// Définir ici les attributs de la 'classe'
	this.startX = 0
	this.startY = 0
	this.endX = 0
	this.endY = 0
	this.iscked = false
	this.interactor = interaction
	this.canvas = canvas

	// Developer les 3 fonctions gérant les événements
	this.selectionClic = function (evt) {
		let position = getMousePosition(this.canvas, evt)
		this.startX = position.x
		this.startY = position.y
		this.iscked = true
		this.interactor.onInteractionStart(this)
	}.bind(this)

	this.deplacer = function (evt) {
		if (this.iscked) {
			let position = getMousePosition(canvas, evt)
			this.endX = position.x
			this.endY = position.y
			this.iscked = true
			this.interactor.onInteractionUpdate(this)
		}
	}.bind(this)

	this.deposer = function (evt) {
		let position = getMousePosition(canvas, evt)
		this.endX = position.x
		this.endY = position.y
		this.iscked = false
		this.interactor.onInteractionEnd(this)
	}.bind(this)

	canvas.addEventListener('mousedown', this.selectionClic, false);
	canvas.addEventListener('mousemove', this.deplacer, false);
	canvas.addEventListener('mouseup', this.deposer, false);
	// Associer les fonctions précédentes aux évènements du canvas.
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: evt.x - rect.left,
		y: evt.y - rect.top
	};
}
