;(function(){
  class Random {
    static get(inicio,final) {
      return Math.floor(Math.random() * final) + inicio
    }
  }
  class Food {
    constructor(x,y) {
      this.x = x
      this.y = y
      this.width = 14
      this.height = 14
    }

    draw() {
      ctx.fillRect(this.x, this.y, this.width,this.height)
    }
    static generate() {
      return new Food(Random.get(0,550),Random.get(0,300))
    }
  }

  class Square {
    constructor(x,y) {
      this.x = x
      this.y = y
      this.width = 15
      this.height = 15
      this.back = null // Cuadrado de atrás
    }

    draw() {
      ctx.fillRect(this.x,this.y,this.width,this.height)
      if(this.hasBack()) {
        this.back.draw()
      }
    }

    add() {
      if(this.hasBack()) return  this.back.add();
      this.back = new Square(this.x,this.y)
    }

    hasBack() {
      return this.back !== null
    }
    copy() {
      if(this.hasBack()) {
        this.back.copy()

        this.back.x = this.x
        this.back.y = this.y
      }
    }

    right() {
      this.copy()
      this.x += 10
    }
    left() {
      this.copy()
      this.x -= 10
    }
    up() {
      this.copy()
      this.y -= 10
    }
    down() {
      this.copy()
      this.y += 10
      }
    }


  class Snake {
    constructor() {
      this.head = new Square(100,0)
      this.draw()
      this.direction = "right"
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
    }

    draw() {
      this.head.draw()
    }

    right() {
      this.direction = "right"
    }

    left() {
      this.direction = "left"
    }

    up() {
      this.direction = "up"
    }

    down() {
      this.direction = "down"
    }
    move() {
      if (this.direction === "up") return this.head.up()
      if (this.direction === "down") return this.head.down()
      if (this.direction === "left") return this.head.left()
      if (this.direction === "right") return this.head.right()
    }

    eat() {
      this.head.add()
    }
  }

 const canvas = document.getElementById('canvas')
 const ctx =  canvas.getContext('2d')

  const snake = new Snake()
  let foods = []

  window.addEventListener("keydown",function(ev) {
    if(ev.keyCode > 36 && ev.keyCode < 41) ev.preventDefault()
    if(ev.keyCode === 40) return snake.down();
    if(ev.keyCode === 39) return snake.right();
    if(ev.keyCode === 38) return snake.up();
    if(ev.keyCode === 37) return snake.left();

    return false;
  })

  setInterval(function(){
    snake.move()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    snake.draw()
    drawFood()
  },1000 / 7)

  setInterval(function() {
    const food = Food.generate()
    foods.push(food)

    setTimeout(function() {
      // Delete food
      removeFromFoods(food)
    },10000)
  },4000)

  function drawFood() {
    for(const index in foods) {
      const food = foods[index]
      if(typeof food  !== "undefined") {
        food.draw()
        if(hit(food,snake.head)) {
          snake.eat()
          removeFromFoods(food)
        }
      }

    }
  }

  function removeFromFoods(food) {
    foods = foods.filter(function(f) {
      return food !== f
    })
  }

  function hit(a,b) {
    var hit = false;
    //Colsiones horizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width)
    {
      //Colisiones verticales
      if(b.y + b.height >= a.y && b.y < a.y + a.height)
        hit = true;
    }
    //Colisión de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width)
    {
      if(b.y <= a.y && b.y + b.height >= a.y + a.height)
        hit = true;
  }
    //Colisión b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width)
    {
      if(a.y <= b.y && a.y + a.height >= b.y + b.height)
        hit = true;
    }
    return hit;
  }
})()