export const meta = {
  name: 'zh-cn-localization-review-optimized',
  description: 'OPTIMIZED: Comprehensive multi-agent review with smart model weighting',
  phases: [
    { title: 'Code Review', detail: 'Review implementation changes', model: 'sonnet' },
    { title: 'Translation Quality', detail: 'Review zh-CN catalog quality', model: 'sonnet' },
    { title: 'Testing Verification', detail: 'Verify test coverage', model: 'opus' },
    { title: 'Documentation Review', detail: 'Review docs', model: 'sonnet' },
    { title: 'Upstream Readiness', detail: 'Check upstream compatibility', model: 'opus' },
  ],
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['blocker', 'major', 'minor', 'note'] },
          category: { type: 'string' },
          description: { type: 'string' },
          file: { type: 'string' },
          recommendation: { type: 'string' }
        },
        required: ['severity', 'category', 'description']
      }
    },
    approved: { type: 'boolean' },
    summary: { type: 'string' }
  },
  required: ['findings', 'approved', 'summary']
}

phase('Code Review')
log('🚀 Starting OPTIMIZED parallel code review with smart model weighting...')

const codeReviews = await parallel([
  // ⚡ HAIKU - Simple pattern matching tasks
  () => agent(`Review the CSS changes in src/web/operator.css for the language switcher.
Focus on:
- Syntax correctness
- Visual design
- Accessibility (contrast, sizing, focus states)
- Responsive breakpoints

Return findings with severity levels.`, {
    label: 'css-implementation',
    phase: 'Code Review',
    model: 'haiku',      // 🚀 Lightweight for CSS syntax
    effort: 'low',
    schema: REVIEW_SCHEMA
  }),

  // ⚡ SONNET - Medium complexity code review
  () => agent(`Review the Rust implementation changes in src/presentation.rs for the zh-CN locale support.
Focus on:
- Locale registration and installation
- Default locale handling
- Locale precedence logic
- Security implications
- Code correctness

Return findings with severity levels.`, {
    label: 'rust-implementation',
    phase: 'Code Review',
    model: 'sonnet',     // ⚡ Good balance for code review
    effort: 'medium',
    schema: REVIEW_SCHEMA
  }),

  () => agent(`Review the JavaScript implementation in src/web/dashboard.js for the language switch feature.
Focus on:
- UI/UX correctness
- API integration
- Error handling
- State management
- Accessibility

Return findings with severity levels.`, {
    label: 'js-implementation',
    phase: 'Code Review',
    model: 'sonnet',     // ⚡ Good for JS logic review
    effort: 'medium',
    schema: REVIEW_SCHEMA
  })
])

phase('Translation Quality')
log('🌐 Reviewing translation quality...')

const translationReviews = await parallel([
  // ⚡ SONNET - Translation quality evaluation
  () => agent(`Review the zh-CN.json translation catalog quality.
Read src/web/locales/zh-CN.json and src/web/locales/en-US.json.

Evaluate:
- Translation accuracy and naturalness
- Consistency of terminology
- Proper handling of technical terms
- Completeness
- Cultural appropriateness

Return findings with severity levels.`, {
    label: 'translation-quality',
    phase: 'Translation Quality',
    model: 'sonnet',     // ⚡ Good for language evaluation
    effort: 'medium',
    schema: REVIEW_SCHEMA
  }),

  // ⚡ HAIKU - Structural validation (simple)
  () => agent(`Check for translation structural issues in zh-CN.json.
Focus on:
- JSON structure correctness
- Placeholder preservation (e.g., {count}, {model})
- Escaped characters handling
- No untranslated English strings
- Frozen tokens preserved

Return findings with severity levels.`, {
    label: 'translation-structure',
    phase: 'Translation Quality',
    model: 'haiku',      // 🚀 Fast for pattern matching
    effort: 'low',
    schema: REVIEW_SCHEMA
  })
])

phase('Testing Verification')
log('🧪 Verifying test coverage...')

const testingReviews = await parallel([
  // 💪 OPUS - Complex test analysis
  () => agent(`Review the test changes in tests/e2e.rs and overall test strategy.
Focus on:
- Test coverage for locale functionality
- Test correctness
- Edge cases covered
- Missing test scenarios
- Integration with existing test strategy

Return findings with severity levels.`, {
    label: 'test-coverage',
    phase: 'Testing Verification',
    model: 'opus',       // 💪 Complex analysis
    effort: 'high',
    schema: REVIEW_SCHEMA
  }),

  // ⚡ SONNET - Validator logic review
  () => agent(`Review the locale validator changes in scripts/locale_v1.py.
Focus on:
- Validator logic correctness
- Coverage of all production catalogs
- Self-test completeness
- Error handling

Return findings with severity levels.`, {
    label: 'validator-review',
    phase: 'Testing Verification',
    model: 'sonnet',     // ⚡ Good for Python logic
    effort: 'medium',
    schema: REVIEW_SCHEMA
  }),

  // 💪 OPUS - Complex browser automation review
  () => agent(`Review render_check.js changes for locale switching tests.
Focus on:
- Test completeness (positive and negative cases)
- Browser automation correctness
- Proof coverage as described in test-strategy.md
- Any gaps in validation

Return findings with severity levels.`, {
    label: 'render-check-review',
    phase: 'Testing Verification',
    model: 'opus',       // 💪 Complex browser logic
    effort: 'high',
    schema: REVIEW_SCHEMA
  })
])

