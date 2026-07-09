'use client';
import { EXAM_TYPES, EXAM_TIMELINE, REVIEW_CHECKLIST, USER } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Compass, Calendar, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="考公全景" subtitle="从了解考试到政审体检，完整考公路径一览" />

      <Tabs defaultValue="types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="types">考试类型</TabsTrigger>
          <TabsTrigger value="timeline">全年时间线</TabsTrigger>
          <TabsTrigger value="review">政审体检</TabsTrigger>
        </TabsList>

        {/* 考试类型 */}
        <TabsContent value="types">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAM_TYPES.map((e) => (
              <Card key={e.id} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{e.short}</CardTitle>
                    <Badge variant="outline" className="text-[10px]">难度 {e.difficulty}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{e.name}</div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2"><Clock className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" /><span>{e.period}</span></div>
                  <div className="flex items-start gap-2"><span className="w-3.5 text-center text-muted-foreground shrink-0 text-xs">科</span><span>{e.subjects}</span></div>
                  <div className="flex items-start gap-2"><span className="w-3.5 text-center text-muted-foreground shrink-0 text-xs">比</span><span>平均竞争比 {e.avgRatio}</span></div>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-2 text-xs">
                    <Sparkles className="w-3 h-3 text-primary inline mr-1" />
                    <span className="text-primary font-medium">AI 提示：</span>{e.tip}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 全年时间线 */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />全年考试时间线</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {EXAM_TIMELINE.map((m, i) => (
                  <div key={m.month} className="flex gap-4">
                    <div className="w-14 shrink-0 text-right">
                      <span className="text-sm font-bold text-primary">{m.month}</span>
                    </div>
                    <div className="relative pl-4 border-l-2 border-primary/20 pb-2">
                      {i === 0 && <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />}
                      <div className="space-y-1">
                        {m.events.map((ev, j) => (
                          <div key={j} className="text-sm text-muted-foreground">{ev}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 政审体检 */}
        <TabsContent value="review">
          <div className="space-y-4">
            {!USER.isVip && (
              <VipLock message="政审体检 AI 材料检查与风险预警为 VIP 专属" />
            )}
            {REVIEW_CHECKLIST.map((cat) => (
              <Card key={cat.category}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    {cat.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {cat.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        {cat.category.includes('淘汰') ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-[var(--err)] shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)] shrink-0 mt-0.5" />
                        )}
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {USER.isVip && (
              <Card className="border-primary/30 bg-primary/3">
                <CardContent className="p-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">AI 材料检查</div>
                    <div className="text-xs text-muted-foreground">上传政审材料，AI 自动检查遗漏与风险点</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
