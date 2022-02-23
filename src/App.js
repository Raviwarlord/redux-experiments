import './App.css';
import Users from './components/Users'

// will rerender only if 
//1. Local state is changed
//2. Input Props changed
//3. Parent rerender 

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Users />
      </header>
    </div>
  );
}

export default App;
