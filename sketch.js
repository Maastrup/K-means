let points = []
let means = []
let k = 3
let r = 15
let auto


function setup() {
	createCanvas(650, 400)

	// Create means
	let commonColor = random(360)
	console.log(commonColor)
	for (let i = 0; i < k; i++) {
		let c = round((commonColor + (360 * i / k))) % 360
		console.log(c)
		let pos = createVector(random(width), random(height))
		means.push(new Mean(pos, color('hsb(' + c + ', 100%, 80%)')))
	}

	// Create points and assign to closest mean
	for (let i = 0; i < 100; i++) {
		let p = createVector(random(r * 0.7, width - r * 0.7), random(r * 0.7, height - r * 0.7))
		let assignedMean = closestMean(p)
		points.push([p, assignedMean])
		assignedMean.givePoint(points[i])
	}

	auto = createCheckbox('Auto find means', false)
}

function draw() {
	background(30)

	// Draw points and assign the closest mean by euclidean distance
	noStroke()
	points.forEach(p => {
		let newMean = closestMean(p[0])
		let oldMean = p[1]
		if (newMean !== oldMean) {
			oldMean.removePoint(p)
			newMean.givePoint(p)
		}
		fill(p[1].color)
		ellipse(p[0].x, p[0].y, r)
	})

	// Draw means
	stroke(255)
	strokeWeight(2)
	means.forEach(mean => {
		fill(mean.color)
		ellipse(mean.pos.x, mean.pos.y, r)
	})

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
	let p = createVector(mouseX, mouseY)
	let assignedMean = closestMean(p)
	points.push([p, assignedMean])
	assignedMean.givePoint(points[points.length - 1])
}

function newMeans() {
	means.forEach(mean => {
		mean.newPos()
	})
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