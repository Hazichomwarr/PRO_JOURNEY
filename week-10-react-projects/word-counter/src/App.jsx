import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')

  return (
    <>
    <header className='w-fit my-4 mx-auto'>
      <h1 className='text-2xl font-bold text-3xl'>Word Counter</h1>
    </header>
    <main className='w-96 my-0 mx-auto p-4 flex flex-col items-center bg-gray-200'>
      <section className='w-80 my-4 mx-auto flex flex-col items-center gap-2'>
        <label htmlFor="text text-2xl">Write your message:</label>
        <textarea name="text" id="text" rows={4} cols={20}
        onClick={e => setText(e.target.value)} 
        className='w-full rounded-md resize-x overflow-x-scroll text-xl focus:outline-blue-400 md:w-9/10 max-w-1/2 text-2xl'>{text}</textarea>
      </section>
    </main>
    </>
  )
}

export default App
