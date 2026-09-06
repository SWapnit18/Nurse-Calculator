/**
 * NurseCalc Canonical Database Seeder Script
 * Inserts 5 Topics, 15 Lessons, and 105+ Reviewed Fictional Questions into MongoDB.
 * Does not duplicate records on re-run.
 */

const mongoose = require('mongoose');
const { Topic, Lesson, Question, User } = require('../models');
const { topicsData, lessonsData, questionsData } = require('./seedData');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nursecalc';

async function seedDatabase() {
  console.log('[NurseCalc Seed] Connecting to MongoDB...');
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[NurseCalc Seed] Connected successfully.');

    // 1. Seed Demo User
    const existingDemo = await User.findOne({ email: 'student@nursecalc.local' });
    if (!existingDemo) {
      const hashedPassword = await bcrypt.hash('Demo1234!', 10);
      await User.create({
        name: 'Nurse Student',
        email: 'student@nursecalc.local',
        password: hashedPassword,
        role: 'student'
      });
      console.log('✓ Created demo user: student@nursecalc.local / Demo1234!');
    } else {
      console.log('✓ Demo user already exists.');
    }

    // 2. Upsert Topics (5)
    for (const t of topicsData) {
      await Topic.findOneAndUpdate({ topicId: t.topicId }, t, { upsert: true, new: true });
    }
    console.log(`✓ Upserted ${topicsData.length} core topics.`);

    // 3. Upsert Lessons (15)
    for (const l of lessonsData) {
      await Lesson.findOneAndUpdate({ lessonId: l.lessonId }, l, { upsert: true, new: true });
    }
    console.log(`✓ Upserted ${lessonsData.length} structured educational lessons.`);

    // 4. Upsert Questions (105)
    for (const q of questionsData) {
      await Question.findOneAndUpdate({ questionId: q.questionId }, q, { upsert: true, new: true });
    }
    console.log(`✓ Upserted ${questionsData.length} reviewed educational questions.`);

    console.log('[NurseCalc Seed] Complete! Database populated cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('[NurseCalc Seed] Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDatabase();
