const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = 600

// Code temporaire pour tester le DnD
//new DnD(canvas);
ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas

// Code temporaire pour tester l'affiche de la vue
let rec = new Rectangle(10, 20, 5, '#00CCC0', 50, 100);
console.log(rec)
rec.paint(ctx);
let ligne = new Line(10, 20, 5, '#00CCC0', 50, 100);
ligne.paint(ctx);

// Code final à utiliser pour manipuler Pencil.
let drawing = new Drawing();
let pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);
