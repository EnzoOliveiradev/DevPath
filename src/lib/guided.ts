// Correção objetiva das sessões guiadas.
// A nota de memória e o nível de ajuda passam a vir do desempenho nos exercícios,
// e não apenas da autoavaliação.

export type ExerciseKind = 'predict' | 'concept' | 'explain' | 'code';

export interface ExerciseOutcome {
  exerciseId: string;
  kind: ExerciseKind;
  /** null = não corrigido automaticamente (explicação livre). */
  correct: boolean | null;
  hintsUsed: number;
  solutionViewed: boolean;
  answer: string;
}

export interface SessionScore {
  correct: number;
  total: number;
  /** 0–5, mesma escala de study_sessions.recall_score. */
  recall: number;
  /** 0–3, mesma escala de study_sessions.autonomy_level. */
  autonomy: number;
}

/**
 * Acertos contam apenas sem ver a solução. Dicas não reduzem a nota,
 * mas elevam o nível de ajuda:
 * 0 dicas → 0 (sozinho) • 1–2 → 1 • 3+ → 2 • alguma solução vista → 3.
 */
export function scoreOutcomes(outcomes: ExerciseOutcome[]): SessionScore {
  const graded = outcomes.filter(o => o.correct !== null);
  const correct = graded.filter(o => o.correct === true && !o.solutionViewed).length;
  const total = graded.length;
  const recall = total ? Math.round((5 * correct) / total) : 0;
  const hints = outcomes.reduce((sum, o) => sum + o.hintsUsed, 0);
  const autonomy = outcomes.some(o => o.solutionViewed) ? 3 : hints === 0 ? 0 : hints <= 2 ? 1 : 2;
  return { correct, total, recall, autonomy };
}

export function accuracy(sessions: { correct_count?: number | null; total_count?: number | null }[]): number | null {
  let correct = 0, total = 0;
  for (const s of sessions) {
    if (s.total_count) { correct += s.correct_count ?? 0; total += s.total_count; }
  }
  return total ? correct / total : null;
}
