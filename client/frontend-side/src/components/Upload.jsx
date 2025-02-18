import React, {useState} from 'react'
import "../App.css"

const Upload = () => {
  const [file, setFile] = useState(null);
  const [imageType, setImageType] = useState('MRI');
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('image_type', imageType);

    try {
      const response = await fetch('API_URL', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.result);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='App'>
        <h1>
            Medical Image Scanning
        </h1>
        <form onSubmit={handleSubmit}>
            {/* This div is for options */}
            <div> 
                <label>
                    <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
                        <option value="MRI">MRI</option>
                        <option value="XRAY">XRAY</option>
                    </select>
                </label>
            </div>

            {/* This div is for upload image */}
            <div>
                <label>
                    Upload Image:
                    <input type="file" onChange={handleFileChange} />
                </label>
            </div>

            <button type="submit">Upload and Analyze</button>
        </form>

        {imageUrl && (
        <div className="uploaded-image">
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded Scan" />
        </div>
      )}
      {result && (
        <div className="result">
          <h2>Analysis Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default Upload