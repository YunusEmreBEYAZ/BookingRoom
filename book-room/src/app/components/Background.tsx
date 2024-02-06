"use client";

import {useEffect, useState} from 'react';

interface BgProps {
    images: string[];

}

const BackgroundImg: React.FC<BgProps> = ( {images} ) => {
    const [background, setBackground] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setBackground((background + 1) % images.length);
        },5000);

        return () => clearInterval(interval);
        

    }, [background, images.length]);

    return (
        <div className="background-carousel">
            {images.map((image, i:number) => (
                <div
                    key={i}
                    className={`background-image ${i === background ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}
        </div>
    );
    };

    export default BackgroundImg;