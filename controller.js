const editingMode = {rect: 0, line: 1};

class Pencil {
	constructor(ctx, drawing, canvas) {
		this.currEditingMode = editingMode.line;
		this.currLineWidth = 5;
		this.currColour = '#000000';
		this.currentShape = null;

		this.bindEvents(canvas);

		new DnD(canvas, this);
	}

	bindEvents(canvas) {
		document.getElementById('butRect').addEventListener('click', () => this.currEditingMode = editingMode.rect);
		document.getElementById('butLine').addEventListener('click', () => this.currEditingMode = editingMode.line);
		document.getElementById('spinnerWidth').addEventListener('change', (e) => this.currLineWidth = e.target.value);
		document.getElementById('colour').addEventListener('change', (e) => this.currColour = e.target.value);
	}

	onInteractionStart(dnd) {
		// this.currentShape = new Rectangle();
	}

	onInteractionUpdate(dnd) {
		if (this.currEditingMode === editingMode.rect) {
			this.currentShape = new Rectangle(dnd.startX, dnd.startY, this.currLineWidth, this.currColour, dnd.endX - dnd.startX, dnd.endY - dnd.startY);
		} else {
			this.currentShape = new Line(dnd.startX, dnd.startY, this.currLineWidth, this.currColour, dnd.endX, dnd.endY);
		}
		drawing.paint(ctx, canvas);
		this.currentShape.paint(ctx);
	}

	onInteractionEnd(dnd) {
		const uuid = this.generateUUID();
		console.log(uuid);
		drawing.shapeArray.set(uuid, this.currentShape);
		updateShapeList(uuid, this.currentShape);
		document.getElementById(`remove${uuid}`)
			.addEventListener('click',
				(event) => this.remove(drawing, event.currentTarget.id.substring(6), ctx, canvas)
			);
	}

	remove(drawing, index, ctx, canvas) {
		console.log(index);
		drawing.shapeArray.delete(index);
		document.getElementById(`liRemove${index}`).remove();
		drawing.paint(ctx, canvas);
	}

	generateUUID() {
		let d = new Date().getTime();
		let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16;
			if (d > 0) {
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
}