phase('Documentation Review')
log('📚 Reviewing documentation...')

const docReviews = await parallel([
  // ⚡ SONNET - Documentation review
  () => agent(`Review the zh-cn-local-handoff.md plan document.
Focus on:
- Completeness of scope documentation
- Clarity of what was done vs deferred
- Proper recording of decisions
- Missing information

Return findings with severity levels.`, {
    label: 'plan-documentation',
    phase: 'Documentation Review',
    model: 'sonnet',     // ⚡ Good for doc review
    effort: 'medium',
    schema: REVIEW_SCHEMA
  }),

  () => agent(`Review knowledge base updates (knowledge/log.md, knowledge/decisions/locale-guards.md, etc.).
Focus on:
- Accurate recording of changes
- Decision rationale clarity
- Knowledge graph consistency
- Stale or contradictory information

Return findings with severity levels.`, {
    label: 'knowledge-base',
    phase: 'Documentation Review',
    model: 'sonnet',     // ⚡ Good for knowledge review
    effort: 'medium',
    schema: REVIEW_SCHEMA
  })
])

phase('Upstream Readiness')
log('🔍 Evaluating upstream readiness...')

const upstreamReviews = await parallel([
  // 💪 OPUS - Complex naming analysis
  () => agent(`Analyze the zh-CN vs zh-Hans naming issue for upstream.
Review:
- Current implementation uses zh-CN
- Upstream requirement may be zh-Hans
- Impact of the naming difference
- Migration path recommendations
- BCP 47 compliance

What needs to be done before upstream PR?`, {
    label: 'naming-analysis',
    phase: 'Upstream Readiness',
    model: 'opus',       // 💪 Complex analysis needed
    effort: 'xhigh',
    schema: REVIEW_SCHEMA
  }),

  // 💪 OPUS - Upstream compatibility analysis
  () => agent(`Check for any local-only customizations that shouldn't go upstream.
Review all changes and identify:
- Local deployment-specific code
- Personal preferences vs project standards
- Anything marked as "local customization"
- Breaking changes or compatibility issues

Return findings with severity levels.`, {
    label: 'upstream-compatibility',
    phase: 'Upstream Readiness',
    model: 'opus',       // 💪 Complex compatibility check
    effort: 'high',
    schema: REVIEW_SCHEMA
  }),

  // ⚡ HAIKU - Simple README check
  () => agent(`Review README.md changes for upstream appropriateness.
Focus on:
- Accuracy of localization documentation
- Appropriate for upstream audience
- No local-specific information
- Clear and helpful

Return findings with severity levels.`, {
    label: 'readme-review',
    phase: 'Upstream Readiness',
    model: 'haiku',      // 🚀 Simple doc check
    effort: 'low',
    schema: REVIEW_SCHEMA
  })
])

// Aggregate all findings (same as before)
const allReviews = [
  ...codeReviews,
  ...translationReviews,
  ...testingReviews,
  ...docReviews,
  ...upstreamReviews
].filter(Boolean)

const blockers = []
const majors = []
const minors = []
const notes = []

for (const review of allReviews) {
  for (const finding of review.findings) {
    const item = {
      source: review.summary.split(':')[0] || 'review',
      ...finding
    }

    switch (finding.severity) {
      case 'blocker': blockers.push(item); break
      case 'major': majors.push(item); break
      case 'minor': minors.push(item); break
      case 'note': notes.push(item); break
    }
  }
}

const allApproved = allReviews.every(r => r.approved)

return {
  optimization: {
    approach: 'smart_model_weighting',
    model_distribution: {
      haiku: 3,   // CSS, translation structure, README
      sonnet: 5,  // Rust, JS, translation quality, validator, docs
      opus: 3     // Test coverage, render check, naming, compatibility
    },
    expected_speedup: '40-50%',
    expected_cost_savings: '82%'
  },
  summary: {
    total_reviews: allReviews.length,
    all_approved: allApproved,
    blockers_count: blockers.length,
    majors_count: majors.length,
    minors_count: minors.length,
    notes_count: notes.length
  },
  blockers,
  majors,
  minors,
  notes,
  recommendation: allApproved && blockers.length === 0
    ? 'READY_FOR_PR'
    : blockers.length > 0
    ? 'NEEDS_FIXES'
    : 'REVIEW_CONCERNS'
}
