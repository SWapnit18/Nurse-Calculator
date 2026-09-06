const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('NurseCalc Full-Stack MERN Roadmap Validation Tests', () => {
  test('GET /api/health should report all 6 roadmap modules and ISMP compliance', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.roadmapModules).toEqual(expect.arrayContaining(['Learn', 'Practice', 'Calculator', 'Mistakes', 'Progress', 'AI']));
    expect(res.headers['x-clinical-disclaimer']).toBeDefined();
  });

  test('POST /api/auth/login allows demo credentials student@nursecalc.local / Demo1234!', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@nursecalc.local', password: 'Demo1234!' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('student@nursecalc.local');
  });

  test('GET /api/topics returns 5 accredited nursing topics', async () => {
    const res = await request(app).get('/api/topics');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(5);
    expect(res.body.data[0].topicId).toBe('med_math_basics');
  });

  test('GET /api/topics/med_math_basics/lessons returns 3 structured lessons with worked examples', async () => {
    const res = await request(app).get('/api/topics/med_math_basics/lessons');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3);
    expect(res.body.data[0].workedExample).toBeDefined();
  });

  test('GET /api/questions returns at least 100 reviewed educational questions', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(100);
  });

  test('POST /api/practice/submit classifies 10-fold decimal slip mistake', async () => {
    const res = await request(app)
      .post('/api/practice/submit')
      .send({
        questionId: 'q_1',
        studentAnswer: 4.0,
        userId: 'demo_student'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.isCorrect).toBe(false);
    expect(res.body.mistakeType).toBe('DECIMAL_SLIP_10X');
    expect(res.body.aiExplanation).toContain('10-fold decimal slip');
    expect(res.body.remediationRecommendation).toContain('Topic 1, Lesson 1');
  });

  test('GET /api/progress/:userId returns accuracy and NCLEX benchmark', async () => {
    const res = await request(app).get('/api/progress/demo_student');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.overallAccuracy).toBeDefined();
    expect(res.body.data.masteryStatus).toBeDefined();
  });

  test('POST /api/calculate injection (80mg / 200mg/mL * 1mL = 0.4 mL)', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({
        mode: 'injection',
        params: { desiredMg: 80, haveMg: 200, vehicleMl: 1 }
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.resultFormatted).toBe('0.4');
  });

  test('GET /api/subscription/status verifies 30-day registration free trial', async () => {
    const res = await request(app).get('/api/subscription/status?userId=demo_student');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isProActive).toBe(true);
    expect(res.body.data.daysLeft).toBeGreaterThanOrEqual(1);
    expect(res.body.data.priceINR).toBe(99);
  });

  test('POST /api/subscription/verify upgrades user to active subscription for ₹99 via PayPal/GooglePlay', async () => {
    const orderRes = await request(app).post('/api/subscription/create-order').send({ method: 'PayPal' });
    expect(orderRes.statusCode).toBe(200);
    expect(orderRes.body.data.orderId).toBeDefined();

    const verifyRes = await request(app)
      .post('/api/subscription/verify')
      .send({
        orderId: orderRes.body.data.orderId,
        paymentId: 'PAYPAL_TXN_99_INR',
        method: 'PayPal',
        amount: 99,
        currency: 'INR',
        userId: 'demo_student'
      });
    expect(verifyRes.statusCode).toBe(200);
    expect(verifyRes.body.success).toBe(true);
    expect(verifyRes.body.data.status).toBe('active');
    expect(verifyRes.body.data.daysLeft).toBe(30);
  });
});
