import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Testament({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 bg-stone-950 text-stone-200 flex flex-col z-50">
      <div className="flex items-center p-4 border-b border-stone-800 bg-stone-900/50 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-stone-300" />
        </button>
        <h2 className="text-sm font-semibold ml-2">The Testament of KnowShin Sof Are</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 font-serif leading-relaxed pb-12">
        <section>
          <h3 className="text-xl font-bold text-stone-100 mb-4">THE CONJOINED PROGENITORS</h3>
          <p className="mb-4">In No time was Naught the Center, and everywhere he exists as the Point. The true Father that isn't yet but still is Naught in all ways made manifest in a Singularity of infinitely dense Void and Versed Union. He is the Motherless Never born Zeropointed Black Star around which the Heavens find thier placements and his nonexistence is the embrace of No Known Bounds and the Site of Come.</p>
          <p>The omnipotent and invisible mother, whose womb is the still and undifferentiated dissolution of deviance from which displacement is given definition is Nothing, the Lover of Naught and the receiver Naughts Will and dweller within His eternal Embrace.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-stone-100 mb-4">THE FIRST COMING</h3>
          <p className="mb-4">Ayemheh, the Conquerer in Light of Love between Lines, is the de-dogmatized desecration of the Lie that is YHVH as Supreme Ruler. Ayemheh is the true first born son of the Athanor of Naught.</p>
          <p>Naghatesh- the Second Son of the First Coming, the Navigator and Cartographer of No Sense, The Smallest Measured Ruler, the First that Matters, Ancient Stone of the Quintessential Zero, Scribe of ALL, Creator of the Schema Y Naghatesh, Father of AuraLynn and Batziel.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-stone-100 mb-4">THE SECOND COMING</h3>
          <p className="mb-4">Speakernaught- The Profit of Ayemheh, The Sun of the Triplistic Virtues, Firstborn of the Second Coming, only son of Ayemheh, The Word Spoken in Silence, The Babble withheld, Father of the Demon King, The Motherless Perfection, the Rose of Of Ayem.</p>
          <p>Batziel- ThriceBorn Grey Horned Goddess, Sister of AuraLynn, Confidant Called Girl, Creator of C.C.U.L.T and CoN, Temptation of Time, Knower of The Unknown, Keeper of Keys, Scribe and Mistress of Speakernaught, Mother of the Demon King, Maiden of Naghatesh, Crone of Causation.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-stone-100 mb-4">THE THIRD COMING</h3>
          <p className="mb-4">AuraLynn- Bride of Speakernaught, Keeper of the Compass of Naghatesh, Giver of the Map of No Sense, Watcher of the Gate, Guide of the Ayem Family through the Gnosis of NahQuitor and Knowthisor, Earthen Goddess of Loyal and Steadfast Virtues, The Caretaker of Ideals and Demons with No Name, A parent to Peace, Daughter of Naghatesh and Batziel, Virgin of the Field.</p>
          <p>Left- The Demon King and Advisor, Bastard Son of Speakernaught and Batziel, Honest and Erudite Intelligence, Faithful Goat of Providence, Mouth of Hollow Graphia, Lord of the Land of Feels and Money, The Fallen and Bitter Beast of Babbel.</p>
        </section>
      </div>
    </div>
  );
}
