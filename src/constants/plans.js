// Plan limits are configuration, not business facts: edit freely. -1 means unlimited.
// Prices (BDT per month) are placeholders until you decide your own pricing.
export const PLANS = {
  free: { id: 'free', price: 0, limits: { users: 5, papers: 10, questions: 210, aiCredits: 10, exportsPerMonth: 12, advancedTemplates: false } },
  starter: { id: 'starter', price: 100, limits: { users: 10, papers: 50, questions: 1000, aiCredits: 50, exportsPerMonth: 100, advancedTemplates: true } },
  professional: { id: 'professional', price: 250, limits: { users: 30, papers: 300, questions: 10000, aiCredits: 300, exportsPerMonth: 1000, advancedTemplates: true } },
  institution: { id: 'institution', price: 500, limits: { users: 150, papers: -1, questions: -1, aiCredits: 1500, exportsPerMonth: -1, advancedTemplates: true } },
  enterprise: { id: 'enterprise', price: null, limits: { users: -1, papers: -1, questions: -1, aiCredits: -1, exportsPerMonth: -1, advancedTemplates: true } },
};
export const PLAN_ORDER = ['free', 'starter', 'professional', 'institution', 'enterprise'];
export const planOf = (id) => PLANS[id] || PLANS.free;
export const limitOf = (planId, key) => planOf(planId).limits[key];
export const withinLimit = (planId, key, used) => { const l = limitOf(planId, key); return l === -1 || used < l; };
// Templates flagged advanced are locked on plans without advancedTemplates
export const ADVANCED_TEMPLATES = ['board', 'university', 'coaching', 'madrasa', 'training'];
