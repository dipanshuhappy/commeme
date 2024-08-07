import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Providers from './components/providers.tsx'
import { BackgroundBeams } from './components/ui/background-beams.tsx'
import { World } from './components/ui/globe.tsx'
import { HeroHighlight,Highlight } from './components/ui/hero-highlight.tsx'
import { motion } from 'framer-motion'
import { sampleArcs } from './data/sample-arc.ts'
import { globeConfig } from './data/globe-config.ts'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      
      <App />
      {/* <World data={sampleArcs} globeConfig={globeConfig}/> */}
      
      <HeroHighlight className='dark'>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        In the dark forest of blockhains , the only sane idealogy  
        is degen communism {" "}
        <Highlight className="text-black  dark:text-white">
          Seize the memes of production
        </Highlight>
      </motion.h1>
    </HeroHighlight>
    
      </Providers>
    
  </React.StrictMode>,
)
