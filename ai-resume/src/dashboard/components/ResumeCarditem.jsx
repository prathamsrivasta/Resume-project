import { Notebook } from 'lucide-react'
import React from 'react'

function ResumeCarditem() {
  return (
    <div>
        <div className='p-14 bg-secondary flex items-center justify-center rounded-lg h-[280px] 
        border border-primary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer
        shadow-primary'>
          <Notebook/>
        </div>
        <h2 className='text-center my-1'>Resume-Title</h2>

    </div> 
  )
}

export default ResumeCarditem