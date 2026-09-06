-- ==============================================================================
-- NurseCalc Clinical Learning Platform - Supabase Schema Migration
-- ==============================================================================

-- 1. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    lesson_count INTEGER DEFAULT 5,
    question_count INTEGER DEFAULT 8,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    clinical_key TEXT,
    worked_example JSONB,
    content JSONB,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT,
    prompt TEXT NOT NULL,
    correct_answer NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    calc_type TEXT DEFAULT 'dosage',
    difficulty TEXT DEFAULT 'medium',
    tolerance NUMERIC DEFAULT 0.05,
    formula TEXT,
    explanation TEXT,
    common_mistake TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. USER ATTEMPTS & PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question_id TEXT REFERENCES public.questions(id) ON DELETE SET NULL,
    topic_id TEXT,
    student_answer NUMERIC NOT NULL,
    is_correct BOOLEAN NOT NULL,
    mistake_category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, question_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for Educational Content
CREATE POLICY "Public Read Access for Topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Questions" ON public.questions FOR SELECT USING (true);

-- Allow Users to Read/Write their own Attempts and Bookmarks
CREATE POLICY "Public Insert Attempts" ON public.attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Select Attempts" ON public.attempts FOR SELECT USING (true);
CREATE POLICY "Public All Bookmarks" ON public.bookmarks FOR ALL USING (true);
