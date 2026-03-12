import TextSplitReveal from "../ui/text-split-reveal";

export default function GlobalReachSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <TextSplitReveal 
        text="Built in West Africa.|Ready for the World."
        mobileText="Built in|West Africa.|Ready for|the World."
        className="text-3xl md:text-5xl font-bold text-center mb-6"
        tag="h2"
      />
      <p className="text-center text-muted text-base md:text-lg max-w-3xl mx-auto mb-12">
        Veenode is headquartered in West Africa with a global delivery
        capability. We serve clients across Nigeria and Ghana, as well as
        organisations in the UK, the US, the Middle East, and across Africa.
        Our remote-first delivery model means you get Veenode-quality work
        wherever you are.
      </p>
      <div className="bg-light-grey rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
        <p className="text-muted text-center">
          [ World Map Visualization - Lagos, Accra, London, New York ]
        </p>
      </div>
    </section>
  );
}
