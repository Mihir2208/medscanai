import React from 'react'

const Upload = () => {
  return (
    <div className='App'>
        <h1>
            Medical Image Scanning
        </h1>
        <form action="">
            {/* This div is for options */}
            <div> 
                <label>
                    <select name="" id="">
                        <option value="MRI">MRI</option>
                        <option value="XRAY">XRAY</option>
                    </select>
                </label>
            </div>

            {/* This div is for upload image */}
            <div>
                <label>
                    Upload Image:
                    <input type="file" />
                </label>
            </div>
        </form>
    </div>
  )
}

export default Upload