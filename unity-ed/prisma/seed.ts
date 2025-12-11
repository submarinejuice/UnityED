import { PrismaClient, BadgeCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create initial badges
  const badges = [
    {
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      requirement: 'Complete 1 lesson',
      category: BadgeCategory.ACHIEVEMENT,
    },
    {
      name: 'Quick Learner',
      description: 'Complete 10 lessons',
      icon: '⚡',
      requirement: 'Complete 10 lessons',
      category: BadgeCategory.ACHIEVEMENT,
    },
    {
      name: 'Scholar',
      description: 'Complete 50 lessons',
      icon: '📚',
      requirement: 'Complete 50 lessons',
      category: BadgeCategory.ACHIEVEMENT,
    },
    {
      name: 'Level 10',
      description: 'Reach level 10',
      icon: '🏆',
      requirement: 'Reach level 10',
      category: BadgeCategory.PROGRESS,
    },
    {
      name: 'Level 25',
      description: 'Reach level 25',
      icon: '💎',
      requirement: 'Reach level 25',
      category: BadgeCategory.PROGRESS,
    },
    {
      name: 'XP Master',
      description: 'Earn 10,000 XP',
      icon: '✨',
      requirement: 'Earn 10,000 XP',
      category: BadgeCategory.PROGRESS,
    },
    {
      name: 'Coin Collector',
      description: 'Collect 5,000 coins',
      icon: '💰',
      requirement: 'Collect 5,000 coins',
      category: BadgeCategory.ACHIEVEMENT,
    },
    {
      name: 'Weekly Champion',
      description: 'Rank #1 in weekly leaderboard',
      icon: '👑',
      requirement: 'Rank #1 weekly',
      category: BadgeCategory.SPECIAL,
    },
    {
      name: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      requirement: '7-day streak',
      category: BadgeCategory.ACHIEVEMENT,
    },
    {
      name: 'Perfect Score',
      description: 'Get a perfect score in any level',
      icon: '💯',
      requirement: 'Perfect score',
      category: BadgeCategory.SPECIAL,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  console.log('✅ Created badges');

  // Create demo admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@unityed.com' },
    update: {},
    create: {
      email: 'admin@unityed.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user');

  // Create demo student with game data
  const studentPassword = await bcrypt.hash('student123', 10);

  const studentUser = await prisma.user.upsert({
    where: { email: 'demo@student.com' },
    update: {},
    create: {
      email: 'demo@student.com',
      name: 'Demo Student',
      password: studentPassword,
      role: 'STUDENT',
      score: {
        create: {
          totalScore: 0,
          highestScore: 0,
          xp: 0,
          coins: 0,
          gems: 0,
        },
      },
      progress: {
        create: {
          level: 1,
          xp: 0,
          completedLessons: [],
          currentStreak: 0,
          longestStreak: 0,
        },
      },

    },
  });

  console.log('✅ Created demo student user with game data');

  console.log('\n🎉 Seeding completed!');
  console.log('\nDemo Credentials:');
  console.log('Admin: admin@unityed.com / admin123');
  console.log('Student: demo@student.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
