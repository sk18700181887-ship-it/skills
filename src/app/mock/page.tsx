'use client';
import Link from 'next/link';
import { MOCK_PAPERS, RECENT_MOCKS, USER, FREE_DAILY_LIMIT } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Trophy, TrendingUp, Users, BarChart3, Calendar, Lock } from 'lucide-react';

export default function MockPage() {
  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="模考中心" subtitle="全真模考，全国排名，AI 预测你的上岸概率" />

      {/* Exam Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            近期模考排期
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_PAPERS.map((exam) => (
              <div key={exam.name} className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{exam.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{exam.tag}</Badge>
                    {exam.vipOnly && <Badge className="text-[9px] bg-primary/15 text-primary">VIP</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exam.duration}分钟</span>
                  </div>
                </div>
                <div className="shrink-0">
                  {exam.vipOnly && !USER.isVip ? (
                    <Link href="/vip"><Button size="sm" variant="outline"><Lock className="w-3 h-3 mr-1" />VIP 专属</Button></Link>
                  ) : (
                    <Button size="sm">开始模考</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Records */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                我的模考记录
              </CardTitle>
            </CardHeader>
            <CardContent>
              {RECENT_MOCKS.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">暂无模考记录，快去参加一场吧</div>
              ) : (
                <div className="space-y-2">
                  {RECENT_MOCKS.map((r, i) => (
                    <div key={i} className="rounded-lg border p-3 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold font-serif text-primary">{r.score}</div>
                        <div className="text-[10px] text-muted-foreground">排名 {r.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Prediction */}
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/3">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI 成绩预测
                <Badge className="text-[9px] bg-primary/15 text-primary">AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!USER.isVip ? (
                <>
                  <VipLock message="AI 上岸概率预测为 VIP 专属" />
                  <Link href="/vip"><Button className="w-full mt-2" size="sm">开通 VIP</Button></Link>
                </>
              ) : (
                <div className="space-y-3 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">预测上岸概率</div>
                    <div className="text-3xl font-bold font-serif text-primary">68%</div>
                  </div>
                  <div className="text-xs text-muted-foreground text-left">
                    <div className="font-medium text-foreground">成绩趋势</div>
                    <div className="mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-[var(--ok)]" />近 3 次模考平均提升 8 分</div>
                    <div className="mt-1">行测正确率 72%，距目标 80% 需重点突破资料分析</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium">免费模考额度</div>
              <div className="mt-2 text-xs text-muted-foreground">
                {USER.isVip ? 'VIP 无限参加' : `本月剩余 ${FREE_DAILY_LIMIT} 次`}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
