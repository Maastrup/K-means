class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.mean = null
    }

    static create(amount) {
        let array = []

        for(let i = 0; i < amount; i++){
            array.push(new Point(random(width), random(height)))
        }
        return array
    }
}

class Mean {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = color(
            'hsb(' +
            round((80 + (360 * i / amount))) % 360 +
             ', 100%, 80%)'
        )
        this.x_sum = 0
        this.y_sum = 0
        this.amount = 0
    }

    static create(amount, dataPoints) {
        let array = []

        for (let i = 0; i < amount; i++) {
            let randomPoint = dataPoints[Math.floor(random(dataPoints.length))]
            let x = randomPoint.x
            let y = randomPoint.y
            means.push(new Mean(x, y))
        }
        return array
    }

    /* *
     Lets 'this' be the assigned mean of given point
     and adds its position to this means sums 
    */
    givePoint(p) {
        p[1] = this
        this.x_sum += p.x
        this.y_sum += p[0].y
        this.amount++
    }

    /* *
     Sets the assigned mean of given point to 'null'
     and subtracts its position from this means sums 
    */
    removePoint(p) {
        p[1] = null
        this.x_sum -= p[0].x
        this.y_sum -= p[0].y
        this.amount--
    }

    newPos() {
        console.log(this.color)
        if (this.amount > 0) {
            this.pos = createVector(this.x_sum / this.amount, this.y_sum / this.amount)
        }
    }
}