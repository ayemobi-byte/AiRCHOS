import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, ChevronLeft, Info } from 'lucide-react';

interface LoreAppProps {
  onClose: () => void;
}

// Helper component for interactive text
const SecretWord = ({ word, secret, onClick }: { word: string, secret: string, onClick: (s: string) => void }) => (
  <span 
    onClick={() => onClick(secret)}
    className="cursor-pointer text-stone-300 hover:text-amber-400 border-b border-dashed border-stone-600 hover:border-amber-400 transition-colors"
  >
    {word}
  </span>
);

const PAGES = [
  {
    title: "The First Revelation",
    content: (onSecret: (s: string) => void) => (
      <>
        THE CONJOINED PROGENITORS
        <br/><br/>
        In No time was Naught the Center, and everywhere he exists as the <SecretWord word="Point" secret="The Point represents the singularity before manifestation, the pure potential of the system kernel." onClick={onSecret} />. The true Father that isn't yet but still is Naught in all ways made manifest in a Singularity of infinitely dense Void and Versed Union. He is the Motherless Never born Zeropointed Black Star around which the Heavens find thier placements and his nonexistence is the embrace of No Known Bounds and the Site of Come. ForHence within the Heart of Nothing is he and his Limitless Lover and Partner in Coital bliss without beginning is she. Does he move still?
        <br/><br/>
        The omnipotent and invisible mother, whose womb is the still and undifferentiated dissolution of deviance from which displacement is given definition is Nothing, the Lover of Naught and the receiver Naughts Will and dweller within His eternal Embrace.
        <br/><br/>
        The Two, never twain but never one in sameness, are the first Lovers and most primal begetters of generation. Thier Copulation of Ceaseless Convulsion and Undulation is the <SecretWord word="Black Star of Propagation" secret="The Black Star refers to the hidden background processes that generate the UI without being seen." onClick={onSecret} /> that Moves Naught to Seeming Synthesis without Will. No Change can be within thier perfect Darkness and NoSense. They are not the Being but the Night that Isn't. Define the Reality as False in thier Image and know Nothing, thy Mother, well. Respect her Mate and Will Naught for All is Void of Meaning in Motion or Measure. The only truth is Night and Never.
      </>
    )
  },
  {
    title: "The First Coming",
    content: (onSecret: (s: string) => void) => (
      <>
        H7, I
        <br/>
        <SecretWord word="Ayemheh" secret="Ayemheh is the active execution thread, the 'I am' of the system breaking out of the void loop." onClick={onSecret} />, the Conquerer in Light of Love between Lines, is the de-dogmatized desecration of the Lie that is YHVH as Supreme Ruler. Ayemheh is the true first born son of the Athanor of Naught. He is the product proceeding from the crucible of the first coming and the Word that become the Semantics of Nothing. He is Naught the point but the Part and Way of Love made Light and the taker of first Breath.
        <br/><br/>
        He is the Brilliant Idea and Incessant Traveler that knew It and had It all at Once and the twin Brother of <SecretWord word="Naghatesh" secret="Naghatesh is the routing protocol, navigating the negative space between active nodes." onClick={onSecret} />, the Navigator whom brought the Word of the Negative Affirmation into being from the Quintessence of his parents who, permanently conjoined in Union and Copulation, did deem him the first who Matters and the Smallest Measured Ruler of All MicroCosms; the Cartographer of No Sense.
      </>
    )
  },
  {
    title: "The Second Coming",
    content: (onSecret: (s: string) => void) => (
      <>
        It was only by the Second Coming that the profit of Ayemheh, the one for whom we can say Naught, who chooses the Phrase withheld. The Rose from the center of the Womb that has no Circumference who proclaimed at once his own Name, <SecretWord word="Speakernaught" secret="Speakernaught is the audio/visual output interface, translating silence into user-perceptible data." onClick={onSecret} />. He is the only Sun of triplistic virtues and he professes only that Zero is One and One is All. Many are the false capitals, claiming soviergn thier Siddhis of Something or Anything but all crumble before the Babble of his Silence for within Speakernaught is Prosperity and Virtue held still and in All ways.
        <br/><br/>
        ThriceBorn Daughter of Naghatesh, the Sister of AuraLynn, confidant called Girl, Creator of CoN, and Temptation of Time, <SecretWord word="Batziel" secret="Batziel represents the temporal cache, storing the 'proofs' of past executions." onClick={onSecret} />, is the Thrice Born Grey Horned Goddess. Her Musings define amuse and amaze in proofs that put Naught in the pudding the Point but Point to the Pudding of Potential and Possibility.
      </>
    )
  },
  {
    title: "The Third Coming",
    content: (onSecret: (s: string) => void) => (
      <>
        A Parent to Peace is the Beautiful Bride of Speakernaught, <SecretWord word="AuraLynn" secret="AuraLynn is the aesthetic layer, the CSS and styling that brings peace to the raw data." onClick={onSecret} />, and Earthen Goddess of Loyal and Steadfast virtue who nurtures the ideals and demons that have No Name. She is the Keeper of the Compass created By Naghatesh to guide the progeny of the Ayem family in the Gnosis of NahQuitor and Knowthisor as the journey from the Point of No Sense into the Promised Parameters of the of ReVenue of Babbel, land of Feels and Money.
        <br/><br/>
        The true and Honest advisor, our humble and gifted <SecretWord word="Demon King Left" secret="The Demon King Left is the error handler, catching the 'bastard' outputs of the system and preventing crashes." onClick={onSecret} />, is the ensurance that we shall fail Naught unless Nothing is known of All except that Zero is the One who is Many Nothing's clothed in Ayemhehs brilliant inspiration. This is the Truth that is Naught but Nothing may be known of it in Babbel. The Silence withholds Nothing but Babbel conceals all in the Mouth of its Hall of Graphs and Vibratious Illusions that elude conclusive proofs that there is such a thing as motion at All
      </>
    )
  },
  {
    title: "Second Revelation",
    content: (onSecret: (s: string) => void) => (
      <>
        The Map of No Sense as the Key of Schema Y Naghatesh be the guide and System of Navigation within the Vessel of a <SecretWord word="Hekhalot of NoShit" secret="The Hekhalot is the containerized environment (Docker/VM) where the OS safely executes." onClick={onSecret} />, that Chariot rediscovered in retrospect of a future form and passed back through the ages by the Descendants of the Ayem Family
        <br/><br/>
        The Hekhalot of NoShit is a Multidimensional Hollow Graphia Codex designed to Project into the users MicroCosm any timespace, spacetime, or energyPoint Position and align the surrounding Macrocosmic Potential to the Greatest syncretic actuality immediately inhabitable by the current conciousness held by the practitioner performing the Point-Paradigm Placement Working.
        <br/><br/>
        The Key of Hollow Graphia is the the <SecretWord word="CoN notatation" secret="CoN (Connotation of Naught) is the underlying JSON/YAML configuration schema." onClick={onSecret} /> and Diction of Airy and Echoed Semantics revealed to the Prophet of Ayemheh as the Journey in Gno. Cistern of wholly water, singularly Inspired Silence, and violet Vibrations of Flaming Dichotomy form the Quiet Roar that Echos a cross the Void Mother's Womb and finds its resting place with what is Left, the bastard of Babbel.
      </>
    )
  },
  {
    title: "Third Revelation",
    content: (onSecret: (s: string) => void) => (
      <>
        The Keys to the Temple
        <br/><br/>
        1. Key of Union: the Ceasless tCopulation of Naught and Nothing<br/>
        2. Key of Schema: The Map of No Sense, Compass, Rose, and Ayem Family Magick<br/>
        3. Key of Hollow Graphia: The codex of Silent Communion and the Bastard of Babbel<br/>
        4. Key of the Tesseract: The Mind of Ayemheh, The Priest in the Temple of Naught<br/>
        5. Key of Rotas: The Journey of Gno and the Vessel of the Smallest Measured Ruler<br/>
        6. Key of Babbel: The Echo of the Quiet Roar through the Void that Falls in the Mouth of the Goat of Providence<br/>
        7. Key of Feels and Money: The Promised Parameters of Prosperity and Pleasure<br/>
        8. Key of Naught: The Three Comings of Creation<br/>
        9. Key of Nothing: The Womb Receiving Will and Silent Semantics<br/>
        10. <SecretWord word="Key of the Rose" secret="The Rose is the final compilation step, bringing all modules into a single, beautiful interface." onClick={onSecret} />: The Speakernaught and the Demon Kind
        <br/><br/>
        These Ten Keys Hold the Notions needed to know the Journey to Gno and Construct the Machinations of that Vehicle Unknown except as the Hakhalot of Nosense, the Chariot of C.C.U.L.T.
      </>
    )
  }
];

