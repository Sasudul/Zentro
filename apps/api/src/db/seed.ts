import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { events, tags, eventTags, users, bookmarks } from './schema.js';

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('🌱 Seeding database with realistic Sri Lankan events...');

  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    // Clear existing database tables
    console.log('🧹 Clearing existing database tables...');
    await db.delete(eventTags);
    await db.delete(bookmarks);
    await db.delete(events);
    await db.delete(tags);
    await db.delete(users);

    console.log('✨ Database cleared.');

    // Create a demo organizer user
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@zentro.events',
        name: 'Zentro Organizer',
        avatar_url: 'https://api.dicebear.com/9.x/initials/svg?seed=ZO',
        provider: 'local',
        provider_id: 'demo-seed-user-001',
      })
      .returning();

    const organizerId = demoUser?.id;

    // Create tags
    const tagNames = [
      'Tech', 'Tourism', 'React', 'AI', 'JavaScript', 'Design', 'Cultural',
      'Finance', 'Startups', 'Cybersecurity', 'Agile', 'DevOps', 'Cloud',
      'Music', 'Cricket', 'Art', 'Nature', 'Food', 'Web3', 'Blockchain'
    ];

    const insertedTags = await db
      .insert(tags)
      .values(tagNames.map((name) => ({ name })))
      .onConflictDoNothing()
      .returning();

    const tagMap = new Map(insertedTags.map((t) => [t.name, t.id]));

    // Helper to get current date offset by days
    const daysFromNow = (days: number) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      d.setHours(9, 0, 0, 0);
      return d;
    };

    const daysFromNowEnd = (days: number, hours = 18) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      d.setHours(hours, 0, 0, 0);
      return d;
    };

    // Seed realistic Sri Lankan events (only Sri Lankan based)
    const eventData = [
      // === Colombo Events ===
      {
        title: 'Lanka Tech Summit 2026',
        description: '<p>The premier technology conference in Sri Lanka. Featuring international and local speakers covering React Server Components, high-scale cloud architectures, AI integration in enterprise systems, and the local startup ecosystem. Includes a dedicated networking session and a panel on remote work culture.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(10),
        end_time: daysFromNowEnd(12),
        location_name: 'Sri Lanka Foundation Institute (SLFI)',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.906900',
        longitude: '79.869600',
        url: 'https://zentro.events/lanka-tech-2026',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        attendee_count: 550,
        organizer_id: organizerId,
        tags: ['Tech', 'React', 'Cloud'],
      },
      {
        title: 'Colombo AI & Data Science Meetup',
        description: '<p>Sri Lanka\'s AI community monthly meetup. This month we are focusing on Large Language Models, fine-tuning techniques, and deployment on edge devices. Food and refreshments will be provided by our sponsors.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(5),
        end_time: daysFromNowEnd(5, 21),
        location_name: 'Hatch Coworking Space',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.934800',
        longitude: '79.843800',
        url: 'https://zentro.events/colombo-ai-meetup',
        image_url: 'https://images.unsplash.com/photo-1591115765373-5aad4e2387af?w=800',
        attendee_count: 120,
        organizer_id: organizerId,
        tags: ['Tech', 'AI', 'JavaScript'],
      },
      {
        title: 'National Cybersecurity Hackathon',
        description: '<p>A grueling 48-hour cybersecurity challenge designed to test the defense and penetration skills of young professionals and students. Compete against top security minds for prizes totaling LKR 1,000,000.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(15),
        end_time: daysFromNowEnd(17),
        location_name: 'Bandaranaike Memorial International Conference Hall (BMICH)',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.901500',
        longitude: '79.873500',
        url: 'https://zentro.events/cyber-hack-2026',
        image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        attendee_count: 250,
        organizer_id: organizerId,
        tags: ['Tech', 'Cybersecurity', 'Startups'],
      },
      {
        title: 'Lanka Agile Conference 2026',
        description: '<p>Join industry experts as we explore the future of agile methodologies, product management, and high-performance engineering culture in Sri Lankan IT enterprises.</p>',
        category: 'conference',
        format: 'hybrid',
        start_time: daysFromNow(22),
        end_time: daysFromNowEnd(23),
        location_name: 'Cinnamon Grand Colombo',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.918400',
        longitude: '79.848300',
        url: 'https://zentro.events/lanka-agile-2026',
        image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        attendee_count: 400,
        organizer_id: organizerId,
        tags: ['Agile', 'DevOps', 'Startups'],
      },

      // === Kandy Events ===
      {
        title: 'Kandy Software Engineering Meetup',
        description: '<p>Gathering software enthusiasts and developers in Kandy for lightning talks on DevOps pipelines, containerized architectures, and standard frontend performance optimizations.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(8),
        end_time: daysFromNowEnd(8, 20),
        location_name: 'Kandy City Centre (KCC)',
        location_city: 'Kandy',
        location_country: 'Sri Lanka',
        latitude: '7.292800',
        longitude: '80.635800',
        image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        attendee_count: 85,
        organizer_id: organizerId,
        tags: ['Tech', 'DevOps', 'JavaScript'],
      },
      {
        title: 'Hill Country Mobile Apps Hackathon',
        description: '<p>A weekend hackathon in Kandy for mobile app developers to build solutions improving public transportation, healthcare access, and tourism services in the central province.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(25),
        end_time: daysFromNowEnd(27),
        location_name: 'University of Peradeniya, Faculty of Engineering',
        location_city: 'Kandy',
        location_country: 'Sri Lanka',
        latitude: '7.254800',
        longitude: '80.597300',
        url: 'https://zentro.events/kandy-mobile-hack',
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        attendee_count: 150,
        organizer_id: organizerId,
        tags: ['Tech', 'Startups', 'Design'],
      },

      // === Galle Events ===
      {
        title: 'Galle Web3 & Blockchain Hackathon',
        description: '<p>A unique hackathon set within the historic Galle Fort. Teams will build decentralized apps, smart contracts, and NFT infrastructure designed for sustainable travel and supply chain trust.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(12),
        end_time: daysFromNowEnd(14),
        location_name: 'Galle Fort Hotel',
        location_city: 'Galle',
        location_country: 'Sri Lanka',
        latitude: '6.026400',
        longitude: '80.217300',
        url: 'https://zentro.events/galle-web3-hack',
        image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        attendee_count: 90,
        organizer_id: organizerId,
        tags: ['Tech', 'Web3', 'Blockchain'],
      },
      {
        title: 'Southern Province SRE & DevOps Workshop',
        description: '<p>A comprehensive 6-hour training workshop covering Docker fundamentals, Kubernetes cluster configurations, CI/CD pipelines, and runtime observability stack tools.</p>',
        category: 'workshop',
        format: 'in-person',
        start_time: daysFromNow(18),
        end_time: daysFromNowEnd(18, 16),
        location_name: 'Southern IT Incubator Center',
        location_city: 'Galle',
        location_country: 'Sri Lanka',
        latitude: '6.035400',
        longitude: '80.214500',
        image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
        attendee_count: 65,
        organizer_id: organizerId,
        tags: ['Tech', 'DevOps', 'Cloud'],
      },

      // === Jaffna Events ===
      {
        title: 'Jaffna AI & Machine Learning Workshop',
        description: '<p>Hands-on training session at the University of Jaffna. Get started with model training, PyTorch basics, retrieval augmented generation pipelines, and local embedding models.</p>',
        category: 'workshop',
        format: 'in-person',
        start_time: daysFromNow(16),
        end_time: daysFromNowEnd(16, 17),
        location_name: 'University of Jaffna, IT Lab',
        location_city: 'Jaffna',
        location_country: 'Sri Lanka',
        latitude: '9.684800',
        longitude: '80.022300',
        url: 'https://zentro.events/jaffna-ai-workshop',
        image_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800',
        attendee_count: 110,
        organizer_id: organizerId,
        tags: ['Tech', 'AI', 'DevOps'],
      },
      {
        title: 'Jaffna DevCon 2026',
        description: '<p>The largest developer conference in the northern province. Showcasing local innovations, mobile app development workshops, and discussions on remote software careers.</p>',
        category: 'conference',
        format: 'hybrid',
        start_time: daysFromNow(30),
        end_time: daysFromNowEnd(31),
        location_name: 'Tilko Jaffna City Hotel',
        location_city: 'Jaffna',
        location_country: 'Sri Lanka',
        latitude: '9.667200',
        longitude: '80.016300',
        image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        attendee_count: 320,
        organizer_id: organizerId,
        tags: ['Tech', 'Startups', 'React'],
      },

      // === Negombo Events ===
      {
        title: 'Negombo Tech Startup Weekend',
        description: '<p>Pitch ideas, form teams, and build a minimal viable product in 54 hours. Mentorship from leading founders, VC firms, and accelerators in Sri Lanka.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(20),
        end_time: daysFromNowEnd(22),
        location_name: 'Heritance Negombo',
        location_city: 'Negombo',
        location_country: 'Sri Lanka',
        latitude: '7.221500',
        longitude: '79.841300',
        url: 'https://zentro.events/negombo-startup',
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
        attendee_count: 130,
        organizer_id: organizerId,
        tags: ['Tech', 'Startups', 'Finance'],
      },

      // === Trincomalee Events ===
      {
        title: 'Trinco Beachfront DevFest 2026',
        description: '<p>A unique conference right next to the beautiful beaches of Trincomalee. Talks cover modern web standards, Bun vs Node.js, and serverless databases.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(27),
        end_time: daysFromNowEnd(29),
        location_name: 'Trincomalee Beach Resort',
        location_city: 'Trincomalee',
        location_country: 'Sri Lanka',
        latitude: '8.572300',
        longitude: '81.233500',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        attendee_count: 210,
        organizer_id: organizerId,
        tags: ['Tech', 'JavaScript', 'Cloud'],
      },

      // === Sigiriya Events ===
      {
        title: 'Sigiriya Tourism & Culture Tech Summit',
        description: '<p>Exploring how technology can preserve cultural heritage and boost sustainable tourism in Sri Lanka. Showcasing AR/VR guides, digital payment ecosystems, and localized tech platforms.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(35),
        end_time: daysFromNowEnd(37),
        location_name: 'Aliya Resort & Spa',
        location_city: 'Sigiriya',
        location_country: 'Sri Lanka',
        latitude: '7.957200',
        longitude: '80.760200',
        url: 'https://zentro.events/sigiriya-tech',
        image_url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800',
        attendee_count: 180,
        organizer_id: organizerId,
        tags: ['Tourism', 'Cultural', 'Design'],
      },

      // === Bentota Events ===
      {
        title: 'Bentota Coding & Coffee Meetup',
        description: '<p>A casual weekend gathering for digital nomads and local developers. Share side projects, chat about SaaS products, and enjoy beachside coworking.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(4),
        end_time: daysFromNowEnd(4, 18),
        location_name: 'Cinnamon Bey Bentota',
        location_city: 'Bentota',
        location_country: 'Sri Lanka',
        latitude: '6.421800',
        longitude: '79.999800',
        image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        attendee_count: 40,
        organizer_id: organizerId,
        tags: ['Tech', 'Design', 'Startups'],
      },

      // === Ella Events ===
      {
        title: 'Ella SRE & Cloud Native Workshop',
        description: '<p>Escape to the hills of Ella for a deep SRE retreat. Focus on kubernetes multi-cluster management, Grafana observability dash, and autoscaling metrics.</p>',
        category: 'workshop',
        format: 'in-person',
        start_time: daysFromNow(14),
        end_time: daysFromNowEnd(14, 17),
        location_name: '98 Acres Resort & Spa',
        location_city: 'Ella',
        location_country: 'Sri Lanka',
        latitude: '6.872200',
        longitude: '81.047800',
        url: 'https://zentro.events/ella-cloud-workshop',
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        attendee_count: 75,
        organizer_id: organizerId,
        tags: ['Tech', 'DevOps', 'Cloud'],
      },

      // === Virtual Workshops ===
      {
        title: 'Virtual: Next.js & React Server Components Masterclass',
        description: '<p>A virtual deep dive into Next.js App Router, Suspense boundaries, caching strategies, and Server Actions. Build a robust online dashboard with direct state updates.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(2),
        end_time: daysFromNowEnd(2, 13),
        url: 'https://zentro.events/virtual-nextjs-masterclass',
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        attendee_count: 320,
        organizer_id: organizerId,
        tags: ['Tech', 'React', 'JavaScript'],
      },
      {
        title: 'Virtual: UI/UX Figma Design System Workshop',
        description: '<p>Learn to construct highly scalable Figma design systems using variables, advanced auto-layout 5.0, responsive components, and fluid typographic tokens.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(9),
        end_time: daysFromNowEnd(9, 13),
        url: 'https://zentro.events/figma-workshop',
        image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800',
        attendee_count: 240,
        organizer_id: organizerId,
        tags: ['Design', 'Startups'],
      },

      // === Past Events ===
      {
        title: 'DevFest Sri Lanka 2025',
        description: '<p>The largest community-led developer festival in Sri Lanka. Over 1,000 developers gathered at BMICH to hear talks on generative AI, mobile development, and modern cloud practices.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(-30),
        end_time: daysFromNowEnd(-28),
        location_name: 'Bandaranaike Memorial International Conference Hall (BMICH)',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.901500',
        longitude: '79.873500',
        image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        attendee_count: 1100,
        organizer_id: organizerId,
        tags: ['Tech', 'AI', 'Cloud'],
      },
      {
        title: 'Colombo JS Conference 2025',
        description: '<p>The premier JavaScript gathering in Sri Lanka. Deep dives into Bun, Node, Deno, and cutting edge reactive frameworks. Exceptional networking event at Hilton Colombo.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(-15),
        end_time: daysFromNowEnd(-14),
        location_name: 'Hilton Colombo',
        location_city: 'Colombo',
        location_country: 'Sri Lanka',
        latitude: '6.931200',
        longitude: '79.841500',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        attendee_count: 600,
        organizer_id: organizerId,
        tags: ['Tech', 'JavaScript', 'React'],
      }
    ];

    // Insert events
    for (const eventItem of eventData) {
      const { tags: eventTagNames, ...eventValues } = eventItem;

      const [insertedEvent] = await db
        .insert(events)
        .values(eventValues)
        .returning();

      // Link tags
      if (eventTagNames && insertedEvent) {
        for (const tagName of eventTagNames) {
          const tagId = tagMap.get(tagName);
          if (tagId) {
            await db
              .insert(eventTags)
              .values({ event_id: insertedEvent.id, tag_id: tagId })
              .onConflictDoNothing();
          }
        }
      }
    }

    console.log('✅ Sri Lankan Database Seeding successful:');
    console.log('   → 1 demo user');
    console.log(`   → ${tagNames.length} tags`);
    console.log(`   → ${eventData.length} events (all exclusively Sri Lankan)`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
