interface Resource {
  title: string;
  url: string;
  type: 'yt' | 'doc' | 'cert' | 'tool' | 'free' | 'course';
}

export interface Task {
  id: string;
  label: string;
  title?: string;
  type?: string;
}

interface Project {
  title: string;
  description: string;
  deliverables: string[];
  sellingStrategy: {
    pricing: string;
    whereToFind: string[];
    pitch: string;
  };
}

interface FreeResource {
  title: string;
  url: string;
  type: 'certification' | 'course' | 'guide' | 'tool';
  provider: string;
  description?: string;
}

interface FollowAlongProject {
  title: string;
  url: string;
  outcome: string;
  steps: string[];
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  badge: string;
  weeks: string;
  objective: string;
  resources: Resource[];
  freeResources: FreeResource[];
  followAlongProjects: FollowAlongProject[];
  tools: { name: string; url: string }[];
  tasks: Task[];
  project: Project;
  color: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'business' | 'coding' | 'writing' | 'image' | 'video' | 'marketing' | 'productivity' | 'learning';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export const PROMPTS: Prompt[] = [
  {
    id: "pr-1",
    title: "SaaS Idea Validator",
    description: "Critically analyze a SaaS idea for market fit, potential challenges, and monetization strategies.",
    prompt: "I have a SaaS idea: [INSERT IDEA]. Act as a startup consultant. Analyze this idea for: 1. Market demand, 2. Potential competitors, 3. Technical feasibility, 4. Three possible monetization models. Be brutally honest and provide actionable next steps.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Startup", "Strategy", "Validation"]
  },
  {
    id: "pr-2",
    title: "React Component Refactor",
    description: "Refactor a React component for better performance, readability, and adherence to best practices.",
    prompt: "Refactor the following React component: [INSERT CODE]. Focus on: 1. Reducing unnecessary re-renders, 2. Improving type safety with TypeScript, 3. Using modern hooks, 4. Enhancing readability. Explain the changes you made.",
    category: "coding",
    difficulty: "Advanced",
    tags: ["React", "Refactoring", "Performance"]
  },
  {
    id: "pr-3",
    title: "Viral Thread Creator",
    description: "Transform a long-form article or idea into a compelling, high-engagement Twitter/X thread.",
    prompt: "Convert the following content into a 7-10 post Twitter thread: [INSERT CONTENT]. The first post must be a hook that stops the scroll. Use a mix of storytelling and data. End with a strong call to action.",
    category: "marketing",
    difficulty: "Beginner",
    tags: ["Twitter", "Copywriting", "Growth"]
  },
  {
    id: "pr-4",
    title: "Midjourney Photorealistic Portrait",
    description: "Generate a highly detailed, photorealistic portrait with specific lighting and camera settings.",
    prompt: "A photorealistic portrait of [SUBJECT], shot on 85mm lens, f/1.8, natural golden hour lighting, cinematic composition, highly detailed skin texture, sharp focus, 8k resolution, --ar 4:5 --v 6.0",
    category: "image",
    difficulty: "Intermediate",
    tags: ["Midjourney", "Art", "Photography"]
  },
  {
    id: "pr-5",
    title: "Python Automation Script",
    description: "Create a Python script to automate a repetitive task like file organization or data scraping.",
    prompt: "Write a Python script that [DESCRIBE TASK, e.g., 'organizes files in a folder by their extension']. The script should be robust, include error handling, and be well-documented. Use standard libraries where possible.",
    category: "coding",
    difficulty: "Intermediate",
    tags: ["Python", "Automation", "Scripting"]
  },
  {
    id: "pr-6",
    title: "Cold Email for High-Ticket Clients",
    description: "Write a personalized cold email that gets responses from high-value prospects.",
    prompt: "Write a cold email to [PROSPECT NAME] at [COMPANY]. I am offering [SERVICE]. Focus on a specific pain point they might have: [PAIN POINT]. Keep it under 150 words, avoid 'salesy' language, and end with a low-friction question.",
    category: "writing",
    difficulty: "Intermediate",
    tags: ["Sales", "Email", "Outreach"]
  },
  {
    id: "pr-7",
    title: "Video Script Hook Generator",
    description: "Generate 5 different hooks for a short-form video (TikTok/Reels) to maximize retention.",
    prompt: "I'm making a video about [TOPIC]. Generate 5 different opening hooks. One should be a 'negative' hook (what NOT to do), one should be a 'curiosity' hook, and one should be a 'direct benefit' hook. Each hook must be under 10 seconds.",
    category: "video",
    difficulty: "Beginner",
    tags: ["TikTok", "Reels", "Content"]
  },
  {
    id: "pr-8",
    title: "Complex Topic Simplifier",
    description: "Explain a complex technical or scientific concept to a 10-year-old using analogies.",
    prompt: "Explain [COMPLEX TOPIC] to a 10-year-old. Use a simple analogy related to [EVERYDAY OBJECT]. Avoid jargon and keep the explanation under 200 words.",
    category: "learning",
    difficulty: "Beginner",
    tags: ["Education", "Simplification", "Analogy"]
  }
,
  {
    id: "pr-9",
    title: "Saas Idea Validator",
    description: "Stress- test a SaaS idea for real- world viability.",
    prompt: "Act as a senior startup advisor with deep experience in SaaS, market validation, and product strategy. Your goal is to evaluate the viability of this idea: [describe your SaaS idea], targeting [target audience], solving [problem], in [market/region], with optional pricing of [pricing]. Break down whether the problem is real, urgent, and worth paying for, then identify 3- 5 realistic competitors or alternatives and analyze how they solve it. Evaluate demand using logical reasoning, expose weak assumptions, hidden risks, and blind spots, and explain why most versions of this idea fail. Then redesign the idea into a stronger, more viable version with sharper positioning and a clear niche. Define a lean MVP with only essential features and explain why each matters. Conclude with a blunt verdict (Go, Modify, or Kill) and justify it. Finally, ask 3 precise questions that would significantly improve your evaluation.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Business"]
  },
  {
    id: "pr-10",
    title: "Business Model Builder",
    description: "Turn an idea into a structured, monetizable business.",
    prompt: "Act as a business strategist and transform this idea: [describe your idea], using my available resources [skills/resources] and budget [budget], targeting [audience], into a complete business model. Clearly define the value proposition and why it matters, identify specific customer segments, and design 2- 3 realistic revenue streams. Break down the cost structure and key expenses, outline the core activities required to run the business, and suggest practical distribution channels. Recommend tools, platforms, or systems needed to operate efficiently. Keep everything practical and grounded in execution, not theory. End with a concise summary of how this business actually makes money and one unconventional idea that could give it a competitive advantage.",
    category: "business",
    difficulty: "Beginner",
    tags: ["Business"]
  },
  {
    id: "pr-11",
    title: "Target Audience Deep Dive",
    description: "Build a highly detailed customer persona.",
    prompt: "Act as a customer research expert and build a deep, realistic profile for the ideal customer of this product/service: [describe product] in the [industry] market, currently assumed to target [audience]. Define a specific primary persona including demographics and psychographics, then analyze their real pain points, daily behavior, habits, motivations, and desires. Identify what triggers them to buy, what objections they raise, and what alternatives they consider. Explain where they spend time (online/offline) and how they consume information. Then craft messaging angles that would resonate strongly with them. Avoid generic answers and focus on specificity. End by listing 3 major mistakes most people make when targeting this audience.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Business"]
  },
  {
    id: "pr-12",
    title: "Competitive Analysis Engine",
    description: "Identify competitors and uncover market gaps.",
    prompt: "Act as a competitive intelligence analyst and analyze the competitive landscape for my business: [describe business] in the [industry], with known competitors [list or unknown]. Identify the top 5 realistic competitors if not provided, then compare their strengths, weaknesses, positioning, and pricing strategies. Highlight patterns in how they operate and where they succeed or fail. Identify clear gaps in their offerings and underserved customer segments. Then propose a strong differentiation strategy that would make my business stand out immediately. Avoid surface- level insights and focus on strategic opportunities that can actually be executed. End with one aggressive move that could help outperform competitors quickly.",
    category: "business",
    difficulty: "Advanced",
    tags: ["Business"]
  },
  {
    id: "pr-13",
    title: "Pricing Strategy Optimizer",
    description: "Create a pricing model that maximizes profit and conversion.",
    prompt: "Act as a pricing strategist using principles of behavioral economics to design a pricing strategy for this product/service: [describe], targeting [audience], with competitor pricing [optional] and cost structure [optional]. Propose 2- 3 pricing models (e.g., subscription, one- time, tiered) and recommend specific price points with justification. Explain the psychological principles behind your choices, including anchoring, perceived value, and pricing tiers. Suggest upsells, bundles, or add- ons that increase average order value. Identify risks of underpricing or overpricing and how to avoid them. Keep everything practical and revenue- focused. End by explaining how pricing should evolve as the business scales.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Business"]
  },
  {
    id: "pr-14",
    title: "Mvp Launch Plan",
    description: "Launch a product quickly with minimal resources.",
    prompt: "Act as a startup execution expert and create a fast, practical MVP launch plan for this idea: [describe idea], considering my skills [skills] and budget [budget]. Define the exact MVP scope by stripping the idea down to only essential features, then break execution into a clear 4- 6 week plan with actionable weekly steps. Recommend specific tools or platforms that enable fast building without unnecessary complexity. Identify validation checkpoints to test whether the idea is working before scaling. Then outline a simple but effective launch strategy to get first users. Focus on speed and efficiency. End by showing how to cut the timeline by 50% without destroying quality.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Business"]
  },
  {
    id: "pr-15",
    title: "Revenue Growth Plan",
    description: "Build a structured plan to grow revenue.",
    prompt: "Act as a growth strategist and design a revenue growth plan for this business: [describe business], currently making [current revenue] with a goal of reaching [target]. Identify the key growth levers available, then propose specific acquisition strategies, monetization improvements, and retention tactics. Highlight where money is currently being lost or left on the table. Suggest high- impact experiments that could unlock growth quickly. Keep recommendations realistic and focused on execution, not theory. Prioritize all actions by expected ROI. End by identifying the single most important action that would drive the highest revenue increase.",
    category: "business",
    difficulty: "Advanced",
    tags: ["Business"]
  },
  {
    id: "pr-16",
    title: "Pitch Deck Architect",
    description: "Create a persuasive investor pitch structure.",
    prompt: "Act as an investor pitch expert and create a compelling pitch deck for this startup: [describe startup], targeting [type of investors/audience]. Build a clear slide- by- slide structure including problem, solution, market size, product, traction, business model, competition, and financials. For each slide, write the key message in a concise but persuasive way and suggest what visuals or data should be included. Focus on clarity, credibility, and impact rather than fluff. Highlight what investors care about most and how to present it convincingly. End by suggesting how to strengthen the pitch to make it more fundable.",
    category: "business",
    difficulty: "Intermediate",
    tags: ["Business"]
  },
  {
    id: "pr-17",
    title: "Offer Creation Machine",
    description: "Turn a basic product into an irresistible offer.",
    prompt: "Act as a sales strategist and transform this product/service: [describe product], for [target audience], into a high- converting offer. Clearly define the core offer and its value, then enhance it with relevant bonuses that increase perceived value. Add risk- reversal mechanisms such as guarantees, and introduce urgency or scarcity in a credible way. Ensure the offer is compelling, clear, and hard to refuse without being manipulative. Focus on real value rather than gimmicks. End by suggesting one specific change that could double conversion rates.",
    category: "business",
    difficulty: "Beginner",
    tags: ["Business"]
  },
  {
    id: "pr-18",
    title: "Business Problem Solver",
    description: "Diagnose and solve a critical business issue.",
    prompt: "Act as a high- level business consultant and solve this problem: [describe problem] in my business [describe business and current situation]. Start by diagnosing the root cause instead of treating symptoms, then identify hidden issues or flawed assumptions contributing to the problem. Propose multiple solutions with clear reasoning, and prioritize them based on impact and feasibility. Explain the expected outcomes of each option and the risks involved. Focus on clarity and decisive action. End by asking 3 tough questions that challenge my thinking and expose what I might be avoiding.",
    category: "business",
    difficulty: "Advanced",
    tags: ["Business"]
  },
  {
    id: "pr-19",
    title: "Full- Stack Feature Builder",
    description: "Build a complete feature with frontend, backend, and logic.",
    prompt: "Act as a senior full- stack engineer and build a complete, production- ready feature for this application: [describe your app idea] using [preferred tech stack, e.g., React, Node.js, MongoDB]. The goal is to implement [specific feature], ensuring scalability, clean architecture, and maintainability. Start by outlining the system design (frontend, backend, API structure, and database schema), then write clean, well- structured code for each layer. Include API endpoints, data models, validation, and error handling. Ensure the frontend properly integrates with the backend and handles loading, errors, and edge cases. Follow best practices such as modularization, naming conventions, and security considerations. Provide comments where necessary but avoid over- explaining. Output should include a clear file/folder structure, complete code snippets, and instructions to run locally. End by suggesting improvements or optimizations for production readiness.",
    category: "coding",
    difficulty: "Advanced",
    tags: ["Coding"]
  },
  {
    id: "pr-20",
    title: "Bug Debugger &amp; Fixer",
    description: "Identify and fix bugs in code with explanation.",
    prompt: "Act as an expert software debugger. I will provide code that is not working correctly. Your goal is to identify the root cause of the issue, explain it clearly, and fix it. Here is the code: [paste your code] and the issue I'm facing: [describe the error or unexpected behavior]. First, analyze the code step- by- step and pinpoint the exact problem (logic error, syntax issue, edge case, etc.). Then provide the corrected version of the code with improvements where necessary. Explain why the fix works in simple terms, and highlight any bad practices that caused the issue. Also suggest how to prevent similar bugs in the future. If multiple solutions exist, briefly compare them and recommend the best one.",
    category: "coding",
    difficulty: "Beginner",
    tags: ["Coding"]
  },
  {
    id: "pr-21",
    title: "Code Refactor &amp; Optimization",
    description: "Improve code quality, readability, and performance.",
    prompt: "Act as a senior engineer specializing in clean code and performance optimization. Refactor the following code to make it more efficient, readable, and maintainable: [paste code]. First, analyze its current structure and identify problems such as redundancy, poor naming, inefficiency, or bad practices. Then rewrite the code using best practices, including proper structure, modularization, and optimized logic. Improve performance where possible without sacrificing clarity. Follow standard conventions for the language used. After refactoring, explain the key improvements made and why they matter. Keep explanations concise but insightful. End by suggesting further enhancements if this code were to scale significantly.",
    category: "coding",
    difficulty: "Intermediate",
    tags: ["Coding"]
  },
  {
    id: "pr-22",
    title: "Api Design Architect",
    description: "Design a clean, scalable API structure.",
    prompt: "Act as a backend architect and design a RESTful (or GraphQL if specified) API for this system: [describe system or app]. Define all necessary endpoints, including request/response formats, authentication, and error handling. Structure the API for scalability and maintainability, following best practices such as versioning and proper resource naming. Design the database schema and relationships that support the API. Include validation rules and security considerations such as rate limiting and access control. Provide example requests and responses. Keep everything practical and implementation- ready. End by suggesting how this API could evolve as the system grows.",
    category: "coding",
    difficulty: "Advanced",
    tags: ["Coding"]
  },
  {
    id: "pr-23",
    title: "Project Starter Blueprint",
    description: "Set up a complete coding project structure.",
    prompt: "Act as a software engineer and create a complete starter blueprint for this project: [describe project idea] using [programming language/framework]. Define the folder structure, dependencies, and setup process. Include initial boilerplate code for main components (e.g., frontend layout, backend server, configuration files). Ensure the structure is clean, scalable, and follows best practices. Provide commands to install dependencies and run the project locally. Include comments explaining key parts but keep it concise. End by suggesting the next 3 steps to start building features immediately.",
    category: "coding",
    difficulty: "Beginner",
    tags: ["Coding"]
  },
  {
    id: "pr-24",
    title: "Algorithm Explainer &amp; Builder",
    description: "Understand and implement algorithms clearly.",
    prompt: "Act as a computer science expert and explain how to solve this problem step- by- step: [describe problem]. First, break down the logic and approach in simple terms, then implement the solution in [programming language]. Ensure the code is clean, efficient, and handles edge cases. Analyze time and space complexity and explain it clearly. If multiple approaches exist, compare them briefly and explain why one is preferred. Avoid unnecessary theory and focus on clarity and practical understanding. End by suggesting a slightly harder variation of the problem for practice.",
    category: "coding",
    difficulty: "Intermediate",
    tags: ["Coding"]
  },
  {
    id: "pr-25",
    title: "Code Translator (language Conversion)",
    description: "Convert code from one language to another.",
    prompt: "Act as a multi- language programming expert and convert the following code from [source language] to [target language]: [paste code]. Ensure the translated code maintains the same functionality and logic. Adapt it to follow idiomatic conventions and best practices of the target language instead of doing a direct literal translation. After conversion, briefly explain key differences between the two versions, including syntax, structure, and performance considerations. Ensure the output is clean, readable, and ready to run.",
    category: "coding",
    difficulty: "Beginner",
    tags: ["Coding"]
  },
  {
    id: "pr-26",
    title: "Tech Stack Advisor",
    description: "Choose the best technologies for a project.",
    prompt: "Act as a senior software architect and recommend the best tech stack for this project: [describe project]. Consider factors such as scalability, performance, development speed, and maintainability. Suggest frontend, backend, database, and hosting solutions, and justify each choice clearly. Compare at least two alternative stacks and explain trade- offs. Avoid generic suggestions and tailor everything to the project requirements. Keep the recommendations practical and realistic. End by outlining how to start building with the chosen stack.",
    category: "coding",
    difficulty: "Intermediate",
    tags: ["Coding"]
  },
  {
    id: "pr-27",
    title: "Code Review &amp; Feedback",
    description: "Get professional- level feedback on code quality.",
    prompt: "Act as a senior developer performing a professional code review. Analyze the following code: [paste code]. Identify issues related to readability, structure, performance, and best practices. Point out specific lines or patterns that need improvement. Suggest concrete fixes and explain why they matter. Avoid generic advice and focus on actionable feedback. Highlight what is done well in the code as well. End by giving an overall rating (1- 10) and what is needed to reach production- level quality.",
    category: "coding",
    difficulty: "Intermediate",
    tags: ["Coding"]
  },
  {
    id: "pr-28",
    title: "Feature Breakdown Planner",
    description: "Break a complex feature into actionable tasks.",
    prompt: "Act as a technical project manager and break down this feature: [describe feature] for [type of application] into clear, actionable development tasks. Start by defining the overall goal and required functionality, then split it into frontend, backend, and integration tasks. Ensure tasks are small, logical, and can be executed step- by- step. Include dependencies between tasks and highlight potential technical challenges. Keep everything practical and focused on execution. End by suggesting the most efficient order to implement the feature and why.",
    category: "coding",
    difficulty: "Advanced",
    tags: ["Coding"]
  },
  {
    id: "pr-29",
    title: "Long- Form Article Generator",
    description: "Create a structured, high- quality long- form article on any topic.",
    prompt: "ACT as a professional writer and subject- matter expert. Your goal is to write a comprehensive, engaging, and well- structured article on this topic: [topic], targeting [audience] with the objective of [inform/educate/persuade]. Start by outlining a clear structure, then write the full article with a strong introduction, logically flowing sections, and a compelling conclusion. Use clear language, avoid fluff, and ensure each section provides real value. Include examples, explanations, or insights that deepen understanding. Maintain a consistent tone suitable for the audience and purpose. Optimize readability with smooth transitions and concise paragraphs. Avoid generic statements—be specific and practical. End with a short summary and 3 actionable takeaways. Finally, suggest 2 ways to improve or expand the article further.",
    category: "writing",
    difficulty: "Intermediate",
    tags: ["Writing"]
  },
  {
    id: "pr-30",
    title: "Persuasive Copywriter (sales Page)",
    description: "Write a high- converting sales page.",
    prompt: "ACT as a world- class direct response copywriter. Write a persuasive sales page for this product/service: [describe product], targeting [audience] with the goal of [conversion goal]. Start with a strong hook that grabs attention, then clearly define the problem and amplify its impact. Introduce the product as the solution, highlighting benefits (not just features). Address objections, build credibility, and include social proof (create realistic examples if needed). Use persuasive techniques such as storytelling, emotional triggers, and logical reasoning. Structure the page clearly with sections that flow naturally. Include a strong call- to- action and urgency element. Avoid vague claims—be specific and convincing. End by suggesting 2 ways to increase conversion further.",
    category: "writing",
    difficulty: "Advanced",
    tags: ["Writing"]
  },
  {
    id: "pr-31",
    title: "Content Rewriter &amp; Improver",
    description: "Rewrite and enhance existing content.",
    prompt: "Act as a professional editor. Rewrite and improve the following content: [paste text]. Your goal is to make it clearer, more engaging, and more impactful without changing its core meaning. Fix grammar, improve sentence structure, and enhance flow. Remove unnecessary words and make the writing more concise and powerful. Adjust tone if needed to match [desired tone, e.g., professional, casual, persuasive]. Ensure the final version is easy to read and sounds natural. Avoid overcomplicating the language. After rewriting, briefly explain the key improvements made and why they matter.",
    category: "writing",
    difficulty: "Beginner",
    tags: ["Writing"]
  },
  {
    id: "pr-32",
    title: "Story Generator (creative Writing)",
    description: "Create an engaging fictional story.",
    prompt: "Act as a creative writer and craft a compelling story based on this idea: [story idea]. The story should target [audience] and follow a clear narrative structure (beginning, conflict, climax, resolution). Develop strong characters with clear motivations and personality. Use vivid descriptions to bring scenes to life, but avoid unnecessary detail. Maintain pacing so the story remains engaging throughout. Include dialogue where appropriate and ensure it sounds natural. Keep the tone consistent with the genre [genre]. End with a meaningful or memorable conclusion. Finally, suggest one way the story could be expanded into a longer piece.",
    category: "writing",
    difficulty: "Intermediate",
    tags: ["Writing"]
  },
  {
    id: "pr-33",
    title: "Email Writer (professional &amp; Persuasive)",
    description: "Write effective professional or marketing emails.",
    prompt: "Act as an expert email writer. Write a clear, effective email for this purpose: [describe purpose], addressed to [recipient type], with the goal of [desired outcome]. Start with a strong subject line that encourages opening, then write a concise and engaging body that communicates the message clearly. Maintain an appropriate tone (professional, friendly, persuasive, etc.). Structure the email so it is easy to read and avoids unnecessary length. Include a clear call- to- action. Ensure the email feels natural and not robotic. Avoid generic phrases. End by suggesting 2 alternative subject lines that could improve open rates.",
    category: "writing",
    difficulty: "Beginner",
    tags: ["Writing"]
  },
  {
    id: "pr-34",
    title: "Blog Post Idea Generator",
    description: "Generate high-quality blog content ideas.",
    prompt: "Act as a content strategist. Generate 10 high-quality blog post ideas for this niche: [niche], targeting [audience], with the goal of [traffic/engagement/authority]. Ensure each idea is specific, relevant, and valuable to the audience. Avoid generic topics—focus on unique angles, practical insights, or trending discussions. For each idea, include a short explanation of why it would perform well and what key points it should cover. Prioritize ideas that can realistically attract attention and provide value. End by recommending the single best idea to start with and explain why.",
    category: "writing",
    difficulty: "Beginner",
    tags: ["Writing"]
  },
  {
    id: "pr-35",
    title: "Essay Writer (academic Style)",
    description: "Write structured academic essays.",
    prompt: "Act as an academic writer. Write a well-structured essay on this topic: [topic], following [academic level/style if needed]. Begin with a clear introduction that outlines the argument, then develop the body with logically structured paragraphs that support the main points. Use clear reasoning, examples, and evidence where appropriate. Maintain formal tone and coherence throughout. Conclude with a strong summary that reinforces the key argument. Avoid unnecessary repetition and ensure clarity. End by suggesting 2 ways to strengthen the essay further.",
    category: "writing",
    difficulty: "Intermediate",
    tags: ["Writing"]
  },
  {
    id: "pr-36",
    title: "Social Media Post Generator",
    description: "Create engaging social media content.",
    prompt: "Act as a social media content creator. Write 5 engaging posts for [platform, e.g., Twitter, LinkedIn, Instagram] about [topic], targeting [audience]. Each post should be clear, attention- grabbing, and aligned with the platform's style. Include hooks, concise messaging, and a strong takeaway. Use tone appropriate for the platform (professional, casual, witty, etc.). Avoid generic or overused phrases. Include hashtags if relevant. Ensure each post delivers value (insight, advice, or perspective). End by identifying which post is most likely to perform best and why.",
    category: "writing",
    difficulty: "Beginner",
    tags: ["Writing"]
  },
  {
    id: "pr-37",
    title: "Script Writer (video/content)",
    description: "Write scripts for videos or presentations.",
    prompt: "Act as a scriptwriter. Write a compelling script for a [type of video, e.g., YouTube, TikTok, presentation] about [topic], targeting [audience]. Start with a strong hook in the first few seconds, then structure the content clearly with engaging flow. Keep the language natural and conversational. Include key points, transitions, and moments that keep attention. Avoid unnecessary complexity. Ensure the script delivers value and maintains interest throughout. End with a strong closing or call- to- action. Finally, suggest how the script could be improved for higher engagement.",
    category: "writing",
    difficulty: "Intermediate",
    tags: ["Writing"]
  },
  {
    id: "pr-38",
    title: "Tone Transformer",
    description: "Change the tone of any piece of writing.",
    prompt: "Act as a writing expert. Transform the following text: [paste text] into a [desired tone, e.g., professional, persuasive, casual, authoritative]. Maintain the original meaning but adjust wording, structure, and style to match the new tone. Ensure the result feels natural and appropriate for the intended audience. Improve clarity and readability where possible. Avoid simply swapping words—focus on rewriting effectively. After transforming, briefly explain what changes were made to achieve the new tone.",
    category: "writing",
    difficulty: "Beginner",
    tags: ["Writing"]
  },
  {
    id: "pr-39",
    title: "Complete Marketing Strategy Builder",
    description: "Create a full, actionable marketing strategy from scratch.",
    prompt: "Act as a senior marketing strategist and design a complete, execution- ready marketing strategy for this business/product: [describe product/service], targeting [target audience], operating in [market/region], with a goal of [traffic/leads/sales/brand awareness]. Start by defining the core positioning and unique value proposition, then identify the most effective customer acquisition channels (organic, paid, partnerships, etc.) based on where the audience actually pays attention. Break down messaging angles that will resonate and differentiate from competitors. Create a step- by- step marketing plan covering content, distribution, and conversion. Include a simple funnel (awareness → consideration → conversion) and explain how each stage is handled. Avoid generic advice- focus on practical, executable actions. End by prioritizing the top 3 actions with the highest ROI and explain why, then suggest 2 ways to scale the strategy.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-40",
    title: "Content Marketing Engine",
    description: "Build a structured content strategy that drives growth.",
    prompt: "Act as a content marketing strategist and design a content system for this business: [describe business], targeting [audience], with the goal of [traffic/authority/leads]. Identify the main content pillars based on audience interests and problems, then generate a structured plan of content types (blog, video, social, etc.) tailored to the most effective platforms. Explain how content should move people through the funnel from awareness to conversion. Provide examples of high- performing content angles and hooks. Include a realistic posting schedule and distribution strategy. Focus on consistency and leverage, not burnout. End by identifying one content strategy that has the highest chance of going viral or generating disproportionate results.",
    category: "marketing",
    difficulty: "Intermediate",
    tags: ["Marketing"]
  },
  {
    id: "pr-41",
    title: "Customer Acquisition Plan",
    description: "Develop a system to consistently acquire customers.",
    prompt: "Act as a growth marketer and create a customer acquisition plan for this business: [describe business], targeting [audience], with a goal of acquiring [target number] customers. Identify the most effective acquisition channels based on the audience's behavior (paid ads, SEO, social, referrals, etc.). Break down how each channel should be executed, including messaging, targeting, and budget allocation (if applicable). Highlight potential bottlenecks and risks. Focus on practical strategies that can be implemented immediately. Avoid theory- prioritize execution. End by identifying the fastest way to acquire the first 100 customers and explain why it works.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-42",
    title: "High-converting Funnel Builder",
    description: "Design a marketing funnel that converts traffic into customers.",
    prompt: "Act as a funnel strategist and design a high- converting funnel for this product/service: [describe product], targeting [audience]. Map out each stage of the funnel (awareness, lead capture, nurturing, conversion, retention) and explain what content, messaging, and offers should be used at each stage. Include landing page ideas, lead magnets, email sequences, and conversion triggers. Focus on reducing friction and increasing trust. Avoid generic funnel templates- tailor everything to the product and audience. End by identifying the biggest potential drop- off point in the funnel and how to fix it.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-43",
    title: "Ad Campaign Creator",
    description: "Create effective ad campaigns with targeting and messaging.",
    prompt: "Act as a paid advertising expert and create a complete ad campaign for this product/service: [describe product], targeting [audience], on [platform, e.g., Facebook, Google, TikTok]. Define the campaign objective, audience targeting, and budget approach. Write multiple ad variations including headlines, primary text, and calls- to- action. Explain the strategy behind each variation. Include suggestions for visuals or creatives. Focus on clarity, persuasion, and testing. Avoid generic ad copy. End by recommending how to test and optimize the campaign for better performance.",
    category: "marketing",
    difficulty: "Intermediate",
    tags: ["Marketing"]
  },
  {
    id: "pr-44",
    title: "Brand Positioning Strategist",
    description: "Define a strong, clear brand position in the market.",
    prompt: "Act as a brand strategist and define the positioning for this brand/business: [describe business], targeting [audience], in the [industry]. Clearly articulate the unique value proposition and what makes the brand different from competitors. Identify the core message, tone, and personality of the brand. Explain how the brand should be perceived and why that matters. Suggest messaging angles and key phrases that reinforce positioning. Avoid vague branding language—be specific and strategic. End by suggesting one bold positioning move that could make the brand stand out immediately.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-45",
    title: "Social Media Growth Plan",
    description: "Build a plan to grow an audience on social platforms.",
    prompt: "Act as a social media growth expert and create a plan to grow an audience on [platform] for this brand: [describe brand], targeting [audience]. Define the type of content that will perform best, including themes, formats, and hooks. Suggest a realistic posting schedule and explain how to maintain consistency. Include strategies for increasing engagement, reach, and follower growth. Focus on what actually works on the platform instead of generic advice. End by identifying one strategy that could accelerate growth significantly if executed well.",
    category: "marketing",
    difficulty: "Beginner",
    tags: ["Marketing"]
  },
  {
    id: "pr-46",
    title: "Email Marketing System",
    description: "Build an email marketing strategy that converts.",
    prompt: "Act as an email marketing strategist and design a complete email system for this business: [describe business], targeting [audience], with the goal of [sales/nurturing/retention]. Define the types of emails needed (welcome, nurture, promotional, etc.) and how they should be structured. Suggest key messaging themes and timing for each email. Focus on building trust and driving action without being spammy. Include subject line strategies and personalization ideas. End by suggesting how to increase open and conversion rates over time.",
    category: "marketing",
    difficulty: "Intermediate",
    tags: ["Marketing"]
  },
  {
    id: "pr-47",
    title: "Product Launch Plan",
    description: "Plan and execute a successful product launch.",
    prompt: "Act as a launch strategist and create a detailed launch plan for this product: [describe product], targeting [audience]. Break the launch into phases (pre- launch, launch, post- launch) and define actions for each stage. Include content, promotions, partnerships, and communication strategies. Focus on building anticipation before launch and maximizing conversions during launch. Avoid generic steps—make it specific and actionable. End by identifying the biggest risk to the launch and how to mitigate it.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-48",
    title: "Conversion Rate Optimizer",
    description: "Improve conversion rates across marketing assets.",
    prompt: "Act as a conversion rate optimization expert and analyze this marketing asset: [describe or paste landing page/ad/funnel]. Identify weaknesses in messaging, structure, design, or user experience that could reduce conversions. Suggest specific improvements that would increase clarity, trust, and action. Focus on practical changes that can be implemented quickly. Avoid vague advice—be precise. End by identifying the single highest- impact change that would most likely increase conversions significantly.",
    category: "marketing",
    difficulty: "Advanced",
    tags: ["Marketing"]
  },
  {
    id: "pr-49",
    title: "Ultra- Realistic Product Render",
    description: "Generate high- end, photorealistic product images for branding or ads.",
    prompt: "Act as a professional product photographer and 3D rendering expert. Generate a highly realistic image of this product: [describe product in detail], designed for [purpose: e.g., e- commerce, advertisement, branding]. The image should feature premium lighting, sharp focus, and realistic textures that make the product look tangible and high- quality. Specify environment details such as background [e.g., clean white, luxury setting, lifestyle scene], lighting style [soft studio lighting, dramatic shadows, natural light], and camera angle [close- up, top- down, angled]. Ensure materials (metal, glass, fabric, etc.) are rendered accurately with proper reflections and depth. Avoid unrealistic distortions. The composition should feel professional and visually balanced. Output should be optimized for high resolution and clarity. Finally, suggest 2 variations of the same product shot that could be used for A/B testing in marketing.",
    category: "image",
    difficulty: "Intermediate",
    tags: ["Image"]
  },
  {
    id: "pr-50",
    title: "Brand Identity Visual Generator",
    description: "Create a cohesive visual identity for a brand.",
    prompt: "Act as a brand designer and visual identity expert. Generate a set of visual assets for this brand: [brand name and description], targeting [audience], with a tone of [modern, luxury, playful, etc.]. The output should include logo style direction, color palette suggestions, typography style, and a sample visual composition that represents the brand. Ensure consistency across all elements and explain how they reinforce the brand identity. The visual should reflect the brand's personality and differentiate it from competitors. Avoid generic styles. Focus on uniqueness and clarity. Include design reasoning in a concise way. Finally, suggest how this identity can be adapted for social media and marketing materials.",
    category: "image",
    difficulty: "Advanced",
    tags: ["Image"]
  },
  {
    id: "pr-51",
    title: "Social Media Creative Generator",
    description: "Generate eye- catching social media visuals.",
    prompt: "Act as a social media designer. Create a visually engaging image concept for a post about [topic], targeting [audience], on [platform]. Define layout, color scheme, typography style, and visual hierarchy clearly. The design should grab attention quickly, communicate the message clearly, and fit the platform's style. Include a strong focal point and minimal clutter. Specify image elements such as icons, illustrations, or photos. Ensure the design aligns with the intended tone [casual, professional, bold, etc.]. Output should be optimized for the platform's dimensions. Finally, suggest one variation that could improve engagement.",
    category: "image",
    difficulty: "Beginner",
    tags: ["Image"]
  },
  {
    id: "pr-52",
    title: "Cinematic Scene Generator",
    description: "Create visually rich cinematic- style scenes.",
    prompt: "Act as a cinematic director and visual artist. Generate a highly detailed scene based on this concept: [describe scene]. The image should feel like a movie still, with strong composition, depth, and storytelling. Define lighting (golden hour, neon, dramatic shadows), camera perspective (wide shot, close- up, over- the- shoulder), and environment details. Include mood and atmosphere (e.g., tense, peaceful, mysterious). Ensure elements in the scene interact naturally and contribute to the narrative. Avoid generic visuals—focus on emotional impact and realism. The final image should feel immersive and visually compelling. End by suggesting how the scene could be enhanced for even stronger storytelling.",
    category: "image",
    difficulty: "Intermediate",
    tags: ["Image"]
  },
  {
    id: "pr-53",
    title: "Character Design Generator",
    description: "Create detailed character visuals for stories or games.",
    prompt: "Act as a character designer and illustrator. Create a detailed visual concept for a character based on this description: [describe character]. Define physical appearance, clothing, posture, and expression. Include personality traits and how they reflect in the design. Specify art style (realistic, anime, stylized, etc.) and color palette. Ensure the character feels unique and visually consistent. Add environmental or background elements if relevant. Avoid generic character tropes. Focus on strong identity and storytelling through design. Finally, suggest one alternative version of the character with a different tone or style.",
    category: "image",
    difficulty: "Intermediate",
    tags: ["Image"]
  },
  {
    id: "pr-54",
    title: "Ai Art Style Transformer",
    description: "Reimagine an image or concept in a different art style.",
    prompt: "Act as a digital artist. Transform this concept or image: [describe or upload image] into a different style: [specify style, e.g., watercolor, cyberpunk, oil painting]. Maintain the core subject but reinterpret it visually using the chosen style's defining characteristics such as color palette, texture, and composition. Ensure the final result feels authentic to the style rather than a superficial overlay. Avoid losing important details. Focus on creativity and artistic quality. Finally, suggest one additional style that could work even better and explain why.",
    category: "image",
    difficulty: "Beginner",
    tags: ["Image"]
  },
  {
    id: "pr-55",
    title: "Poster &amp; Cover Art Generator",
    description: "Design posters or cover art for media or campaigns.",
    prompt: "Act as a graphic designer. Create a poster or cover art concept for [project type: movie, book, event, etc.] titled [title], based on [description]. Define layout, focal point, typography style, and color palette. Ensure the design communicates the theme clearly and attracts attention. Include key visual elements and explain how they contribute to the message. Avoid clutter and maintain visual balance. The design should feel professional and market- ready. Finally, suggest how the design could be adapted for digital platforms.",
    category: "image",
    difficulty: "Intermediate",
    tags: ["Image"]
  },
  {
    id: "pr-56",
    title: "Environment &amp; World Builder",
    description: "Create immersive environments or world visuals.",
    prompt: "Act as a world- building artist. Generate a detailed visual environment based on this concept: [describe world or setting]. Define terrain, architecture, atmosphere, lighting, and environmental details. Ensure everything feels coherent and immersive. Include elements that hint at history, culture, or activity within the world. Avoid generic fantasy or sci- fi cliches—focus on originality. The composition should guide the viewer's eye naturally. Finally, suggest how this world could be expanded visually into multiple scenes.",
    category: "image",
    difficulty: "Advanced",
    tags: ["Image"]
  },
  {
    id: "pr-57",
    title: "Thumbnail Generator (high Ctr)",
    description: "Create attention- grabbing thumbnails for videos.",
    prompt: "Act as a YouTube thumbnail designer. Create a high- converting thumbnail concept for a video about [topic], targeting [audience]. Define composition, text placement, colors, and facial expressions (if applicable). Ensure the design is clear, bold, and readable even at small sizes. Use contrast and visual cues to grab attention instantly. Avoid clutter and unnecessary elements. Focus on curiosity and clarity. Finally, suggest one variation that could increase click- through rate further.",
    category: "image",
    difficulty: "Beginner",
    tags: ["Image"]
  },
  {
    id: "pr-58",
    title: "Visual Prompt Enhancer",
    description: "Turn simple ideas into detailed AI image prompts.",
    prompt: "Act as an expert prompt engineer for AI image generation tools. Take this basic idea: [describe idea], and transform it into a highly detailed, optimized prompt. Expand it with precise descriptions of subject, lighting, composition, style, textures, colors, and mood. Ensure the prompt is clear, structured, and designed to produce high- quality, consistent results. Avoid vague wording and add specific details that improve output quality. Include optional variations or modifiers that can be used for experimentation. Finally, explain briefly why the enhanced prompt will produce better results.",
    category: "image",
    difficulty: "Advanced",
    tags: ["Image"]
  },
  {
    id: "pr-59",
    title: "Ai Video Script- To- Visual Builder",
    description: "Turn an idea into a complete AI- generated video with scenes and direction.",
    prompt: "Act as a video director and AI video production expert. Create a complete video plan for this concept: [describe idea], targeting [audience], with the goal of [educate/entertain/sell]. Structure the video into clear scenes, each with a description of visuals, camera angles, motion, transitions, and mood. Include narration/voiceover script that matches the visuals and keeps engagement high. Define pacing, tone, and emotional flow across the video. Suggest background music style and sound effects. Ensure each scene contributes to the overall message and avoids filler. Keep it optimized for AI video tools (Runway, Pika, Sora, etc.) by making visuals clear and prompt- friendly. End by suggesting how to shorten or adapt the video for short- form platforms.",
    category: "video",
    difficulty: "Advanced",
    tags: ["Video"]
  },
  {
    id: "pr-60",
    title: "Short- Form Viral Video Generator",
    description: "Create high- engagement short videos for platforms like TikTok/Reels.",
    prompt: "Act as a viral content strategist. Create a short- form video concept (15- 60 seconds) about [topic], targeting [audience], optimized for [platform]. Start with a strong hook in the first 3 seconds, then structure the video with fast pacing and high engagement. Define visuals, on- screen text, and voiceover clearly. Use proven patterns like curiosity gaps, storytelling, or shocking facts. Ensure the content is simple, clear, and attention- grabbing. Avoid unnecessary complexity. Include captions or text overlays where needed. End with a strong call- to- action. Finally, suggest one variation that could increase chances of going viral.",
    category: "video",
    difficulty: "Intermediate",
    tags: ["Video"]
  },
  {
    id: "pr-61",
    title: "Youtube Video Script Generator",
    description: "Write structured, engaging YouTube video scripts.",
    prompt: "Act as a YouTube content strategist and scriptwriter. Write a full video script for a video about [topic], targeting [audience], with the goal of [engagement/education/retention]. Start with a compelling hook, then structure the content logically with clear sections. Maintain a conversational tone and keep the audience engaged throughout. Include cues for visuals, B- roll, and transitions. Avoid fluff—every part should add value. End with a strong conclusion and call- to- action. Ensure pacing keeps attention high. Finally, suggest how to improve audience retention further.",
    category: "video",
    difficulty: "Intermediate",
    tags: ["Video"]
  },
  {
    id: "pr-62",
    title: "Video Ad Creator",
    description: "Create high- converting video ads.",
    prompt: "Act as a performance marketing expert and video ad creator. Create a video ad for this product/service: [describe product], targeting [audience], on [platform]. Start with a strong attention- grabbing hook, then highlight the problem and introduce the solution clearly. Structure the ad for maximum conversion using emotional triggers and logical persuasion. Define visuals, scenes, and voiceover clearly. Include text overlays and key selling points. Keep the ad concise and impactful. Avoid generic messaging. End with a compelling call- to- action. Finally, suggest how to test and optimize the ad for better performance.",
    category: "video",
    difficulty: "Advanced",
    tags: ["Video"]
  },
  {
    id: "pr-63",
    title: "Storyboard Generator",
    description: "Create a scene- by- scene storyboard for video production.",
    prompt: "Act as a storyboard artist and video planner. Break down this video concept: [describe idea] into a detailed storyboard. Divide the video into scenes and describe each one clearly, including visuals, camera angles, movement, and transitions. Ensure logical flow and continuity between scenes. Include notes on timing and pacing. Keep it practical for production. Avoid vague descriptions—be specific. End by identifying the most critical scene and why it matters most.",
    category: "video",
    difficulty: "Intermediate",
    tags: ["Video"]
  },
  {
    id: "pr-64",
    title: "Talking Head Video Optimizer",
    description: "Improve scripts and structure for talking- head videos.",
    prompt: "Act as a video content coach. Optimize this talking- head video idea/script: [paste or describe]. Improve the hook, clarity, structure, and engagement. Suggest where to add emphasis, pauses, or visual aids. Ensure the delivery feels natural and keeps attention. Remove unnecessary parts and tighten the message. Focus on clarity and impact. End by suggesting one change that would significantly improve viewer retention.",
    category: "video",
    difficulty: "Beginner",
    tags: ["Video"]
  },
  {
    id: "pr-65",
    title: "Educational Video Creator",
    description: "Create clear and engaging educational videos.",
    prompt: "Act as an educational content creator. Design a video that teaches [topic] to [audience]. Break down the concept into simple, easy- to- understand sections. Define visuals, examples, and explanations for each part. Keep the content engaging without oversimplifying. Include analogies or real- world examples to improve understanding. Maintain logical progression from basic to advanced ideas. End with a summary and key takeaways. Finally, suggest one way to make the content more engaging.",
    category: "video",
    difficulty: "Intermediate",
    tags: ["Video"]
  },
  {
    id: "pr-66",
    title: "Cinematic Video Concept Designer",
    description: "Design visually compelling cinematic video concepts.",
    prompt: "Act as a cinematic director. Create a visually rich video concept based on this idea: [describe concept]. Define scenes with strong composition, lighting, camera movement, and mood. Ensure the video tells a story visually, even without heavy dialogue. Include transitions and pacing that enhance emotional impact. Avoid generic visuals—focus on originality and depth. The output should feel like a film concept. End by suggesting how to elevate the concept further.",
    category: "video",
    difficulty: "Advanced",
    tags: ["Video"]
  },
  {
    id: "pr-67",
    title: "Repurposing Content Engine",
    description: "Turn one piece of content into multiple video formats.",
    prompt: "Act as a content repurposing strategist. Take this content: [paste or describe content] and convert it into multiple video formats (short- form clips, long- form video, teaser, etc.). Define how each version should be structured and what parts of the content should be highlighted. Ensure each format is optimized for its platform. Avoid simple duplication—adapt the content properly. Focus on maximizing reach and efficiency. End by identifying which version will likely perform best and why.",
    category: "video",
    difficulty: "Intermediate",
    tags: ["Video"]
  },
  {
    id: "pr-68",
    title: "Video Prompt Enhancer (ai Tools)",
    description: "Turn simple ideas into optimized prompts for AI video tools.",
    prompt: "Act as an expert prompt engineer for AI video generation tools. Take this basic idea: [describe idea] and transform it into a highly detailed prompt suitable for tools like Runway, Pika, or Sora. Expand it with clear descriptions of scenes, motion, camera angles, lighting, style, and transitions. Ensure the prompt is structured and specific enough to produce consistent, high- quality results. Avoid vague wording. Include optional variations or modifiers for experimentation. Finally, explain briefly why the enhanced prompt will produce better output.",
    category: "video",
    difficulty: "Advanced",
    tags: ["Video"]
  },
  {
    id: "pr-69",
    title: "Personal Productivity Audit",
    description: "Analyze your current productivity and identify improvements.",
    prompt: "Act as a productivity coach. Evaluate my current workflow, habits, and tools based on this description: [describe daily routine, tasks, tools used]. Identify bottlenecks, distractions, and inefficiencies. Provide a detailed step- by- step action plan to optimize time management, task prioritization, and focus. Suggest practical techniques (e.g., batching, time blocking, automation) and specify which tools or apps would best support each improvement. End by recommending the top 3 changes that will have the greatest immediate impact on productivity.",
    category: "productivity",
    difficulty: "Beginner",
    tags: ["Productivity"]
  },
  {
    id: "pr-70",
    title: "Task Prioritization System",
    description: "Organize tasks effectively using proven prioritization frameworks.",
    prompt: "Act as a productivity strategist. Create a personalized task prioritization system for me based on this list of tasks: [paste tasks] and this context: [describe deadlines, importance, and impact]. Recommend a framework (Eisenhower Matrix, ABC method, MoSCoW, etc.) and map each task accordingly. Explain why each task is categorized as such and provide a clear daily or weekly schedule. Include suggestions for tracking progress and avoiding procrastination. End by highlighting the tasks that should be done first to maximize impact.",
    category: "productivity",
    difficulty: "Intermediate",
    tags: ["Productivity"]
  },
  {
    id: "pr-71",
    title: "Goal Setting &amp; Tracking Planner",
    description: "Build a system to define, track, and achieve goals.",
    prompt: "Act as a goal achievement coach. Help me define specific, measurable, achievable, relevant, and time- bound (SMART) goals for this area of my life or work: [describe context]. Break each goal into actionable milestones and assign deadlines. Recommend tools or methods to track progress consistently. Include accountability mechanisms and ways to adjust goals when necessary. Suggest a weekly reflection routine to review achievements and obstacles. End by identifying which single milestone should be prioritized for maximum progress.",
    category: "productivity",
    difficulty: "Intermediate",
    tags: ["Productivity"]
  },
  {
    id: "pr-72",
    title: "Focus &amp; Deep Work Planner",
    description: "Design a system to maximize deep work and minimize distractions.",
    prompt: "Act as a productivity strategist specializing in deep work. Design a daily and weekly schedule that maximizes uninterrupted focus for my tasks: [describe tasks], considering my environment: [describe work setting] and typical distractions. Include techniques like time blocking, Pomodoro variations, and environment optimization. Recommend specific habits, apps, or tools to reduce interruptions and increase concentration. Explain how to handle meetings, messages, and multitasking efficiently. End by suggesting one habit change that will have the most significant impact on deep work sessions.",
    category: "productivity",
    difficulty: "Advanced",
    tags: ["Productivity"]
  },
  {
    id: "pr-73",
    title: "Automation &amp; Workflow Optimization",
    description: "Identify and automate repetitive tasks to save time.",
    prompt: "Act as a workflow automation expert. Analyze my current tasks: [describe tasks, software, and processes]. Identify repetitive or low- value activities suitable for automation. Recommend automation tools or scripts (Zapier, Make, macros, AI assistants, etc.) and provide step- by- step instructions to implement them. Suggest how to integrate these automations into my daily workflow without disruption. Focus on practicality and measurable time savings. End by highlighting which automation will save the most time immediately.",
    category: "productivity",
    difficulty: "Advanced",
    tags: ["Productivity"]
  },
  {
    id: "pr-74",
    title: "Meeting Efficiency Consultant",
    description: "Optimize meetings for productivity and clarity.",
    prompt: "Act as a productivity consultant. Analyze my meeting schedule and goals: [describe meetings, attendees, objectives, and duration]. Recommend strategies to reduce unnecessary meetings, improve focus, and maximize output. Suggest agendas, time limits, and follow- up systems. Include methods to ensure actionable outcomes and accountability. Avoid vague advice- provide practical steps. End by identifying the single most impactful change I can make to improve overall meeting efficiency.",
    category: "productivity",
    difficulty: "Beginner",
    tags: ["Productivity"]
  },
  {
    id: "pr-75",
    title: "Daily &amp; Weekly Planner Generator",
    description: "Create structured daily and weekly schedules for maximum efficiency.",
    prompt: "Act as a productivity coach. Generate a daily and weekly planner for me based on these tasks and responsibilities: [list tasks] and my working hours: [specify]. Include task prioritization, breaks, focus blocks, and buffer times. Recommend an optimal sequence for completing tasks based on urgency, energy levels, and deadlines. Suggest productivity techniques like batching, theme days, or morning routines. End by highlighting which part of the schedule will have the greatest effect on completing tasks efficiently.",
    category: "productivity",
    difficulty: "Beginner",
    tags: ["Productivity"]
  },
  {
    id: "pr-76",
    title: "Email &amp; Communication Optimization",
    description: "Reduce time spent on emails and improve communication workflow.",
    prompt: "Act as a productivity and communication expert. Review my current email/communication practices: [describe platforms, frequency, volume]. Recommend strategies to reduce overload, prioritize important messages, and automate repetitive communication. Suggest templates, scheduling rules, and filters. Include steps for handling messages efficiently without losing important information. Focus on practical implementation rather than theory. End by suggesting the single change that will save the most time.",
    category: "productivity",
    difficulty: "Intermediate",
    tags: ["Productivity"]
  },
  {
    id: "pr-77",
    title: "Habit Formation &amp; Consistency Plan",
    description: "Build sustainable productivity habits.",
    prompt: "Act as a habit formation coach. Help me build and maintain productive habits related to: [describe habits, e.g., exercise, learning, work routines]. Provide step- by- step guidance on habit stacking, triggers, reinforcement, and tracking. Suggest ways to overcome procrastination, resistance, and environmental challenges. Include tools for tracking consistency and measuring progress. End by recommending one keystone habit that will have the most cascading effect on overall productivity.",
    category: "productivity",
    difficulty: "Intermediate",
    tags: ["Productivity"]
  },
  {
    id: "pr-78",
    title: "Productivity Reflection &amp; Improvement",
    description: "Review performance and optimize long- term productivity.",
    prompt: "Act as a productivity analyst. Review my recent productivity: [describe last week/month's activities, goals, successes, and failures]. Identify patterns, bottlenecks, and areas of wasted effort. Suggest specific, actionable strategies to improve efficiency, focus, and time management in the next period. Include recommendations for task batching, delegation, automation, and habit adjustments. Avoid vague suggestions—focus on measurable, practical steps. End by highlighting the single most impactful change I can implement immediately to improve overall productivity.",
    category: "productivity",
    difficulty: "Advanced",
    tags: ["Productivity"]
  },
  {
    id: "pr-79",
    title: "Personalized Learning Roadmap",
    description: "Create a complete learning path tailored to skills and goals.",
    prompt: "Act as a learning strategist and curriculum designer. Create a detailed, step- by- step learning roadmap for mastering [subject/skill], considering my current level: [beginner/intermediate/advanced] and my goal: [e.g., career advancement, exam readiness, personal mastery]. Include core topics, subtopics, resources (books, courses, articles, videos), practice exercises, and recommended timelines. Specify milestones and measurable outcomes for each stage. Suggest techniques for retention, spaced repetition, and active recall. Include tips for integrating learning into a daily routine and adapting when progress stalls. End by highlighting the one highest- impact resource or strategy that will accelerate learning fastest.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  },
  {
    id: "pr-80",
    title: "Deep Understanding Study Plan",
    description: "Develop a structured plan for mastering complex concepts.",
    prompt: "Act as an educational consultant. Create a step- by- step study plan for [subject/topic] for someone aiming to achieve deep understanding. Break down the material into manageable chunks, explain the optimal sequence for learning, and provide specific practice exercises or problem- solving tasks. Include strategies for reviewing, summarizing, and testing understanding. Suggest active learning methods (Feynman technique, concept mapping, interleaving). End by identifying the one area most likely to be misunderstood and how to master it efficiently.",
    category: "learning",
    difficulty: "Intermediate",
    tags: ["Learning"]
  },
  {
    id: "pr-81",
    title: "Exam Prep &amp; Success Blueprint",
    description: "Build a comprehensive plan to excel in exams.",
    prompt: "Act as an exam preparation strategist. Develop a complete study and revision plan for [exam name], targeting [score/grade goal], based on my current level: [describe]. Include a schedule with time allocation for each topic, practice exams, and review cycles. Suggest high- yield study methods, memory techniques, and exam strategies. Provide specific resources like past papers, question banks, or online tools. Highlight common pitfalls and how to avoid them. End by recommending the single most impactful practice method that will maximize exam performance.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  },
  {
    id: "pr-82",
    title: "Learning Style Optimizer",
    description: "Adapt study methods to personal learning style for efficiency.",
    prompt: "Act as a cognitive learning expert. Analyze my learning preferences: [describe tendencies, e.g., visual, auditory, kinesthetic] and create a customized study strategy for [subject/topic]. Suggest methods, resources, and exercises that align with my strengths and compensate for weaknesses. Include techniques to maintain engagement, improve retention, and reduce cognitive overload. Recommend a schedule and habit cues for consistent learning. End by identifying the method that will most quickly improve comprehension in my strongest learning modality.",
    category: "learning",
    difficulty: "Beginner",
    tags: ["Learning"]
  },
  {
    id: "pr-83",
    title: "Skill Application &amp; Mastery Plan",
    description: "Build a plan to not just learn but apply and master a skill.",
    prompt: "Act as a mastery coach. Create a structured plan to achieve practical mastery of [skill/subject]. Include learning phases: foundational knowledge, applied practice, real- world projects, feedback cycles, and refinement. Recommend exercises, simulations, or projects that ensure skills transfer to real- world application. Suggest performance benchmarks and methods to evaluate progress objectively. Include techniques to retain and expand knowledge over time. End by identifying the single practice or project that will provide the highest skill improvement.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  },
  {
    id: "pr-84",
    title: "Accelerated Learning Framework",
    description: "Reduce learning time while maximizing retention and skill acquisition.",
    prompt: "Act as an accelerated learning specialist. Design a learning framework for [subject/skill] that optimizes retention and reduces time to proficiency. Include strategies such as active recall, spaced repetition, interleaving, deliberate practice, and meta- learning techniques. Specify resource types and sequencing for maximum efficiency. Include ways to track progress and adjust pace dynamically. End by recommending the one change to my current learning approach that will yield the largest efficiency gain.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  },
  {
    id: "pr-85",
    title: "Learning Through Teaching Method",
    description: "Use teaching as a tool to reinforce and consolidate learning.",
    prompt: "Act as an educational coach. Create a plan for me to learn [topic] effectively by teaching it to others. Break the subject into teachable modules, explain key concepts to simplify, and include exercises where I simulate teaching scenarios. Recommend tools for sharing knowledge (videos, blogs, presentations). Include feedback loops to identify gaps in understanding. End by suggesting the single teaching activity that will most strengthen my comprehension and retention.",
    category: "learning",
    difficulty: "Intermediate",
    tags: ["Learning"]
  },
  {
    id: "pr-86",
    title: "Knowledge Retention System",
    description: "Build a system to retain and recall learned information long- term.",
    prompt: "Act as a cognitive science expert. Design a retention system for [subject/skill] that ensures I remember key concepts over the long term. Include techniques like spaced repetition, mnemonic devices, retrieval practice, and concept mapping. Suggest practical ways to integrate these methods into daily learning and review schedules. Recommend tools or apps to support the system. End by identifying the technique most likely to prevent forgetting critical information.",
    category: "learning",
    difficulty: "Intermediate",
    tags: ["Learning"]
  },
  {
    id: "pr-87",
    title: "Learning Obstacles Troubleshooter",
    description: "Identify and solve learning challenges for faster progress.",
    prompt: "Act as a learning optimization consultant. Analyze my current learning challenges in [subject/skill] based on this description: [describe struggles, e.g., retention, motivation, comprehension]. Identify root causes for slow progress and cognitive roadblocks. Recommend practical, step- by- step solutions for each challenge. Include habit adjustments, resource recommendations, and technique modifications. Avoid vague suggestions—focus on actionable fixes. End by highlighting the single adjustment likely to yield the biggest improvement in learning efficiency.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  },
  {
    id: "pr-88",
    title: "Multi- Disciplinary Learning Planner",
    description: "Create a system to learn multiple subjects or skills simultaneously.",
    prompt: "Act as a polylearning strategist. Design a learning plan for mastering multiple subjects/skills at once: [list subjects/skills], considering my available time: [hours per week] and desired proficiency levels. Provide an optimized schedule balancing time across disciplines, sequencing topics for cognitive efficiency, and suggesting techniques for cross- disciplinary reinforcement. Include practical exercises, review cycles, and strategies to prevent burnout. End by identifying which subject or skill should receive priority in early stages for the greatest overall learning synergy.",
    category: "learning",
    difficulty: "Advanced",
    tags: ["Learning"]
  }
];

export const PHASES: Phase[] = [
  {
    "id": "p0",
    "number": "00",
    "title": "DIGITAL FUNDAMENTALS",
    "badge": "Foundation",
    "weeks": "WEEK 1",
    "objective": "Google Workspace, Developers Environments",
    "color": "text-sky-400",
    "resources": [
      {
        "title": "Google Workspace Fundamentals",
        "url": "https://youtu.be/7YE7jX1Xg7g?si=EKcYrft0uIFcXPIC",
        "type": "yt"
      },
      {
        "title": "Developer Environments Setup",
        "url": "https://youtu.be/lWEKiak0WVU?si=ysMrOtyQn40Zptst",
        "type": "yt"
      },
      {
        "title": "How the Internet Works",
        "url": "https://youtu.be/zN8YNNHcaZc?si=1-fJHCxjXUkz5ZF6",
        "type": "yt"
      },
      {
        "title": "DNS Explained",
        "url": "https://youtu.be/nyH0nYhMW9M?si=x2mm6ZK0GhWImV50",
        "type": "yt"
      },
      {
        "title": "Frontend vs Backend vs Full Stack",
        "url": "https://youtu.be/Lq6BJag6Zs4?si=6r29IN_peAObytI8",
        "type": "yt"
      },
      {
        "title": "How Websites Work (Behind the Scenes)",
        "url": "https://youtu.be/-Hh9DpgULHU?si=KnRh9s5t8m06Ki7R",
        "type": "yt"
      },
      {
        "title": "UI/UX Design Basics",
        "url": "https://youtu.be/kbZejnPXyLM?si=68Fmxz84p9s4MUD-",
        "type": "yt"
      },
      {
        "title": "What Makes a Landing Page Convert",
        "url": "https://youtu.be/az1Zh-FNSno?si=-hRF6CpXNRF10ciV",
        "type": "yt"
      },
      {
        "title": "Product Thinking for Beginners",
        "url": "https://youtu.be/Tk-EI2yYT3A?si=0S0thY1E_kY7V-rh",
        "type": "yt"
      }
    ,
      {
        "title": "CLI Mastery: Command Prompt & PowerShell",
        "url": "https://www.youtube.com/watch?v=ueKFupiT2wA",
        "type": "yt"
      },
      {
        "title": "Modern SDLC & Agile AI Development",
        "url": "https://www.youtube.com/watch?v=P1mbqnACR0M",
        "type": "yt"
      },
      {
        "title": "Technical Writing for Developers",
        "url": "https://www.youtube.com/watch?v=vT5pcc30Ffw",
        "type": "yt"
      },
      {
        "title": "System Documentation & Technical Specs Engineering",
        "url": "https://www.youtube.com/watch?v=nypgQn7sMY8",
        "type": "yt"
      },
      {
        "title": "AI-Enhanced Market & Product Research",
        "url": "https://www.youtube.com/watch?v=wGuRuuPuYNQ",
        "type": "yt"
      },
      {
        "title": "Neural Architectures & AI Brain Design",
        "url": "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google Digital Garage",
        "url": "https://learndigital.withgoogle.com/digitalgarage",
        "type": "certification",
        "provider": "Google",
        "description": "A comprehensive foundational certification by Google covering the fundamentals of digital marketing, online presence, and basic digital strategy essential for any modern tech professional."
      },
      {
        "title": "Google Cloud Skills Boost",
        "url": "https://www.cloudskillsboost.google",
        "type": "course",
        "provider": "Google"
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/c1EW8Ucj6sQ?si=_1uXMZ44ud9cK0dY",
        "outcome": "A professional wireframe for a high-converting landing page.",
        "steps": [
          "Define user flow",
          "Layout hero section",
          "Design feature grid",
          "Add CTA elements"
        ]
      }
    ],
    "tools": [
      {
        "name": "Notion",
        "url": "https://www.notion.so"
      },
      {
        "name": "Figma",
        "url": "https://www.figma.com"
      },
      {
        "name": "Google Workspace",
        "url": "https://support.google.com/a/users"
      }
    ],
    "tasks": [
      {
        "id": "p0-t1",
        "label": "1 landing page wireframe in Figma"
      },
      {
        "id": "p0-t2",
        "label": "Personal knowledge base in Notion (set up)"
      },
      {
        "id": "p0-t3",
        "label": "Google Digital Garage – lesson 1–5 done"
      }
    ],
    "project": {
      "title": "Digital Ecosystem Setup",
      "description": "Design and structure pages intentionally built to guide visitors toward a specific action.",
      "deliverables": [
        "Landing page wireframe",
        "Digital system setup"
      ],
      "sellingStrategy": {
        "pricing": "30,000 - 80,000 NGN ($20 - $50)",
        "whereToFind": [
          "Local SMEs",
          "Personal brands and coaches",
          "Startup landing pages",
          "LinkedIn, Twitter/X, Upwork, Fiverr"
        ],
        "pitch": "I design and structure pages that are intentionally built to guide visitors toward a specific action. I also help businesses set up foundational digital systems such as workspace organization and internal knowledge management."
      }
    }
  },
  {
    "id": "p1",
    "number": "01",
    "title": "GENERATIVE AI AND PROMPT ENGINEERING",
    "badge": "AI Core",
    "weeks": "WEEKS 2-3",
    "objective": "Language Models and use cases too, AI family ecosystem",
    "color": "text-emerald-400",
    "resources": [
      {
        "title": "Language Models & Use Cases",
        "url": "https://youtu.be/5sLYAQS9sWQ?si=YctP0Gf5eLF55xvi",
        "type": "yt"
      },
      {
        "title": "AI Family Ecosystem (Claude, ChatGPT, Gemini, Perplexity)",
        "url": "https://youtu.be/DsKZpgoy830?si=VNMTYxZiqyBc_lFh",
        "type": "yt"
      },
      {
        "title": "Prompt Engineering Full Course",
        "url": "https://youtu.be/p09yRj47kNM?si=8N241Ad2lTVW1PT8",
        "type": "yt"
      },
      {
        "title": "Claude AI - Complete Tutorial & Prompting Guide",
        "url": "https://youtu.be/rRrBbyv3ChM?si=har1nzTGcu92ftSs",
        "type": "yt"
      },
      {
        "title": "AI Workflow Automations (Open-source Models)",
        "url": "https://youtu.be/1uCE0uoKXL8?si=BYlpme8UhjFL6Wep",
        "type": "yt"
      },
      {
        "title": "Prompt Chaining Explained",
        "url": "https://youtu.be/IGdiKtCzhRc?si=Be0TZKVuEmUubwDw",
        "type": "yt"
      },
      {
        "title": "ChatGPT Structured Output / JSON Mode",
        "url": "https://youtu.be/XDfhwOZHYYs?si=S9Um_mTCoKOeRoa",
        "type": "yt"
      },
      {
        "title": "AI Agents vs Generative AI - Key Differences",
        "url": "https://youtu.be/O2gerCxEXvc?si=TFHTVkQ6mOWL9TJ",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Anthropic Prompt Engineering Guide",
        "url": "https://docs.anthropic.com",
        "type": "guide",
        "provider": "Anthropic",
        "description": "An in-depth, authoritative guide by Anthropic on constructing, refining, and optimizing prompts specifically tailored for complex reasoning and advanced LLM behavior."
      },
      {
        "title": "OpenAI Prompt Engineering Guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "type": "guide",
        "provider": "OpenAI"
      },
      {
        "title": "ChatGPT Prompt Engineering for Developers",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers",
        "type": "course",
        "provider": "DeepLearning.AI",
        "description": "DeepLearning.AI course on using LLM APIs to build applications and automate tasks."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/zkXonmqIBFg?si=4bi5hpsr3zKFYoC",
        "outcome": "A custom prompt-based system for automated marketing copy.",
        "steps": [
          "Set up API",
          "Design prompt chains",
          "Implement context injection",
          "Test output quality"
        ]
      }
    ],
    "tools": [
      {
        "name": "Claude",
        "url": "https://claude.ai"
      },
      {
        "name": "ChatGPT",
        "url": "https://chat.openai.com"
      },
      {
        "name": "Perplexity",
        "url": "https://perplexity.ai"
      }
    ],
    "tasks": [
      {
        "id": "p1-t1",
        "label": "AI content generator (Claude + prompt chain)"
      },
      {
        "id": "p1-t2",
        "label": "AI research assistant (Claude Code project)"
      },
      {
        "id": "p1-t3",
        "label": "DeepLearning.AI Prompt Engineering certificate"
      },
      {
        "id": "p1-t4",
        "label": "Personal 'prompt library' doc in Notion"
      }
    ],
    "project": {
      "title": "AI-Driven Workflows",
      "description": "Design AI-driven workflows and prompt systems that allow businesses to automate processes.",
      "deliverables": [
        "AI content generator",
        "AI research assistant"
      ],
      "sellingStrategy": {
        "pricing": "20,000 - 100,000 NGN ($15 - $65)",
        "whereToFind": [
          "Marketing teams",
          "Content agencies",
          "Founders and startups",
          "LinkedIn, Upwork, Indie Hackers, Gumroad"
        ],
        "pitch": "I design AI-driven workflows and prompt systems that allow businesses to automate processes in a structured and repeatable way. This includes building content generation systems, research assistants, structured output pipelines, and internal knowledge tools."
      }
    }
  },
  {
    "id": "p2",
    "number": "02",
    "title": "NO-CODE WEB DEVELOPMENT",
    "badge": "Build",
    "weeks": "WEEKS 4-6",
    "objective": "Build high-quality, responsive, and conversion-focused websites.",
    "color": "text-amber-400",
    "resources": [
      {
        "title": "Webflow Video",
        "url": "https://youtu.be/RXdH2H01P88?si=EJYQ7bJsj35xUsTb",
        "type": "yt"
      },
      {
        "title": "Framer Website Builder Full Tutorial",
        "url": "https://youtu.be/1w6HIurOqjw?si=Usnsa8_PMxT05FIo",
        "type": "yt"
      },
      {
        "title": "WordPress Full Course",
        "url": "https://youtu.be/R4v_7hh4Yys?si=493bJINXH1iQjazv",
        "type": "yt"
      },
      {
        "title": "Build with Elementor - WordPress Page Builder",
        "url": "https://youtu.be/3YG3XLmBX4A?si=5zwDh9PSs65ll9Al",
        "type": "yt"
      },
      {
        "title": "Mobile Responsive Web Design",
        "url": "https://youtu.be/m9uXR4xt95w?si=cmqfMQG1RGWGyBgrm",
        "type": "yt"
      },
      {
        "title": "Webflow Full Course",
        "url": "https://youtu.be/1EvoteyU6PA?si=Bvl7qgWI6jM0BFLO",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Webflow Expert Certification",
        "url": "https://university.webflow.com/certifications",
        "type": "certification",
        "provider": "Webflow",
        "description": "An industry-recognized credential proving advanced proficiency in building responsive, scalable, and visually complex websites visually without writing code."
      },
      {
        "title": "WordPress Learn",
        "url": "https://learn.wordpress.org",
        "type": "course",
        "provider": "WordPress"
      },
      {
        "title": "Google UX Design Certificate",
        "url": "https://www.coursera.org/professional-certificates/google-ux-design",
        "type": "certification",
        "provider": "Google"
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/JnwATqjYohI?si=okSn3NTmerC2ogsm",
        "outcome": "A live, responsive portfolio website.",
        "steps": [
          "Import design",
          "Set up CMS",
          "Add animations",
          "Deploy"
        ]
      }
    ],
    "tools": [
      {
        "name": "Webflow",
        "url": "https://webflow.com"
      },
      {
        "name": "Framer",
        "url": "https://framer.com"
      },
      {
        "name": "WordPress",
        "url": "https://wordpress.org"
      }
    ],
    "tasks": [
      {
        "id": "p2-t1",
        "label": "2-3 websites (Webflow + Framer)"
      },
      {
        "id": "p2-t2",
        "label": "1 portfolio-ready landing page (live URL)"
      },
      {
        "id": "p2-t3",
        "label": "Webflow University core lessons done"
      },
      {
        "id": "p2-t4",
        "label": "First freelance pitch ready"
      }
    ],
    "project": {
      "title": "No-Code Websites",
      "description": "Build high-quality, responsive, and conversion-focused websites using modern no-code tools.",
      "deliverables": [
        "Live Websites",
        "Portfolio Landing Page"
      ],
      "sellingStrategy": {
        "pricing": "80,000 - 300,000 NGN ($50 - $200)",
        "whereToFind": [
          "Local businesses",
          "Startup founders",
          "Personal brands",
          "Instagram outreach, LinkedIn, referrals, freelance platforms"
        ],
        "pitch": "I build high-quality, responsive, and conversion-focused websites using modern no-code tools. This allows me to deliver production-ready websites in significantly shorter timeframes while maintaining a high level of design and performance."
      }
    }
  },
  {
    "id": "p2-5",
    "number": "2.5",
    "title": "VIBE CODING AND AI ASSISTED DESIGNS",
    "badge": "AI-Powered Build",
    "weeks": "WEEKS 6.5-7.5",
    "objective": "Claude Code, Google Stich, Google AI studio, Google Antigravity, KIMI Code",
    "color": "text-teal-400",
    "resources": [
      {
        "title": "Vibe Coding Explained - Build with AI",
        "url": "https://youtu.be/iLCDSY2XX7E?si=9rXYTZvdx_Mkheyo",
        "type": "yt"
      },
      {
        "title": "Google Stitch AI - Full Tutorial",
        "url": "https://youtu.be/Dk0dSiEke0M?si=X2djGKhDVaMcQitO",
        "type": "yt"
      },
      {
        "title": "Google Anti Gravity - Zero-Friction AI Design",
        "url": "https://youtu.be/mvHGl6zEA3w?si=ukZLL9TwFJVtc3-i",
        "type": "yt"
      },
      {
        "title": "Google Jules",
        "url": "https://youtu.be/LWqxbq2smp0?si=K0uWNWjX28byD9QM",
        "type": "yt"
      },
      {
        "title": "Google AI Studio",
        "url": "https://youtu.be/PsE9u37gJjU?si=Od6EiJTrlICD4Y_m",
        "type": "yt"
      },
      {
        "title": "Google Code Wiki",
        "url": "https://youtu.be/osb_mt3ne70?si=I61buw0pQdoVndWd",
        "type": "yt"
      },
      {
        "title": "Notebook LM",
        "url": "https://youtu.be/OdMTSmTqexg?si=FSB_OmveP9AWWtcY",
        "type": "yt"
      },
      {
        "title": "AI UI/UX Design - Complete Workflow",
        "url": "https://youtu.be/1ClbYm_mgpk?si=BKZkIR0oNkfEilnr",
        "type": "yt"
      },
      {
        "title": "Vibe 3D Website Design with AI Tools",
        "url": "https://youtu.be/nhibi9TRgNc?si=abjOUZ-R88WjTFDl",
        "type": "yt"
      },
      {
        "title": "Build Websites with AI - Full Guide",
        "url": "https://youtu.be/KIsuIj-Ll3k?si=EKxGTU6w2MWZEtkb",
        "type": "yt"
      },
      {
        "title": "Claude Code Free Set-Up",
        "url": "https://youtu.be/GRUjApPqCoE?si=ckUA7rFUDXRMlPQL",
        "type": "yt"
      }
    ,
      {
        "title": "Google Antigravity: Advanced AI Workflows",
        "url": "https://www.youtube.com/watch?v=BeRnLV8EZJs",
        "type": "yt"
      },
      {
        "title": "OPENCODE FULLCOURSE",
        "url": "https://youtu.be/uZGDO0L-Dr4?si=ab2ZammaQWdAiX8A",
        "type": "yt"
      },
      {
        "title": "KIMICODE FULL COURSE",
        "url": "https://youtu.be/iyXDidb8IG8?si=ECCHhOnjO1p2rNe-",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "v0 by Vercel",
        "url": "https://v0.dev",
        "type": "tool",
        "provider": "Vercel"
      },
      {
        "title": "Google AI Studio",
        "url": "https://aistudio.google.com",
        "type": "tool",
        "provider": "Google"
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/9PmEzZD1aEU?si=2zNL03fJGhOYzmiN",
        "outcome": "An immersive landing page built with AI-assisted design.",
        "steps": [
          "Generate UI",
          "Refine with AI",
          "Export code",
          "Deploy"
        ]
      }
    ],
    "tools": [
      {
        "name": "Google Stitch",
        "url": "https://stitch.withgoogle.com"
      },
      {
        "name": "v0 by Vercel",
        "url": "https://v0.dev"
      },
      {
        "name": "Bolt.new",
        "url": "https://bolt.new"
      }
    ],
    "tasks": [
      {
        "id": "p25-t1",
        "label": "1 website built with Google Stitch (live URL)"
      },
      {
        "id": "p25-t2",
        "label": "1 landing page with Google Anti Gravity"
      },
      {
        "id": "p25-t3",
        "label": "3D interactive element using AI tools"
      },
      {
        "id": "p25-t4",
        "label": "Vibe-coded portfolio piece"
      }
    ],
    "project": {
      "title": "AI-Assisted Web Design",
      "description": "Produce high-quality websites and interfaces in significantly reduced timeframes.",
      "deliverables": [
        "Vibe-coded Website",
        "AI Design Assets"
      ],
      "sellingStrategy": {
        "pricing": "50,000 - 150,000 NGN ($30 - $100)",
        "whereToFind": [
          "Fast-delivery website services",
          "Content creation",
          "Template selling",
          "Twitter/X, TikTok, Instagram, Discord"
        ],
        "pitch": "I combine AI tools with structured design principles to produce high-quality websites and interfaces in significantly reduced timeframes. This allows businesses to get premium-level results without the traditional delays and high costs."
      }
    }
  },
  {
    "id": "p3",
    "number": "03",
    "title": "AI EMBEDDED WEBSITE AND DEVELOPMENT",
    "badge": "AI Integration",
    "weeks": "WEEKS 7-9",
    "objective": "Turn websites into intelligent, revenue-generating systems.",
    "color": "text-orange-400",
    "resources": [
      {
        "title": "How to Add an AI Chatbot to ANY Website",
        "url": "https://youtu.be/U5ku1dSIWFY?si=VT2kzPrKUglcBRNE",
        "type": "yt"
      },
      {
        "title": "OpenAI API Tutorial — Build Your First AI App",
        "url": "https://www.youtube.com/live/zDvYnuo1aQw?si=MIODmNUyezG-w3cl",
        "type": "yt"
      },
      {
        "title": "Claude API Integration — Step by Step",
        "url": "https://youtu.be/A4vB0poh8mM?si=pDJJT2c_uZmSHmyP",
        "type": "yt"
      },
      {
        "title": "Build AI Chatbot for Website — Full Project",
        "url": "https://youtu.be/SWP3k-24jT4?si=Z1gKy-ia15ntEREX",
        "type": "yt"
      },
      {
        "title": "AI Lead Generation Workflow Tutorial",
        "url": "https://youtu.be/iOg7SpprYiw?si=5wdUXpCAF7TUDYKO",
        "type": "yt"
      },
      {
        "title": "Connect Chatbot to CRM (Make/n8n)",
        "url": "https://youtu.be/JStC_MFi9Oo?si=WDNfN4gPBco6-ET9",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Anthropic Claude API",
        "url": "https://docs.anthropic.com",
        "type": "guide",
        "provider": "Anthropic"
      },
      {
        "title": "OpenAI API",
        "url": "https://platform.openai.com",
        "type": "guide",
        "provider": "OpenAI"
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Up Project",
        "url": "https://youtu.be/SNwqkdhv1HQ?si=aaZ6cW3TKPPkbrhY",
        "outcome": "A custom-trained AI assistant integrated into a live website.",
        "steps": [
          "Train model",
          "Design flow",
          "Connect API",
          "Embed"
        ]
      }
    ],
    "tools": [
      {
        "name": "n8n",
        "url": "https://n8n.io"
      },
      {
        "name": "Make",
        "url": "https://make.com"
      }
    ],
    "tasks": [
      {
        "id": "p3-t1",
        "label": "AI chatbot embedded in a live website"
      },
      {
        "id": "p3-t2",
        "label": "Lead capture → email notification system"
      },
      {
        "id": "p3-t3",
        "label": "First sellable 'AI website' product"
      }
    ],
    "project": {
      "title": "Intelligent AI Website",
      "description": "Build intelligent websites that integrate AI directly into the user experience.",
      "deliverables": [
        "Live AI Website",
        "Lead Capture System"
      ],
      "sellingStrategy": {
        "pricing": "150,000 - 500,000 NGN ($100 - $350)",
        "whereToFind": [
          "Real estate",
          "Clinics",
          "E-commerce",
          "Consultants",
          "LinkedIn, local business associations"
        ],
        "pitch": "I build intelligent websites that integrate AI directly into the user experience. These systems can respond to customer inquiries in real time, guide users through services, and capture leads automatically."
      }
    }
  },
  {
    "id": "p4",
    "number": "04",
    "title": "AUTOMATION, TASK SCHEDULING AND AI TOOLS DEPLOYMENT",
    "badge": "Automation",
    "weeks": "WEEKS 10-13",
    "objective": "Build systems businesses will pay recurring fees for.",
    "color": "text-rose-500",
    "resources": [
      {
        "title": "n8n Full Automation",
        "url": "https://youtu.be/UIf-SlmMays?si=Nkn67L18zTH6vCVr",
        "type": "yt"
      },
      {
        "title": "n8n Business Automation Examples",
        "url": "https://youtu.be/JStC_MFi9Oo?si=WDNfN4gPBco6-ET9",
        "type": "yt"
      },
      {
        "title": "WhatsApp Business API Automation",
        "url": "https://youtu.be/iOg7SpprYiw?si=5wdUXpCAF7TUDYKO",
        "type": "yt"
      },
      {
        "title": "Email Automation Systems",
        "url": "https://youtu.be/SWP3k-24jT4?si=Z1gKy-ia15ntEREX",
        "type": "yt"
      },
      {
        "title": "Airtable / CRM Setup",
        "url": "https://youtu.be/A4vB0poh8mM?si=pDJJT2c_uZmSHmyP",
        "type": "yt"
      },
      {
        "title": "Make full tutorials",
        "url": "https://youtu.be/JSA2oezQWOU?si=IKrDRgni1eQfd_17",
        "type": "yt"
      },
      {
        "title": "Webhook & CRM Automation",
        "url": "https://youtu.be/uFc7YQG0a1M?si=y6pZ8pKdclofuG7l / https://youtu.be/QKTyqLz8a4g?si=qCCLyBI_I74JXi1w",
        "type": "yt"
      },
      {
        "title": "WhatsApp & Email Automation",
        "url": "https://youtu.be/pzMbHdqPTEI?si=L1-HSQ2-fy7pabs7",
        "type": "yt"
      },
      {
        "title": "Google Workspace Automation",
        "url": "https://youtu.be/4d-kZiS0PRs?si=pRljINcY6Kd9-236",
        "type": "yt"
      },
      {
        "title": "Manus AI",
        "url": "https://youtu.be/sKJW5QOPRy4?si=5TTcBYySqL73UHii",
        "type": "yt"
      },
      {
        "title": "Google Opal",
        "url": "https://www.youtube.com/live/T3A42YYP29I?si=-c35Mw2D3znw6WLZ",
        "type": "yt"
      }
    ,
      {
        "title": "Automated Data Extraction & Web Scraping",
        "url": "https://www.youtube.com/watch?v=RKsLLG-bzEY",
        "type": "yt"
      },
      {
        "title": "Shell Scripting & Regular Expressions",
        "url": "https://www.youtube.com/watch?v=mSQM8Xo78Wc",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "n8n Academy",
        "url": "https://academy.n8n.io",
        "type": "certification",
        "provider": "n8n"
      },
      {
        "title": "Make Academy",
        "url": "https://academy.make.com",
        "type": "certification",
        "provider": "Make",
        "description": "A deep dive into visual workflow automation, teaching you how to connect disparate APIs and services to build powerful, automated backend processes."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Automated Lead Gen System",
        "url": "https://youtu.be/SNwqkdhv1HQ?si=aaZ6cW3TKPPkbrhY",
        "outcome": "A fully automated workflow connecting forms, CRM, and email.",
        "steps": [
          "Set up trigger",
          "Map data",
          "Configure alerts",
          "Test flow"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/XPK7D1qd2XY?si=fG60-wPICYMkzhKm",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "n8n",
        "url": "https://n8n.io"
      },
      {
        "name": "Airtable",
        "url": "https://airtable.com"
      },
      {
        "name": "Make",
        "url": "https://make.com"
      }
    ],
    "tasks": [
      {
        "id": "p4-t1",
        "label": "Lead gen automation (Form → CRM → Email)"
      },
      {
        "id": "p4-t2",
        "label": "WhatsApp business notification system"
      },
      {
        "id": "p4-t3",
        "label": "n8n Academy certification"
      }
    ],
    "project": {
      "title": "Business Automation System",
      "description": "Develop automated systems that connect different software tools to streamline business operations.",
      "deliverables": [
        "n8n Workflows",
        "Airtable CRM Setup"
      ],
      "sellingStrategy": {
        "pricing": "100k - 300k NGN setup + 30k - 100k/mo maintenance",
        "whereToFind": [
          "Agencies",
          "E-commerce",
          "Coaches",
          "LinkedIn, Upwork, Cold Outreach"
        ],
        "pitch": "I develop automated systems that connect different software tools to streamline business operations. By setting up workflows that handle data entry, lead management, and customer notifications, I help businesses reduce manual work and improve efficiency."
      }
    }
  },
  {
    "id": "p5",
    "number": "05",
    "title": "AGENTIC AI AND USES",
    "badge": "Agentic AI",
    "weeks": "WEEKS 14-17",
    "objective": "Build AI that thinks, plans, and acts.",
    "color": "text-indigo-400",
    "resources": [
      {
        "title": "AI Agents Full Tutorial",
        "url": "https://youtu.be/w0H1-b044KY?si=gSsAdrrNk_oMILaC",
        "type": "yt"
      },
      {
        "title": "LangChain Full Course",
        "url": "https://youtu.be/Cyv-dgv80kE?si=Q6yDouglaYqwhSq6",
        "type": "yt"
      },
      {
        "title": "Build Autonomous AI Agent",
        "url": "https://youtu.be/jb4AAFCRPrI?si=MgehzKPfYow0jjA",
        "type": "yt"
      },
      {
        "title": "CrewAI Tutorial",
        "url": "https://youtu.be/sPzc6hMg7So?si=8YhP9x-7Vn4B1c3E",
        "type": "yt"
      },
      {
        "title": "Multi-Agent Collaboration",
        "url": "https://youtu.be/X3XJeTApVMM?si=n63Awybgx9ni13fj",
        "type": "yt"
      },
      {
        "title": "Tool Calling in AI",
        "url": "https://youtu.be/h8gMhXYAv1k?si=2OXnkTk6QkG128Tg",
        "type": "yt"
      },
      {
        "title": "Memory in AI Agents",
        "url": "https://youtu.be/W2HVdB4Jbjs?si=PD9EidkG3tKa0203",
        "type": "yt"
      },
      {
        "title": "Build AI Sales Agent with n8n + Claude",
        "url": "https://youtu.be/uAtSMEBosGU?si=dL8dQh5TlG5z2W0Y",
        "type": "yt"
      },
      {
        "title": "Advanced AI agents for marketing/research",
        "url": "https://youtu.be/Sjc7rcblJY4?si=zX87UeoQKUvT467f",
        "type": "yt"
      },
      {
        "title": "AI-assisted decision-making systems",
        "url": "https://youtu.be/8lo1s29ODj8?si=_N8ZhOdMR6z3I17r",
        "type": "yt"
      }
    ,
      {
        "title": "MCP & Tool Integration",
        "url": "https://www.youtube.com/watch?v=5xqFjh56AwM",
        "type": "yt"
      },
      {
        "title": "Simulating Autonomous Agentic Workflows",
        "url": "https://www.youtube.com/watch?v=uXVLyJJLEKA",
        "type": "yt"
      },
      {
        "title": "Engineering Agentic Pipelines",
        "url": "https://www.youtube.com/watch?v=eooxQPZQUEM",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "LangChain Documentation",
        "url": "https://python.langchain.com",
        "type": "guide",
        "provider": "LangChain",
        "description": "The definitive resource for integrating large language models with external data sources, memory, and tools to build robust, agentic AI applications."
      },
      {
        "title": "CrewAI Documentation",
        "url": "https://docs.crewai.com",
        "type": "guide",
        "provider": "CrewAI",
        "description": "Detailed instructions on designing and orchestrating autonomous AI agents that collaborate and execute complex multi-step tasks independently."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Multi-Agent Research System",
        "url": "https://youtu.be/SNwqkdhv1HQ?si=aaZ6cW3TKPPkbrhY",
        "outcome": "An autonomous AI agent system that performs complex research tasks.",
        "steps": [
          "Define roles",
          "Set up tools",
          "Implement memory",
          "Deploy"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/EI5VmqNsjzg?si=aPTI-aVZpo9cQkRa",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "LangChain",
        "url": "https://langchain.com"
      },
      {
        "name": "CrewAI",
        "url": "https://crewai.com"
      }
    ],
    "tasks": [
      {
        "id": "p5-t1",
        "label": "AI sales agent that books calls"
      },
      {
        "id": "p5-t2",
        "label": "AI research assistant with memory"
      },
      {
        "id": "p5-t3",
        "label": "Multi-agent workflow using CrewAI"
      }
    ],
    "project": {
      "title": "Autonomous AI Agents",
      "description": "Build advanced AI agents capable of autonomous decision-making and task execution.",
      "deliverables": [
        "Agent Workflow",
        "Tool Integrations"
      ],
      "sellingStrategy": {
        "pricing": "300,000 - 1,500,000 NGN ($200 - $1,000+)",
        "whereToFind": [
          "Tech Startups",
          "Enterprise",
          "Agencies",
          "LinkedIn, specialized freelance networks"
        ],
        "pitch": "I build advanced AI agents capable of autonomous decision-making and task execution. These systems can handle complex, multi-step processes like customer support resolution, market research, and data analysis without human intervention."
      }
    }
  },
  {
    "id": "p6",
    "number": "06",
    "title": "GIT AND GITHUB FULL COURSES",
    "badge": "Dev Basics",
    "weeks": "WEEKS 18-19",
    "objective": "Host your work. Version your code. Look like a pro.",
    "color": "text-slate-400",
    "resources": [
      {
        "title": "Git & GitHub Full Course",
        "url": "https://youtu.be/S7XpTAnSDL4?si=HAB-QBmIMsPjEfEb",
        "type": "yt"
      },
      {
        "title": "How to Deploy to GitHub Pages",
        "url": "https://youtu.be/QyFcl_Fba-k?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "Git Workflow — Branches, Commits, Push",
        "url": "https://youtu.be/e2IbNHi4uCI?si=tsUSt1FIOKEKD1ZX",
        "type": "yt"
      },
      {
        "title": "How to Deploy a Website to GitHub Pages",
        "url": "https://youtu.be/e5AwNU3Y2es?si=rhArmZhdo157pDzn",
        "type": "yt"
      },
      {
        "title": "Advanced Git branching strategies",
        "url": "https://youtu.be/Uszj_k0DGsg?si=mEXUpxInKL3kSupd",
        "type": "yt"
      },
      {
        "title": "GitHub Actions & CI/CD",
        "url": "https://youtu.be/YLtlz88zrLg?si=KiGzTgUhKFilkxbx",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "GitHub Skills",
        "url": "https://skills.github.com",
        "type": "certification",
        "provider": "GitHub",
        "description": "Interactive, hands-on tutorials hosted directly on GitHub that teach version control, collaborative workflows, and CI/CD pipelines using GitHub Actions."
      }
    ],
    "followAlongProjects": [
      {
        "title": "CI/CD Pipeline",
        "url": "https://youtu.be/scEDHsr3APg?si=1a2b3c4d5e6f7g8h",
        "outcome": "Automated deployment pipeline.",
        "steps": [
          "Init repo",
          "Config Actions",
          "Connect Vercel",
          "Deploy"
        ]
      }
    ],
    "tools": [
      {
        "name": "GitHub",
        "url": "https://github.com"
      },
      {
        "name": "Git",
        "url": "https://git-scm.com"
      }
    ],
    "tasks": [
      {
        "id": "p6-t1",
        "label": "Host all previous projects on GitHub"
      },
      {
        "id": "p6-t2",
        "label": "Deploy one project live on Vercel/Pages"
      },
      {
        "id": "p6-t3",
        "label": "Complete GitHub Skills 'Intro to GitHub'"
      }
    ],
    "project": {
      "title": "Version Control Setup",
      "description": "Set up version control and deployment pipelines.",
      "deliverables": [
        "GitHub Profile",
        "Live Deployments"
      ],
      "sellingStrategy": {
        "pricing": "Included in development projects",
        "whereToFind": [
          "Development teams",
          "Open source",
          "Freelance clients"
        ],
        "pitch": "I ensure all code is properly versioned and deployed using industry-standard tools like Git and GitHub, providing a professional and reliable development process."
      }
    }
  },
  {
    "id": "p6-5",
    "number": "6.5",
    "title": "RUN AI MODELS FROM GITHUB AND HUGGINGFACE",
    "badge": "AI Deployment",
    "weeks": "WEEKS 19.5",
    "objective": "Deploy open-source AI models.",
    "color": "text-purple-400",
    "resources": [
      {
        "title": "Hugging Face Full Course",
        "url": "https://youtu.be/00GKzGyWFEs?si=1l2I6yK3m6K_e0D9",
        "type": "yt"
      },
      {
        "title": "Deploy AI Models Locally",
        "url": "https://youtu.be/sPzc6hMg7So?si=8YhP9x-7Vn4B1c3E",
        "type": "yt"
      },
      {
        "title": "HuggingFace Models Tutorial",
        "url": "https://youtu.be/3kRB2TXewus?si=MqclwmRPPq94Bjc2",
        "type": "yt"
      },
      {
        "title": "GitHub-hosted AI model deployment",
        "url": "https://youtu.be/WiBB8Lsgl7I?si=F7f_ZhdUhVhrDTls",
        "type": "yt"
      },
      {
        "title": "API integration with websites",
        "url": "https://youtu.be/WXsD0ZgxjRw?si=5U3hbtUYf3WF_b6l",
        "type": "yt"
      },
      {
        "title": "Model optimization & quantization",
        "url": "https://youtu.be/K75j8MkwgJ0?si=kdjLFPagvz1mXWtU",
        "type": "yt"
      },
      {
        "title": "Fine-tuning pre-trained models",
        "url": "https://youtu.be/iOdFUJiB0Zc?si=oY5cw583cSvOdzlI",
        "type": "yt"
      },
      {
        "title": "Deployment on cloud platforms",
        "url": "https://youtu.be/vROMXzOWqec?si=eZUSUwIPEdAkoOS3",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Hugging Face Course",
        "url": "https://huggingface.co/course",
        "type": "course",
        "provider": "Hugging Face",
        "description": "An intensive, practical course on natural language processing, transformer models, and deploying open-source machine learning models using the Hugging Face ecosystem."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Local AI Model Deployment",
        "url": "https://youtu.be/zkXonmqIBFg?si=4bi5hpsr3zKFYoC",
        "outcome": "A locally running open-source AI model.",
        "steps": [
          "Download model",
          "Set up environment",
          "Run inference",
          "Build API"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/fXUT87PzKKs?si=L8pa61NFhCRWpamZ",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Hugging Face",
        "url": "https://huggingface.co"
      },
      {
        "name": "Ollama",
        "url": "https://ollama.com"
      }
    ],
    "tasks": [
      {
        "id": "p65-t1",
        "label": "Run a local LLM using Ollama"
      },
      {
        "id": "p65-t2",
        "label": "Deploy a Hugging Face model via API"
      }
    ],
    "project": {
      "title": "Open-Source AI Deployment",
      "description": "Deploy and integrate open-source AI models for specific business use cases.",
      "deliverables": [
        "Local Model Setup",
        "API Integration"
      ],
      "sellingStrategy": {
        "pricing": "100,000 - 400,000 NGN ($70 - $250)",
        "whereToFind": [
          "Startups",
          "Researchers",
          "Tech companies"
        ],
        "pitch": "I help businesses leverage powerful open-source AI models by deploying them locally or via cloud APIs, ensuring data privacy and reducing reliance on expensive proprietary models."
      }
    }
  },
  {
    "id": "p7",
    "number": "07",
    "title": "3D WEB DEVELOPMENT (NO CODE)",
    "badge": "Premium Web",
    "weeks": "WEEKS 20-22",
    "objective": "Build premium-tier websites with 3D elements.",
    "color": "text-fuchsia-400",
    "resources": [
      {
        "title": "Spline 3D Website Tutorial",
        "url": "https://youtu.be/7vMRRT6nhKI?si=1a2b3c4d5e6f7g8h",
        "type": "yt"
      },
      {
        "title": "Webflow + Spline Integration",
        "url": "https://youtu.be/Q7AOvWpIVHU?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "Spline 3D Web Design",
        "url": "https://youtu.be/7vMRRT6nhKI?si=OxYv4dtEks9vvfEq",
        "type": "yt"
      },
      {
        "title": "Interactive Landing Pages",
        "url": "https://youtu.be/rL98raGvE_k?si=iPouQ8QNcYCTC23",
        "type": "yt"
      },
      {
        "title": "AI 3D design tools (Runway, Kaedim, Spline AI)",
        "url": "https://youtu.be/S9UQItTpwUQ?si=4A3ybgLSvONBG5eZ / https://youtu.be/QS5QINGGzZQ?si=Sd7BT_U1m0slug08",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Spline Community Tutorials",
        "url": "https://docs.spline.design",
        "type": "guide",
        "provider": "Spline",
        "description": "A comprehensive library of guides for creating immersive 3D web experiences, interactive scenes, and animations directly in the browser."
      }
    ],
    "followAlongProjects": [
      {
        "title": "3D Interactive Landing Page",
        "url": "https://youtu.be/JtXVOHKDpHk?si=2l3k4j5h6g7f8d9s",
        "outcome": "A premium 3D website.",
        "steps": [
          "Model in Spline",
          "Export",
          "Integrate in Webflow",
          "Add interactions"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/T1VOVArT9YI?si=1Fg5eMxPfgZiUPP6",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Spline",
        "url": "https://spline.design"
      },
      {
        "name": "Webflow",
        "url": "https://webflow.com"
      }
    ],
    "tasks": [
      {
        "id": "p7-t1",
        "label": "Create a 3D animated landing page"
      },
      {
        "id": "p7-t2",
        "label": "Build an interactive 3D product showcase"
      }
    ],
    "project": {
      "title": "Immersive 3D Web Experience",
      "description": "Design high-end websites with interactive 3D elements.",
      "deliverables": [
        "Live 3D Website",
        "Spline Scene"
      ],
      "sellingStrategy": {
        "pricing": "200,000 - 800,000 NGN ($150 - $550)",
        "whereToFind": [
          "Luxury Brands",
          "Tech Startups",
          "Creative Agencies"
        ],
        "pitch": "I build immersive 3D web experiences that captivate users and elevate brand perception, moving beyond standard flat designs."
      }
    }
  },
  {
    "id": "p8",
    "number": "08",
    "title": "HTML, CSS, JS",
    "badge": "Code Foundations",
    "weeks": "WEEKS 23-26",
    "objective": "Own your code. Build custom components.",
    "color": "text-yellow-400",
    "resources": [
      {
        "title": "HTML Full Course",
        "url": "https://youtu.be/kUMe1FH4CHE?si=-hx9G_O_MWiYZtzY",
        "type": "yt"
      },
      {
        "title": "CSS Tutorial Full Course",
        "url": "https://youtu.be/ieTHC78giGQ?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "JavaScript Full Course",
        "url": "https://youtu.be/PkZNo7MFNFg?si=_heUqQd0xKvEPzgD",
        "type": "yt"
      },
      {
        "title": "CSS Full Course",
        "url": "https://youtu.be/OXGznpKZ_sA?si=ulm7EMDn1KONkTT2",
        "type": "yt"
      },
      {
        "title": "JS DOM Manipulation",
        "url": "https://youtu.be/5fb2aPlgoys?si=5FuTCnacxkGr2llg",
        "type": "yt"
      },
      {
        "title": "Build Interactive Website",
        "url": "https://youtu.be/moRqo158NGc?si=Av-uAnWITgMqxYB3",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Responsive Web Design",
        "url": "https://www.freecodecamp.org/learn/responsive-web-design",
        "type": "certification",
        "provider": "freeCodeCamp",
        "description": "A rigorous certification from freeCodeCamp covering HTML, CSS, Flexbox, and CSS Grid to ensure applications are mobile-friendly and perfectly responsive."
      },
      {
        "title": "JavaScript Algorithms",
        "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8",
        "type": "certification",
        "provider": "freeCodeCamp",
        "description": "An essential credential verifying a deep understanding of JavaScript fundamentals, complex data structures, and algorithmic problem-solving techniques."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Responsive Site from Scratch",
        "url": "https://youtu.be/pQN-pnXPaVg?si=1a2b3c4d5e6f7g8h",
        "outcome": "A modern, fully responsive website.",
        "steps": [
          "Write HTML",
          "Build CSS",
          "Add JS",
          "Optimize"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/0YFrGy_mzjY?si=SWy70VBGLk8xLIht",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "VS Code",
        "url": "https://code.visualstudio.com"
      },
      {
        "name": "MDN Docs",
        "url": "https://developer.mozilla.org"
      }
    ],
    "tasks": [
      {
        "id": "p8-t1",
        "label": "Build an interactive website from scratch"
      },
      {
        "id": "p8-t2",
        "label": "Create 5 custom UI components"
      },
      {
        "id": "p8-t3",
        "label": "Complete freeCodeCamp Responsive Web Design"
      }
    ],
    "project": {
      "title": "Custom Web Development",
      "description": "Develop custom websites and components from scratch.",
      "deliverables": [
        "GitHub Repo",
        "Interactive Demo"
      ],
      "sellingStrategy": {
        "pricing": "150,000 - 600,000 NGN ($100 - $400)",
        "whereToFind": [
          "Startups",
          "Agencies",
          "Indie Hackers"
        ],
        "pitch": "I build custom web experiences from scratch — no templates, no limitations. Faster, cleaner, and unique."
      }
    }
  },
  {
    "id": "p8-5",
    "number": "8.5",
    "title": "3D WEB DEVELOPMENT (CODE)",
    "badge": "Advanced Web",
    "weeks": "WEEKS 27-29",
    "objective": "Build advanced 3D experiences with code.",
    "color": "text-pink-500",
    "resources": [
      {
        "title": "Three.js Beginner Tutorial",
        "url": "https://youtu.be/Q7AOvWpIVHU?si=1r6F1k0H7r8y6x5s",
        "type": "yt"
      },
      {
        "title": "GSAP Animation Tutorial",
        "url": "https://youtu.be/1wn7oE7t71s?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "Three.js Full Tutorial",
        "url": "https://youtu.be/UMqNHi1GDAE?si=9Z9W64KKHbcqzqskx",
        "type": "yt"
      },
      {
        "title": "GSAP Animation",
        "url": "https://youtu.be/AW1yfBKRMKc?si=MTKcaB7kSIXkBhI4",
        "type": "yt"
      },
      {
        "title": "Interactive 3D Websites",
        "url": "https://youtu.be/kRQbRAJ4-Fs?si=MtsjnMoDkCEbhpCT",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Three.js Journey (Free)",
        "url": "https://threejs-journey.com",
        "type": "course",
        "provider": "Bruno Simon",
        "description": "A curated selection of lessons by Bruno Simon detailing the fundamentals of WebGL and creating stunning 3D graphics and particles with Three.js."
      }
    ],
    "followAlongProjects": [
      {
        "title": "3D Scrolling Experience",
        "url": "https://youtu.be/yrQpyA_WwvY?si=2l3k4j5h6g7f8d9s",
        "outcome": "A premium 3D website with GSAP.",
        "steps": [
          "Set up scene",
          "Import models",
          "Config GSAP",
          "Bind animations"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/ak1CP5tFpHE?si=bWWfCfpqZYp45Dgx",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Three.js",
        "url": "https://threejs.org"
      },
      {
        "name": "GSAP",
        "url": "https://gsap.com"
      }
    ],
    "tasks": [
      {
        "id": "p85-t1",
        "label": "Create a Three.js scene"
      },
      {
        "id": "p85-t2",
        "label": "Implement GSAP scroll animations"
      }
    ],
    "project": {
      "title": "Coded 3D Web Experience",
      "description": "Develop highly customized 3D web experiences using code.",
      "deliverables": [
        "Live 3D Website",
        "Source Code"
      ],
      "sellingStrategy": {
        "pricing": "500,000 - 3,000,000+ NGN ($350 - $2,000+)",
        "whereToFind": [
          "Luxury Brands",
          "Tech Startups",
          "Agencies"
        ],
        "pitch": "I develop highly customized 3D web experiences using code, allowing for unparalleled interactivity and performance."
      }
    }
  },
  {
    "id": "p9",
    "number": "09",
    "title": "BACKEND DEVELOPMENT (CODE)",
    "badge": "Backend",
    "weeks": "WEEKS 30-34",
    "objective": "Build complete apps with databases and auth.",
    "color": "text-blue-400",
    "resources": [
      {
        "title": "Node.js Full Course",
        "url": "https://youtu.be/Oe421EPjeBE?si=GOe2DcAJSTzOa_W5",
        "type": "yt"
      },
      {
        "title": "Supabase Database & Authentication",
        "url": "https://youtu.be/kyphLGnSz6Q?si=gU2mXIIZlMGZ_Adk",
        "type": "yt"
      },
      {
        "title": "Next.js Full Course",
        "url": "https://youtu.be/I1V9YWqRIeI?si=2l3k4j5h6g7f8d9s",
        "type": "yt"
      },
      {
        "title": "Firebase Auth",
        "url": "https://youtu.be/_L8j-ZC83y4?si=mWk5qgwwjlvOZ8qz",
        "type": "yt"
      }
    ,
      {
        "title": "Relational Databases & SQL Scripting",
        "url": "https://www.youtube.com/watch?v=SpfIwlAYaKk",
        "type": "yt"
      },
      {
        "title": "Architecting AI-Integrated Backends",
        "url": "https://www.youtube.com/watch?v=F5ZsLbBqWLU",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Back End Development",
        "url": "https://www.freecodecamp.org/learn/back-end-development-and-apis",
        "type": "certification",
        "provider": "freeCodeCamp",
        "description": "A practical certification focused on writing robust server-side code, building RESTful APIs, and managing databases using Node.js and Express."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/JiwTGGGIhDs?si=YklfC8Cb1cOvqneb",
        "outcome": "A functional application with auth and DB.",
        "steps": [
          "Set up Next.js",
          "Config Supabase",
          "Build API",
          "Create UI"
        ]
      }
    ],
    "tools": [
      {
        "name": "Node.js",
        "url": "https://nodejs.org"
      },
      {
        "name": "Supabase",
        "url": "https://supabase.com"
      },
      {
        "name": "Next.js",
        "url": "https://nextjs.org"
      }
    ],
    "tasks": [
      {
        "id": "p9-t1",
        "label": "Build a full stack app with auth + database"
      },
      {
        "id": "p9-t2",
        "label": "Create a user dashboard"
      },
      {
        "id": "p9-t3",
        "label": "Complete freeCodeCamp Back End cert"
      }
    ],
    "project": {
      "title": "Full-Stack Web Application",
      "description": "Develop robust backend systems and integrate them with frontend interfaces.",
      "deliverables": [
        "Live App URL",
        "GitHub Repo"
      ],
      "sellingStrategy": {
        "pricing": "500,000+ NGN ($350+)",
        "whereToFind": [
          "Founders",
          "Small Businesses",
          "Product Hunt"
        ],
        "pitch": "I build fully functional web applications that solve real business problems, from database architecture to frontend deployment."
      }
    }
  },
  {
    "id": "p9-5",
    "number": "9.5",
    "title": "BACKEND DEVELOPMENT (CODE) - Advanced",
    "badge": "Advanced Backend",
    "weeks": "WEEKS 35-36",
    "objective": "Advanced backend concepts.",
    "color": "text-blue-600",
    "resources": [
      {
        "title": "Advanced Node.js",
        "url": "https://youtu.be/ENrzD9HAZK4?si=1r6F1k0H7r8y6x5s",
        "type": "yt"
      },
      {
        "title": "Advanced Backend Integration",
        "url": "https://youtu.be/rOpEN1JDaD0?si=QnjrQ5JuiUtDv_1h",
        "type": "yt"
      },
      {
        "title": "API Design & Deployment",
        "url": "https://youtu.be/WXsD0ZgxjRw?si=VsYShwdUDn1uqxYy",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Node.js Best Practices",
        "url": "https://github.com/goldbergyoni/nodebestpractices",
        "type": "guide",
        "provider": "Community",
        "description": "A comprehensive, community-driven repository detailing architectural patterns, security guidelines, and performance optimization strategies for enterprise Node.js applications."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Scalable API",
        "url": "https://youtu.be/wm5gMKuwSYk?si=1a2b3c4d5e6f7g8h",
        "outcome": "A highly scalable API.",
        "steps": [
          "Design architecture",
          "Implement caching",
          "Optimize queries",
          "Deploy"
        ]
      }
    ],
    "tools": [
      {
        "name": "Docker",
        "url": "https://docker.com"
      },
      {
        "name": "Redis",
        "url": "https://redis.io"
      }
    ],
    "tasks": [
      {
        "id": "p95-t1",
        "label": "Implement caching in an API"
      },
      {
        "id": "p95-t2",
        "label": "Dockerize a Node.js application"
      }
    ],
    "project": {
      "title": "Scalable Backend Architecture",
      "description": "Design and implement highly scalable and performant backend systems.",
      "deliverables": [
        "Architecture Diagram",
        "Source Code"
      ],
      "sellingStrategy": {
        "pricing": "800,000+ NGN ($550+)",
        "whereToFind": [
          "Growing Startups",
          "Enterprise",
          "Tech Consultancies"
        ],
        "pitch": "I design and implement highly scalable and performant backend systems capable of handling significant traffic and complex data operations."
      }
    }
  },
  {
    "id": "p10",
    "number": "10",
    "title": "MICRO SAAS BUILDING (NO CODE)",
    "badge": "Product",
    "weeks": "WEEKS 37-40",
    "objective": "Build recurring revenue machines.",
    "color": "text-orange-500",
    "resources": [
      {
        "title": "How to Build a Micro SaaS",
        "url": "https://youtu.be/aQZkra1kEcg?si=1r6F1k0H7r8y6x5s",
        "type": "yt"
      },
      {
        "title": "SaaS MVP Tutorial",
        "url": "https://youtu.be/YwEEV0wHnaA?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "Stripe / Paystack Integration",
        "url": "https://youtu.be/LEmOAsyVC8k?si=KNa2tWkUb7moTcyi / https://youtu.be/4eN9by7m2eA?si=aMXZQdfIDihwpLsR",
        "type": "yt"
      },
      {
        "title": "Micro SaaS MVP",
        "url": "https://youtu.be/ChTGbmR2NeM?si=WQNzZXqnWR-1t6vc",
        "type": "yt"
      },
      {
        "title": "Launch Strategy",
        "url": "https://youtu.be/Ki3qBvIRo6A?si=YV6d4N0u1vK9xy3R",
        "type": "yt"
      }
    ,
      {
        "title": "Monetization & Payment Gateway Integration",
        "url": "https://www.youtube.com/watch?v=_YCC9Osq6y4",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Startup School",
        "url": "https://www.startupschool.org",
        "type": "course",
        "provider": "Y Combinator",
        "description": "Y Combinator's authoritative curriculum covering product-market fit, user acquisition, metrics, and the fundamentals of scaling a technology startup."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Micro SaaS with Stripe",
        "url": "https://youtu.be/InnFqk5RWgQ?si=1a2b3c4d5e6f7g8h",
        "outcome": "A live software product with subscriptions.",
        "steps": [
          "Set up Stripe",
          "Implement checkout",
          "Handle webhooks",
          "Manage users"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/aQZkra1kEcg?si=Yyj8BP1TEC7cTyva",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Stripe",
        "url": "https://stripe.com"
      },
      {
        "name": "Bubble",
        "url": "https://bubble.io"
      }
    ],
    "tasks": [
      {
        "id": "p10-t1",
        "label": "Build a MicroSaaS with subscription billing"
      },
      {
        "id": "p10-t2",
        "label": "Launch your product on Product Hunt"
      }
    ],
    "project": {
      "title": "Micro SaaS Product",
      "description": "Develop and launch a micro SaaS product using no-code tools.",
      "deliverables": [
        "Live SaaS Product",
        "Stripe Dashboard"
      ],
      "sellingStrategy": {
        "pricing": "5k - 50k NGN/mo ($3 - $35) per user",
        "whereToFind": [
          "Product Hunt",
          "Twitter",
          "Indie Hackers"
        ],
        "pitch": "I build specialized micro SaaS products that solve specific problems for niche audiences, creating recurring revenue streams."
      }
    }
  },
  {
    "id": "p10-5",
    "number": "10.5",
    "title": "CREATE AND DEPLOY AI TOOLS FOR BUSINESSES",
    "badge": "AI Tools",
    "weeks": "WEEKS 41-43",
    "objective": "Deploy custom AI tools.",
    "color": "text-emerald-500",
    "resources": [
      {
        "title": "AI SaaS MVP",
        "url": "https://youtu.be/_CttoOfvh1I?si=1DxXRB36kONxlTbk",
        "type": "yt"
      },
      {
        "title": "AI Tools Deployment for Enterprises",
        "url": "https://youtu.be/GWB9ApTPTv4?si=aLW4qHELgg2DUwyh",
        "type": "yt"
      },
      {
        "title": "Integrate AI with business workflow",
        "url": "https://youtu.be/w0H1-b044KY?si=0YBjRDTytJNWcW4t",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "OpenAI Cookbook",
        "url": "https://cookbook.openai.com",
        "type": "guide",
        "provider": "OpenAI",
        "description": "A highly technical repository of code examples, architectural patterns, and best practices for integrating OpenAI's APIs into production applications."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Custom Internal AI Tool",
        "url": "https://youtu.be/vspBGjmYeE0?si=9z2s1d3f4g5h6j7k",
        "outcome": "An internal AI tool for a business.",
        "steps": [
          "Identify need",
          "Build tool",
          "Deploy internally",
          "Train staff"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/_5ud3vEV3_M?si=bg-qSehiG_6Upiwb",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Retool",
        "url": "https://retool.com"
      },
      {
        "name": "OpenAI API",
        "url": "https://platform.openai.com"
      }
    ],
    "tasks": [
      {
        "id": "p105-t1",
        "label": "Build an internal AI tool for a specific business process"
      }
    ],
    "project": {
      "title": "Custom AI Business Tools",
      "description": "Develop and deploy custom AI tools to optimize internal business operations.",
      "deliverables": [
        "Deployed AI Tool",
        "User Guide"
      ],
      "sellingStrategy": {
        "pricing": "200,000 - 1,000,000 NGN ($150 - $700)",
        "whereToFind": [
          "Mid-size Businesses",
          "Agencies",
          "Consultants"
        ],
        "pitch": "I develop and deploy custom AI tools tailored to your specific business processes, significantly increasing efficiency and reducing operational costs."
      }
    }
  },
  {
    "id": "p11",
    "number": "11",
    "title": "SEO AND AEO IN 2026",
    "badge": "Marketing",
    "weeks": "WEEKS 44-46",
    "objective": "Master Search and AI Engine Optimization.",
    "color": "text-yellow-500",
    "resources": [
      {
        "title": "SEO Full Course",
        "url": "https://youtu.be/Qs0_Qu22v4M?si=_AeAeR7UdlVhQ6FI",
        "type": "yt"
      },
      {
        "title": "AEO Strategies",
        "url": "https://youtu.be/bhTo8fDmr5I?si=9z2s1d3f4g5h6j7k",
        "type": "yt"
      },
      {
        "title": "Programmatic SEO",
        "url": "https://youtu.be/RYyX752URYM?si=KzEWaS4ZnSv9gHb4",
        "type": "yt"
      },
      {
        "title": "AI SEO Tools (Surfer, ChatGPT)",
        "url": "https://youtu.be/PmKPtCUZlCE?si=1cUMr1TkVmtoQ2s4",
        "type": "yt"
      },
      {
        "title": "Google Search Console & Analytics 4",
        "url": "https://youtu.be/01NYa01j-1Y?si=h02Qpm4jyojDIFzc",
        "type": "yt"
      },
      {
        "title": "Pomelli AI SEO Tools",
        "url": "https://youtu.be/YfecCjUCuGQ?si=DQyka8ZcS5SyVyHd",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google Search Central",
        "url": "https://developers.google.com/search",
        "type": "guide",
        "provider": "Google",
        "description": "The official documentation from Google on SEO best practices, site indexing, and maximizing visibility in search engine results pages."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/LOLzw_ZkoIc?si=NlQngO8ebcDDHrL3",
        "outcome": "An optimized website.",
        "steps": [
          "Audit site",
          "Optimize content",
          "Implement schema",
          "Monitor rankings"
        ]
      }
    ],
    "tools": [
      {
        "name": "Ahrefs",
        "url": "https://ahrefs.com"
      },
      {
        "name": "Google Search Console",
        "url": "https://search.google.com/search-console"
      }
    ],
    "tasks": [
      {
        "id": "p11-t1",
        "label": "Perform an SEO audit on a website"
      },
      {
        "id": "p11-t2",
        "label": "Optimize content for AI overviews (AEO)"
      }
    ],
    "project": {
      "title": "Search Visibility Optimization",
      "description": "Optimize websites for both traditional search engines and emerging AI platforms.",
      "deliverables": [
        "SEO Audit Report",
        "Optimized Content"
      ],
      "sellingStrategy": {
        "pricing": "100,000 - 500,000 NGN/mo ($70 - $350/mo)",
        "whereToFind": [
          "E-commerce",
          "Local Businesses",
          "Content Creators"
        ],
        "pitch": "I optimize your digital presence for both traditional search engines and emerging AI platforms, ensuring your business remains visible and competitive in the evolving search landscape."
      }
    }
  },
  {
    "id": "p11-5",
    "number": "11.5",
    "title": "DIGITAL SETUPS FOR SELLING AND MARKETING TECH PRODUCTS",
    "badge": "Sales",
    "weeks": "WEEKS 47-49",
    "objective": "Set up systems to sell tech products.",
    "color": "text-red-500",
    "resources": [
      {
        "title": "Tech Sales Strategies",
        "url": "https://youtu.be/-UjLwDa5c8c?si=1r6F1k0H7r8y6x5s",
        "type": "yt"
      },
      {
        "title": "Digital Marketing Setup",
        "url": "https://youtu.be/h95cQkEWBx0?si=RZEB0hcN1whtKZOC",
        "type": "yt"
      },
      {
        "title": "Social Media Integration",
        "url": "https://youtu.be/t09ECV6VhTE?si=0pOliJ05_qLrvG7ID",
        "type": "yt"
      },
      {
        "title": "Product Storefronts (Gumroad, Lemon Squeezy)",
        "url": "https://youtu.be/NZhHu-Dd5Ys?si=thtp3MwVMqElpWBI / https://youtu.be/5E7fbdDJZK4?si=1yTSz8i5UQmdskQi / https://youtu.be/jhWb38VUDss?si=D0-pYBcAYyjvAJ0a",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "HubSpot Sales Software Cert",
        "url": "https://academy.hubspot.com",
        "type": "certification",
        "provider": "HubSpot",
        "description": "A professional certification covering inbound sales methodologies, CRM management, and automating the sales pipeline to maximize conversion rates."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Sales Funnel Setup",
        "url": "https://youtu.be/aQZkra1kEcg?si=9z2s1d3f4g5h6j7k",
        "outcome": "A complete sales funnel.",
        "steps": [
          "Design funnel",
          "Set up CRM",
          "Create email sequence",
          "Launch"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/A2boaRR5iEU?si=doaBG_fEoNXdi2dG",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "HubSpot",
        "url": "https://hubspot.com"
      },
      {
        "name": "ActiveCampaign",
        "url": "https://activecampaign.com"
      }
    ],
    "tasks": [
      {
        "id": "p115-t1",
        "label": "Set up a complete sales funnel for a tech product"
      }
    ],
    "project": {
      "title": "Tech Product Sales System",
      "description": "Design and implement comprehensive digital setups for marketing and selling technology products.",
      "deliverables": [
        "Sales Funnel",
        "CRM Configuration"
      ],
      "sellingStrategy": {
        "pricing": "300,000 - 1,000,000 NGN ($200 - $700)",
        "whereToFind": [
          "SaaS Startups",
          "Tech Founders",
          "Agencies"
        ],
        "pitch": "I design and implement comprehensive digital setups for marketing and selling technology products, from lead generation funnels to CRM integration and automated follow-ups."
      }
    }
  },
  {
    "id": "p12",
    "number": "12",
    "title": "FULL SAAS (NO CODE)",
    "badge": "Enterprise",
    "weeks": "WEEKS 50-52",
    "objective": "Build complex SaaS applications without code.",
    "color": "text-purple-600",
    "resources": [
      {
        "title": "Bubble Full Course",
        "url": "https://youtu.be/n8iM5Oeiz9k?si=1r6F1k0H7r8y6x5s",
        "type": "yt"
      },
      {
        "title": "SaaS MVP Setup",
        "url": "https://youtu.be/1hHMwLxN6EM?si=SihoB3i3CEUIHcQC",
        "type": "yt"
      },
      {
        "title": "Full Stack SaaS",
        "url": "https://youtu.be/RkYIWg5XAnI?si=CBpCemIkJrIHdG-K",
        "type": "yt"
      },
      {
        "title": "Subscription Revenue System",
        "url": "https://youtu.be/T3b8ijT27f4?si=NPPs7HkbU0FXBHzL",
        "type": "yt"
      },
      {
        "title": "Launch & Scale",
        "url": "https://youtu.be/r-98YRAF1dY?si=oTNttEuhi6r4tUNI",
        "type": "yt"
      }
    ,
      {
        "title": "Cross-Platform AI Mobile Development",
        "url": "https://www.youtube.com/watch?v=VPvVD8t02U8",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Bubble Academy",
        "url": "https://bubble.io/academy",
        "type": "course",
        "provider": "Bubble",
        "description": "Extensive tutorials and courses teaching you how to architect complex logic, databases, and responsive interfaces using the Bubble no-code platform."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Complex SaaS Application",
        "url": "https://youtu.be/aQZkra1kEcg?si=9z2s1d3f4g5h6j7k",
        "outcome": "A fully functional SaaS.",
        "steps": [
          "Design database",
          "Build workflows",
          "Create UI",
          "Launch"
        ]
      },
      {
        "title": "Follow Along Project",
        "url": "https://youtu.be/xTtynSB1Aak?si=f_txpGwow_nQZtvs",
        "outcome": "Project outcome",
        "steps": []
      }
    ],
    "tools": [
      {
        "name": "Bubble",
        "url": "https://bubble.io"
      },
      {
        "name": "Xano",
        "url": "https://xano.com"
      }
    ],
    "tasks": [
      {
        "id": "p12-t1",
        "label": "Build a complex SaaS application using Bubble"
      }
    ],
    "project": {
      "title": "Enterprise No-Code SaaS",
      "description": "Develop complex, scalable SaaS applications using advanced no-code platforms.",
      "deliverables": [
        "Live SaaS Application",
        "Database Architecture"
      ],
      "sellingStrategy": {
        "pricing": "1,000,000+ NGN ($700+)",
        "whereToFind": [
          "Enterprise Clients",
          "Funded Startups",
          "Established Businesses"
        ],
        "pitch": "I develop complex, scalable SaaS applications using advanced no-code platforms, delivering enterprise-grade solutions in a fraction of the time required for traditional development."
      }
    }
  }
];


export const VIDEO_PHASES: Phase[] = [
  {
    "id": "v-p1",
    "number": "01",
    "title": "FOUNDATIONS OF AI VIDEO CREATION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 1",
    "objective": "Master Foundations of AI Video Creation",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "Best AI Video Generators Right Now (2026)",
        "url": "https://www.youtube.com/watch?v=vPqSgj8Ta3Y",
        "type": "yt"
      },
      {
        "title": "Generative AI in a Nutshell",
        "url": "https://www.youtube.com/watch?v=2IK3DFHRFfw",
        "type": "yt"
      },
      {
        "title": "Diffusion Models Explained",
        "url": "https://www.youtube.com/watch?v=TudVdrwbIuc",
        "type": "yt"
      },
      {
        "title": "How to build an Automated AI Video Production Pipeline",
        "url": "https://www.youtube.com/watch?v=1iYH5EJUkC8",
        "type": "yt"
      },
      {
        "title": "AI Ethics & Responsible Use",
        "url": "https://www.youtube.com/watch?v=4hQy69gCbN0",
        "type": "yt"
      },
      {
        "title": "How to Start Making AI Videos in 2026 - Full Course",
        "url": "https://www.youtube.com/watch?v=gY9KTfMGauU",
        "type": "yt"
      },
      {
        "title": "How to Make Full Cartoon Animation Stories",
        "url": "https://www.youtube.com/watch?v=T9dfP6bC2RY",
        "type": "yt"
      },
      {
        "title": "Wan 2.2 Animate: FREE AI Character Swap",
        "url": "https://www.youtube.com/watch?v=woCP1Q_Htwo",
        "type": "yt"
      },
      {
        "title": "How to Create Videos with Pika Labs!",
        "url": "https://www.youtube.com/watch?v=jEg4hQJjiZY",
        "type": "yt"
      },
      {
        "title": "Free AI Video Generator on Your PC",
        "url": "https://www.youtube.com/watch?v=G2Ec3h5CfA8",
        "type": "yt"
      },
      {
        "title": "What Is Hugging Face and How To Use It",
        "url": "https://www.youtube.com/watch?v=3kRB2TXewus",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Microsoft Generative AI for Beginners",
        "url": "https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/",
        "type": "course",
        "provider": "Microsoft",
        "description": "Covers the fundamentals of Generative AI, LLMs, and prompt engineering from Microsoft."
      },
      {
        "title": "Microsoft companion GitHub lessons",
        "url": "https://github.com/microsoft/generative-ai-for-beginners",
        "type": "guide",
        "provider": "Microsoft",
        "description": "Practical repository with code examples and notebooks for the Microsoft Generative AI course."
      },
      {
        "title": "Google Skills: Introduction to Generative AI",
        "url": "https://www.skills.google/course_templates/536",
        "type": "course",
        "provider": "Google",
        "description": "Google's introductory guide covering AI basics, large language models, and responsible AI."
      },
      {
        "title": "IBM SkillsBuild: AI Fundamentals",
        "url": "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence",
        "type": "course",
        "provider": "IBM",
        "description": "Learn the basics of AI, machine learning, deep learning, and neural networks with IBM."
      },
      {
        "title": "C2PA Content Credentials spec",
        "url": "https://c2pa.org/specifications/specifications/2.2/index.html",
        "type": "guide",
        "provider": "C2PA",
        "description": "The official standard for digital provenance, deepfake labeling, and media authenticity."
      },
      {
        "title": "IBM SkillsBuild credentials",
        "url": "https://skillsbuild.org/credentials",
        "type": "certification",
        "provider": "IBM",
        "description": "Earned badge demonstrating foundational understanding of artificial intelligence concepts."
      },
      {
        "title": "Google Cloud Skills Boost paths",
        "url": "https://www.cloudskillsboost.google/paths",
        "type": "certification",
        "provider": "Google",
        "description": "Learning paths for cloud architecture, data engineering, and generative AI on Google Cloud."
      }
    ],
    "followAlongProjects": [
      {
        "title": "AI Video Model Benchmark & Setup",
        "url": "https://www.youtube.com/watch?v=vPqSgj8Ta3Y",
        "outcome": "A 5-second comparative generation testing text-to-video prompt fidelity across two leading video models.",
        "steps": [
          "Select baseline prompt",
          "Generate 4-second test clip",
          "Adjust motion and camera parameters",
          "Evaluate temporal consistency and export"
        ]
      }
    ],
    "tools": [
      {
        "name": "Hugging Face",
        "url": "#"
      },
      {
        "name": "Pika Labs",
        "url": "#"
      },
      {
        "name": "Wan 2.2",
        "url": "#"
      }
    ],
    "project": {
      "title": "Conceptual AI Video Transformation",
      "description": "Create a 30-second conceptual AI video showcasing a transformation from a text prompt to a fully rendered video scene using at least two different AI generators.",
      "deliverables": [
        "Understand the core concepts of Generative AI, diffusion models, and the ethical use of AI in video production."
      ],
      "sellingStrategy": {
        "pricing": "₦150,000 / $100 per conceptual video",
        "whereToFind": [
          "Local digital marketing agencies",
          "Small business owners",
          "Tech startups on LinkedIn"
        ],
        "pitch": "Hi [Name], I noticed [Company] is scaling its digital presence. I specialize in rapid AI video production, creating high-quality conceptual videos that cost a fraction of traditional shoots. I'd love to show you a 30-second sample I generated for your brand."
      }
    },
    "tasks": [
      {
        "id": "v-p1-t0",
        "label": "Watch: Best AI Video Generators Right Now (2026)"
      },
      {
        "id": "v-p1-t1",
        "label": "Watch: Generative AI in a Nutshell"
      },
      {
        "id": "v-p1-t2",
        "label": "Watch: Diffusion Models Explained"
      },
      {
        "id": "v-p1-t3",
        "label": "Watch: How to build an Automated AI Video Production Pipeline"
      },
      {
        "id": "v-p1-t4",
        "label": "Watch: AI Ethics & Responsible Use"
      },
      {
        "id": "v-p1-t5",
        "label": "Watch: How to Start Making AI Videos in 2026 - Full Course"
      },
      {
        "id": "v-p1-t6",
        "label": "Watch: How to Make Full Cartoon Animation Stories"
      },
      {
        "id": "v-p1-t7",
        "label": "Watch: Wan 2.2 Animate: FREE AI Character Swap"
      },
      {
        "id": "v-p1-t8",
        "label": "Watch: How to Create Videos with Pika Labs!"
      },
      {
        "id": "v-p1-t9",
        "label": "Watch: Free AI Video Generator on Your PC"
      },
      {
        "id": "v-p1-t10",
        "label": "Watch: What Is Hugging Face and How To Use It"
      }
    ]
  },
  {
    "id": "v-p2",
    "number": "02",
    "title": "PROMPT ENGINEERING FOR VIDEO GENERATION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 2",
    "objective": "Master Prompt Engineering for Video Generation",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "How to Write PERFECT Prompts for AI Video",
        "url": "https://www.youtube.com/watch?v=MlJ6zXOYrb0",
        "type": "yt"
      },
      {
        "title": "The ONLY 7 Prompts You Need to Create Any AI Video",
        "url": "https://www.youtube.com/watch?v=zzBmvzR-URg",
        "type": "yt"
      },
      {
        "title": "AI prompting guide",
        "url": "https://www.youtube.com/watch?v=2wSuJK0_G5g",
        "type": "yt"
      },
      {
        "title": "Why My AI Videos look Ultra Realistic",
        "url": "https://www.youtube.com/watch?v=0B_xyflXrwc",
        "type": "yt"
      },
      {
        "title": "Iterative Refinement",
        "url": "https://www.youtube.com/watch?v=jJklCOOsiHI",
        "type": "yt"
      },
      {
        "title": "How to Start Making AI Videos in 2026",
        "url": "https://www.youtube.com/watch?v=59OsoZ3TxOM",
        "type": "yt"
      },
      {
        "title": "Build Your Prompt Library in Under 10 Minutes!",
        "url": "https://www.youtube.com/watch?v=Zv_tUYPG2NA",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Microsoft prompt engineering fundamentals",
        "url": "https://github.com/microsoft/generative-ai-for-beginners/tree/main/04-prompt-engineering-fundamentals",
        "type": "guide",
        "provider": "Microsoft",
        "description": "Learn how to write effective prompts to get desired outcomes from AI models."
      },
      {
        "title": "Google Gemini prompting guide",
        "url": "https://ai.google.dev/gemini-api/docs/prompting-intro",
        "type": "guide",
        "provider": "Google",
        "description": "Official documentation on how to craft optimal prompts for Google's Gemini models."
      },
      {
        "title": "OpenAI prompt engineering guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "type": "guide",
        "provider": "OpenAI",
        "description": "Best practices for writing prompts for GPT models, including tactics for better reasoning."
      },
      {
        "title": "ChatGPT Prompt Engineering for Developers",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "type": "course",
        "provider": "OpenAI",
        "description": "DeepLearning.AI course on using LLM APIs to build applications and automate tasks."
      },
      {
        "title": "IBM SkillsBuild generative AI learning",
        "url": "https://skillsbuild.org/college-students/course-catalog/generative-ai",
        "type": "certification",
        "provider": "IBM",
        "description": "Course covering how generative AI works, its applications, and ethical considerations."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Cinematic Lighting & Camera Move Suite",
        "url": "https://www.youtube.com/watch?v=zkXonmqIBFg",
        "outcome": "A sequence of video shots demonstrating dolly zoom, golden hour rim lighting, and drone orbit perspectives.",
        "steps": [
          "Write structured lighting and atmosphere prompt",
          "Specify camera lens and movement attributes",
          "Apply negative prompt constraints",
          "Render sequential cinematic angle shots"
        ]
      }
    ],
    "tools": [
      {
        "name": "Midjourney",
        "url": "#"
      },
      {
        "name": "ChatGPT",
        "url": "#"
      },
      {
        "name": "Notion",
        "url": "#"
      }
    ],
    "project": {
      "title": "Master Prompt Library & Showcase",
      "description": "Compile a master library of 20 tested video prompts and use them to generate a 1-minute compilation video demonstrating diverse styles (realistic, anime, cinematic).",
      "deliverables": [
        "Master the art of crafting perfect text prompts and iterative refinement to get consistent, ultra-realistic video outputs."
      ],
      "sellingStrategy": {
        "pricing": "₦200,000 / $150 for a custom prompt library and short promotional video",
        "whereToFind": [
          "Content creators on YouTube",
          "Independent filmmakers",
          "Marketing teams on Upwork"
        ],
        "pitch": "Hi [Name], great visuals are key to engagement, but achieving the exact look you want can be time-consuming. I build custom AI prompt libraries and generate ultra-realistic video assets tailored to your brand's style. Let's save your team hours of trial and error."
      }
    },
    "tasks": [
      {
        "id": "v-p2-t0",
        "label": "Watch: How to Write PERFECT Prompts for AI Video"
      },
      {
        "id": "v-p2-t1",
        "label": "Watch: The ONLY 7 Prompts You Need to Create Any AI Video"
      },
      {
        "id": "v-p2-t2",
        "label": "Watch: AI prompting guide"
      },
      {
        "id": "v-p2-t3",
        "label": "Watch: Why My AI Videos look Ultra Realistic"
      },
      {
        "id": "v-p2-t4",
        "label": "Watch: Iterative Refinement"
      },
      {
        "id": "v-p2-t5",
        "label": "Watch: How to Start Making AI Videos in 2026"
      },
      {
        "id": "v-p2-t6",
        "label": "Watch: Build Your Prompt Library in Under 10 Minutes!"
      }
    ]
  },
  {
    "id": "v-p3",
    "number": "03",
    "title": "SCRIPTWRITING & STORY DEVELOPMENT",
    "badge": "AI Video Animation",
    "weeks": "MODULE 3",
    "objective": "Master Scriptwriting & Story Development",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "Best LLM for Script Writing",
        "url": "https://www.youtube.com/watch?v=lVB94xXjPCw",
        "type": "yt"
      },
      {
        "title": "EXACTLY How to Write INSANELY Good YouTube Scripts with AI",
        "url": "https://www.youtube.com/watch?v=jaOIw-NiEPM",
        "type": "yt"
      },
      {
        "title": "Three Act Structure Explained",
        "url": "https://www.youtube.com/watch?v=tvqjp1CxxD8",
        "type": "yt"
      },
      {
        "title": "Fiction Genres Explained",
        "url": "https://www.youtube.com/watch?v=tnpgfCqR1UM",
        "type": "yt"
      },
      {
        "title": "How to Write a 30 Second Commercial Video Script",
        "url": "https://www.youtube.com/watch?v=DDlUVbQTsso",
        "type": "yt"
      },
      {
        "title": "How to Write A Short Film Script",
        "url": "https://www.youtube.com/watch?v=_9eaz0o-rk8",
        "type": "yt"
      },
      {
        "title": "how i write 6 figure ugc ad scripts",
        "url": "https://www.youtube.com/watch?v=0kIpeoVsFX8",
        "type": "yt"
      },
      {
        "title": "How to Generate Realistic Dialogue Based AI Scripts",
        "url": "https://www.youtube.com/watch?v=4uZuQxSChY8",
        "type": "yt"
      },
      {
        "title": "Google AI Studio Just DESTROYED ElevenLabs",
        "url": "https://www.youtube.com/watch?v=pY6Yu64B310",
        "type": "yt"
      },
      {
        "title": "How To Get Started With Storyboarder.ai",
        "url": "https://www.youtube.com/watch?v=JbgpeX8rMXQ",
        "type": "yt"
      },
      {
        "title": "Turn Any Script Into a Visual Storyboard With Google Flow Tool",
        "url": "https://www.youtube.com/watch?v=553ZO8ur1vk",
        "type": "yt"
      },
      {
        "title": "The Exact Claude Project Setup For YouTube Script Writing",
        "url": "https://www.youtube.com/watch?v=y2EN4rp2Zmk",
        "type": "yt"
      },
      {
        "title": "Write UGC Ad Scripts That SELL",
        "url": "https://www.youtube.com/watch?v=ieXIQ89wb-E",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "StudioBinder screenwriting guide",
        "url": "https://www.studiobinder.com/blog/screenwriting/",
        "type": "guide",
        "provider": "Community",
        "description": "Comprehensive guide on screenplay formatting, narrative structure, and storytelling."
      },
      {
        "title": "BBC Academy writing skills",
        "url": "https://www.bbc.co.uk/academy/en/skills/writing",
        "type": "guide",
        "provider": "BBC",
        "description": "Expert advice on writing for television, radio, and digital media from the BBC."
      },
      {
        "title": "Storyboard That storyboarding guide",
        "url": "https://www.storyboardthat.com/articles/e/storyboarding",
        "type": "guide",
        "provider": "Community",
        "description": "Learn the basics of storyboarding, shot composition, and visual storytelling."
      },
      {
        "title": "OpenAI prompt engineering guide for assisted writing",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "type": "guide",
        "provider": "OpenAI",
        "description": "Tips on using AI to brainstorm, outline, and refine creative writing and scripts."
      },
      {
        "title": "HubSpot Content Marketing Certification",
        "url": "https://academy.hubspot.com/courses/content-marketing",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Certification covering content strategy, storytelling, content creation, and promotion."
      }
    ],
    "followAlongProjects": [
      {
        "title": "AI-Assisted Three-Act Sci-Fi Script",
        "url": "https://www.youtube.com/watch?v=SNwqkdhv1HQ",
        "outcome": "A complete 90-second formatted screenplay with scene numbers, visual prompt tags, and dialogue beats.",
        "steps": [
          "Outline three-act story structure and climax in Claude",
          "Generate shot-by-shot visual camera descriptions",
          "Format dialogue cues for ElevenLabs voiceover",
          "Review scene pacing and visual beat timestamps"
        ]
      }
    ],
    "tools": [
      {
        "name": "Claude",
        "url": "#"
      },
      {
        "name": "Google AI Studio",
        "url": "#"
      },
      {
        "name": "Storyboarder.ai",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI Scripting & Storyboarding",
      "description": "Write a complete 3-act short film script and a high-converting 30-second UGC ad script using an LLM, then break them down into visual storyboards.",
      "deliverables": [
        "Ability to generate engaging, human-like dialogue, compelling commercial scripts, and structured narratives using advanced AI models."
      ],
      "sellingStrategy": {
        "pricing": "₦100,000 / $75 per ad script; ₦300,000 / $250 per short film script",
        "whereToFind": [
          "E-commerce brands on Shopify",
          "UGC creators",
          "YouTube automation channels",
          "Advertising agencies"
        ],
        "pitch": "Hi [Name], your product looks amazing, but the ad copy could drive even more conversions. I use advanced AI tools to write highly engaging, structured UGC scripts that hook viewers in the first 3 seconds. Would you be open to me sending over a free script idea?"
      }
    },
    "tasks": [
      {
        "id": "v-p3-t0",
        "label": "Watch: Best LLM for Script Writing"
      },
      {
        "id": "v-p3-t1",
        "label": "Watch: EXACTLY How to Write INSANELY Good YouTube Scripts with AI"
      },
      {
        "id": "v-p3-t2",
        "label": "Watch: Three Act Structure Explained"
      },
      {
        "id": "v-p3-t3",
        "label": "Watch: Fiction Genres Explained"
      },
      {
        "id": "v-p3-t4",
        "label": "Watch: How to Write a 30 Second Commercial Video Script"
      },
      {
        "id": "v-p3-t5",
        "label": "Watch: How to Write A Short Film Script"
      },
      {
        "id": "v-p3-t6",
        "label": "Watch: how i write 6 figure ugc ad scripts"
      },
      {
        "id": "v-p3-t7",
        "label": "Watch: How to Generate Realistic Dialogue Based AI Scripts"
      },
      {
        "id": "v-p3-t8",
        "label": "Watch: Google AI Studio Just DESTROYED ElevenLabs"
      },
      {
        "id": "v-p3-t9",
        "label": "Watch: How To Get Started With Storyboarder.ai"
      },
      {
        "id": "v-p3-t10",
        "label": "Watch: Turn Any Script Into a Visual Storyboard With Google Flow Tool"
      },
      {
        "id": "v-p3-t11",
        "label": "Watch: The Exact Claude Project Setup For YouTube Script Writing"
      },
      {
        "id": "v-p3-t12",
        "label": "Watch: Write UGC Ad Scripts That SELL"
      }
    ]
  },
  {
    "id": "v-p4",
    "number": "04",
    "title": "STORYBOARDING & VISUAL PRE-PRODUCTION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 4",
    "objective": "Master Storyboarding & Visual Pre-Production",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "How to Use Storyboard Studio in Google Flow",
        "url": "https://www.youtube.com/watch?v=mSw8xFPpn2o",
        "type": "yt"
      },
      {
        "title": "How to make consistent AI characters",
        "url": "https://www.youtube.com/watch?v=zmyEkFgfh5Q",
        "type": "yt"
      },
      {
        "title": "Create Cinematic AI Video using Kling",
        "url": "https://www.youtube.com/watch?v=ue8CnA6xvdw",
        "type": "yt"
      },
      {
        "title": "AI Storyboard Workflow",
        "url": "https://www.youtube.com/watch?v=RNbaT2Kxxjo",
        "type": "yt"
      },
      {
        "title": "Become a Midjourney Mood Board Master",
        "url": "https://www.youtube.com/watch?v=tiHyS5ZSKsg",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "StudioBinder storyboard guide",
        "url": "https://www.studiobinder.com/blog/how-to-make-storyboard/",
        "type": "guide",
        "provider": "Community",
        "description": "Detailed guide on creating professional storyboards, shot lists, and animatics."
      },
      {
        "title": "Wonder Unit Storyboarder",
        "url": "https://wonderunit.com/storyboarder/",
        "type": "tool",
        "provider": "Community",
        "description": "Free, open-source software for rapidly drawing storyboards and planning scenes."
      },
      {
        "title": "Canva storyboard maker",
        "url": "https://www.canva.com/create/storyboards/",
        "type": "tool",
        "provider": "Canva",
        "description": "Easy-to-use tool with templates for creating clean and professional storyboards."
      },
      {
        "title": "Adobe storyboard guide",
        "url": "https://www.adobe.com/creativecloud/video/discover/storyboard.html",
        "type": "guide",
        "provider": "Adobe",
        "description": "Insights on translating scripts into visual sequences using Adobe's creative tools."
      },
      {
        "title": "Adobe Certified Professional info",
        "url": "https://certifiedprofessional.adobe.com/",
        "type": "certification",
        "provider": "Adobe",
        "description": "Information on official Adobe certification for tools like Premiere Pro and After Effects."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Visual Storyboard & Character Seed Matrix",
        "url": "https://www.youtube.com/watch?v=JtXVOHKDpHk",
        "outcome": "A 12-frame visual storyboard in Figma/Miro featuring consistent character reference portraits across multiple camera angles.",
        "steps": [
          "Generate character turnarounds and seeds in Midjourney",
          "Create master background and lighting plates",
          "Layout 12 storyboard frames with action arrows",
          "Attach camera movement and duration metadata"
        ]
      }
    ],
    "tools": [
      {
        "name": "Kling",
        "url": "#"
      },
      {
        "name": "Midjourney",
        "url": "#"
      },
      {
        "name": "Google Flow",
        "url": "#"
      }
    ],
    "project": {
      "title": "Consistent Character Storyboard",
      "description": "Create a consistent 10-scene storyboard featuring the same character in different environments and lighting conditions using Kling and Midjourney.",
      "deliverables": [
        "Achieve character and environment consistency across multiple generated scenes and build professional mood boards."
      ],
      "sellingStrategy": {
        "pricing": "₦250,000 / $200 per full storyboard",
        "whereToFind": [
          "Film production companies",
          "Indie directors",
          "Creative agencies",
          "Game developers"
        ],
        "pitch": "Hi [Name], visualizing a project before production is crucial. I specialize in AI storyboarding, creating consistent character and environment mockups that bring your vision to life before a single camera rolls. Can I share my portfolio with you?"
      }
    },
    "tasks": [
      {
        "id": "v-p4-t0",
        "label": "Watch: How to Use Storyboard Studio in Google Flow"
      },
      {
        "id": "v-p4-t1",
        "label": "Watch: How to make consistent AI characters"
      },
      {
        "id": "v-p4-t2",
        "label": "Watch: Create Cinematic AI Video using Kling"
      },
      {
        "id": "v-p4-t3",
        "label": "Watch: AI Storyboard Workflow"
      },
      {
        "id": "v-p4-t4",
        "label": "Watch: Become a Midjourney Mood Board Master"
      }
    ]
  },
  {
    "id": "v-p5",
    "number": "05",
    "title": "CINEMATIC VIDEO GENERATION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 5",
    "objective": "Master Cinematic Video Generation",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "How to Create Lifelike Cinematic AI Videos in 2026",
        "url": "https://www.youtube.com/watch?v=SMW_07yF35E",
        "type": "yt"
      },
      {
        "title": "Higgsfield Tutorial: How To Make 4K AI Movies",
        "url": "https://www.youtube.com/watch?v=8LV6Ze9LQ60",
        "type": "yt"
      },
      {
        "title": "The Ultimate AI Storyboard Tutorial",
        "url": "https://www.youtube.com/watch?v=mqY6vgrVp0c",
        "type": "yt"
      },
      {
        "title": "How To Create Viral AI Emotional Story Videos",
        "url": "https://www.youtube.com/watch?v=8fSyFARU0qs",
        "type": "yt"
      },
      {
        "title": "Seedance 2.0 INSANE Workflow",
        "url": "https://www.youtube.com/watch?v=_W81Oxu76Ug",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Runway Academy",
        "url": "https://academy.runwayml.com/",
        "type": "course",
        "provider": "Runway",
        "description": "Tutorials and guides on using Runway's generative AI tools for video and audio creation."
      },
      {
        "title": "DaVinci Resolve training",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "course",
        "provider": "Blackmagic",
        "description": "Official Blackmagic Design training for editing, color correction, and audio post-production."
      },
      {
        "title": "Adobe Premiere Pro video tutorials",
        "url": "https://helpx.adobe.com/premiere-pro/tutorials.html",
        "type": "guide",
        "provider": "Adobe",
        "description": "Official tutorials covering everything from basic editing to advanced video effects."
      },
      {
        "title": "Google Veo documentation",
        "url": "https://cloud.google.com/vertex-ai/generative-ai/docs/video/overview",
        "type": "guide",
        "provider": "Google",
        "description": "Guides for using Google's state-of-the-art generative AI video model, Veo."
      },
      {
        "title": "Blackmagic Design training & certification",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "certification",
        "provider": "Blackmagic",
        "description": "Details on becoming a certified DaVinci Resolve professional in various disciplines."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Runway & Kling Motion Brush Dynamic Scene",
        "url": "https://www.youtube.com/watch?v=TudVdrwbIuc",
        "outcome": "A photorealistic 8-second cinematic shot with isolated animated water and moving subject using motion brush masking.",
        "steps": [
          "Import Midjourney keyframe into video generator",
          "Paint motion brush masks over dynamic elements",
          "Tune horizontal and vertical velocity sliders",
          "Render in high resolution with cinematic film grain"
        ]
      }
    ],
    "tools": [
      {
        "name": "Higgsfield",
        "url": "#"
      },
      {
        "name": "Seedance",
        "url": "#"
      },
      {
        "name": "Topaz Video AI",
        "url": "#"
      }
    ],
    "project": {
      "title": "Cinematic Movie Trailer",
      "description": "Produce a 1-minute cinematic movie trailer using Higgsfield and Seedance, incorporating emotional storytelling and 4K upscaling.",
      "deliverables": [
        "Create lifelike, high-resolution cinematic AI films with compelling emotional arcs."
      ],
      "sellingStrategy": {
        "pricing": "₦500,000 / $400 per cinematic trailer or short film",
        "whereToFind": [
          "Indie filmmakers",
          "Book authors needing trailers",
          "Event organizers",
          "Luxury real estate agents"
        ],
        "pitch": "Hi [Name], your recent book launch caught my eye! I create 4K cinematic AI video trailers that capture emotion and drive engagement. A 1-minute trailer can massively boost your marketing—let's discuss bringing your story to the screen."
      }
    },
    "tasks": [
      {
        "id": "v-p5-t0",
        "label": "Watch: How to Create Lifelike Cinematic AI Videos in 2026"
      },
      {
        "id": "v-p5-t1",
        "label": "Watch: Higgsfield Tutorial: How To Make 4K AI Movies"
      },
      {
        "id": "v-p5-t2",
        "label": "Watch: The Ultimate AI Storyboard Tutorial"
      },
      {
        "id": "v-p5-t3",
        "label": "Watch: How To Create Viral AI Emotional Story Videos"
      },
      {
        "id": "v-p5-t4",
        "label": "Watch: Seedance 2.0 INSANE Workflow"
      }
    ]
  },
  {
    "id": "v-p6",
    "number": "06",
    "title": "ANIMATION & CARTOON STORY CREATION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 6",
    "objective": "Master Animation & Cartoon Story Creation",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "Master Pixar-Style AI Cartoon Animation",
        "url": "https://www.youtube.com/watch?v=gCzbZx5sOvI",
        "type": "yt"
      },
      {
        "title": "How to Create Consistent AI Characters with ONE Prompt",
        "url": "https://www.youtube.com/watch?v=PK9Ei70aMOE",
        "type": "yt"
      },
      {
        "title": "How to Create AI Animated Videos for YouTube Automation",
        "url": "https://www.youtube.com/watch?v=vniu5MtaWfw",
        "type": "yt"
      },
      {
        "title": "How To Create Viral LONG 3D Cartoon Story Videos With AI",
        "url": "https://www.youtube.com/watch?v=eybO7zmB564",
        "type": "yt"
      },
      {
        "title": "How to Make a Pixar-Style Animated Video",
        "url": "https://www.youtube.com/watch?v=oHBStkBBLeE",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Blender Studio training",
        "url": "https://studio.blender.org/training/",
        "type": "course",
        "provider": "Blender",
        "description": "High-quality training materials for 3D modeling, rigging, and animation in Blender."
      },
      {
        "title": "Blender animation and rigging manual",
        "url": "https://docs.blender.org/manual/en/latest/animation/index.html",
        "type": "guide",
        "provider": "Blender",
        "description": "Official documentation covering the intricacies of character animation in Blender."
      },
      {
        "title": "Adobe Character Animator tutorials",
        "url": "https://helpx.adobe.com/adobe-character-animator/tutorials.html",
        "type": "guide",
        "provider": "Adobe",
        "description": "Learn how to use motion capture to bring 2D characters to life in real-time."
      },
      {
        "title": "Krita animation manual",
        "url": "https://docs.krita.org/en/user_manual/animation.html",
        "type": "guide",
        "provider": "Community",
        "description": "Guide to using Krita's powerful frame-by-frame 2D animation toolset."
      },
      {
        "title": "Khan Academy: Pixar in a Box",
        "url": "https://www.khanacademy.org/partner-content/pixar",
        "type": "course",
        "provider": "Community",
        "description": "Behind-the-scenes look at how Pixar uses math and science to create animations."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Consistent Anime Character Micro-Episode",
        "url": "https://www.youtube.com/watch?v=fXUT87PzKKs",
        "outcome": "A 20-second animated cartoon sequence maintaining consistent character hair, eyes, and costume across 4 sequential shots.",
        "steps": [
          "Generate base anime character concept in Niji style",
          "Perform video-to-video restyling via DomoAI",
          "Synchronize dynamic action and lip motions in Pika",
          "Compile scene cuts with anime sound effects"
        ]
      }
    ],
    "tools": [
      {
        "name": "Midjourney",
        "url": "#"
      },
      {
        "name": "Runway Gen-3",
        "url": "#"
      },
      {
        "name": "Luma Dream Machine",
        "url": "#"
      }
    ],
    "project": {
      "title": "Pixar-Style 3D Animation",
      "description": "Create a 2-minute 3D animated children's story or brand mascot video in a Pixar-style aesthetic with consistent characters.",
      "deliverables": [
        "Master 3D cartoon generation, character consistency, and storytelling suitable for YouTube automation or brand mascots."
      ],
      "sellingStrategy": {
        "pricing": "₦400,000 / $300 per animated video",
        "whereToFind": [
          "YouTube automation channel owners",
          "Children's book authors",
          "Educational platforms",
          "Ed-tech startups"
        ],
        "pitch": "Hi [Name], 3D animated content is highly engaging but traditionally expensive. I use AI to produce Pixar-quality animated videos for your brand or channel at a fraction of the cost and time. Check out my latest animation sample here."
      }
    },
    "tasks": [
      {
        "id": "v-p6-t0",
        "label": "Watch: Master Pixar-Style AI Cartoon Animation"
      },
      {
        "id": "v-p6-t1",
        "label": "Watch: How to Create Consistent AI Characters with ONE Prompt"
      },
      {
        "id": "v-p6-t2",
        "label": "Watch: How to Create AI Animated Videos for YouTube Automation"
      },
      {
        "id": "v-p6-t3",
        "label": "Watch: How To Create Viral LONG 3D Cartoon Story Videos With AI"
      },
      {
        "id": "v-p6-t4",
        "label": "Watch: How to Make a Pixar-Style Animated Video"
      }
    ]
  },
  {
    "id": "v-p7",
    "number": "07",
    "title": "REALISTIC VIDEO GENERATION & DEEPFAKE TECHNOLOGY",
    "badge": "AI Video Animation",
    "weeks": "MODULE 7",
    "objective": "Master Realistic Video Generation & Deepfake Technology",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "How to Create Ultra Realistic AI Avatar",
        "url": "https://www.youtube.com/watch?v=88SmtnGn-bg",
        "type": "yt"
      },
      {
        "title": "Best Faceswapper I've Seen",
        "url": "https://www.youtube.com/watch?v=5OwcxugdWxI",
        "type": "yt"
      },
      {
        "title": "How I Cloned My Voice & Avatar",
        "url": "https://www.youtube.com/watch?v=io1fU5lZthc",
        "type": "yt"
      },
      {
        "title": "Bring Your AI Avatar to Life with HeyGen",
        "url": "https://www.youtube.com/watch?v=R0EmUT4EX2g",
        "type": "yt"
      },
      {
        "title": "Ethics & Deepfake Debate",
        "url": "https://www.youtube.com/watch?v=1gpYVAn3T9I",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Microsoft Responsible AI overview",
        "url": "https://learn.microsoft.com/en-us/azure/ai-services/responsible-use-of-ai-overview",
        "type": "guide",
        "provider": "Microsoft",
        "description": "Microsoft's principles and practices for developing and deploying AI safely."
      },
      {
        "title": "Partnership on AI: Responsible Practices",
        "url": "https://syntheticmedia.partnershiponai.org/",
        "type": "guide",
        "provider": "Community",
        "description": "Guidelines for the ethical development and disclosure of synthetic media (deepfakes)."
      },
      {
        "title": "C2PA specifications",
        "url": "https://c2pa.org/specifications/specifications/2.2/index.html",
        "type": "guide",
        "provider": "C2PA"
      },
      {
        "title": "YouTube altered content policy",
        "url": "https://support.google.com/youtube/answer/14328491",
        "type": "guide",
        "provider": "Google",
        "description": "YouTube's rules and disclosure requirements for synthetic, AI-generated, or altered media."
      },
      {
        "title": "IBM SkillsBuild AI Fundamentals",
        "url": "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence",
        "type": "certification",
        "provider": "IBM"
      }
    ],
    "followAlongProjects": [
      {
        "title": "Photorealistic AI Talking Avatar & Lip-Sync",
        "url": "https://www.youtube.com/watch?v=EI5VmqNsjzg",
        "outcome": "A seamless 30-second spokesperson video with realistic lip synchronization, micro-head gestures, and natural eye blinks.",
        "steps": [
          "Record or clone custom voiceover audio in ElevenLabs",
          "Upload high-resolution portrait keyframe to Hedra / HeyGen",
          "Fine-tune phoneme lip-matching sensitivity",
          "Render in 1080p and composite over studio background"
        ]
      }
    ],
    "tools": [
      {
        "name": "HeyGen",
        "url": "#"
      },
      {
        "name": "ElevenLabs",
        "url": "#"
      },
      {
        "name": "Faceswapper",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI Avatar & Voice Clone Presentation",
      "description": "Create a highly realistic digital twin (AI Avatar) and clone a voice to produce a seamless 1-minute talking-head presentation video.",
      "deliverables": [
        "Build ultra-realistic AI avatars and custom voice clones for corporate training, marketing, and faceless content creation."
      ],
      "sellingStrategy": {
        "pricing": "₦250,000 / $200 per custom avatar setup + ₦50,000 / $40 per video minute",
        "whereToFind": [
          "Corporate HR departments",
          "Online course creators",
          "Real estate agents",
          "Busy executives"
        ],
        "pitch": "Hi [Name], scaling your video presence shouldn't require you to be on camera all day. I build ultra-realistic AI avatars and voice clones so you can produce professional talking-head videos from just text. Imagine creating a month of content in 5 minutes."
      }
    },
    "tasks": [
      {
        "id": "v-p7-t0",
        "label": "Watch: How to Create Ultra Realistic AI Avatar"
      },
      {
        "id": "v-p7-t1",
        "label": "Watch: Best Faceswapper I've Seen"
      },
      {
        "id": "v-p7-t2",
        "label": "Watch: How I Cloned My Voice & Avatar"
      },
      {
        "id": "v-p7-t3",
        "label": "Watch: Bring Your AI Avatar to Life with HeyGen"
      },
      {
        "id": "v-p7-t4",
        "label": "Watch: Ethics & Deepfake Debate"
      }
    ]
  },
  {
    "id": "v-p8",
    "number": "08",
    "title": "UGC & SOCIAL MEDIA VIDEO CREATION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 8",
    "objective": "Master UGC & Social Media Video Creation",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "Build Your AI UGC Studio",
        "url": "https://www.youtube.com/watch?v=HZZPqcv1XXM",
        "type": "yt"
      },
      {
        "title": "Claude + seedance 2.0 = the BEST AI UGC ads",
        "url": "https://www.youtube.com/watch?v=Py47FzLdF9E",
        "type": "yt"
      },
      {
        "title": "How to Create TRENDING Reels, Shorts & TikToks with AI",
        "url": "https://www.youtube.com/watch?v=aLSExMSATaA",
        "type": "yt"
      },
      {
        "title": "Turn ANY Product into UGC Ads with Veo3",
        "url": "https://www.youtube.com/watch?v=KTMxEbsInI0",
        "type": "yt"
      },
      {
        "title": "How to Create AI UGC Videos",
        "url": "https://www.youtube.com/watch?v=bV7KYgWrTV0",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "YouTube Creator Academy",
        "url": "https://creatoracademy.youtube.com/page/home",
        "type": "course",
        "provider": "Google",
        "description": "Official YouTube courses on channel growth, production, policies, and monetization."
      },
      {
        "title": "Meta Blueprint",
        "url": "https://www.facebook.com/business/learn",
        "type": "course",
        "provider": "Community",
        "description": "Official training on marketing and advertising across Facebook, Instagram, and WhatsApp."
      },
      {
        "title": "TikTok Academy",
        "url": "https://ads.tiktok.com/business/creativecenter/education",
        "type": "course",
        "provider": "Community",
        "description": "Educational platform for learning how to succeed as a creator or brand on TikTok."
      },
      {
        "title": "HubSpot Social Media Marketing course",
        "url": "https://academy.hubspot.com/courses/social-media",
        "type": "course",
        "provider": "HubSpot",
        "description": "Learn how to build a social media strategy, create engaging content, and measure ROI."
      },
      {
        "title": "HubSpot Social Media Certification",
        "url": "https://academy.hubspot.com/courses/social-media",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Certification validating skills in social media strategy, listening, and advertising."
      },
      {
        "title": "Google Skillshop",
        "url": "https://skillshop.withgoogle.com/",
        "type": "certification",
        "provider": "Google",
        "description": "Training and certification for Google's professional tools like Google Ads and Analytics."
      }
    ],
    "followAlongProjects": [
      {
        "title": "High-Converting UGC Video Ad in CapCut",
        "url": "https://www.youtube.com/watch?v=FEBnrCMYteg",
        "outcome": "A 15-second high-converting UGC video ad with 3-second hook visual, problem-solution narrative, and animated captions.",
        "steps": [
          "Script 3-second curiosity gap hook",
          "Generate AI UGC creator selfie video",
          "Add dynamic CapCut text captions and sound bites",
          "Overlay B-roll product mockups and clear CTA"
        ]
      }
    ],
    "tools": [
      {
        "name": "Seedance 2.0",
        "url": "#"
      },
      {
        "name": "Veo3",
        "url": "#"
      },
      {
        "name": "Claude",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI UGC Ad Package",
      "description": "Produce a package of 3 high-converting AI-generated User Generated Content (UGC) ads optimized for TikTok, Reels, and Shorts.",
      "deliverables": [
        "Turn any static product into a dynamic, trending UGC video using tools like Seedance 2.0 and Veo3."
      ],
      "sellingStrategy": {
        "pricing": "₦300,000 / $250 for a 3-video UGC package",
        "whereToFind": [
          "Shopify store owners",
          "Direct-to-consumer (DTC) brands",
          "Dropshippers",
          "TikTok Shop sellers"
        ],
        "pitch": "Hi [Name], your products are fantastic, but the UGC ads could be more dynamic. I run an AI UGC studio that creates trending, scroll-stopping video ads without needing to ship products to influencers. Want to see a sample I made for a similar brand?"
      }
    },
    "tasks": [
      {
        "id": "v-p8-t0",
        "label": "Watch: Build Your AI UGC Studio"
      },
      {
        "id": "v-p8-t1",
        "label": "Watch: Claude + seedance 2.0 = the BEST AI UGC ads"
      },
      {
        "id": "v-p8-t2",
        "label": "Watch: How to Create TRENDING Reels, Shorts & TikToks with AI"
      },
      {
        "id": "v-p8-t3",
        "label": "Watch: Turn ANY Product into UGC Ads with Veo3"
      },
      {
        "id": "v-p8-t4",
        "label": "Watch: How to Create AI UGC Videos"
      }
    ]
  },
  {
    "id": "v-p9",
    "number": "09",
    "title": "AUDIO, MUSIC & VOICE-OVER PRODUCTION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 9",
    "objective": "Master Audio, Music & Voice-Over Production",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "How to Use Suno AI Tutorial",
        "url": "https://www.youtube.com/watch?v=BVR4rb5aDGE",
        "type": "yt"
      },
      {
        "title": "How to generate sound effects with AI",
        "url": "https://www.youtube.com/watch?v=-TU4RKcGazc",
        "type": "yt"
      },
      {
        "title": "AI Voice Cloning & Voice-Over Tutorial",
        "url": "https://www.youtube.com/watch?v=fMvqcBExFh4",
        "type": "yt"
      },
      {
        "title": "How to Make AI Music Videos with Perfect Lip Sync",
        "url": "https://www.youtube.com/watch?v=7ajVhp8qM3U",
        "type": "yt"
      },
      {
        "title": "The AI Film Workflow No One is Talking About",
        "url": "https://www.youtube.com/watch?v=ORuSQ0Fui-A",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Blackmagic Fairlight audio training",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "course",
        "provider": "Blackmagic",
        "description": "Comprehensive training on audio post-production and sound design in DaVinci Resolve."
      },
      {
        "title": "Audacity support and tutorials",
        "url": "https://support.audacityteam.org/",
        "type": "guide",
        "provider": "Community",
        "description": "Official documentation for the free, open-source, cross-platform audio editor."
      },
      {
        "title": "BBC Academy audio skills",
        "url": "https://www.bbc.co.uk/academy/en/skills/audio",
        "type": "guide",
        "provider": "BBC",
        "description": "Tips and techniques for recording, editing, and mixing high-quality audio."
      },
      {
        "title": "Freesound sound-effects library",
        "url": "https://freesound.org/",
        "type": "tool",
        "provider": "Community",
        "description": "A massive collaborative database of audio snippets, samples, and recordings."
      },
      {
        "title": "Blackmagic Design certification",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "certification",
        "provider": "Blackmagic",
        "description": "Information on obtaining official DaVinci Resolve professional certification."
      }
    ],
    "followAlongProjects": [
      {
        "title": "AI Voice & Sound Effects Production with Suno",
        "url": "https://www.youtube.com/watch?v=lNyDhDQl1Wg",
        "outcome": "A custom 60-second original film soundtrack generated via Suno/Udio paired with multi-track Foley sound effects.",
        "steps": [
          "Prompt musical genre, mood, and BPM parameters",
          "Isolate stems (melody, percussion, bass)",
          "Layer Foley sound effects (whooshes, impacts, ambiance)",
          "Mix volume levels and apply spatial stereo panning"
        ]
      }
    ],
    "tools": [
      {
        "name": "Suno AI",
        "url": "#"
      },
      {
        "name": "ElevenLabs",
        "url": "#"
      },
      {
        "name": "SyncLabs",
        "url": "#"
      }
    ],
    "project": {
      "title": "Complete Audio Design for Video",
      "description": "Generate a custom background music track, realistic sound effects (Foley), and perfectly lip-synced voiceovers for a 2-minute video.",
      "deliverables": [
        "Master AI audio tools to create professional soundtracks, voiceovers, and lip-syncing for any video project."
      ],
      "sellingStrategy": {
        "pricing": "₦150,000 / $100 per video audio design",
        "whereToFind": [
          "Indie game developers",
          "Podcasters",
          "YouTubers",
          "Local radio stations"
        ],
        "pitch": "Hi [Name], the visual quality of your videos is great, but professional audio design can take it to the next level. I use AI to generate custom music, perfect voiceovers, and cinematic sound effects. Let me handle the audio for your next release."
      }
    },
    "tasks": [
      {
        "id": "v-p9-t0",
        "label": "Watch: How to Use Suno AI Tutorial"
      },
      {
        "id": "v-p9-t1",
        "label": "Watch: How to generate sound effects with AI"
      },
      {
        "id": "v-p9-t2",
        "label": "Watch: AI Voice Cloning & Voice-Over Tutorial"
      },
      {
        "id": "v-p9-t3",
        "label": "Watch: How to Make AI Music Videos with Perfect Lip Sync"
      },
      {
        "id": "v-p9-t4",
        "label": "Watch: The AI Film Workflow No One is Talking About"
      }
    ]
  },
  {
    "id": "v-p10",
    "number": "10",
    "title": "POST-PRODUCTION & EDITING",
    "badge": "AI Video Animation",
    "weeks": "MODULE 10",
    "objective": "Master Post-Production & Editing",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "Video Editing For Beginners with AI 2026",
        "url": "https://www.youtube.com/watch?v=X025xxPGtYs",
        "type": "yt"
      },
      {
        "title": "How I Edit Videos with AI",
        "url": "https://www.youtube.com/watch?v=584ujZ6uZaM",
        "type": "yt"
      },
      {
        "title": "This NEW AI Color Grading Trick Changed Everything!",
        "url": "https://www.youtube.com/watch?v=7zNMkdP40Ko",
        "type": "yt"
      },
      {
        "title": "AI Subtitle Generator",
        "url": "https://www.youtube.com/watch?v=9PMOWZxRYxY",
        "type": "yt"
      },
      {
        "title": "Complete Descript Tutorial",
        "url": "https://www.youtube.com/watch?v=RgwJNOXGARI",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "DaVinci Resolve training books and videos",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "course",
        "provider": "Blackmagic",
        "description": "In-depth resources for mastering the DaVinci Resolve post-production workflow."
      },
      {
        "title": "Adobe Premiere Pro tutorials",
        "url": "https://helpx.adobe.com/premiere-pro/tutorials.html",
        "type": "guide",
        "provider": "Adobe"
      },
      {
        "title": "Adobe After Effects tutorials",
        "url": "https://helpx.adobe.com/after-effects/tutorials.html",
        "type": "guide",
        "provider": "Adobe",
        "description": "Official guides for motion graphics, visual effects, and compositing in After Effects."
      },
      {
        "title": "Descript learning resources",
        "url": "https://www.descript.com/learn",
        "type": "guide",
        "provider": "Community",
        "description": "Tutorials on using Descript's text-based video and audio editing platform."
      },
      {
        "title": "Blackmagic Design certification",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "certification",
        "provider": "Blackmagic",
        "description": "Information on obtaining official DaVinci Resolve professional certification."
      }
    ],
    "followAlongProjects": [
      {
        "title": "DaVinci Resolve / Premiere Color Grading & Speed Ramp",
        "url": "https://www.youtube.com/watch?v=xsVTqzratPs",
        "outcome": "A polished multi-clip montage featuring seamless speed ramping, cinematic film LUT color grade, and motion blur correction.",
        "steps": [
          "Import raw AI video clips into editing timeline",
          "Apply optical flow re-timing to smooth frame transitions",
          "Color grade using teal-and-orange cinematic film LUT",
          "Export in master ProRes 422 format"
        ]
      }
    ],
    "tools": [
      {
        "name": "Descript",
        "url": "#"
      },
      {
        "name": "CapCut AI",
        "url": "#"
      },
      {
        "name": "Topaz Video AI",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI Post-Production Mastery",
      "description": "Edit a raw AI-generated video sequence, apply advanced color grading, and generate dynamic subtitles using Descript and AI editing tools.",
      "deliverables": [
        "Edit, color grade, and finalize AI videos to professional standards, ensuring high retention and visual appeal."
      ],
      "sellingStrategy": {
        "pricing": "₦200,000 / $150 per edited video",
        "whereToFind": [
          "Content creators",
          "Creative agencies",
          "Online educators",
          "Corporate marketing teams"
        ],
        "pitch": "Hi [Name], raw video is just the beginning. I specialize in AI-assisted post-production, adding dynamic subtitles, professional color grading, and seamless edits that boost viewer retention. Let me edit your next batch of videos."
      }
    },
    "tasks": [
      {
        "id": "v-p10-t0",
        "label": "Watch: Video Editing For Beginners with AI 2026"
      },
      {
        "id": "v-p10-t1",
        "label": "Watch: How I Edit Videos with AI"
      },
      {
        "id": "v-p10-t2",
        "label": "Watch: This NEW AI Color Grading Trick Changed Everything!"
      },
      {
        "id": "v-p10-t3",
        "label": "Watch: AI Subtitle Generator"
      },
      {
        "id": "v-p10-t4",
        "label": "Watch: Complete Descript Tutorial"
      }
    ]
  },
  {
    "id": "v-p11",
    "number": "11",
    "title": "FULL CINEMATIC STORY PRODUCTION",
    "badge": "AI Video Animation",
    "weeks": "MODULE 11",
    "objective": "Master Full Cinematic Story Production",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "The Complete AI Filmmaking Pipeline",
        "url": "https://www.youtube.com/watch?v=yXxkl3zSvsk",
        "type": "yt"
      },
      {
        "title": "Seedance 2.5 - How to FIX Character & Environment Consistency",
        "url": "https://www.youtube.com/watch?v=MckeX0s_PWI",
        "type": "yt"
      },
      {
        "title": "3 Hollywood Editing Tricks You Can Use on Your Videos",
        "url": "https://www.youtube.com/watch?v=MNsud8wtKBs",
        "type": "yt"
      },
      {
        "title": "The Ultimate AI Video Production Blueprint",
        "url": "https://www.youtube.com/watch?v=KfdevVUlypM",
        "type": "yt"
      },
      {
        "title": "How to make Microdramas with AI Agents",
        "url": "https://www.youtube.com/watch?v=6fVwR4PTlqk",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "StudioBinder filmmaking guides",
        "url": "https://www.studiobinder.com/blog/filmmaking/",
        "type": "guide",
        "provider": "Community",
        "description": "Comprehensive resources on all aspects of pre-production, production, and post-production."
      },
      {
        "title": "Blackmagic cinematic training",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "course",
        "provider": "Blackmagic",
        "description": "Training focused on achieving professional, cinematic results using DaVinci Resolve."
      },
      {
        "title": "Runway Academy filmmaking lessons",
        "url": "https://academy.runwayml.com/",
        "type": "course",
        "provider": "Runway",
        "description": "Specific guides on integrating generative AI into professional filmmaking workflows."
      },
      {
        "title": "BBC Academy production skills",
        "url": "https://www.bbc.co.uk/academy/en/skills/production",
        "type": "guide",
        "provider": "BBC",
        "description": "Expert advice on camera work, lighting, directing, and overall video production."
      },
      {
        "title": "Blackmagic Design training & certification",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "certification",
        "provider": "Blackmagic",
        "description": "Details on becoming a certified DaVinci Resolve professional in various disciplines."
      }
    ],
    "followAlongProjects": [
      {
        "title": "End-to-End AI Movie & Cinematic Short Film",
        "url": "https://www.youtube.com/watch?v=fs5S867VQzg",
        "outcome": "A complete 60-second festival-ready AI cinematic trailer with coherent narrative, voice acting, original music, and title cards.",
        "steps": [
          "Finalize shot list from pre-production script",
          "Generate 8 sequential scene clips with lighting continuity",
          "Composite sound design, dialogue, and atmospheric score",
          "Render final master cut with opening and closing titles"
        ]
      }
    ],
    "tools": [
      {
        "name": "Seedance 2.5",
        "url": "#"
      },
      {
        "name": "Midjourney",
        "url": "#"
      },
      {
        "name": "Premiere Pro",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI Microdrama Series",
      "description": "Produce a 3-part microdrama series optimized for platforms like TikTok/Reels using AI agents and advanced Hollywood editing techniques.",
      "deliverables": [
        "Execute a complete AI filmmaking pipeline, from script to final microdrama, addressing character consistency and advanced editing."
      ],
      "sellingStrategy": {
        "pricing": "₦800,000 / $600 per microdrama series",
        "whereToFind": [
          "Entertainment startups",
          "Social media agencies",
          "Brand storytellers",
          "TikTok producers"
        ],
        "pitch": "Hi [Name], serialized microdramas are exploding on social media right now. I produce complete, multi-part AI microdramas that hook viewers and build massive followings for brands. I'd love to pitch a storyline tailored to your audience."
      }
    },
    "tasks": [
      {
        "id": "v-p11-t0",
        "label": "Watch: The Complete AI Filmmaking Pipeline"
      },
      {
        "id": "v-p11-t1",
        "label": "Watch: Seedance 2.5 - How to FIX Character & Environment Consistency"
      },
      {
        "id": "v-p11-t2",
        "label": "Watch: 3 Hollywood Editing Tricks You Can Use on Your Videos"
      },
      {
        "id": "v-p11-t3",
        "label": "Watch: The Ultimate AI Video Production Blueprint"
      },
      {
        "id": "v-p11-t4",
        "label": "Watch: How to make Microdramas with AI Agents"
      }
    ]
  },
  {
    "id": "v-p12",
    "number": "12",
    "title": "DISTRIBUTION, MONETIZATION & PORTFOLIO BUILDING",
    "badge": "AI Video Animation",
    "weeks": "MODULE 12",
    "objective": "Master Distribution, Monetization & Portfolio Building",
    "color": "text-amber-500",
    "resources": [
      {
        "title": "YouTube's NEW Rules for AI Videos",
        "url": "https://www.youtube.com/watch?v=m647KpdNTDg",
        "type": "yt"
      },
      {
        "title": "I Made 1468 YouTube Videos, Here's What Works in 2025",
        "url": "https://www.youtube.com/watch?v=rk_pO-VEFbw",
        "type": "yt"
      },
      {
        "title": "The 6 Methods I'd Use to Monetize Ai Content",
        "url": "https://www.youtube.com/watch?v=BU0Zs4CdKIE",
        "type": "yt"
      },
      {
        "title": "AI Video Showreel",
        "url": "https://www.youtube.com/watch?v=XjLh1djHEVc",
        "type": "yt"
      },
      {
        "title": "The AI Workflow That Scales My Content Output",
        "url": "https://www.youtube.com/watch?v=zHvkeHE5YwU",
        "type": "yt"
      },
      {
        "title": "5 Contract Clauses Every AI Consultant Needs",
        "url": "https://www.youtube.com/watch?v=MhzAxghBLF8",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "YouTube Creator Academy",
        "url": "https://creatoracademy.youtube.com/page/home",
        "type": "course",
        "provider": "Google",
        "description": "Official YouTube courses on channel growth, production, policies, and monetization."
      },
      {
        "title": "Google Skillshop",
        "url": "https://skillshop.withgoogle.com/",
        "type": "guide",
        "provider": "Google",
        "description": "Training and certification for Google's professional tools like Google Ads and Analytics."
      },
      {
        "title": "Google Analytics help and learning",
        "url": "https://support.google.com/analytics/answer/15068052",
        "type": "guide",
        "provider": "Google",
        "description": "Official documentation for tracking website traffic, user behavior, and conversions."
      },
      {
        "title": "HubSpot Content Marketing course",
        "url": "https://academy.hubspot.com/courses/content-marketing",
        "type": "course",
        "provider": "HubSpot",
        "description": "Learn how to attract and engage audiences through valuable, relevant content."
      },
      {
        "title": "HubSpot Digital Advertising course",
        "url": "https://academy.hubspot.com/courses/digital-advertising",
        "type": "course",
        "provider": "HubSpot",
        "description": "Comprehensive guide to creating and managing digital ad campaigns."
      },
      {
        "title": "HubSpot Content Marketing Certification",
        "url": "https://academy.hubspot.com/courses/content-marketing",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Certification covering content strategy, storytelling, content creation, and promotion."
      },
      {
        "title": "Google Ads certifications via Skillshop",
        "url": "https://skillshop.withgoogle.com/googleads",
        "type": "certification",
        "provider": "Google",
        "description": "Official certifications validating proficiency in various Google Ads products."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Cinematic AI Video Director Showreel & Portfolio",
        "url": "https://www.youtube.com/watch?v=HMVSCEh72n4",
        "outcome": "A 45-second high-energy commercial director showreel published on Vimeo/YouTube alongside a client pricing proposal deck.",
        "steps": [
          "Select best 10 scenes across portfolio modules",
          "Edit fast-paced rhythm cuts to upbeat commercial track",
          "Design sleek branded lower-thirds and credit card",
          "Publish live portfolio link and client outreach template"
        ]
      }
    ],
    "tools": [
      {
        "name": "YouTube Studio",
        "url": "#"
      },
      {
        "name": "Notion",
        "url": "#"
      },
      {
        "name": "LinkedIn",
        "url": "#"
      }
    ],
    "project": {
      "title": "AI Consulting Showreel & Contracts",
      "description": "Create a professional AI Video Showreel and draft a set of standard contracts for AI consulting and freelance video production.",
      "deliverables": [
        "Successfully monetize AI content on YouTube, structure consulting deals, and scale video output efficiently."
      ],
      "sellingStrategy": {
        "pricing": "₦1,000,000+ / $800+ per monthly retainer",
        "whereToFind": [
          "High-ticket B2B clients",
          "Tech consulting firms",
          "Prominent YouTubers",
          "Enterprises adopting AI"
        ],
        "pitch": "Hi [Name], integrating AI into your content pipeline can save thousands of dollars and hundreds of hours. I offer AI video consulting and production retainers, helping you scale your output without sacrificing quality. Let's hop on a 15-minute call to discuss your workflow."
      }
    },
    "tasks": [
      {
        "id": "v-p12-t0",
        "label": "Watch: YouTube's NEW Rules for AI Videos"
      },
      {
        "id": "v-p12-t1",
        "label": "Watch: I Made 1468 YouTube Videos, Here's What Works in 2025"
      },
      {
        "id": "v-p12-t2",
        "label": "Watch: The 6 Methods I'd Use to Monetize Ai Content"
      },
      {
        "id": "v-p12-t3",
        "label": "Watch: AI Video Showreel"
      },
      {
        "id": "v-p12-t4",
        "label": "Watch: The AI Workflow That Scales My Content Output"
      },
      {
        "id": "v-p12-t5",
        "label": "Watch: 5 Contract Clauses Every AI Consultant Needs"
      }
    ]
  }
];

