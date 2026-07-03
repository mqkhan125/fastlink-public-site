import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `

<div class="bg-red-500">Counter App</div>
`

setupCounter(document.querySelector('#counter'))
