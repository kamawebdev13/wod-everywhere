import { useState } from 'react';
import { footer_photo_url  } from '@/const/images';

export const LoginFooterImage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        <div className="mt-auto pt-6">
            <div className="w-full h-44 rounded-xl overflow-hidden grayscale shadow-2xl bg-zinc-200">
                <img
                    src={footer_photo_url }
                    alt="Athlete"
                    loading="lazy"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    );
};