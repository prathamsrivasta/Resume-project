import React from 'react'
import AddResume from './components/AddResume'
import ResumeCarditem from './components/ResumeCarditem'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-20'>
       <h2 className='font-bold text-3xl'>My Resume</h2>
       <p>Start creating AI resume for your next job role</p>

       <div className='grid grid-cols-2 
       md:grid-cols-3 lg:grid-cols-5
       mt-10 gap-5'>
       <AddResume/>
       <ResumeCarditem/>
      </div>

    </div>
   
  )
}

export default Dashboard