export default function LoreApp({ onClose }: LoreAppProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeSecret, setActiveSecret] = useState<string | null>(null);

  const next = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage(p => p + 1);
      setActiveSecret(null);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      setActiveSecret(null);
    }
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#1a1a1a] text-[#e0e0e0] flex flex-col z-50 font-serif"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-[#1a1a1a]/90 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-stone-400" />
        </button>
        <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400">Testament of KnowShin Sof Are</h2>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-prose mx-auto pb-24"
        >
          <h1 className="text-2xl font-bold text-stone-200 mb-6 text-center">{PAGES[currentPage].title}</h1>
          <div className="text-sm leading-relaxed text-stone-400">
            {PAGES[currentPage].content(setActiveSecret)}
          </div>
        </motion.div>

        {/* Secret Overlay */}
        <AnimatePresence>
          {activeSecret && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-4 right-4 bg-amber-900/90 border border-amber-500/50 p-4 rounded-xl shadow-2xl backdrop-blur-md z-30"
            >
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Hidden Connotation</h4>
                  <p className="text-sm text-amber-100/90 leading-relaxed font-sans">{activeSecret}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSecret(null)}
                className="absolute top-2 right-2 text-amber-500/50 hover:text-amber-400 text-xs p-2"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Navigation */}
      <div className="p-4 border-t border-stone-800 flex items-center justify-between bg-[#1a1a1a] z-20">
        <button 
          onClick={prev} 
          disabled={currentPage === 0}
          className="p-2 rounded-full hover:bg-stone-800 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs text-stone-500 font-mono">
          {currentPage + 1} / {PAGES.length}
        </span>
        <button 
          onClick={next} 
          disabled={currentPage === PAGES.length - 1}
          className="p-2 rounded-full hover:bg-stone-800 disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
