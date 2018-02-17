//React | Redux
import React, {Component} from 'react';

//Components 
import SplashCard from './SplashCard';

//Video
import Cover from 'react-video-cover';

class Splash extends Component {
    render() {
        const videoOptions = {
            src: 'https://d3fka592uu6tyf.cloudfront.net/converted_videos/s3_0dc7d315-a2e9-44a4-9b85-bd519b8c362a/desktop.mp4',
            autoPlay: true,
            loop: true,
            muted: true
          };

        return (
            <div>
                <Cover id = "videoCover" videoOptions={videoOptions} remeasureOnWindowResize />
                <SplashCard/>
            </div>
        );
    }
}

export default Splash;