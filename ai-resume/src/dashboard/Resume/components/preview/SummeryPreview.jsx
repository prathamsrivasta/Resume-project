import React from 'react'

function SummeryPreview({resumeInfo}) {
  return (
    <div>
      <p className='text-sm'>
        {resumeInfo?.summery}
      </p>
    </div>
  )
}

export default SummeryPreview