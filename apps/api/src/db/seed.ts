import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { events, tags, eventTags, users } from './schema.js';

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('🌱 Seeding database...');

  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    // Create a demo organizer user
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@pulse.events',
        name: 'PULSE Demo',
        avatar_url: 'https://api.dicebear.com/9.x/initials/svg?seed=PD',
        provider: 'github',
        provider_id: 'demo-seed-user-001',
      })
      .onConflictDoNothing()
      .returning();

    const organizerId = demoUser?.id;

    // Create tags
    const tagNames = [
      'AI', 'Machine Learning', 'Cloud', 'Infrastructure', 'Web3',
      'Blockchain', 'React', 'TypeScript', 'Python', 'DevOps',
      'Kubernetes', 'Security', 'Open Source', 'Mobile', 'Design',
      'Data Science', 'Frontend', 'Backend', 'Full Stack', 'Startups',
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

    // Seed events

    const eventData = [
      // === 5 CONFERENCES ===
      {
        title: 'AI Infrastructure Summit 2026',
        description: '<p>Three days of in-depth sessions on edge computing, distributed AI systems, and GPU cluster management. Featuring keynotes from leaders at Google DeepMind, NVIDIA, and Anthropic. Hands-on workshops on model serving at scale.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(15),
        end_time: daysFromNowEnd(17),
        location_name: 'Moscone Center',
        location_city: 'San Francisco',
        location_country: 'US',
        latitude: '37.784100',
        longitude: '-122.400000',
        url: 'https://example.com/ai-infra-summit',
        attendee_count: 1200,
        organizer_id: organizerId,
        tags: ['AI', 'Infrastructure', 'Cloud'],
      },
      {
        title: 'European Developer Conference',
        description: '<p>Europe\'s premier developer conference returns to London with 80+ sessions across 5 tracks. Deep dives into TypeScript 6, React Server Components, and the future of web standards. Free community meetup on day one.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(22),
        end_time: daysFromNowEnd(24),
        location_name: 'ExCeL London',
        location_city: 'London',
        location_country: 'GB',
        latitude: '51.508800',
        longitude: '0.055200',
        url: 'https://example.com/euro-dev-conf',
        attendee_count: 3500,
        organizer_id: organizerId,
        tags: ['TypeScript', 'React', 'Frontend'],
      },
      {
        title: 'CloudNative Asia Pacific',
        description: '<p>The largest Kubernetes and cloud-native conference in Asia Pacific. Featuring CNCF project maintainers, production case studies from Grab, Shopee, and GovTech, and a full day of certified Kubernetes workshops.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(30),
        end_time: daysFromNowEnd(32),
        location_name: 'Marina Bay Sands Expo',
        location_city: 'Singapore',
        location_country: 'SG',
        latitude: '1.283300',
        longitude: '103.860700',
        url: 'https://example.com/cloudnative-apac',
        attendee_count: 2000,
        organizer_id: organizerId,
        tags: ['Kubernetes', 'Cloud', 'DevOps'],
      },
      {
        title: 'Berlin Security & Privacy Summit',
        description: '<p>A focused conference on application security, zero-trust architecture, and privacy-preserving computation. Sessions on supply chain security, SBOM standards, and post-quantum cryptography. CTF competition with €10k prize pool.</p>',
        category: 'conference',
        format: 'hybrid',
        start_time: daysFromNow(38),
        end_time: daysFromNowEnd(39),
        location_name: 'STATION Berlin',
        location_city: 'Berlin',
        location_country: 'DE',
        latitude: '52.503000',
        longitude: '13.374000',
        url: 'https://example.com/berlin-security',
        attendee_count: 800,
        organizer_id: organizerId,
        tags: ['Security', 'DevOps', 'Open Source'],
      },
      {
        title: 'India Full Stack Conf',
        description: '<p>Bengaluru hosts India\'s top full-stack engineering conference. Tracks on system design at scale, AI-assisted development, modern frontend frameworks, and building for the next billion users. Student track with mentorship sessions.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(45),
        end_time: daysFromNowEnd(46),
        location_name: 'Bangalore International Exhibition Centre',
        location_city: 'Bengaluru',
        location_country: 'IN',
        latitude: '12.988900',
        longitude: '77.692200',
        url: 'https://example.com/india-fullstack',
        attendee_count: 1500,
        organizer_id: organizerId,
        tags: ['Full Stack', 'Backend', 'Frontend'],
      },

      // === 8 MEETUPS ===
      {
        title: 'React London Monthly',
        description: '<p>Monthly React community meetup. This month: Server Components in production — patterns and pitfalls. Lightning talks welcome. Pizza and drinks provided.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(5),
        end_time: daysFromNowEnd(5, 21),
        location_name: 'Skills Matter',
        location_city: 'London',
        location_country: 'GB',
        latitude: '51.524700',
        longitude: '-0.099100',
        attendee_count: 120,
        organizer_id: organizerId,
        tags: ['React', 'Frontend', 'TypeScript'],
      },
      {
        title: 'SF Python Night',
        description: '<p>Bi-weekly Python meetup in SoMa. This session covers FastAPI advanced patterns, async database drivers, and a live coding demo building a RAG pipeline with LangChain.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(7),
        end_time: daysFromNowEnd(7, 21),
        location_name: 'Holberton School',
        location_city: 'San Francisco',
        location_country: 'US',
        latitude: '37.787400',
        longitude: '-122.396000',
        attendee_count: 80,
        organizer_id: organizerId,
        tags: ['Python', 'AI', 'Backend'],
      },
      {
        title: 'Tokyo TypeScript Meetup',
        description: '<p>Monthly TypeScript meetup in Shibuya. This month: Type-level programming patterns, template literal types for API contracts, and Zod schema-first design.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(10),
        end_time: daysFromNowEnd(10, 21),
        location_name: 'Google Japan',
        location_city: 'Tokyo',
        location_country: 'JP',
        latitude: '35.660100',
        longitude: '139.729500',
        attendee_count: 60,
        organizer_id: organizerId,
        tags: ['TypeScript', 'Frontend'],
      },
      {
        title: 'Berlin DevOps & SRE',
        description: '<p>Community meetup for platform engineers and SREs. Topics: GitOps with ArgoCD, incident management culture, and observability stack showdown (Grafana vs Datadog).</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(12),
        end_time: daysFromNowEnd(12, 21),
        location_name: 'Zalando HQ',
        location_city: 'Berlin',
        location_country: 'DE',
        latitude: '52.509800',
        longitude: '13.450300',
        attendee_count: 90,
        organizer_id: organizerId,
        tags: ['DevOps', 'Kubernetes', 'Cloud'],
      },
      {
        title: 'Colombo JS Community',
        description: '<p>Sri Lanka\'s largest JavaScript community gathering. This month: Building offline-first PWAs for emerging markets, Bun vs Node.js benchmarks, and a panel on remote work culture in Sri Lankan tech.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(8),
        end_time: daysFromNowEnd(8, 20),
        location_name: 'Hatch Coworking',
        location_city: 'Colombo',
        location_country: 'LK',
        latitude: '6.927100',
        longitude: '79.861200',
        attendee_count: 45,
        organizer_id: organizerId,
        tags: ['Frontend', 'Full Stack'],
      },
      {
        title: 'NYC Data Engineering Meetup',
        description: '<p>Data pipeline architectures at scale. Talks on Apache Iceberg, dbt best practices, and real-time streaming with Kafka + Flink. Hosted at Two Sigma\'s event space.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(14),
        end_time: daysFromNowEnd(14, 21),
        location_name: 'Two Sigma',
        location_city: 'New York',
        location_country: 'US',
        latitude: '40.722600',
        longitude: '-74.005600',
        attendee_count: 110,
        organizer_id: organizerId,
        tags: ['Data Science', 'Backend', 'Python'],
      },
      {
        title: 'Sydney Mobile Dev Night',
        description: '<p>Cross-platform mobile development meetup. React Native\'s new architecture deep-dive, Kotlin Multiplatform vs Flutter comparison, and hands-on with Expo SDK 52.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(9),
        end_time: daysFromNowEnd(9, 21),
        location_name: 'Atlassian HQ',
        location_city: 'Sydney',
        location_country: 'AU',
        latitude: '-33.866400',
        longitude: '151.206900',
        attendee_count: 70,
        organizer_id: organizerId,
        tags: ['Mobile', 'React', 'TypeScript'],
      },
      {
        title: 'Toronto AI & ML Social',
        description: '<p>Casual networking meetup for AI/ML practitioners. Demo night format — bring your side project and get 5 minutes to present. Prizes for most creative use of open-source models.</p>',
        category: 'meetup',
        format: 'in-person',
        start_time: daysFromNow(11),
        end_time: daysFromNowEnd(11, 22),
        location_name: 'MaRS Discovery District',
        location_city: 'Toronto',
        location_country: 'CA',
        latitude: '43.659700',
        longitude: '-79.388400',
        attendee_count: 95,
        organizer_id: organizerId,
        tags: ['AI', 'Machine Learning', 'Open Source'],
      },

      // === 3 HACKATHONS (current week — "live") ===
      {
        title: 'Global AI Hackathon 2026',
        description: '<p>48-hour hackathon building AI-powered solutions for climate change. $50k in prizes. Open to teams of 2-5. Mentors from OpenAI, Anthropic, and Google DeepMind. Virtual participation available.</p>',
        category: 'hackathon',
        format: 'hybrid',
        start_time: daysFromNow(0),
        end_time: daysFromNowEnd(2),
        location_name: 'GitHub HQ',
        location_city: 'San Francisco',
        location_country: 'US',
        latitude: '37.782000',
        longitude: '-122.391300',
        url: 'https://example.com/global-ai-hack',
        attendee_count: 500,
        organizer_id: organizerId,
        tags: ['AI', 'Machine Learning', 'Open Source'],
      },
      {
        title: 'Web3 Builder Weekend',
        description: '<p>Build the next generation of decentralized applications. Tracks: DeFi, NFT infrastructure, and on-chain governance tools. Ethereum Foundation and Polygon sponsoring bounties.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(-1),
        end_time: daysFromNowEnd(1),
        location_name: 'WeWork Moorgate',
        location_city: 'London',
        location_country: 'GB',
        latitude: '51.518700',
        longitude: '-0.088500',
        url: 'https://example.com/web3-builder',
        attendee_count: 200,
        organizer_id: organizerId,
        tags: ['Web3', 'Blockchain', 'Full Stack'],
      },
      {
        title: 'Hack for Good — Singapore',
        description: '<p>Social impact hackathon organized by GovTech Singapore. Build solutions for accessibility, healthcare, and education. Winning teams get incubator access and SGD 20k seed funding.</p>',
        category: 'hackathon',
        format: 'in-person',
        start_time: daysFromNow(0),
        end_time: daysFromNowEnd(1, 22),
        location_name: 'National Design Centre',
        location_city: 'Singapore',
        location_country: 'SG',
        latitude: '1.300600',
        longitude: '103.858000',
        url: 'https://example.com/hack-for-good-sg',
        attendee_count: 150,
        organizer_id: organizerId,
        tags: ['Full Stack', 'Design', 'Startups'],
      },

      // === 4 VIRTUAL WORKSHOPS ===
      {
        title: 'Mastering React Server Components',
        description: '<p>A deep 3-hour workshop on React Server Components, streaming SSR, and the Next.js App Router. Build a real app from scratch with server actions, suspense boundaries, and optimistic UI patterns.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(6),
        end_time: daysFromNowEnd(6, 12),
        url: 'https://example.com/rsc-workshop',
        attendee_count: 300,
        organizer_id: organizerId,
        tags: ['React', 'TypeScript', 'Frontend'],
      },
      {
        title: 'Kubernetes Security Fundamentals',
        description: '<p>Hands-on workshop covering pod security standards, network policies, secret management with Vault, and runtime security with Falco. Bring your own cluster or use our lab environment.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(13),
        end_time: daysFromNowEnd(13, 13),
        url: 'https://example.com/k8s-security',
        attendee_count: 150,
        organizer_id: organizerId,
        tags: ['Kubernetes', 'Security', 'DevOps'],
      },
      {
        title: 'Design Systems with Vanilla CSS',
        description: '<p>Build a production-ready design system using CSS custom properties, container queries, and the :has() selector. No frameworks, no build tools — just CSS that scales. Includes dark mode, responsive tokens, and component patterns.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(18),
        end_time: daysFromNowEnd(18, 12),
        url: 'https://example.com/css-design-systems',
        attendee_count: 200,
        organizer_id: organizerId,
        tags: ['Design', 'Frontend'],
      },
      {
        title: 'Building AI Agents with LangGraph',
        description: '<p>From basic chains to multi-agent orchestration. Learn to build stateful, graph-based AI agents with tool use, memory, and human-in-the-loop patterns. Python + TypeScript examples provided.</p>',
        category: 'workshop',
        format: 'virtual',
        start_time: daysFromNow(20),
        end_time: daysFromNowEnd(20, 14),
        url: 'https://example.com/langgraph-agents',
        attendee_count: 450,
        organizer_id: organizerId,
        tags: ['AI', 'Python', 'Machine Learning'],
      },

      // === 2 PAST EVENTS ===
      {
        title: 'DevFest Mumbai 2026',
        description: '<p>Google Developer Group Mumbai\'s annual flagship event. 20+ speakers, 3 tracks, and an epic afterparty. Sessions on Gemini API, Flutter 4, and Firebase Gen AI extensions.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(-14),
        end_time: daysFromNowEnd(-13),
        location_name: 'Jio World Convention Centre',
        location_city: 'Mumbai',
        location_country: 'IN',
        latitude: '19.063600',
        longitude: '72.867800',
        attendee_count: 2200,
        organizer_id: organizerId,
        tags: ['AI', 'Mobile', 'Full Stack'],
      },
      {
        title: 'PyCon Paris 2026',
        description: '<p>The French Python conference covering scientific computing, web development, and DevOps automation. Sprints on CPython and popular open-source libraries on the final day.</p>',
        category: 'conference',
        format: 'in-person',
        start_time: daysFromNow(-7),
        end_time: daysFromNowEnd(-5),
        location_name: 'Cité des Sciences',
        location_city: 'Paris',
        location_country: 'FR',
        latitude: '48.895600',
        longitude: '2.387400',
        attendee_count: 900,
        organizer_id: organizerId,
        tags: ['Python', 'Open Source', 'Data Science'],
      },
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

    console.log('✅ Seeded successfully:');
    console.log('   → 1 demo user');
    console.log(`   → ${tagNames.length} tags`);
    console.log(`   → ${eventData.length} events`);
    console.log('   → 5 conferences, 8 meetups, 3 hackathons, 4 workshops, 2 past');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
