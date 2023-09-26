import { render } from 'preact'

import 'preact/devtools'
import App from './App'
// import './styles/main'
// Setup goober to use preact jsx pragma
const container = document.getElementById('root') as HTMLElement

render(<App />, container)
