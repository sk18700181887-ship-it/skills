import { pgTable, serial, timestamp, varchar, text, integer, boolean, jsonb, index, uuid } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 用户档案 - 存储 onboarding 填写的信息
export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid("user_id").notNull().default(sql`auth.uid()`),
    name: varchar("name", { length: 50 }),
    gender: varchar("gender", { length: 10 }),
    age: integer("age"),
    education: varchar("education", { length: 20 }),
    major: varchar("major", { length: 50 }),
    major_category: varchar("major_category", { length: 50 }),
    exam_type: varchar("exam_type", { length: 50 }),
    target_province: varchar("target_province", { length: 50 }),
    political_status: varchar("political_status", { length: 20 }),
    work_experience: varchar("work_experience", { length: 50 }),
    certificates: text("certificates"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("user_profiles_user_id_idx").on(table.user_id),
  ]
);

// AI 报告 - 存储用户生成的报考报告
export const reports = pgTable(
  "reports",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid("user_id").notNull().default(sql`auth.uid()`),
    profile_id: uuid("profile_id").notNull().references(() => userProfiles.id),
    overall_score: integer("overall_score"),
    match_score: integer("match_score"),
    competition_score: integer("competition_score"),
    growth_score: integer("growth_score"),
    recommended_posts: jsonb("recommended_posts"),
    competition_analysis: jsonb("competition_analysis"),
    strategy_advice: jsonb("strategy_advice"),
    summary: text("summary"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("reports_user_id_idx").on(table.user_id),
    index("reports_profile_id_idx").on(table.profile_id),
  ]
);
