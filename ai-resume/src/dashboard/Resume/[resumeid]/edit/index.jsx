import React, { useEffect } from 'react'
import { useParams } from 'react-router'

function EditResume
() {

    const params = useParams()

    useEffect(() => {
        console.log(params.resumeId)
    }
    , [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* form section */}



      {/* preview section */}

    </div>
  )
}

export default EditResume

