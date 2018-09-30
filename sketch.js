let points = []
let means = []
let amount = 100
const r = 15
let auto

function setup() {
	createCanvas(650, 500)

	points = [
		[createVector(152, height - 72), null],
		[createVector(102, height - 56), null],
		[createVector(182, height - 60), null],
		[createVector(192, height - 68), null],
		[createVector(122, height - 72), null],
		[createVector(142, height - 77), null]
	]

	Mean.create(3)

	points.forEach(p => {
		closestMean(p[0]).givePoint(p)
	})

	auto = createCheckbox('Auto find gennemsnit', false)

	// 
	let inp = createInput(100)
	inp.input( () => {
		amount = Number(inp.value())
	})

	createButton('Tilfældige punkter').mousePressed(randomPoints)

	createButton('Rens lærred').mousePressed( () => {
		points = []
		for(let mean of means){
			mean.x_sum = 0
			mean.y_sum = 0
			mean.amount = 0
		}
	})

}

function draw() {
	background(30)

	for (let p of points) {
		stroke(255, 75)
		line(p[0].x, p[0].y, p[1].pos.x, p[1].pos.y)
	}

	// Draw points and assign the closest mean by euclidean distance
	// noStroke()
	points.forEach(p => {
		const newMean = closestMean(p[0])
		const oldMean = p[1]
		if (newMean !== oldMean) {
			oldMean.removePoint(p)
			newMean.givePoint(p)
		}
		noStroke()
		fill(p[1].color)
		ellipse(p[0].x, p[0].y, r)
	})

	// Draw means
	stroke(255)
	strokeWeight(2)
	for (let mean of means) {
		fill(mean.color)
		ellipse(mean.pos.x, mean.pos.y, r)
	}

	if (auto.checked()) newMeans()

}

function keyPressed() {
	if (key == ' ') newMeans()
	/* 	else if (key == 'a') {
			switch (auto.checked()) {
				case true:
					auto.checked() = false
					break
				case false:
					auto.checked() = true
					break
			}
		} */
}


function mouseDragged() {
	addPoint(mouseX, mouseY)
}

function mousePressed() {
	addPoint(mouseX, mouseY)
}

function addPoint(x, y) {
	if (0 < x && x < width && 0 < y && y < height) {
		let p = createVector(x, y)
		points.push([p, null])
		closestMean(p).givePoint(points[points.length - 1])
	}
}

function newMeans() {
	for (let mean of means) {
		mean.newPos()
	}
}

function closestMean(vector) {
	let assignedMean
	let leastDist

	means.forEach(mean => {
		let d = vector.dist(mean.pos)
		if (d < leastDist || leastDist === undefined) {
			leastDist = d
			assignedMean = mean
		}
	})
	return assignedMean
}

function randomPoints() {
	points = []
	// Create points and assign to closest mean
	for (let i = 0; i < amount; i++) {
		let pos = createVector(random(r * 0.7, width - r * 0.7), random(r * 0.7, height - r * 0.7))
		points.push([pos, null])
		closestMean(pos).givePoint(points[i])
	}
}