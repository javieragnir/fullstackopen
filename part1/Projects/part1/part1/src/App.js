const Hello = (props) => {
  return (
    <div>
      <p>
      Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  const kappa = {
    name: 'Kappa',
    age: 18
  }

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello props={kappa} />
    </div>
  )
}

export default App