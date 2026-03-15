import TextSplitReveal from "../ui/text-split-reveal";

export default function StorySection() {
  return (
    <section className="bg-primary-light py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-12 lg:col-span-5">
            <TextSplitReveal
              text="Built From Experience.|Relaunched With Purpose."
              mobileText="Built From|Experience.|Relaunched|With Purpose."
              className="text-3xl md:text-5xl font-bold text-[#0f1f45] leading-[1.1]"
              tag="h2"
            />
          </div>
          <div className="md:col-span-12 lg:col-span-7 space-y-8">
            <p className="text-muted text-base md:text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
              Veenode Technologies was founded on a simple belief: that
              organisations in Africa and around the world deserve access to the
              highest quality of technical expertise — not as a privilege, but
              as a standard.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              With roots in West Africa and a team that has delivered technical
              projects across sectors ranging from financial services to public
              sector infrastructure, Veenode has built the kind of experience
              that only comes from doing real work in complex environments.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Today, we are relaunching with sharper focus, a stronger team, and
              a clear mandate: to be the partner of choice for any organisation
              that is serious about building and securing intelligent systems
              that perform at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
