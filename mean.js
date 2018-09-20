class Mean{
    constructor(pos, color){
        this.pos = pos
        this.color = color
        this.x_sum = 0
        this.y_sum = 0
        this.amount = 0
    }

    /* *
     Lets 'this' be the assigned mean of given point
     and adds its position to this means sums 
    */
    givePoint(p) {
        p[1] = this
        this.x_sum += p[0].x
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
		this.pos = createVector(this.x_sum / this.amount, this.y_sum / this.amount)
    }
}