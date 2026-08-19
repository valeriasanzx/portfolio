export type Metric = {
  value: string;
  label: string;
  /** Optional footnote rendered under the metric, e.g. how it was measured. */
  note?: string;
};

export type Project = {
  slug: string;
  title: string;
  org: string;
  role: string;
  period: string;
  /** One line that says what it is, for the card. */
  summary: string;
  /** Headline metric shown on the card. */
  headline: Metric;
  tags: string[];
  problem: string[];
  approach: string[];
  /** Ordered pipeline steps rendered as the architecture diagram. */
  pipeline: { step: string; detail: string }[];
  outcome: Metric[];
  /** Engineering decisions worth defending in an interview. */
  decisions: { title: string; body: string }[];
  stack: string[];
  /** Set false for employer-owned work so the UI shows the right CTA. */
  codePublic: boolean;
  repo?: string;
  codeNote?: string;
};

export const projects: Project[] = [
  {
    slug: "bloom-product-detection",
    title: "Automated UGC Product Detection",
    org: "Bloom Nutrition",
    role: "Influencer Marketing Data Analyst Intern",
    period: "2025 – 2026",
    summary:
      "A computer-vision pipeline that watches creator videos frame by frame and logs which Bloom product appears in each one — replacing a manual daily tagging task.",
    headline: {
      value: "Daily manual tagging → automated",
      label: "Creator posts labeled without human review",
    },
    tags: ["Computer Vision", "Node.js", "PostgreSQL", "Next.js", "FFmpeg"],
    problem: [
      "Bloom's influencer marketing team received a continuous stream of TikTok and Instagram posts from creators. To report on which products creators were actually featuring, someone had to open every post, watch the video through, identify the product on screen, and log it into a tracker alongside impressions.",
      "The work was slow, easy to get wrong, and scaled linearly with the creator roster. It also went stale immediately — view counts kept climbing after a post was logged, so the impressions column was wrong the moment it was written.",
    ],
    approach: [
      "I built an end-to-end pipeline that takes a post URL and returns a labeled, tracked record with no human in the loop.",
      "The hard part is that most creator content is video, and a product may only be on screen for a second or two. Running detection on a single thumbnail misses most of it. So the pipeline samples the whole video and aggregates detections across every frame, rather than trusting any one image.",
    ],
    pipeline: [
      { step: "Ingest", detail: "Post URLs arrive individually or by CSV upload" },
      { step: "Download", detail: "Media pulled from TikTok / Instagram, metadata scraped in parallel" },
      { step: "Sample", detail: "FFmpeg extracts a frame every 2 seconds from each video" },
      { step: "Detect", detail: "Frames batched 5-at-a-time through a custom-trained Roboflow model" },
      { step: "Aggregate", detail: "Keeps detections ≥ 0.80 confidence, dedupes to unique products, ranks by best confidence" },
      { step: "Store", detail: "Postgres record with products, confidence, hashtags, creator handle, post date" },
      { step: "Refresh", detail: "Hourly scheduler re-scrapes impressions so view counts stay current" },
    ],
    outcome: [
      // TODO(valeria): replace the placeholders below with your real numbers.
      // Anything you cannot substantiate, delete the entry entirely — a short
      // honest list beats a long padded one in an interview.
      { value: "—", label: "Posts labeled per day", note: "TODO: your real volume" },
      { value: "—", label: "Minutes per post → seconds", note: "TODO: your before/after" },
      { value: "0.80", label: "Confidence floor for a logged detection", note: "Below this, the post is left for a human" },
      { value: "Hourly", label: "Impressions refresh", note: "Replaced a metric that was stale on arrival" },
    ],
    decisions: [
      {
        title: "Sample every frame, not the thumbnail",
        body: "A thumbnail is one arbitrary moment. Sampling at 0.5 fps and unioning detections across frames catches products that appear briefly, which is how creator content actually works. The cost is more API calls, so frames are batched five at a time and failures are swallowed per-frame rather than failing the whole post.",
      },
      {
        title: "A confidence floor instead of a best guess",
        body: "The model always returns something. Anything under 0.80 is discarded rather than logged, so the tracker never quietly fills with wrong labels — an unlabeled post is a cheaper error than a confidently mislabeled one.",
      },
      {
        title: "Thumbnails in Postgres, not on disk",
        body: "The first deploy to Railway lost every thumbnail on each restart, because the container filesystem is ephemeral. I moved thumbnail bytes into a Postgres table rather than adding an object store — the images are small, and it removed a moving part instead of adding one.",
      },
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Roboflow", "FFmpeg", "Next.js", "TypeScript", "Railway"],
    codePublic: false,
    codeNote:
      "Built during my internship, so the repository is Bloom's and stays private. The write-up above and the walkthrough below cover the architecture and the decisions.",
  },
  {
    slug: "social-native-moderation",
    title: "AI-Assisted UGC Moderation Platform",
    org: "Social Native",
    role: "AI Creator Marketing Associate",
    period: "2026 – Present",
    summary:
      "A full-stack platform that moves brand user-generated content through premod → tagging → QA, with Claude classifying against each brand's own guidelines at every stage.",
    headline: {
      value: "15 min → seconds",
      label: "Per-image review time",
    },
    tags: ["Claude", "FastAPI", "React", "PostgreSQL", "AWS"],
    problem: [
      "User-generated content collected for brand clients had to be moderated entirely by hand. A moderator opened each image, checked it against that brand's written guidelines, decided approve or reject, then tagged which products appeared by searching the brand's catalog manually.",
      "Every brand has different rules, so the knowledge lived in people's heads and in documents nobody read at review time. The process did not scale past a handful of clients, and two moderators could reach different decisions on the same image.",
    ],
    approach: [
      "I built a platform where the brand's guidelines are structured data that drives the AI prompt, rather than a PDF a moderator is supposed to remember. Each brand's rules are supplied through a client-facing form, then feed directly into classification.",
      "AI assists at each of the three stages instead of replacing the stage: safety classification at intake, top-3 product tag suggestions during tagging, and a QA step where a human can always send work back. Decisions come with a written rationale so a moderator can see why, and disagree.",
    ],
    pipeline: [
      { step: "Sync", detail: "UGC pulled from Olapic into a local Postgres snapshot, so moderation state is independent of upstream changes" },
      { step: "Blocklist", detail: "Per-brand creator blocklists auto-reject and skip on sync, before anything reaches a human" },
      { step: "Premod", detail: "Claude classifies approve / reject / flag against that brand's structured guidelines, with a rationale" },
      { step: "Tagging", detail: "Vision model suggests the top 3 product matches from the brand's own catalog" },
      { step: "QA", detail: "Human reviewer approves, rejects, or sends back to tagging" },
      { step: "Rights", detail: "Rights requests tracked locally; a Chrome extension requests them on-platform" },
    ],
    outcome: [
      { value: "15 min → seconds", label: "Per-image review time", note: "Measured against the manual review it replaced" },
      // TODO(valeria): fill these in with numbers you can defend.
      { value: "—", label: "Brand clients live on the platform", note: "TODO" },
      { value: "—", label: "Items moderated per week", note: "TODO" },
      { value: "3-stage", label: "Workflow automated end to end", note: "Premod → tagging → QA" },
    ],
    decisions: [
      {
        title: "Guidelines as data, not as prompt text I wrote",
        body: "Brands supply their own rules through a form, and those become the structured input to the classifier. That means onboarding a new brand is a data-entry task rather than an engineering task, and when a brand changes its policy the change is theirs to make.",
      },
      {
        title: "A local snapshot instead of reading upstream live",
        body: "Content syncs from Olapic into our own Postgres rather than being read live. Moderation state — what was rejected, what is mid-QA — then survives upstream changes, and the review UI never depends on an external database being reachable.",
      },
      {
        title: "Text and metadata first, deliberately",
        body: "The v1 scope explicitly excluded visual AI, at the CEO's direction. Automating the text and metadata decisions first meant the platform shipped and earned trust before taking on the harder and higher-risk visual judgments.",
      },
      {
        title: "Every automated decision is reversible",
        body: "AI proposes, QA disposes. There is always a send-back path, and the rationale is shown to the reviewer. Moderation is a domain where a confident wrong answer costs a client relationship, so the system is built to be corrected.",
      },
    ],
    stack: ["Python", "FastAPI", "Claude", "PostgreSQL", "React", "Vite", "Tailwind", "AWS ECS", "Terraform", "Chrome MV3"],
    codePublic: false,
    codeNote:
      "This is Social Native production code and stays in the company's private repository. Everything above is architecture and decision-making, which I'm happy to walk through live.",
  },
  {
    slug: "janey-invoice-automation",
    title: "Invoice Intake & Bookkeeping Automation",
    org: "Janey Health",
    role: "Independent build",
    period: "2026",
    summary:
      "An n8n workflow that watches an inbox, reads incoming invoice PDFs with Claude, files them by vendor in Drive, and opens the matching unpaid bill in QuickBooks.",
    headline: {
      value: "Inbox → filed & booked",
      label: "Zero-touch invoice intake",
    },
    tags: ["n8n", "Claude", "QuickBooks API", "Google Workspace"],
    problem: [
      "Invoices arrived as PDF attachments in a shared inbox. Someone had to open each one, read it to find the vendor and amount, save it into the right vendor folder in Drive under a consistent filename, then re-key the same numbers into QuickBooks as a bill on the correct expense account.",
      "It was pure transcription — slow, easy to fat-finger, and the kind of task that gets deferred until the filing and the books have both drifted.",
    ],
    approach: [
      "I built the whole path as a single n8n workflow so an invoice goes from unread email to filed document and open bill without anyone touching it.",
      "The important constraint was where to stop. The workflow creates the bill as unpaid and sends a review notification — it never schedules a payment. Automating data entry is safe; automating money leaving the account is not.",
    ],
    pipeline: [
      { step: "Watch", detail: "Gmail trigger fires on new mail in the invoices inbox" },
      { step: "Explode", detail: "Each PDF attachment is split out and processed one at a time" },
      { step: "Extract", detail: "Claude reads the PDF and returns structured invoice fields plus an expense category" },
      { step: "File", detail: "Vendor folder found or created in Drive; file moved and renamed consistently" },
      { step: "Vendor", detail: "Matching QuickBooks vendor found, or auto-created if missing" },
      { step: "Dedupe", detail: "Checks for an existing bill before writing, so a resent email can't double-book" },
      { step: "Book", detail: "Unpaid bill created on the account mapped from the category — never scheduled for payment" },
      { step: "Close", detail: "Review notification sent, email marked as read" },
    ],
    outcome: [
      // TODO(valeria): ask Janey Health for these — even rough numbers are fine
      // if you say they're estimates.
      { value: "—", label: "Invoices processed per month", note: "TODO" },
      { value: "—", label: "Minutes per invoice → automated", note: "TODO" },
      { value: "~19s", label: "End-to-end run time per invoice", note: "Observed in production execution logs" },
      { value: "0", label: "Payments made automatically", note: "By design — bills open unpaid for human approval" },
    ],
    decisions: [
      {
        title: "Stop at 'unpaid bill', not at 'paid'",
        body: "The workflow could have scheduled payment. It deliberately does not. The value is in eliminating transcription, and the risk profile of an AI-triggered payment is completely different from the risk of an AI-filed document. A human still approves every dollar.",
      },
      {
        title: "Dedupe before writing, not after",
        body: "Forwarded and resent invoice emails are normal. The workflow looks for an existing bill before creating one, so the same invoice arriving twice produces one bill rather than a reconciliation problem next month.",
      },
      {
        title: "A separate error-handling workflow",
        body: "Failures route to their own handler rather than dying silently inside a loop. An invoice that can't be parsed is surfaced as a task for a person, which means the automation degrades into the old manual process instead of losing the document.",
      },
    ],
    stack: ["n8n", "Claude", "QuickBooks Online API", "Google Drive API", "Gmail API"],
    codePublic: true,
    codeNote:
      "Workflow JSON is published with all credentials, account IDs, and vendor data stripped.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
