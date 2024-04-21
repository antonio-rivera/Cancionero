 async function App() {
   const data = await window.DB.getAllData()
  return (
    <>
    <h1>Hello from React</h1>
    </>
  )
}

export default App  