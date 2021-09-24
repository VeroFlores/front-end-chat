import logo from './logo.svg';
import './App.css';

function App() {

  // Create WebSocket connection.

const socket = new WebSocket('ws://10.13.8.99:8000/ws/chat/elfolibre/');

// Connection opened
socket.onopen = () => {
  console.log('is connected')
};

socket.onmessage = (message) => {
  console.log(message);
}

socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
