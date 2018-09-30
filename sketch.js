let points = []
let means = []
let amount = 100
const r = 15
let auto

function setup() {
	createCanvas(650, 500)

	points = [
		new Point(152, height - 72),
		new Point(102, height - 56),
		new Point(182, height - 60),
		new Point(192, height - 68),
		new Point(122, height - 72),
		new Point(142, height - 77)
	]

	means = Mean.create(3, points)

	for(let p of points) {
		closestMean(p).givePoint(p)
	}

	auto = createCheckbox('Auto find gennemsnit', false)

	// 
	let inp = createInput(100)
	inp.input( () => {
		amount = Number(inp.value())
	})

	createButton('Tilfældige punkter').mousePressed( () => {
		clearCanvas()
		points = Point.create(amount)
	})

	createButton('Rens lærred').mousePressed(clearCanvas)

}

function draw() {
	background(30)

	for (let p of points) {
		stroke(255, 75)
		line(p.x, p.y, p.mean.x, p.mean.y)
	}

	// Draw points and assign the closest mean by euclidean distance
	// noStroke()
	points.forEach(p => {
		const newMean = closestMean(p)
		const oldMean = p.mean
		if (newMean !== oldMean) {
			oldMean.removePoint(p)
			newMean.givePoint(p)
		}
		noStroke()
		fill(p.mean.color)
		ellipse(p.x, p.y, r)
	})

	// Draw means
	stroke(255)
	strokeWeight(2)
	for (let mean of means) {
		fill(mean.color)
		ellipse(mean.x, mean.y, r)
	}

	if (auto.checked()) newMeans()

}

function keyPressed() {
	if (key == ' ') newMeans()
}


function mouseDragged() {
	addPoint(mouseX, mouseY)
}

function mousePressed() {
	addPoint(mouseX, mouseY)
}

function addPoint(x, y) {
	if (0 < x && x < width && 0 < y && y < height) {
		let newPoint = new Point(x, y)
		points.push(newPoint)
		closestMean(newPoint).givePoint(newPoint)
	}
}

function newMeans() {
	for (let mean of means) {
		mean.newPos()
	}
}

function closestMean(position) {
	let assignedMean
	let leastDist

	means.forEach(mean => {
		let d = dist(mean.x, mean.y, position.x, position.y)
		if (d < leastDist || leastDist === undefined) {
			leastDist = d
			assignedMean = mean
		}
	})
	return assignedMean
}

function clearCanvas() {
	points = []
	for(let mean of means){
		mean.x_sum = 0
		mean.y_sum = 0
		mean.amount = 0
	}
}