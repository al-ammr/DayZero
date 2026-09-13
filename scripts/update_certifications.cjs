const fs = require('fs');
const path = 'src/components/CertificationsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTrack03Str = content.slice(content.indexOf('"track-03": {'), content.indexOf('};', content.indexOf('"track-03": {')));

const newTrack03Str = `"track-03": {
    name: "Digital Marketing and Commerce",
    phases: [
      { id:"Phase 01", title:"Digital Marketing Landscape & Brand Strategy", resources:[
        {type:"certification", provider:"HubSpot", name:"HubSpot Inbound Marketing Certification", desc:"Comprehensive foundation in digital marketing strategy, inbound marketing, and audience targeting."},
        {type:"certification", provider:"Google", name:"Fundamentals of Digital Marketing", desc:"Master the basics of digital marketing with interactive advertising and strategy modules."},
        {type:"course", provider:"Codecademy", name:"Intro to Digital Marketing", desc:"Learn how to build a digital marketing campaign and track key performance indicators."}
      ]},
      { id:"Phase 02", title:"Content Marketing & Social Media Strategy", resources:[
        {type:"certification", provider:"Meta", name:"Meta Social Media Marketing Professional Certificate", desc:"Learn to build a social media strategy, create content, and analyze campaigns."},
        {type:"certification", provider:"HubSpot", name:"HubSpot Content Marketing Certification", desc:"Master the art of storytelling, content creation, repurposing, and promotion."},
        {type:"guide", provider:"TikTok", name:"TikTok Creator Academy", desc:"Deep dive into TikTok's algorithm, short-form storytelling, and community building."}
      ]},
      { id:"Phase 03", title:"Search Engine Optimization (SEO) & AI Search", resources:[
        {type:"certification", provider:"Semrush", name:"Semrush SEO Crash Course", desc:"Learn the fundamentals of SEO, keyword research, and on-page optimization."},
        {type:"course", provider:"Ahrefs", name:"Ahrefs Academy: SEO Training Course", desc:"Actionable tutorials on link building, keyword research, and technical SEO audits."},
        {type:"guide", provider:"Google", name:"Google Search Console Training", desc:"Official Google video series on diagnosing and optimizing search performance."}
      ]},
      { id:"Phase 04", title:"Paid Advertising & AI Bidding", resources:[
        {type:"certification", provider:"Google", name:"Google Ads Search Certification", desc:"Validate your expertise in building and optimizing Google Search campaigns."},
        {type:"certification", provider:"Meta", name:"Meta Blueprint: Digital Marketing Associate", desc:"Core understanding of value-driven advertising on Facebook and Instagram."},
        {type:"guide", provider:"WordStream", name:"WordStream PPC University", desc:"Deep dive into cost-per-click bidding, Quality Score optimization, and ad copy."}
      ]},
      { id:"Phase 05", title:"E-commerce & Conversion Rate Optimization", resources:[
        {type:"certification", provider:"Shopify", name:"Shopify Partner Academy: Store Operations", desc:"Learn the fundamentals of managing, growing, and optimizing a Shopify storefront."},
        {type:"certification", provider:"Google", name:"Google Analytics 4 (GA4) for E-commerce", desc:"Master tracking monetization, user behavior, and funnel drop-offs in GA4."},
        {type:"guide", provider:"VWO", name:"VWO Conversion Optimization Guide", desc:"Extensive guide on A/B testing methodologies and psychological conversion triggers."}
      ]},
      { id:"Phase 06", title:"Email, SMS & Conversational Marketing", resources:[
        {type:"certification", provider:"Klaviyo", name:"Klaviyo Product Certificate", desc:"Master list growth, segmentation, and automated flow architecture in Klaviyo."},
        {type:"certification", provider:"HubSpot", name:"HubSpot Email Marketing Certification", desc:"Deep dive into email deliverability, A/B testing, and lifecycle marketing."},
        {type:"course", provider:"ManyChat", name:"ManyChat Course", desc:"Learn to build automated Instagram and Facebook Messenger conversational flows."}
      ]},
      { id:"Phase 07", title:"Data Analytics & Attribution", resources:[
        {type:"certification", provider:"Google", name:"Google Analytics Certification", desc:"Official certification for configuring GA4 properties, tracking events, and analyzing reports."},
        {type:"course", provider:"Google", name:"Google Tag Manager Fundamentals", desc:"Learn to deploy tags, triggers, and variables without hardcoding scripts on your site."},
        {type:"guide", provider:"Google", name:"Looker Studio Tutorials", desc:"Guides on connecting data sources and building interactive visual dashboards."}
      ]},
      { id:"Phase 08", title:"Advanced AI Marketing & Agentic AI", resources:[
        {type:"course", provider:"IBM", name:"IBM AI Foundations for Business", desc:"Understand how AI is transforming business operations, marketing, and decision-making."},
        {type:"course", provider:"Google", name:"Google Cloud Generative AI Learning Path", desc:"Deep dive into Large Language Models (LLMs) and generative AI applications."},
        {type:"guide", provider:"Zapier", name:"Zapier AI Automation Guide", desc:"Practical guides on connecting AI models (like OpenAI) to thousands of marketing apps."}
      ]},
      { id:"Phase 09", title:"Emerging Tech & Omnichannel", resources:[
        {type:"certification", provider:"Hootsuite", name:"Hootsuite Platform Certification", desc:"Validate your ability to manage complex, multi-channel social media strategies."},
        {type:"course", provider:"HubSpot", name:"HubSpot Frictionless Sales", desc:"Learn how to align marketing, sales, and service for a unified customer experience."},
        {type:"guide", provider:"Contentful", name:"Contentful Headless CMS Guide", desc:"Understand the architecture of decoupling content creation from multi-device presentation."}
      ]},
      { id:"Phase 10", title:"Creative Production & Design", resources:[
        {type:"course", provider:"Canva", name:"Canva Design School", desc:"Comprehensive tutorials on graphic design principles, branding, and rapid asset creation."},
        {type:"guide", provider:"Adobe", name:"Adobe Express Fundamentals", desc:"Official guides for creating stunning social graphics and short videos."},
        {type:"course", provider:"Figma", name:"Figma UI/UX Crash Course", desc:"Learn the basics of layout, typography, and interface design in Figma."}
      ]},
      { id:"Phase 11", title:"Marketing Infrastructure & Landing Pages", resources:[
        {type:"guide", provider:"Unbounce", name:"Unbounce Landing Page Course", desc:"Deep dive into landing page anatomy, copywriting formulas, and conversion psychology."},
        {type:"guide", provider:"Microsoft", name:"Microsoft Clarity Analytics Guide", desc:"Learn to use session recordings and heatmaps to analyze user behavior."},
        {type:"course", provider:"Webflow", name:"Webflow University 101", desc:"Learn to build professional, custom landing pages visually without writing code."}
      ]},
      { id:"Phase 12", title:"Scaling & Agency Building", resources:[
        {type:"certification", provider:"HubSpot", name:"HubSpot Agency Partner Certification", desc:"Learn methodologies for packaging services, acquiring clients, and scaling an agency."},
        {type:"guide", provider:"Google", name:"Google Partners Program Info", desc:"Information on becoming a certified Google Partner to build trust with agency clients."},
        {type:"course", provider:"Acquisition.com", name:"Alex Hormozi's $100M Offers", desc:"Master the psychology of crafting irresistible offers and high-ticket pricing models."}
      ]}
    ]
  }
`;

content = content.replace(oldTrack03Str, newTrack03Str);
fs.writeFileSync(path, content, 'utf8');
console.log("Updated CertificationsPage");
