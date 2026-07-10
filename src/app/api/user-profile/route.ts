import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/user-profile - 获取当前用户档案
export async function GET(req: NextRequest) {
  const token = req.headers.get('x-session');
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  try {
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return NextResponse.json({ data: data?.[0] || null });
  } catch (err) {
    console.error('获取用户档案失败:', err);
    return NextResponse.json({ error: '获取用户档案失败' }, { status: 500 });
  }
}

// POST /api/user-profile - 保存用户档案
export async function POST(req: NextRequest) {
  const token = req.headers.get('x-session');
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const client = getSupabaseClient(token);

    const { data: userData, error: userError } = await client.auth.getUser();
    if (userError || !userData.user) {
      return NextResponse.json({ error: '用户验证失败' }, { status: 401 });
    }

    const profile = {
      name: body.name || null,
      gender: body.gender || null,
      age: body.age || null,
      education: body.education || null,
      major: body.major || null,
      major_category: body.major_category || null,
      exam_type: body.exam_type || null,
      target_province: body.target_province || null,
      political_status: body.political_status || null,
      work_experience: body.work_experience || null,
      certificates: body.certificates || null,
    };

    const { data, error } = await client
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    console.error('保存用户档案失败:', err);
    return NextResponse.json({ error: '保存用户档案失败' }, { status: 500 });
  }
}