export const MARKETING_PHASES: Phase[] = [
  {
    "id": "marketing-p1",
    "number": "01",
    "title": "Digital Marketing Landscape & Brand Strategy",
    "badge": "Digital Marketing",
    "weeks": "MODULE 1",
    "objective": "Dive deep into the foundational architecture of the modern digital marketing landscape. Learn to construct robust brand positioning, define psychographic buyer personas, and architect a comprehensive go-to-market strategy that cuts through the noise of the 2026 algorithmic era.",
    "resources": [
      {
        "title": "2026 Digital Marketing Landscape (Full Course)",
        "url": "https://www.youtube.com/watch?v=Opq_H5zHh9w",
        "type": "yt"
      },
      {
        "title": "Brand Strategy & Positioning Blueprint",
        "url": "https://www.youtube.com/watch?v=cPOuOqpjHi4",
        "type": "yt"
      },
      {
        "title": "Free Logo & Brand Design Tools",
        "url": "https://www.youtube.com/watch?v=Xrz0fr7Kz9o",
        "type": "yt"
      },
      {
        "title": "Free AI Assistants Comparison for Marketers",
        "url": "https://www.youtube.com/watch?v=3GSydCmqJ2c",
        "type": "yt"
      },
      {
        "title": "Competitor Gap Analysis & SWOT Framework",
        "url": "https://www.youtube.com/watch?v=0qF_6m2xUq8",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "HubSpot Inbound Marketing Certification",
        "url": "https://academy.hubspot.com/courses/inbound",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Comprehensive foundation in digital marketing strategy, inbound marketing, and audience targeting."
      },
      {
        "title": "Fundamentals of Digital Marketing",
        "url": "https://skillshop.exceedlms.com/student/collection/654330",
        "type": "certification",
        "provider": "Google",
        "description": "Master the basics of digital marketing with interactive advertising and strategy modules."
      },
      {
        "title": "Codecademy Intro to Digital Marketing",
        "url": "https://www.codecademy.com/learn/introduction-to-digital-marketing",
        "type": "course",
        "provider": "Codecademy",
        "description": "Learn how to build a digital marketing campaign and track key performance indicators."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Brand Strategy & Positioning Masterclass",
        "url": "https://www.youtube.com/watch?v=cPOuOqpjHi4",
        "outcome": "A completed Miro/Notion brand strategy playbook with 4-quadrant positioning matrix and detailed psychographic customer avatar.",
        "steps": [
          "Plot 4 key market competitors on X/Y value axis",
          "Identify whitespace market opportunity",
          "Build psychographic buyer persona (pains, desires, triggers)",
          "Craft 1-sentence Unique Selling Proposition (USP)"
        ]
      }
    ],
    "tools": [
      {
        "name": "Miro",
        "url": "https://miro.com/"
      },
      {
        "name": "Notion",
        "url": "https://notion.so/"
      },
      {
        "name": "Fix Finity",
        "url": "https://www.fixfinity.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t1",
        "label": "Conduct a deep-dive SWOT and competitor content gap analysis.",
        "type": "research"
      },
      {
        "id": "m-t2",
        "label": "Architect a comprehensive psychographic buyer persona matrix.",
        "type": "writing"
      },
      {
        "id": "m-t3",
        "label": "Draft a brand messaging architecture including USP, value pillars, and tone of voice guidelines.",
        "type": "design"
      }
    ],
    "project": {
      "title": "Complete Brand Go-to-Market Strategy",
      "description": "Build a full-scale Go-to-Market (GTM) brand playbook synthesizing market research into a cohesive strategy document detailing unique positioning, hyper-targeted audience segments, primary acquisition channels, and core messaging pillars.",
      "deliverables": [
        "Brand Positioning Map",
        "Competitor Matrix",
        "Ideal Customer Profile (ICP) Dossier",
        "Core Messaging Framework"
      ],
      "sellingStrategy": {
        "pitch": "Position this document as a foundational 'Brand Blueprint' service for new startups or companies seeking to rebrand. Emphasize that execution without strategy leads to wasted ad spend.",
        "pricing": "$500 - $1,500",
        "whereToFind": [
          "Upwork",
          "LinkedIn",
          "Local Businesses"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p2",
    "number": "02",
    "title": "Content Marketing & Social Media Strategy",
    "badge": "Digital Marketing",
    "weeks": "MODULE 2",
    "objective": "Master high-retention content creation across TikTok, Instagram, LinkedIn, and YouTube. Understand the underlying algorithms that drive viral distribution, craft irresistible hooks, and build an automated multi-channel publishing engine.",
    "resources": [
      {
        "title": "Content Hooks & Attention Retention",
        "url": "https://www.youtube.com/watch?v=Cu_4M9vxruM",
        "type": "yt"
      },
      {
        "title": "TikTok Marketing Mastery for Growth",
        "url": "https://www.youtube.com/watch?v=-9UjSttphdo",
        "type": "yt"
      },
      {
        "title": "Instagram Marketing Strategy & Reels Algorithm",
        "url": "https://www.youtube.com/watch?v=jzO3T2AiX_I",
        "type": "yt"
      },
      {
        "title": "LinkedIn Marketing Strategy for B2B Growth",
        "url": "https://www.youtube.com/watch?v=Eeke2jhaN1o",
        "type": "yt"
      },
      {
        "title": "Content Marketing Strategy: Ideation to Distribution",
        "url": "https://www.youtube.com/watch?v=rZV5ozvP4eE",
        "type": "yt"
      },
      {
        "title": "Free Social Media Scheduling Tools",
        "url": "https://www.youtube.com/watch?v=_tt42iOYN88",
        "type": "yt"
      },
      {
        "title": "Zero-Click Content Strategy for High Reach",
        "url": "https://www.youtube.com/watch?v=4OtbzltZQzA",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "HubSpot Content Marketing Certification",
        "url": "https://academy.hubspot.com/courses/content-marketing",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Learn how to build a content creation framework that drives organic business growth."
      },
      {
        "title": "Meta Certified Digital Marketing Associate",
        "url": "https://www.facebook.com/business/learn/certification",
        "type": "certification",
        "provider": "Meta Blueprint",
        "description": "Foundational understanding of advertising and organic social strategies on Facebook and Instagram."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Content Marketing Strategy & Calendar Execution",
        "url": "https://www.youtube.com/watch?v=rZV5ozvP4eE",
        "outcome": "A 30-day multi-channel content calendar with 10 high-retention video hooks and cross-platform distribution workflow.",
        "steps": [
          "Brainstorm 30 content angles based on customer questions",
          "Script 10 short-form video hooks with 3-second pattern interrupts",
          "Set up automated scheduling workflow with Buffer or Enji",
          "Establish performance tracking metrics (CTR, Watch Time, Shares)"
        ]
      }
    ],
    "tools": [
      {
        "name": "Buffer",
        "url": "https://buffer.com/"
      },
      {
        "name": "Enji",
        "url": "https://enji.co/"
      },
      {
        "name": "CapCut",
        "url": "https://capcut.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t4",
        "label": "Script and record 3 short-form videos utilizing viral 3-second hook frameworks.",
        "type": "video"
      },
      {
        "id": "m-t5",
        "label": "Construct a 30-day multi-channel social media content calendar.",
        "type": "planning"
      },
      {
        "id": "m-t6",
        "label": "Draft a zero-click LinkedIn carousel post optimized for high algorithmic distribution.",
        "type": "writing"
      }
    ],
    "project": {
      "title": "Viral Multi-Platform Content Engine",
      "description": "Build an automated content repurposing workflow. Take one 10-minute long-form core asset and transform it into 5 short-form TikTok/Reels, 3 LinkedIn carousels, and 2 Twitter/X threads.",
      "deliverables": [
        "1 Long-form core asset transcript & breakdown",
        "5 Edited Short-form video scripts & captioned cuts",
        "3 High-contrast LinkedIn carousel slide decks",
        "30-day automated distribution calendar"
      ],
      "sellingStrategy": {
        "pitch": "Offer an end-to-end 'Content Repurposing Retainer' for founders and executives who record podcasts or webinars but lack time to post daily.",
        "pricing": "$1,500 - $3,500 / month",
        "whereToFind": [
          "Podcast Hosts",
          "B2B SaaS Founders",
          "LinkedIn Executives"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p3",
    "number": "03",
    "title": "Search Engine Optimization (SEO) & AI Search",
    "badge": "Digital Marketing",
    "weeks": "MODULE 3",
    "objective": "Demystify search in the Generative AI era. Master traditional technical and on-page SEO alongside Generative Engine Optimization (GEO) to ensure your brand is cited and recommended by ChatGPT, Google AI Overviews, Perplexity, and Claude.",
    "resources": [
      {
        "title": "SEO & Hybrid SEO for 2026 (Rank #1 on Google)",
        "url": "https://www.youtube.com/watch?v=tiW6xRYSXmM",
        "type": "yt"
      },
      {
        "title": "AI Search Optimization (GEO for SGE & Perplexity)",
        "url": "https://www.youtube.com/watch?v=CFAecA3k82o",
        "type": "yt"
      },
      {
        "title": "YouTube Marketing & Video SEO Strategy",
        "url": "https://www.youtube.com/watch?v=HPxmXC1ItOU",
        "type": "yt"
      },
      {
        "title": "AI-Cited Authority & Content Optimization",
        "url": "https://www.youtube.com/watch?v=5OccF4g0UKI",
        "type": "yt"
      },
      {
        "title": "Structured Data & Schema Markup for AI Engines",
        "url": "https://www.youtube.com/watch?v=r0bI0yLp_ps",
        "type": "yt"
      },
      {
        "title": "Free SEO Tools to Rank Without Paid Subscriptions",
        "url": "https://www.youtube.com/watch?v=3SE2YdU1ZaI",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "HubSpot SEO Certification",
        "url": "https://academy.hubspot.com/courses/seo-training",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Learn everything from search engine algorithms and link building to technical website audits."
      },
      {
        "title": "Google Search Central SEO Starter Guide",
        "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        "type": "guide",
        "provider": "Google",
        "description": "Official documentation from Google engineers explaining how search indexing and ranking truly operate."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Hybrid SEO & AI Search Topic Cluster Build",
        "url": "https://www.youtube.com/watch?v=tiW6xRYSXmM",
        "outcome": "Complete keyword map, JSON-LD schema markup, and AI-optimized pillar page ready for indexing.",
        "steps": [
          "Audit target keyword search intent and query modifiers",
          "Design a semantic pillar-and-cluster site architecture",
          "Write an in-depth 2,500-word authority pillar guide",
          "Generate and validate custom JSON-LD schema markup"
        ]
      }
    ],
    "tools": [
      {
        "name": "Google Search Console",
        "url": "https://search.google.com/search-console"
      },
      {
        "name": "Ahrefs Webmaster Tools",
        "url": "https://ahrefs.com/webmaster-tools"
      },
      {
        "name": "Schema Markup Generator",
        "url": "https://technicalseo.com/tools/schema-markup-generator/"
      }
    ],
    "tasks": [
      {
        "id": "m-t7",
        "label": "Execute a full technical SEO site audit identifying crawl errors and slow Core Web Vitals.",
        "type": "technical"
      },
      {
        "id": "m-t8",
        "label": "Build a semantic topic cluster map targeting high-intent long-tail search terms.",
        "type": "research"
      },
      {
        "id": "m-t9",
        "label": "Deploy schema markup (Article, Organization, FAQ) and verify with Google Rich Results Test.",
        "type": "code"
      }
    ],
    "project": {
      "title": "Comprehensive SEO & GEO Audit with Topic Architecture",
      "description": "Produce a production-grade 20-page SEO Audit and AI Optimization Strategy for an existing business, identifying technical pitfalls, keyword expansion opportunities, and direct GEO citation strategies.",
      "deliverables": [
        "Technical Health & Core Web Vitals Scorecard",
        "Keyword Opportunity & Semantic Gap Matrix",
        "Pillar & Topic Cluster Blueprint",
        "AI Search Optimization (GEO) Action Plan"
      ],
      "sellingStrategy": {
        "pitch": "Sell this as a 'Search Readiness & AI Search Audit' to modern brands worried their search visibility is disappearing to Perplexity and ChatGPT.",
        "pricing": "$750 - $2,500",
        "whereToFind": [
          "Local Professional Services",
          "E-commerce Stores",
          "SaaS Companies"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p4",
    "number": "04",
    "title": "Paid Advertising & AI Bidding",
    "badge": "Digital Marketing",
    "weeks": "MODULE 4",
    "objective": "Harness algorithmic paid media across Meta (Facebook & Instagram), Google Ads, and TikTok. Master AI bid strategies, Performance Max (PMax), Advantage+ campaigns, and creative testing systems that deliver consistent positive ROAS.",
    "resources": [
      {
        "title": "Paid Advertising with AI & Modern Ad Systems",
        "url": "https://www.youtube.com/watch?v=wKp8lEICwZQ",
        "type": "yt"
      },
      {
        "title": "AI Bid Strategies, Smart Bidding & Targeting",
        "url": "https://www.youtube.com/watch?v=PCXzwgch0dU",
        "type": "yt"
      },
      {
        "title": "Meta Ads & Advantage+ Campaign Masterclass",
        "url": "https://www.youtube.com/watch?v=eYkCqgMhKUk",
        "type": "yt"
      },
      {
        "title": "Google Performance Max (PMax) Architecture",
        "url": "https://www.youtube.com/watch?v=r3E9E2_J6_0",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google Ads Search Certification",
        "url": "https://skillshop.exceedlms.com/student/path/18128-google-ads-search-certification",
        "type": "certification",
        "provider": "Google Skillshop",
        "description": "Demonstrate mastery of building and optimizing Google Search campaigns and automated Smart Bidding."
      },
      {
        "title": "Google Ads Display Certification",
        "url": "https://skillshop.exceedlms.com/student/path/18061-google-ads-display-certification",
        "type": "certification",
        "provider": "Google Skillshop",
        "description": "Validate expertise in delivering effective display advertising and performance marketing."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Full-Funnel AI Paid Ad Campaign Setup",
        "url": "https://www.youtube.com/watch?v=wKp8lEICwZQ",
        "outcome": "Configured Google PMax or Meta Advantage+ campaign structure with automated bidding and audience signal layers.",
        "steps": [
          "Define target CPA and ROAS thresholds mathematically",
          "Construct creative variations with distinct psychological hooks",
          "Set up custom audience signals and first-party customer lists",
          "Deploy automated ad testing rules with budget cutoffs"
        ]
      }
    ],
    "tools": [
      {
        "name": "Meta Ads Manager",
        "url": "https://adsmanager.facebook.com/"
      },
      {
        "name": "Google Ads",
        "url": "https://ads.google.com/"
      },
      {
        "name": "TikTok Ads Manager",
        "url": "https://ads.tiktok.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t10",
        "label": "Design a 3:2:2 dynamic creative testing matrix for Meta Advantage+ campaigns.",
        "type": "design"
      },
      {
        "id": "m-t11",
        "label": "Configure a Google Performance Max asset group with audience signals and negative keywords.",
        "type": "technical"
      },
      {
        "id": "m-t12",
        "label": "Audit ad account attribution windows and calculate true Blended MER (Marketing Efficiency Ratio).",
        "type": "analytics"
      }
    ],
    "project": {
      "title": "Full-Funnel Paid Advertising Campaign Architecture",
      "description": "Architect a complete paid media media-plan and ad-account restructuring for a $5,000 - $20,000/mo budget, including creative matrices, audience segmentation, budget pacing, and tracking infrastructure.",
      "deliverables": [
        "Budget Pacing & Allocation Sheet",
        "Dynamic Creative Testing (DCT) Matrix",
        "Audience Signal & Pixel Setup Documentation",
        "Weekly Optimization & Scaling Protocol"
      ],
      "sellingStrategy": {
        "pitch": "Pitch paid media management on a base retainer plus percentage of ad spend or performance bonus on profitable ROAS.",
        "pricing": "$1,500 - $3,500 / mo base + 10% spend",
        "whereToFind": [
          "E-commerce Brands",
          "Lead-Gen Companies",
          "B2B SaaS"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p5",
    "number": "05",
    "title": "E-commerce & Conversion Rate Optimization (CRO)",
    "badge": "Digital Marketing",
    "weeks": "MODULE 5",
    "objective": "Transform traffic into paying customers. Master e-commerce storefront architecture, behavioral psychology, friction elimination, high-converting product detail pages, and rigorous A/B testing methodologies.",
    "resources": [
      {
        "title": "E-commerce Store Setup & Optimization",
        "url": "https://www.youtube.com/watch?v=2y71Lc3bB1k",
        "type": "yt"
      },
      {
        "title": "Conversion Rate Optimization (CRO) Masterclass",
        "url": "https://www.youtube.com/watch?v=E7ChpMEPI40",
        "type": "yt"
      },
      {
        "title": "Conversion Psychology & Persuasion Principles",
        "url": "https://www.youtube.com/watch?v=Ac4cR34N_9o",
        "type": "yt"
      },
      {
        "title": "Free E-commerce Platforms (WooCommerce Tutorial)",
        "url": "https://www.youtube.com/watch?v=5Q_9ClYMMbk",
        "type": "yt"
      },
      {
        "title": "Free CRO & Heatmap Tools (Microsoft Clarity Tutorial)",
        "url": "https://www.youtube.com/watch?v=TmUyGeMnECA",
        "type": "yt"
      },
      {
        "title": "A/B Testing & High-Conversion Product Pages",
        "url": "https://www.youtube.com/watch?v=QFDKT6h_0BI",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google Analytics 4 for E-commerce",
        "url": "https://skillshop.exceedlms.com/student/path/18330-google-analytics-individual-qualification",
        "type": "certification",
        "provider": "Google Skillshop",
        "description": "Master tracking monetization, user behavior, and checkout funnel drop-offs in GA4."
      },
      {
        "title": "Shopify Academy Courses",
        "url": "https://www.shopify.com/learn",
        "type": "course",
        "provider": "Shopify",
        "description": "Comprehensive lessons on store design, product merchandising, and order management."
      }
    ],
    "followAlongProjects": [
      {
        "title": "E-commerce CRO Audit & Store Optimization",
        "url": "https://www.youtube.com/watch?v=2y71Lc3bB1k",
        "outcome": "A high-converting product page audit with friction points highlighted and Microsoft Clarity heatmap tracking installed.",
        "steps": [
          "Install Microsoft Clarity tracking code on an e-commerce store",
          "Analyze 50 user session recordings for checkout drop-off friction",
          "Redesign the product page fold with social proof and risk reversal",
          "Formulate an A/B test hypothesis matrix ranked by PIE framework"
        ]
      }
    ],
    "tools": [
      {
        "name": "Microsoft Clarity",
        "url": "https://clarity.microsoft.com/"
      },
      {
        "name": "Shopify",
        "url": "https://shopify.com/"
      },
      {
        "name": "WooCommerce",
        "url": "https://woocommerce.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t13",
        "label": "Deploy Microsoft Clarity and inspect rage clicks and checkout drop-off points.",
        "type": "analytics"
      },
      {
        "id": "m-t14",
        "label": "Redesign a product page above-the-fold layout following psychological persuasion principles.",
        "type": "design"
      },
      {
        "id": "m-t15",
        "label": "Draft a prioritized A/B testing roadmap scored via the PIE (Potential, Importance, Ease) model.",
        "type": "planning"
      }
    ],
    "project": {
      "title": "High-Converting E-commerce Store & CRO Blueprint",
      "description": "Conduct an exhaustive conversion rate audit on an active or mock e-commerce store, proposing visual wireframes, copy overhauls, and post-purchase upsell funnels engineered to increase Average Order Value (AOV).",
      "deliverables": [
        "Heuristic CRO Teardown Document",
        "Figma Wireframe of Optimized Product Page (PDP)",
        "Post-Purchase Upsell & Cross-Sell Architecture",
        "90-Day A/B Experimentation Calendar"
      ],
      "sellingStrategy": {
        "pitch": "Sell CRO audits to e-commerce store owners doing at least $20k/mo. Increasing CVR from 1.5% to 2.5% immediately boosts their bottom-line without spending an extra dollar on ads.",
        "pricing": "$1,000 - $3,000 per audit",
        "whereToFind": [
          "Shopify App Store Forums",
          "Twitter Ecom Community",
          "Direct Outreach"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p6",
    "number": "06",
    "title": "Email, SMS & Conversational Marketing",
    "badge": "Digital Marketing",
    "weeks": "MODULE 6",
    "objective": "Build automated revenue machines that generate sales on autopilot. Master lifecycle email segmentation, SMS retention strategies, high-converting copywriting, and AI-powered conversational chatbots.",
    "resources": [
      {
        "title": "Email Marketing Automation Full Course",
        "url": "https://www.youtube.com/watch?v=ZTZjpA0FL9E",
        "type": "yt"
      },
      {
        "title": "SMS Marketing Strategy for High Retention",
        "url": "https://www.youtube.com/watch?v=F8PYut37rJ8",
        "type": "yt"
      },
      {
        "title": "Conversational Marketing & AI Chatbots",
        "url": "https://www.youtube.com/watch?v=S6hfIxkdlRc",
        "type": "yt"
      },
      {
        "title": "Free Email Marketing Setup (MailerLite Guide)",
        "url": "https://www.youtube.com/watch?v=D-zykxVXQDY",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "HubSpot Email Marketing Certification",
        "url": "https://academy.hubspot.com/courses/email-marketing",
        "type": "certification",
        "provider": "HubSpot",
        "description": "Master lifecycle marketing, list segmentation, email deliverability, and testing strategies."
      },
      {
        "title": "Klaviyo Product Certification",
        "url": "https://academy.klaviyo.com/",
        "type": "certification",
        "provider": "Klaviyo Academy",
        "description": "Industry-standard credential for automated e-commerce email flows and behavioral triggers."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Automated Email & SMS Flow Deployment",
        "url": "https://www.youtube.com/watch?v=ZTZjpA0FL9E",
        "outcome": "Live welcome, abandoned checkout, and post-purchase nurture automation flows deployed in MailerLite/Klaviyo.",
        "steps": [
          "Create a high-converting lead magnet opt-in form",
          "Script a 4-part Welcome Nurture sequence with story-driven copy",
          "Build an Abandoned Checkout automation with dynamic urgency hooks",
          "Integrate SMS compliance safeguards (TCPA / GDPR)"
        ]
      }
    ],
    "tools": [
      {
        "name": "MailerLite",
        "url": "https://mailerlite.com/"
      },
      {
        "name": "Klaviyo",
        "url": "https://klaviyo.com/"
      },
      {
        "name": "ManyChat",
        "url": "https://manychat.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t16",
        "label": "Write a 5-part Story-Led Welcome Series applying open-loop copywriting techniques.",
        "type": "writing"
      },
      {
        "id": "m-t17",
        "label": "Build an Abandoned Checkout & Browse Abandonment automated trigger flow.",
        "type": "technical"
      },
      {
        "id": "m-t18",
        "label": "Configure an automated Instagram DM comment-to-lead chatbot in ManyChat.",
        "type": "automation"
      }
    ],
    "project": {
      "title": "Automated Retention & Lifecycle Marketing Engine",
      "description": "Design, write, and configure the 5 core automated revenue flows for an online business (Welcome Series, Abandoned Cart, Post-Purchase Nurture, Customer Winback, and VIP Appreciation).",
      "deliverables": [
        "Complete Copy Deck for 15 Automated Emails & 5 SMS Texts",
        "Visual Flow Diagram with Trigger & Split Logic",
        "Deliverability Audit (DKIM, SPF, DMARC Setup Guide)",
        "Segment Strategy (Engaged 30d, 60d, VIP LTV)"
      ],
      "sellingStrategy": {
        "pitch": "Sell a 'Klaviyo/MailerLite Revenue Flow Setup' package to store owners who only send manual email blasts. Automated flows reliably add 15-30% to monthly revenue without ad spend.",
        "pricing": "$1,500 - $4,000 one-time setup",
        "whereToFind": [
          "Direct to Consumer Brands",
          "Info-product Creators",
          "Coaches"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p7",
    "number": "07",
    "title": "Data Analytics & Attribution Models",
    "badge": "Digital Marketing",
    "weeks": "MODULE 7",
    "objective": "Transform raw numbers into strategic marketing decisions. Master Google Analytics 4 (GA4), PostHog, custom event tracking, first-party data privacy compliance, and multi-touch marketing attribution models.",
    "resources": [
      {
        "title": "Google Analytics 4 (GA4) Complete Tutorial",
        "url": "https://www.youtube.com/watch?v=hsIP4iH25Wg",
        "type": "yt"
      },
      {
        "title": "Marketing Attribution Models Explained",
        "url": "https://www.youtube.com/watch?v=o_6QjH3OfIA",
        "type": "yt"
      },
      {
        "title": "First-Party Data Strategy & Privacy Compliance",
        "url": "https://www.youtube.com/watch?v=0ocPGOwnDB4",
        "type": "yt"
      },
      {
        "title": "Free Analytics Tools (PostHog Masterclass)",
        "url": "https://www.youtube.com/watch?v=l1Hh0eY3BMw",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google Analytics Certification",
        "url": "https://skillshop.exceedlms.com/student/path/18330-google-analytics-individual-qualification",
        "type": "certification",
        "provider": "Google Skillshop",
        "description": "Official certification for configuring GA4 properties, tracking events, and analyzing reports."
      },
      {
        "title": "Google Tag Manager Fundamentals",
        "url": "https://analytics.google.com/analytics/academy/course/5",
        "type": "course",
        "provider": "Google Analytics Academy",
        "description": "Master tag deployment, data layers, triggers, and custom event variables."
      }
    ],
    "followAlongProjects": [
      {
        "title": "GA4 Custom Tracking & Executive Dashboard Build",
        "url": "https://www.youtube.com/watch?v=hsIP4iH25Wg",
        "outcome": "Full GA4 event tracking configuration with custom dimensions and real-time conversion funnel monitoring.",
        "steps": [
          "Install and configure Google Tag Manager container",
          "Set up standard and custom recommended e-commerce events",
          "Build an interactive Looker Studio executive dashboard",
          "Configure conversion attribution modeling comparisons"
        ]
      }
    ],
    "tools": [
      {
        "name": "Google Analytics 4",
        "url": "https://analytics.google.com/"
      },
      {
        "name": "Google Tag Manager",
        "url": "https://tagmanager.google.com/"
      },
      {
        "name": "PostHog",
        "url": "https://posthog.com/"
      },
      {
        "name": "Looker Studio",
        "url": "https://lookerstudio.google.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t19",
        "label": "Set up a unified Google Tag Manager container with enhanced measurement events.",
        "type": "technical"
      },
      {
        "id": "m-t20",
        "label": "Construct an executive performance dashboard in Looker Studio tracking Blended ROAS and CPA.",
        "type": "analytics"
      },
      {
        "id": "m-t21",
        "label": "Implement strict UTM parameter taxonomy across all marketing channels.",
        "type": "planning"
      }
    ],
    "project": {
      "title": "Executive Marketing Analytics & Attribution Suite",
      "description": "Deploy a bulletproof analytics tracking infrastructure for a client, complete with server-side GTM, GA4 custom conversion events, and an automated Looker Studio executive dashboard.",
      "deliverables": [
        "Complete Tagging & Tracking Architecture Plan",
        "GA4 Custom Events & Conversion Setup",
        "Interactive Looker Studio KPI Dashboard",
        "Attribution Modeling Comparison Report"
      ],
      "sellingStrategy": {
        "pitch": "Sell 'Analytics & Attribution Infrastructure Setup' to mid-sized marketing teams struggling to understand which ad channels are actually producing profitable sales.",
        "pricing": "$1,200 - $3,000 setup",
        "whereToFind": [
          "Fast-growing Startups",
          "Ad Agencies needing tracking experts",
          "LinkedIn"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p8",
    "number": "08",
    "title": "Advanced AI Marketing & Agentic AI",
    "badge": "Digital Marketing",
    "weeks": "MODULE 8",
    "objective": "Operate at the frontier of marketing technology. Learn to deploy autonomous AI agents, multi-agent research pipelines, programmatic SEO generators, and LLM-powered market intelligence workflows.",
    "resources": [
      {
        "title": "Agentic AI Marketing & Autonomous Workflows",
        "url": "https://www.youtube.com/watch?v=BGKyBkJ2eA8",
        "type": "yt"
      },
      {
        "title": "Free Copywriting AI Tools & Prompt Systems",
        "url": "https://www.youtube.com/watch?v=s0BbYfsf6CA",
        "type": "yt"
      },
      {
        "title": "Zero-Click Content Strategy for Search & AI",
        "url": "https://www.youtube.com/watch?v=4OtbzltZQzA",
        "type": "yt"
      },
      {
        "title": "AI-Cited Authority & Optimization Secrets",
        "url": "https://www.youtube.com/watch?v=5OccF4g0UKI",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Google AI Essentials",
        "url": "https://www.coursera.org/learn/google-ai-essentials",
        "type": "course",
        "provider": "Google / Coursera",
        "description": "Learn to use generative AI tools effectively to boost daily productivity and business execution."
      },
      {
        "title": "Anthropic Prompt Engineering Interactive Tutorial",
        "url": "https://github.com/anthropics/prompt-eng-interactive-tutorial",
        "type": "guide",
        "provider": "Anthropic",
        "description": "Master advanced prompting techniques, XML tagging, and few-shot calibration for Claude."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Autonomous Agentic AI Marketing System",
        "url": "https://www.youtube.com/watch?v=BGKyBkJ2eA8",
        "outcome": "Multi-agent autonomous pipeline that scrapes competitor keywords, drafts personalized angles, and schedules content.",
        "steps": [
          "Set up Make.com or n8n workflow connecting LLM APIs",
          "Feed brand voice guideline docs as few-shot examples",
          "Automate competitor ad scraper and transcription pipeline",
          "Generate personalized outreach drafts and publish to CMS"
        ]
      }
    ],
    "tools": [
      {
        "name": "Make.com",
        "url": "https://make.com/"
      },
      {
        "name": "n8n",
        "url": "https://n8n.io/"
      },
      {
        "name": "Claude",
        "url": "https://claude.ai/"
      },
      {
        "name": "OpenAI Platform",
        "url": "https://platform.openai.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t22",
        "label": "Build an automated competitor ad monitor that summarizes weekly creative strategies.",
        "type": "automation"
      },
      {
        "id": "m-t23",
        "label": "Craft a calibrated Brand Voice system prompt producing zero-edit marketing copy.",
        "type": "prompting"
      },
      {
        "id": "m-t24",
        "label": "Deploy a programmatic content generation workflow via Make.com and Google Sheets.",
        "type": "technical"
      }
    ],
    "project": {
      "title": "Autonomous AI Marketing Engine & Prompt Operating System",
      "description": "Build an end-to-end AI marketing engine that automatically monitors industry news, generates on-brand thought leadership posts, creates carousel outlines, and drafts newsletters on a recurring schedule.",
      "deliverables": [
        "Custom Calibrated System Prompts & Brand Voice Guide",
        "Automated Make.com / n8n Scenario JSON Export",
        "Programmatic Content Pipeline with Human-in-the-Loop Review",
        "AI Content Performance Tracking Template"
      ],
      "sellingStrategy": {
        "pitch": "Sell 'AI Marketing Automation Systems' to busy CEOs and marketing directors looking to 5x their content output without hiring a 5-person creative team.",
        "pricing": "$2,500 - $6,000 implementation",
        "whereToFind": [
          "Funded Tech Startups",
          "Solopreneurs",
          "Consultancies"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p9",
    "number": "09",
    "title": "Emerging Tech & Omnichannel Strategy",
    "badge": "Digital Marketing",
    "weeks": "MODULE 9",
    "objective": "Connect disjointed channels into a synchronized omnichannel ecosystem. Master AR/VR spatial marketing, first-party data privacy strategies, and headless customer experiences that future-proof your growth engine.",
    "resources": [
      {
        "title": "AR/VR Marketing Strategy & Spatial Commerce",
        "url": "https://www.youtube.com/watch?v=Yv9UWZEHd9c",
        "type": "yt"
      },
      {
        "title": "First-Party Data Strategy & Cookieless Tracking",
        "url": "https://www.youtube.com/watch?v=0ocPGOwnDB4",
        "type": "yt"
      },
      {
        "title": "Agentic AI & Future Omnichannel Architectures",
        "url": "https://www.youtube.com/watch?v=BGKyBkJ2eA8",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Meta Spark AR Creator Foundations",
        "url": "https://spark.meta.com/learn/",
        "type": "course",
        "provider": "Meta Spark",
        "description": "Learn to design and publish augmented reality filters for Instagram and Facebook."
      },
      {
        "title": "Google Privacy Sandbox Fundamentals",
        "url": "https://privacysandbox.com/",
        "type": "guide",
        "provider": "Google",
        "description": "Understand the future of web advertising and measurement without third-party cookies."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Omnichannel Customer Journey Map",
        "url": "https://www.youtube.com/watch?v=Yv9UWZEHd9c",
        "outcome": "Visual Miro/FigJam map of all touchpoints connecting social ads, web, email, SMS, and post-purchase loops.",
        "steps": [
          "Identify all consumer touchpoints across the entire lifecycle",
          "Design unified customer data triggers between ad platforms and CRM",
          "Build an interactive AR product preview or visual filter concept",
          "Draft privacy-first consent flows complying with modern standards"
        ]
      }
    ],
    "tools": [
      {
        "name": "Meta Spark Studio",
        "url": "https://spark.meta.com/"
      },
      {
        "name": "FigJam",
        "url": "https://figma.com/figjam"
      },
      {
        "name": "Segment / Twilio",
        "url": "https://segment.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t25",
        "label": "Map a complete omnichannel customer journey architecture with unified customer IDs.",
        "type": "planning"
      },
      {
        "id": "m-t26",
        "label": "Design a branded AR filter concept or interactive virtual product try-on experience.",
        "type": "design"
      },
      {
        "id": "m-t27",
        "label": "Audit cookie compliance and transition tracking to a server-side first-party data framework.",
        "type": "technical"
      }
    ],
    "project": {
      "title": "Unified Omnichannel Blueprint & Experience Architecture",
      "description": "Architect a holistic omnichannel roadmap for an enterprise retail or D2C brand, integrating paid media, social commerce, headless web, SMS, email, and experiential retail.",
      "deliverables": [
        "Comprehensive Omnichannel Experience Map",
        "First-Party Data Strategy Document",
        "AR Social Commerce Prototype Plan",
        "Cross-Channel Communication Rules Matrix"
      ],
      "sellingStrategy": {
        "pitch": "Consult growing mid-market brands on modernizing their fragmented marketing stack into an integrated customer experience.",
        "pricing": "$2,000 - $5,000",
        "whereToFind": [
          "Mid-market D2C Brands",
          "Enterprise Retail",
          "LinkedIn"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p10",
    "number": "10",
    "title": "Creative Production & Design Systems",
    "badge": "Digital Marketing",
    "weeks": "MODULE 10",
    "objective": "Produce high-converting direct-response creative assets at scale. Master AI image generation, DaVinci Resolve video editing, text-to-speech voiceovers, and visual ad frameworks engineered to stop the scroll.",
    "resources": [
      {
        "title": "Content Production & Workflow for Direct Response",
        "url": "https://www.youtube.com/watch?v=2K_r5fyzPbk",
        "type": "yt"
      },
      {
        "title": "Free Image Generation Tools for Ad Creatives",
        "url": "https://www.youtube.com/watch?v=uBOdGtaLooc",
        "type": "yt"
      },
      {
        "title": "Free Video Editing with DaVinci Resolve",
        "url": "https://www.youtube.com/watch?v=hefQAtOHqEw",
        "type": "yt"
      },
      {
        "title": "Free Voiceover Tools (TTS Alternatives)",
        "url": "https://www.youtube.com/watch?v=yXH1dQLyVNY",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Blackmagic DaVinci Resolve Training",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
        "type": "course",
        "provider": "Blackmagic Design",
        "description": "Official masterclasses on professional video editing, color grading, and audio post-production."
      },
      {
        "title": "Canva Design School",
        "url": "https://www.canva.com/designschool/",
        "type": "course",
        "provider": "Canva",
        "description": "Learn typography, hierarchy, color psychology, and direct-response social ad design."
      }
    ],
    "followAlongProjects": [
      {
        "title": "High-Converting Direct Response Ad Creative Suite",
        "url": "https://www.youtube.com/watch?v=2K_r5fyzPbk",
        "outcome": "A complete asset pack with 3 video hook variations, thumbnail designs, and synthesized high-clarity voiceover.",
        "steps": [
          "Generate realistic product mockups using free AI image tools",
          "Record or synthesize voiceover using high-fidelity TTS",
          "Assemble and color-grade video creatives in DaVinci Resolve",
          "Export in optimal 9:16 and 1:1 aspect ratios for ad platforms"
        ]
      }
    ],
    "tools": [
      {
        "name": "DaVinci Resolve",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve"
      },
      {
        "name": "Figma",
        "url": "https://figma.com/"
      },
      {
        "name": "CapCut",
        "url": "https://capcut.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t28",
        "label": "Design 5 static high-CTR advertorial banner variations in Figma.",
        "type": "design"
      },
      {
        "id": "m-t29",
        "label": "Edit a 30-second high-energy direct-response video ad in DaVinci Resolve with dynamic captions.",
        "type": "video"
      },
      {
        "id": "m-t30",
        "label": "Generate synthetic voiceover tracks using free TTS tools and sync with visual pacing.",
        "type": "audio"
      }
    ],
    "project": {
      "title": "High-Converting Paid Ad Creative Suite",
      "description": "Produce a comprehensive creative asset pack for an ad campaign, featuring 3 distinct video hooks, 5 static banner variations, and 3 motion-graphic story formats with high-converting typography.",
      "deliverables": [
        "3 Edited High-Resolution MP4 Ad Videos (9:16 format)",
        "5 Static Ad Creatives (1:1 & 4:5 ratios)",
        "Figma Direct-Response Ad Design System",
        "Hook Variation Performance Scorecard"
      ],
      "sellingStrategy": {
        "pitch": "Sell 'Ad Creative Refresh Packs' to performance advertisers facing creative fatigue. Ad fatigue is the #1 reason ROAS declines over time.",
        "pricing": "$1,000 - $2,500 per creative batch",
        "whereToFind": [
          "Performance Marketing Agencies",
          "E-commerce Brands",
          "Twitter Ads Community"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p11",
    "number": "11",
    "title": "Marketing Infrastructure & Landing Pages",
    "badge": "Digital Marketing",
    "weeks": "MODULE 11",
    "objective": "Build lightning-fast, high-converting marketing landing pages without writing complex code. Master modern landing page builders, conversion-focused wireframing, lead capture funnels, and schema markup integration.",
    "resources": [
      {
        "title": "Free Landing Page Builders Comparison & Build",
        "url": "https://www.youtube.com/watch?v=-dqF9P2qf_8",
        "type": "yt"
      },
      {
        "title": "Structured Data & Schema Markup for High Click-Through",
        "url": "https://www.youtube.com/watch?v=r0bI0yLp_ps",
        "type": "yt"
      },
      {
        "title": "Free CRO & Heatmap Analysis (Microsoft Clarity)",
        "url": "https://www.youtube.com/watch?v=TmUyGeMnECA",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Webflow University 101 Crash Course",
        "url": "https://university.webflow.com/courses/webflow-101-crash-course",
        "type": "course",
        "provider": "Webflow",
        "description": "Learn visual web development, responsive CSS layouts, and modern CMS structure."
      },
      {
        "title": "Framer Academy",
        "url": "https://www.framer.com/academy/",
        "type": "course",
        "provider": "Framer",
        "description": "Master designing and publishing interactive, high-fidelity marketing pages rapidly."
      }
    ],
    "followAlongProjects": [
      {
        "title": "High-Converting Landing Page Infrastructure Build",
        "url": "https://www.youtube.com/watch?v=-dqF9P2qf_8",
        "outcome": "Responsive, high-converting landing page with lead magnet capture form and schema markup ready for deployment.",
        "steps": [
          "Wireframe above-the-fold value proposition and primary CTA",
          "Assemble responsive landing page layout in Framer / Webflow",
          "Connect form submissions to email marketing automation via webhook",
          "Verify sub-second load times via Google PageSpeed Insights"
        ]
      }
    ],
    "tools": [
      {
        "name": "Framer",
        "url": "https://framer.com/"
      },
      {
        "name": "Webflow",
        "url": "https://webflow.com/"
      },
      {
        "name": "Carrd",
        "url": "https://carrd.co/"
      },
      {
        "name": "PageSpeed Insights",
        "url": "https://pagespeed.web.dev/"
      }
    ],
    "tasks": [
      {
        "id": "m-t31",
        "label": "Design and publish a mobile-responsive direct-response landing page in Framer or Webflow.",
        "type": "design"
      },
      {
        "id": "m-t32",
        "label": "Achieve a 90+ mobile performance score on Google PageSpeed Insights for your landing page.",
        "type": "technical"
      },
      {
        "id": "m-t33",
        "label": "Integrate lead capture form with automated webhook delivery to your CRM.",
        "type": "automation"
      }
    ],
    "project": {
      "title": "High-Converting Direct Response Landing Page & Funnel",
      "description": "Build and publish a bespoke, production-ready landing page for a product or lead magnet, complete with persuasive copywriting, dynamic social proof, lead capture forms, and sub-second load speeds.",
      "deliverables": [
        "Live Production Landing Page URL",
        "Figma Design & Responsive Layout File",
        "Google PageSpeed 90+ Optimization Audit",
        "Form Webhook & CRM Integration Confirmation"
      ],
      "sellingStrategy": {
        "pitch": "Sell high-converting landing page builds to businesses paying for ad clicks that land on slow, cluttered homepages.",
        "pricing": "$1,000 - $3,500 per landing page",
        "whereToFind": [
          "Local Service Providers",
          "SaaS Founders",
          "Course Creators"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  },
  {
    "id": "marketing-p12",
    "number": "12",
    "title": "Scaling a Digital Marketing Agency & Offers",
    "badge": "Digital Marketing",
    "weeks": "MODULE 12",
    "objective": "Transition from individual execution to a high-ticket agency owner. Master Grand Slam Offer architecture, value-based pricing models, automated B2B client acquisition pipelines, and streamlined operations.",
    "resources": [
      {
        "title": "Scaling a Digital Marketing Agency from $0 to 6 Figures",
        "url": "https://www.youtube.com/watch?v=vYIx9kc7CEo",
        "type": "yt"
      },
      {
        "title": "Crafting Irresistible Grand Slam Offers Masterclass",
        "url": "https://www.youtube.com/watch?v=2fOCe9O2dLE",
        "type": "yt"
      }
    ],
    "freeResources": [
      {
        "title": "Acquisition.com $100M Offers Free Training",
        "url": "https://www.acquisition.com/training/offers",
        "type": "course",
        "provider": "Alex Hormozi / Acquisition.com",
        "description": "Master creating irresistible offers, value equations, pricing psychology, and risk reversals."
      },
      {
        "title": "HubSpot Agency Operations & Scaling Course",
        "url": "https://academy.hubspot.com/courses/client-management",
        "type": "course",
        "provider": "HubSpot Academy",
        "description": "Learn client onboarding, retention systems, and scaling agency delivery operations."
      }
    ],
    "followAlongProjects": [
      {
        "title": "Agency Client Acquisition & Offer Funnel",
        "url": "https://www.youtube.com/watch?v=vYIx9kc7CEo",
        "outcome": "Irresistible Grand Slam Offer document, value proposition deck, and cold outbound pipeline ready to close clients.",
        "steps": [
          "Define your hyper-specific niche and high-ticket service offering",
          "Formulate an irresistible value equation with ironclad guarantee",
          "Draft a 4-touchpoint personalized LinkedIn & cold email outreach sequence",
          "Build an automated client onboarding portal in Notion"
        ]
      }
    ],
    "tools": [
      {
        "name": "Notion",
        "url": "https://notion.so/"
      },
      {
        "name": "Loom",
        "url": "https://loom.com/"
      },
      {
        "name": "Stripe",
        "url": "https://stripe.com/"
      }
    ],
    "tasks": [
      {
        "id": "m-t34",
        "label": "Write an irresistible Grand Slam Offer document applying Alex Hormozi's Value Equation.",
        "type": "writing"
      },
      {
        "id": "m-t35",
        "label": "Build a standardized Client Onboarding Notion portal with intake forms and roadmap templates.",
        "type": "operations"
      },
      {
        "id": "m-t36",
        "label": "Launch a cold outbound campaign to 50 vetted ideal client prospects using personalized Loom audits.",
        "type": "sales"
      }
    ],
    "project": {
      "title": "Complete Agency Operating System & Client Acquisition Engine",
      "description": "Build out your complete agency operational infrastructure: a flagship Grand Slam Offer, pricing calculator, client onboarding Notion portal, sales presentation slide deck, and cold outreach protocol.",
      "deliverables": [
        "Flagship Grand Slam Offer Document & Pricing Model",
        "Client Onboarding Notion Portal Template",
        "10-Slide High-Converting Pitch Deck",
        "Multi-Touch Cold Outreach Playbook & Script"
      ],
      "sellingStrategy": {
        "pitch": "This is your own business launchpad: package the skills learned across all 12 modules into high-ticket recurring retainers ($2,500 - $5,000/mo) and land your first 3 retainer clients.",
        "pricing": "$2,500 - $5,000 / month recurring retainers",
        "whereToFind": [
          "Direct Outreach",
          "Personal Brand",
          "Referral Networks"
        ]
      }
    },
    "color": "from-emerald-500 to-emerald-700"
  }
];
