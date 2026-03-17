import type { BlogPost } from "../types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-production-llm-applications",
    title: "Building LLM Applications That Actually Work in Production",
    excerpt:
      "Most LLM demos look impressive. Most LLM applications in production fail quietly. Here is what separates the two — and how to close the gap before it costs you.",
    body: "There is a graveyard of LLM prototypes that never made it to production. They worked beautifully in demos, impressed stakeholders, and then collapsed under the weight of real users, real data, and real edge cases.\nThe problem is rarely the model. The problem is the architecture around it — the scaffolding that most teams build once and never revisit.\nWhen you build an LLM demo, you control the inputs. You craft the prompts. You cherry-pick the examples. But production is adversarial. Users will type things you never anticipated, your context windows will fill up in unexpected ways, and latency will matter more than you think it will.\nThe teams that succeed treat LLM applications like any other distributed system: with observability, fallback strategies, and ruthless attention to failure modes. They instrument everything. They measure hallucination rates. They track latency at the 95th percentile, not just the mean.\nEvaluation frameworks, not vibes. You need automated evals that catch regressions before they reach users. Treat prompt changes like code changes — version them, test them, review them. A prompt that improves one benchmark will quietly break another if you are not looking.\nStructured outputs over free text wherever possible. JSON mode, function calling, and constrained generation dramatically reduce downstream parsing errors and make your application far more predictable under load.\nRetrieval-augmented generation done properly. Most RAG implementations we see have poor chunking strategies and no re-ranking step. These two issues alone account for the majority of retrieval failures in production systems. Chunk by semantic unit, not by token count. Re-rank with a cross-encoder before passing context to the model.\nThe teams that get this right are not necessarily the ones with the best models. They are the ones who treat the entire system — retrieval, generation, evaluation, and monitoring — as a first-class engineering problem.",
    category: "AI Engineering",
    author: "Tunde Adeyemi",
    publishedAt: "2025-02-14T09:00:00Z",
    readTime: 8,
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    featured: true,
    tags: ["LLM", "Production", "Architecture", "RAG"],
  },
  {
    id: "2",
    slug: "ndpa-compliance-technical-guide",
    title: "NDPA Compliance for Technology Teams: What You Actually Need to Do",
    excerpt:
      "The Nigeria Data Protection Act is not just a legal document — it has direct technical implications for how you build, store, and process data. Here is a practical guide for engineering teams.",
    body: "The Nigeria Data Protection Act came into full effect and most technology teams responded in one of two ways: they either handed it entirely to their legal department, or they panicked and did nothing. Neither response is adequate.\nCompliance is not a legal problem with technical implications. It is a technical problem with legal consequences. The decisions that determine whether your organisation is compliant are made in your database schemas, your API designs, your logging configurations, and your third-party integrations.\nData minimisation starts at the schema level. If you are collecting a field, you need a documented reason for it. This sounds obvious until you audit a production database and find dozens of columns that nobody can explain, populated by features that were deprecated two years ago. Start there.\nConsent management is an engineering problem. You need to be able to demonstrate, for any given user, exactly what they consented to and when. That means storing consent records with timestamps, consent versions, and the specific data processing activities covered. A checkbox on a sign-up form is not sufficient and it is not auditable.\nData subject rights have SLA implications. The right to access, the right to rectification, and the right to erasure are not just legal obligations — they require you to be able to locate, export, and delete a specific user's data across all your systems within a defined timeframe. If your data is spread across five microservices, two data warehouses, and a third-party analytics platform, you have an engineering problem to solve before you have a compliance posture.\nCross-border transfer restrictions matter for cloud architecture decisions. Storing Nigerian citizens' personal data on infrastructure outside Nigeria requires specific safeguards. This affects your cloud provider choice, your region configuration, and your data replication strategy.\nThe organisations that handle this well treat data protection as a design constraint, not an afterthought. They build it into their development lifecycle, their code review process, and their infrastructure provisioning. The ones that handle it poorly find out at the worst possible time.",
    category: "Cybersecurity",
    author: "Amara Osei",
    publishedAt: "2025-01-28T10:30:00Z",
    readTime: 10,
    coverImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["NDPA", "Compliance", "Data Protection", "Nigeria"],
  },
  {
    id: "3",
    slug: "mlops-beyond-the-notebook",
    title:
      "MLOps in Practice: Moving Models From Notebooks to Production Systems",
    excerpt:
      "A model that lives in a Jupyter notebook is not a product. It is a proof of concept. The gap between the two is where most ML projects die — and it does not have to be.",
    body: "Every data science team has at least one model that never made it out of the notebook. It performed well on the validation set. The stakeholders were excited. And then it sat in a Git repository, running in no one's infrastructure, serving no one's users.\nThis is the MLOps gap, and it is more common than the industry likes to admit.\nThe fundamental problem is that machine learning models have dependencies that most software does not. They depend on specific versions of training data. They depend on feature distributions that can shift over time. They depend on preprocessing pipelines that need to match exactly between training and inference. When any of these break, the model does not crash with an error — it silently produces worse outputs.\nModel versioning is not the same as code versioning. You need to version your models together with the data they were trained on, the preprocessing pipeline they expect, and the performance benchmarks they were evaluated against. DVC, MLflow, and similar tools exist precisely because Git is not designed for this.\nFeature stores solve a real problem that teams discover too late. When the same features are computed differently in your training pipeline and your serving infrastructure, you get training-serving skew. It is subtle, it is hard to debug, and it causes exactly the kind of silent degradation that erodes trust in ML systems over time.\nMonitoring ML systems requires different metrics than monitoring traditional software. Uptime and latency matter, but so do data drift, prediction drift, and business metric correlation. A model that is technically healthy — low latency, high availability — can still be failing at its actual job if the input distribution has shifted since training.\nThe teams that get MLOps right do not treat it as a separate discipline from software engineering. They apply the same rigour to their ML systems that they apply to their APIs: CI/CD pipelines, automated testing, rollback strategies, and on-call procedures. The model is just another service, and it deserves the same engineering attention.",
    category: "Machine Learning",
    author: "Kwame Mensah",
    publishedAt: "2025-01-15T08:00:00Z",
    readTime: 9,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["MLOps", "Production", "Machine Learning", "Infrastructure"],
  },
  {
    id: "4",
    slug: "api-security-common-mistakes",
    title: "The API Security Mistakes We See on Every Engagement",
    excerpt:
      "After reviewing dozens of APIs across financial services, healthcare, and public sector organisations, the same vulnerabilities appear again and again. Here is what to fix first.",
    body: "API security is one of those areas where the gap between what teams think they have done and what they have actually done is alarmingly wide. We have reviewed APIs at organisations that considered themselves security-conscious, and we have found the same categories of issues on almost every engagement.\nBroken object level authorisation is the most common critical finding we see. The pattern is always the same: an endpoint accepts a resource identifier as a parameter, checks that the user is authenticated, but does not check whether the authenticated user is actually allowed to access that specific resource. Change the ID in the request and you access someone else's data. This is OWASP API1 for a reason.\nExcessive data exposure is the second most common issue. APIs return full database objects and rely on the frontend to filter what is displayed to the user. The problem is that anyone with a network tab can see the full response. Fields that should never leave the server — internal identifiers, audit metadata, other users' information — are routinely exposed this way.\nRate limiting is absent on endpoints that matter. Authentication endpoints, password reset flows, OTP verification — these are the endpoints where brute force and credential stuffing attacks land. They are also, consistently, the ones without rate limiting.\nJWT implementation errors are surprisingly common. Accepting the none algorithm, not validating expiry, storing sensitive data in the payload without understanding that it is base64-encoded and not encrypted — these are the issues we find in code that has been in production for years.\nThe fix for most of these is not exotic. It is disciplined code review, automated security testing in your CI pipeline, and treating authorisation as a concern that belongs in your application layer, not your frontend. The organisations that have the best security postures are not the ones with the most sophisticated tools. They are the ones that consistently apply the basics.",
    category: "Cybersecurity",
    author: "Amara Osei",
    publishedAt: "2024-12-10T11:00:00Z",
    readTime: 7,
    coverImage:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["API Security", "OWASP", "Authentication", "VAPT"],
  },
  {
    id: "5",
    slug: "ai-governance-practical-framework",
    title:
      "AI Governance Is Not a Policy Problem. It Is an Engineering Problem.",
    excerpt:
      "Responsible AI does not live in a PDF. It lives in your training data pipelines, your model evaluation frameworks, and your deployment guardrails. Here is how to build it properly.",
    body: "Most organisations approach AI governance by writing a policy document. They articulate principles — fairness, transparency, accountability — and they publish them. Then they go back to shipping models built the same way they always were.\nThe gap between principle and practice in AI governance is enormous, and it is primarily an engineering gap.\nFairness is not a value you assert. It is a property you measure. That means defining what fairness means in your specific context — equal accuracy across demographic groups, equal false positive rates, equal access to beneficial outcomes — and then measuring it systematically at every stage of your ML pipeline. A model that performs well on aggregate metrics can be deeply unfair to specific subgroups, and you will not know unless you look.\nTransparency requires investment in explainability infrastructure. Stakeholders, regulators, and affected individuals increasingly need to understand why a model made a specific decision. SHAP values, LIME, and attention visualisation are not research tools — they are operational requirements for any model that makes decisions with meaningful consequences for people.\nAccountability requires audit trails. Every model training run, every dataset version, every deployment decision should be logged in a way that allows you to reconstruct the full provenance of any prediction. This is not just good practice — it is increasingly a regulatory expectation in financial services, healthcare, and public sector applications.\nHuman oversight is a design requirement, not a fallback. The most robust AI systems are the ones designed from the start with clear escalation paths, confidence thresholds that trigger human review, and override mechanisms that work reliably under operational pressure.\nThe organisations doing this well are the ones that treat their AI governance framework the same way they treat their security framework — as a set of technical controls that need to be implemented, tested, and maintained, not a document that gets reviewed annually.",
    category: "AI Governance",
    author: "Tunde Adeyemi",
    publishedAt: "2024-11-22T09:30:00Z",
    readTime: 11,
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["AI Governance", "Responsible AI", "Fairness", "Policy"],
  },
  {
    id: "6",
    slug: "software-architecture-african-scale",
    title:
      "Building Software for African Scale: Infrastructure Realities You Need to Plan For",
    excerpt:
      "Building software for users in Africa requires confronting infrastructure realities that most architectural patterns were not designed around. Connectivity, cost, and device diversity all demand different decisions.",
    body: "Most software architecture guidance was written by engineers working on infrastructure assumptions that do not hold across much of Africa. High-bandwidth connections, consistent latency, the latest device hardware, unmetered data plans — these are not the baseline you can design to if your users are in Lagos, Accra, or Nairobi.\nThis is not a complaint about infrastructure. It is a design constraint, and good engineers treat constraints as useful information.\nOffline-first architecture is not a nice-to-have. For applications that need to work reliably for users on intermittent connections, offline-first is the correct architectural approach. That means local-first data storage, background synchronisation with conflict resolution, and graceful degradation that does not leave users staring at a loading spinner when their connection drops.\nBundle size is a user cost, not just a performance metric. When your users are on metered data plans, a 3MB JavaScript bundle is a real financial cost. Aggressive code splitting, lazy loading, and serving genuinely minimal initial payloads are not optimisation exercises — they are product decisions that affect whether people can afford to use your application.\nLatency profiles are different when your servers are in Europe or North America. A backend hosted in us-east-1 will add 150-200ms of baseline latency for users in West Africa. That compounds with every round trip your application makes. Design for fewer round trips. Cache aggressively. Consider whether a CDN edge location or a regional cloud deployment changes your user experience meaningfully.\nPayment integration requires local knowledge. Paystack, Flutterwave, and Mobile Money integrations are not afterthoughts — for most African markets they are the primary payment method and need to be first-class citizens in your architecture from day one.\nThe engineers who build the best products for African markets are the ones who design to the actual infrastructure reality of their users, not the infrastructure they wish their users had.",
    category: "Software Engineering",
    author: "Kwame Mensah",
    publishedAt: "2024-11-05T10:00:00Z",
    readTime: 8,
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Architecture", "Africa", "Performance", "Infrastructure"],
  },
];
