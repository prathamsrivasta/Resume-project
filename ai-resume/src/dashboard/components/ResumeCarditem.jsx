import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

function ResumeCarditem({resume}) {
  return (
    <Link to={'/dashboard/Resume/'+resume.resumeId+"/edit"}>
        <div className='p-14 bg-secondary flex items-center justify-center 
        border border-primary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer
        shadow-primary' >
          <Notebook/>
        </div>
        <h2 className='text-center my-1'>{resume.title}</h2>

        </Link>
  )
}

export default ResumeCarditem