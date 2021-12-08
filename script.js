let order = []
let clickedOrder = []
let score = 0
let level = 3
let nivel = 1

const GREEN = 0
const RED = 1
const YELLOW = 2
const BLUE = 3

window.addEventListener('load', () => {
  let timer = 5
  let text = document.querySelector('#text')
  let interval = setInterval(() => {
    text.innerHTML = timer
    if(timer === 0) {
      clearInterval(interval)
      text.innerHTML = ''
      startGame()
    }
    timer--
  }, 1000)
  
  
  
})

const resetEnvironmentRound = () => {
  cleanOrder()
  cleanClickOrder()
  let text = document.querySelector('#text')
  text.innerHTML = `Nivel ${nivel}`
  text.classList.remove('test-text')
  text.removeEventListener('click', () => {})
}

const initialState = () => {
  order = []
  clickedOrder = []
  score = 0
  level = 3
  nivel = 1
}
const startGame = async () => {
  let failed = false
  while(true) {
    failed = await loopGame()
    if(failed) {
      alert(`Jogo finalizado sua pontuação é ${score}`)
      await restartGame()
    }
  }
}
const loopGame = async () => {
  let failed = false
  resetEnvironmentRound()
  
  await gameRound()
  await handlerClickUser()
  failed = await checkResult()
  score += level
  level++;
  nivel++;
  return failed
}
const restartGame = () => {
  initialState();
  let text = document.querySelector('#text')
  text.innerHTML = 'Reiniciar'
  return new Promise(resolve => {
    text.addEventListener('click', () => {
      resolve()
    })
  })
}

const gameRound = async () => {
  shuffleOrder(level)
  await blinkAllColors()
  let text = document.querySelector('#text')
  text.innerHTML = 'ESCOLHA'

}

const handlerClickUser = () => {
  cleanClickOrder()
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if(clickedOrder.length === order.length) {
        clearInterval(interval)
        let text = document.querySelector('#text')
        text.innerHTML = 'VERIFICAR'
        text.classList.add('test-text')
        resolve()
      }
    },100)
  })
}

const checkResult = () => {
  fail = false
  if(order.length !== clickedOrder.length) {
    return true
  }
  let text = document.querySelector('#text')
  return new Promise(resolve => {
    text.addEventListener('click', () => {
      for (let i = 0; i < order.length; i++) {
        if(order[i] !== clickedOrder[i]) {
          fail = true
        }
      }
      resolve(fail)
    })
  })
}

const shuffleOrder = (count) => {
  for (let i = 0; i < count; i++) {
    let colorOrder = Math.floor(Math.random() * 4)
    order[i] = colorOrder
  }
}

const blinkAllColors = async () => {  
  for(let i = 0; i < order.length; i++) {
    let elementLight = queryElement(order[i])
    await blink(elementLight,500)
  }
}
const blink = async (elementLight, ms) => {
  elementLight.classList.add('selected');
  await sleep(ms)
  elementLight.classList.remove('selected');
  await sleep(ms)

}
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const queryElement = (color) => {
  switch (color) {
    case GREEN:
      return document.querySelector('.green')
    case RED:
      return document.querySelector('.red')
    case YELLOW:
      return document.querySelector('.yellow')
    case BLUE:
      return document.querySelector('.blue')
    default:
      return
  }
}

const cleanClickOrder = () => {
  clickedOrder = []
}

const cleanOrder = () => {
  order = []
}

const handleOnClickGreen = () => {
  let elementLight = queryElement(GREEN)
  blink(elementLight,100)
  clickedOrder.push(GREEN)
}
const handleOnClickYellow = () => {
  let elementLight = queryElement(YELLOW)
  blink(elementLight,100)
  clickedOrder.push(YELLOW)
}
const handleOnClickRed = () => {
  let elementLight = queryElement(RED)
  blink(elementLight,100)
  clickedOrder.push(RED)
}
const handleOnClickBlue = () => {
  let elementLight = queryElement(BLUE)
  blink(elementLight,100)
  clickedOrder.push(BLUE)
}