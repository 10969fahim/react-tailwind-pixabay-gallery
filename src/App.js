import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import VideoCard from './components/VideoCard';
import ImageSearch from './components/ImageSearch';
import Navbar from './components/Navbar';


function App() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('indonesia');

  useEffect(() => {
    var url = 'https://api.pexels.com/v1/';
    if(term){
      url+=`search?query=${term}&image_type=photo&pretty=true`
    }
    console.log(term)
    fetch(url,
    {
      headers: new Headers({
        'Authorization': 'w0iNqU54HdRKqHOQb5O4jKHwdH2WVFJACj4eHwilkF9HRU2V31QN7Its', 
    }), 
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.photos);
        setIsLoading(false);
      })
      .catch(err => console.log(err));


      var urlvideo = 'https://api.pexels.com/videos/';
      if(term){
        urlvideo+=`search?query=${term}&image_type=photo&pretty=true`
        // popular
      }else{
        urlvideo+='popular'
      }
      fetch(urlvideo,
        {
          headers: new Headers({
            'Authorization': 'w0iNqU54HdRKqHOQb5O4jKHwdH2WVFJACj4eHwilkF9HRU2V31QN7Its', 
        }), 
        })
          .then(res => res.json())
          .then(data => {
            setVideos(data.videos);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <Navbar />
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }
      <h1 className='text-center text-5xl'>Gambar</h1>
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4" style={{marginTop:"20px"}}>
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
      <h1 className='text-center text-5xl'>Video</h1>
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4" style={{marginTop:"20px"}}>
        {videos.map(data => (
          <VideoCard key={data.id} video={data} />
        ))}
      </div>}
    </div>
  );
}

export default App;
