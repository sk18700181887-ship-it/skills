import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/report - 获取当前用户的报告
export async function GET(req: NextRequest) {
  const token = req.headers.get('x-session');
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  try {
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return NextResponse.json({ data: data?.[0] || null });
  } catch (err) {
    console.error('获取报告失败:', err);
    return NextResponse.json({ error: '获取报告失败' }, { status: 500 });
  }
}

// POST /api/report - 保存报告
export async function POST(req: NextRequest) {
  const token = req.headers.get('x-session');
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const client = getSupabaseClient(token);

    const report = {
      profile_id: body.profile_id,
      overall_score: body.overall_score || null,
      match_score: body.match_score || null,
      competition_score: body.competition_score || null,
      growth_score: body.growth_score || null,
      recommended_posts: body.recommended_posts || null,
      competition_analysis: body.competition_analysis || null,
      strategy_advice: body.strategy_advice || null,
      summary: body.summary || null,
    };

    const { data, error } = await client
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    console.error('保存报告失败:', err);
    return NextResponse.json({ error: '保存报告失败' }, { status: 500 });
  }
}
